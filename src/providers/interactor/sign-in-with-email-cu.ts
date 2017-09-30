import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {UserCredentials} from "../../object/bo/user-credentials";
import {RequestAuthFirebaseProvider} from "../firebase/request-auth-firebase";
import {RequestDatabaseFirebaseProvider} from "../firebase/request-database-firebase";
import {NativeStorageServiceProvider} from "../storage/native-storage";
import {KeyStorage} from "../../enum/keys-storage";


@Injectable()
export class SignInWithEmailCuProvider {

  constructor(private requestAuthFirebase: RequestAuthFirebaseProvider,
              private requestDatabaseFirebase: RequestDatabaseFirebaseProvider,
              private nativeStorageService:NativeStorageServiceProvider) {}

  execute(user: UserCredentials): Promise < any > {
    return new Promise(
      (resolve, reject) => {
        this.requestAuthFirebase.signInWithEmail(user).then(
          value => {
            this.requestDatabaseFirebase.getUser(user).then(
              key=>{
                this.nativeStorageService.add(KeyStorage.USER_KEY.toString(), key).then(
                  value=>{
                    resolve(true);
                  }
                ).catch(
                  error=>{
                    reject(error);
                  }
                )
              }
            )
          }
        );

      });
  }
}
