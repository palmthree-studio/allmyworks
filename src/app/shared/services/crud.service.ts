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

  async uploadImage(portfolioID:string, fileName: string, file: string): Promise<string> {
    const image = this.base64ToFile(file, fileName);
    const ref = storageRef(this.storage, `${portfolioID}/images/${fileName}`);
    try {
      const snapshot = await uploadBytes(ref, image);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      throw error;
    }
  }

  private base64ToFile(base64:any, filename:string) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }

}
