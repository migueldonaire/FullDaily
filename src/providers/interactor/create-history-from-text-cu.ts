import {Injectable, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {NativeStorageServiceProvider} from "../storage/native-storage";
import {DayHistory} from "../../object/bo/day-history";
import {RequestDatabaseFirebaseProvider} from "../firebase/request-database-firebase";
import {KeyStorage} from "../../enum/keys-storage";
import {LocationInterface} from "../location/location-interface";
import {LocationData} from "../../object/bo/location-data";

@Injectable()
export class CreateHistoryFromTextCuProvider {

  constructor(private requestDatabaseFirebase: RequestDatabaseFirebaseProvider,
              private nativeStorageService: NativeStorageServiceProvider,
              @Inject('LocationService') private locationService: LocationInterface) {
  }

  execute(dayHistory: DayHistory) {
    return new Promise(
      (resolve, reject) => {
        this.nativeStorageService.get(KeyStorage.USER_KEY.toString()).then(
          key => {
            this.locationService.getCurrentPosition().then(
              (location:LocationData)=>{
                let trueHistory=new DayHistory(dayHistory.name, dayHistory.date, location, dayHistory.type,dayHistory.content);
                this.requestDatabaseFirebase.addHistory(trueHistory, key).then(
                  value => {
                    resolve(value);
                  }
                ).catch(
                  error => {
                    reject(error);
                  }
                )
              }
            )
          }
        ).catch(
          error => {
            reject(error);
          }
        )
      });
  }
}
