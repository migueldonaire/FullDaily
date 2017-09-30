import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {RequestAuthFirebaseProvider} from "../firebase/request-auth-firebase";
import {UserCredentials} from "../../object/bo/user-credentials";
import {RequestDatabaseFirebaseProvider} from "../firebase/request-database-firebase";
import {resolveDefinition} from "@angular/core/src/view/util";
import {NativeStorageServiceProvider} from "../storage/native-storage";
import {KeyStorage} from "../../enum/keys-storage";

@Injectable()
export class SignupwithEmailCuProvider {

  constructor(private requestAuthFirebase:RequestAuthFirebaseProvider,
              private requestDatabaseFirebase:RequestDatabaseFirebaseProvider,
              private nativeStorageService:NativeStorageServiceProvider) {
    console.log('Hello SignupwithEmailCuProvider Provider');
  }

  execute(user:UserCredentials):Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.requestAuthFirebase.signUpWithEmail(user).then(
          user=>{
            this.requestDatabaseFirebase.addNewUser(user).then(
              value=>{
                this.nativeStorageService.add(KeyStorage.USER_KEY.toString(), value).then(
                  value=>{
                    resolve(true);
                  }
                ).catch(
                  error=>{
                    reject(error);
                  }
                )
              }
            ).catch(
              error=>{
                console.log(error);
                reject(error);
              }
            );
          }
        ).catch(
          error=>{
            reject(error);
          }
        );
      }
    );
  }

}
