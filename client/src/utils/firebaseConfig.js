import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { toast } from 'react-toastify'

const config = {
  apiKey: "AIzaSyDf-i3-kecpDpJyG1uR-Jbf0fjXMPhO54U",
  authDomain: "construyo-coding-challenge.firebaseapp.com",
  databaseURL: "https://construyo-coding-challenge.firebaseio.com",
  projectId: "construyo-coding-challenge",
  storageBucket: "construyo-coding-challenge.appspot.com",
  messagingSenderId: "275103082078",
  appId: "1:275103082078:web:3d55c84dee230264"
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user) => {
  try{
    if (!user) return;
    const { uid} = user
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  }catch(error) {
    toast.error('wrong credentials, please try again')
    return error
  }
};

