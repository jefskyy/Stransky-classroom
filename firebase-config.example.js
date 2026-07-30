/**
 * Copy this file to firebase-config.js and replace the placeholder values with
 * the configuration shown in Firebase Console > Project settings > Your apps.
 *
 * The deployed firebase-config.js is browser-visible. Do not place server
 * credentials, service-account JSON, private keys, or third-party secret API
 * keys in this file.
 */
export const firebaseConfig = Object.freeze({
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "REPLACE_WITH_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://REPLACE_WITH_DATABASE_NAME.firebaseio.com/",
  projectId: "REPLACE_WITH_PROJECT_ID",
  storageBucket: "REPLACE_WITH_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID"
});
