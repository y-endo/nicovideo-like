import _firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from '@/constants/Config';

if (_firebase.apps.length === 0) {
  _firebase.initializeApp(FIREBASE_CONFIG);
}

export const firebase = _firebase;
export const firestore = _firebase.firestore();
