import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import firebaseConfig from './firebase-config.json';

const fire = firebase.initializeApp(firebaseConfig);
export const firebaseRef = firebase;