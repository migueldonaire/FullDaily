import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {LocationInterface} from "./location-interface";
import {LocationData} from "../../object/bo/location-data";

@Injectable()
export class LocationStubServiceProvider implements LocationInterface {

  constructor() {
  }

  getCurrentPosition(): Promise<LocationData> {
    return new Promise(
      (resolve, reject) => {
        resolve(new LocationData(0,0));
      });
  }
}
