import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestAuthFirebaseProvider} from "../firebase/request-auth-firebase";
import {NativeStorageServiceProvider} from "../storage/native-storage";

@Injectable()
export class SignOutCuProvider {

  constructor(private requestAuthFirebase: RequestAuthFirebaseProvider,
              private nativeStorageService: NativeStorageServiceProvider) {
    console.log('Hello SignOutCuProvider Provider');
  }

  execute(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.requestAuthFirebase.signOut().then(
          value => {
            this.nativeStorageService.clear().then(
              value => {
                resolve(true);
              }
            ).catch(
              error => {
                reject(error);
              }
            )
          }
        );
      });
  }
}
