import firebase from "firebase"

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

export const firebaseImpl = firebase.initializeApp(config)
export const firebaseDatabase = firebase.database()
