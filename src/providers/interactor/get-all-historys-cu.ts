import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {NativeStorageServiceProvider} from "../storage/native-storage";
import {RequestDatabaseFirebaseProvider} from "../firebase/request-database-firebase";
import {KeyStorage} from "../../enum/keys-storage";

@Injectable()
export class GetAllHistorysCuProvider {

  constructor(private requestDatabaseFirebase: RequestDatabaseFirebaseProvider,
              private nativeStorageService: NativeStorageServiceProvider) {
    console.log('Hello GetAllHistorysCuProvider Provider');
  }

  exexute(lastKey:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.nativeStorageService.get(KeyStorage.USER_KEY.toString()).then(
          userKey => {
            this.requestDatabaseFirebase.getAllHistorys(userKey, lastKey).then(
              value => {
                resolve(value);
              }
            ).catch(
              error => {
                reject(error);
              }
            );
          }
        ).catch(
          error => {
            reject(error);
          }
        )
      }
    );
  }
}
