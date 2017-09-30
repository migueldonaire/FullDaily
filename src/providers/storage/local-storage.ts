import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {StorageService} from "./storage-service.interface";
import {Errors} from "../../errors/Errors";

@Injectable()
export class LocalStorageServiceProvider implements StorageService {

  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
  }

  add(key: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.localStorageSupported) {
        localStorage.setItem(key, value);
        resolve(value);
      } else {
        reject(new Errors.NotLocalStorage());
      }
    });
  }

  get (key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.localStorageSupported) {
        var item = localStorage.getItem(key);
        if (item == null) {
          reject(new Errors.DataNotExist());
        } else {
          resolve(item);
        }
      } else {
        reject(new Errors.NotLocalStorage());
      }
    });
  }

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.localStorageSupported) {
        localStorage.removeItem(key);
        resolve(true);
      } else {
        reject(new Errors.NotLocalStorage());
      }
    });
  }

  clear(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.localStorageSupported) {
        localStorage.clear();
        resolve(true);
      } else {
        reject(new Errors.NotLocalStorage());
      }
    });
  }
}
