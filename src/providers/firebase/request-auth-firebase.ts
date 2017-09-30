import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {UserCredentials} from "../../object/bo/user-credentials";
import {Errors} from "../../errors/Errors";

import * as firebase from 'firebase/app';
import {User} from "../../object/bo/user";

@Injectable()
export class RequestAuthFirebaseProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello RequestAuthFirebaseProvider Provider');
  }

  signUpWithEmail(user: UserCredentials):Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then((res) =>
            resolve(new User(res.email)))
          .catch(
            (error:any)=> {
              switch(error.code) {
                case "auth/email-already-in-use":
                  reject(new Errors.EmailAlreadyExists());
                  break;
                case "auth/invalid-email":
                  reject(new Errors.InvalidEmail());
                  break;
                case "auth/weak-password":
                  reject(new Errors.WeakPassword());
                  break;
                default:
                  reject(new Errors.DefaultError());
                  break;
              }
            })
      });
  }

  signInWithEmail(user: UserCredentials):Promise<any> {
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      user.password
    );
    return new Promise(
      (resolve, reject) => {
        this.afAuth.auth.signInWithCredential(credential)
          .then((res:firebase.User) => resolve(true))
          .catch(
            (error:any)=> {
              switch(error.code) {
                case "auth/user-disabled":
                  reject(new Errors.Userdisabled());
                  break;
                case "auth/user-not-found":
                  reject(new Errors.UserNotFound());
                  break;
                case "auth/wrong-password":
                  reject(new Errors.WrongPassword());
                  break;
                default:
                  reject(new Errors.DefaultError());
                  break;
              }
            })
      });
  }

  signOut():Promise<boolean>{
    return new Promise(
      (resolve, reject) => {
        this.afAuth.auth.signOut()
          .then((res) => resolve(true))
          .catch(
            (error:any)=> {
              switch(error.code) {
                default:
                  reject(new Errors.DefaultError());
                  break;
              }
            })
      });
  }
}
