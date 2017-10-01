import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireModule } from "angularfire2";
import * as firebase from "firebase";

@Injectable()
export class RequestStorageFirebaseProvider {

  fileImg:string="img";
  videoImg:string="video";
  audioImg:string="audio";

  constructor() {
    console.log('Hello RequestStorageFirebaseProvider Provider');
  }

  upImage(key:string, data:any): Promise<any>{
    return new Promise( (resolve, reject)=>{

      let storageRef = firebase.storage().ref();

      let uploadTask:firebase.storage.UploadTask =
        storageRef.child(`${this.fileImg}/${key}`)
          .putString( data, 'base64', { contentType: 'image/jpeg' }  );


      uploadTask.on(  firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot )=>{},
        ( error )=> {
          console.log(error);
          reject(error);
        },
        ()=>{
          let url = uploadTask.snapshot.downloadURL;
          resolve(url);
        }
      )
    });
  }
}
