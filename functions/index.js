const functions = require('firebase-functions');
const admin = require('firebase-admin');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
admin.initializeApp();

// Listen to user creation
exports.registerUserInDb = functions.auth.user().onCreate(async (user) => {
  const email = user.email
  const newUser = {
    email,
    fullName: user.displayName || email,
    avatar: user.photoURL || 'https://placeimg.com/640/640/people/',
    id: user.uid
  }

  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const result = await admin.firestore().collection('users').add(newUser)
  // Log a message that we've succesfully written the message
  return console.log(`User added with ID: ${result.id} added`)
});

// Make a REST Endpoint to save a message
exports.addMessage = functions.https.onRequest((req, res) => {
  const text = req.query.text;

  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.firestore().collection('messages').add({ message: text }).then((writeResult) => {

    // Send back a message that we've succesfully written the message
    return res.json({ result: `Message with ID: ${writeResult.id} added.` });
  });
});

function scrubMessage(message) {
  return (message || '').replace(/([F|f]uck)/, 'f&*#');
}

// Listen to DB updates and scrub them
exports.scrubContent = functions.firestore.document('/messages/{documentId}').onCreate((snap, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snap.data().message;
    const scrubbed = scrubMessage(original);
    console.log('Scrubbing', context.params.documentId, original, scrubbed);
    return snap.ref.set({ message: scrubbed }, { merge: true });
  });

// Listen to images upload and thumbnail it
exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  // Let's store all the data we need from the upload
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  const fileName = path.basename(filePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  return bucket.file(filePath).download({
    destination: tempFilePath,
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
  }).then(() => {
    console.log('Thumbnail created at', tempFilePath);
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    // Uploading the thumbnail.
    return bucket.upload(tempFilePath, {
      destination: thumbFilePath,
      metadata: metadata,
    });
    // Once the thumbnail has been uploaded delete the local file to free up disk space.
  }).then(() => fs.unlinkSync(tempFilePath));
});

