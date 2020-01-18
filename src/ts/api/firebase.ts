// api/firebase.ts
/**
 * firebaseのAPIを返す
 * @packageDocumentation
 */

import _firebase from 'firebase/app';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from '~/constants/Config';

/**
 * firebaseの初期化
 */
if (_firebase.apps.length === 0) {
  _firebase.initializeApp(FIREBASE_CONFIG);
}

export const firebase = _firebase;
export const firestore = _firebase.firestore();
