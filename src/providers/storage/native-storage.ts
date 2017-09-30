import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {StorageService} from "./storage-service.interface";
import {Storage} from '@ionic/storage';

@Injectable()
export class NativeStorageServiceProvider implements StorageService {

  constructor(private storage: Storage) {
  }

  add(key: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.set(key, value)
        .then(
          () => resolve(value),
          error => reject(error)
        );
    });
  }

  get(key: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(
        ()=>{
          this.storage.get(key)
            .then(
              data => resolve(data),
              error => reject(error)
            );
        }
      );
    });
  }

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.remove(key)
        .then(
          () => resolve(true),
          error => reject(error)
        );
    });
  }


  clear(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.clear()
        .then(
          () => resolve(true),
          error => reject(error)
        );
    });
  }

}
