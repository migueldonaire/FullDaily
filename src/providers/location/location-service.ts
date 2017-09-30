import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Geolocation} from '@ionic-native/geolocation';
import {LocationInterface} from "./location-interface";
import {Errors} from "../../errors/Errors";
import {LocationData} from "../../object/bo/location-data";

@Injectable()
export class LocationServiceProvider implements LocationInterface {

  constructor(private geolocation: Geolocation) {
    console.log('Hello LocationServiceProvider Provider');
  }

  getCurrentPosition(): Promise<LocationData> {
    return new Promise(
      (resolve, reject) => {
        this.geolocation.getCurrentPosition().then((resp) => {
          let latitude: number = resp.coords.latitude;
          let longitude: number = resp.coords.longitude;
          resolve(new LocationData(latitude, longitude));
        }).catch((error) => {
          console.log('Error getting location', error);
          reject(new Errors.NotLocationPermission());
        });
      }
    );
  }

}
