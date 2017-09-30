import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraServiceProvider {

  constructor(private camera: Camera) {
    console.log('Hello CameraServiceProvider Provider');
  }

  getImage():Promise<any>{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return new Promise(
      (resolve, reject) => {
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log(base64Image);
          resolve(imageData);
        }, (error) => {
          console.log(error);
          reject(error);
        });
      });
  }
}
