import { firestore } from '@/api/firebase';

class FirestoreManager {
  constructor() {
    this.isAdding = false;
  }

  getData(id) {
    return new Promise((resolve, reject) => {
      firestore
        .collection('comments')
        .doc(id)
        .get()
        .then(document => {
          resolve(document.data());
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  addData(id, data) {
    if (this.isAdding) return;
    this.isAdding = true;

    return new Promise((resolve, reject) => {
      firestore
        .collection('comments')
        .doc(id)
        .set(data, { merge: true })
        .then(result => {
          this.isAdding = false;
          resolve(result);
        })
        .catch(error => {
          this.isAdding = false;
          reject(error);
        });
    });
  }
}

export default new FirestoreManager();
