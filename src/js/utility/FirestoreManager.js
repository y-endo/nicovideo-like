import { firestore } from '@/api/firebase';

class FirestoreManager {
  constructor() {
    this.isProcessing = false;
  }

  /**
   * 単体ドキュメント取得
   * @param {String} collection コレクション名
   * @param {String} id ドキュメントID
   */
  getDocument(collection, id) {
    return new Promise((resolve, reject) => {
      firestore
        .collection(collection)
        .doc(id)
        .get()
        .then(document => {
          resolve(document);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 複数ドキュメント取得
   * @param {String} collection コレクション名
   * @param {Object} options 検索オプション
   */
  getDocuments(collection, options = {}) {
    return new Promise((resolve, reject) => {
      const documents = [];
      let collectionRef = firestore.collection(collection);

      if (options.where) {
        options.where.forEach(where => {
          collectionRef = collectionRef.where(where.key, where.operator, where.value);
        });
      }

      if (options.orderBy) {
        collectionRef = collectionRef.orderBy(options.orderBy.key, options.orderBy.order);
      }

      if (options.limit) {
        collectionRef = collectionRef.limit(options.limit);
      }

      collectionRef
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(document => {
            documents.push(document);
          });

          resolve(documents);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * データの追加
   * @param {String} collection コレクション名
   * @param {String} id ドキュメントID
   * @param {Object} data 追加データ
   */
  addData(collection, id, data) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    return new Promise((resolve, reject) => {
      firestore
        .collection(collection)
        .doc(id)
        .set(data, { merge: true })
        .then(result => {
          this.isProcessing = false;
          resolve(result);
        })
        .catch(error => {
          this.isProcessing = false;
          reject(error);
        });
    });
  }
}

export default new FirestoreManager();
