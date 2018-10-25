# ws-project-manager
Workshop to develop quickly a full fledged on top of Google Firebase

## Setup Instrutions

1. Install latest node v10 (Currently 10.9.0), alternatively, run `nvm install && nvm use` if you have nvm installed.
2. Clone this repo, checkout the master branch
3. Go to the `project-manager` folder and `npm install & npm run build`
    - Feel free to explore the demo using `npm run serve`
4. Register in https://firebase.google.com/
5. Make the setup to upload files to the hosting server:
    - Install latest node v10 (Currently 10.9.0), alternatively, run `nvm install && nvm use` if you have nvm installed.
    - Install firebase tools: `npm install -g firebase-tools`
    - Run `firebase login`
    - Run `firebase init`
        - Select Firestore, Functions, Hosting & Storage
        - Select or create a project
        - Use default options for the config (firestore.rules, firestore.indexes.json, JavaScript, Yes, Yes, Public, Yes, storage.rules)
    - To test setup, run `firebase deploy`, you should be able to deploy demo app.

## FE composition

The FE application is made using vue-cli. You can run `vue ui` inside the `project-manager` to see more information about the FE application, control dependencies, and see build analytics.

For code styling & linting it uses the `standard` style.

To expedite development, we will be using `vuetify` as components framework.

The following commands should help you with it:

- Compiles and hot-reloads for development
```
npm run serve
```

- Compiles and minifies for production
```
npm run build
```

- Lints and fixes files
```
npm run lint
```

## Navigating the workshop

When studying the workshop you can follow the branches to see the progress in a step-by-step manner. Start from `master` which holds the building blocks anc configuration, and then follow the numbered branches.
