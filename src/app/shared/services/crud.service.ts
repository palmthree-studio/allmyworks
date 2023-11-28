import { Injectable, inject } from '@angular/core';
import { Database, ref, set, push, onValue, update, remove } from '@angular/fire/database';
import { Storage, ref as storageRef, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private database: Database = inject(Database);
  private storage: Storage = inject(Storage);

  constructor() { }

  async create(mode: 'set' | 'push', path: string, data: any): Promise<void> {
    const dbRef = ref(this.database, path);
    if (mode === 'set') {
      return set(dbRef, data);
    } else {
      const result = await push(dbRef, data);
      return;
    }
  }

  read(mode: 'object' | 'list', path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const dbRef = ref(this.database, path);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (mode === 'object') {
          resolve(data);
        } else if (mode === 'list') {
          resolve(data ? Object.values(data) : []);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  update(path: string, data: any): Promise<void> {
    const dbRef = ref(this.database, path);
    return update(dbRef, data);
  }

  delete(path: string): Promise<void> {
    const dbRef = ref(this.database, path);
    return remove(dbRef);
  }

  async uploadImage(fileName: string, file: File): Promise<string> {
    const ref = storageRef(this.storage, `images/${fileName}`);
    try {
      const snapshot = await uploadBytes(ref, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      throw error;
    }
  }

}
