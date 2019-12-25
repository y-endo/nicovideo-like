import { firestore } from '@/api/firebase';

class FirestoreManager {
  constructor() {
    this.isAdding = false;
  }

  /**
   * データ取得
   * @param {String} id ドキュメントID
   */
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

  /**
   * データの追加
   * @param {String} id ドキュメントID
   * @param {Object} data 追加データ
   */
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
