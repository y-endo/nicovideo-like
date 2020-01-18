// utils/FirestoreManager.ts
/**
 * firebase/firestoreを使いやすくしたクラス
 * @packageDocumentation
 */

import { firestore } from '~/api/firebase';

interface GetDocumentsOption {
  where?: {
    key: string;
    operator: firebase.firestore.WhereFilterOp;
    value: any;
  }[];
  orderBy?: {
    key: string;
    order: 'desc' | 'asc';
  };
  limit?: number;
}

class FirestoreManager {
  private isProcessing: boolean;

  constructor() {
    this.isProcessing = false;
  }

  /**
   * 単体ドキュメント取得
   * @param collection コレクション名
   * @param id ドキュメントID
   */
  getDocument(collection: string, id: string): Promise<firebase.firestore.DocumentSnapshot> {
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
   * @param collection コレクション名
   * @param options 検索オプション
   */
  getDocuments(collection: string, options: GetDocumentsOption = {}): Promise<firebase.firestore.QueryDocumentSnapshot[]> {
    return new Promise((resolve, reject) => {
      const documents: firebase.firestore.QueryDocumentSnapshot[] = [];
      let collectionRef: firebase.firestore.CollectionReference | firebase.firestore.Query = firestore.collection(collection);

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
   * @param collection コレクション名
   * @param id ドキュメントID
   * @param data 追加データ
   */
  addData(collection: string, id: string, data: firebase.firestore.DocumentData): Promise<boolean> | void {
    if (this.isProcessing) return;
    this.isProcessing = true;

    return new Promise((resolve, reject) => {
      firestore
        .collection(collection)
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          this.isProcessing = false;
          resolve(true);
        })
        .catch(error => {
          this.isProcessing = false;
          reject(error);
        });
    });
  }
}

export default new FirestoreManager();
