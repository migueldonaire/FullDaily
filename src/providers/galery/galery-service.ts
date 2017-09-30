import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Injectable()
export class GaleryServiceProvider {

  constructor(private imagePicker: ImagePicker) {
    console.log('Hello GaleryServiceProvider Provider');
  }

  getImage():Promise<any>{
    return new Promise(
      (resolve, reject) => {
        let options: ImagePickerOptions = {
          maximumImagesCount: 1,
          quality: 40,
          outputType: 1
        };

        this.imagePicker.getPictures(options).then((results) => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            resolve(results[i]);
          }
        }, (error) => {
          reject(error);
        });
      });
  }
}
