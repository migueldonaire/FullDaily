export interface StorageService {

  add(key: string, value: string):Promise<any>;
  get(key:string):Promise<string>;
  remove(key:string):Promise<any>;
  clear():Promise<void>;
}
