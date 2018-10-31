const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
