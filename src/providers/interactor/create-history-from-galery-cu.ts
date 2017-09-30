import {Injectable, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {RequestStorageFirebaseProvider} from "../firebase/request-storage-firebase";
import {DayHistory} from "../../object/bo/day-history";
import {NativeStorageServiceProvider} from "../storage/native-storage";
import {LocationInterface} from "../location/location-interface";
import {KeyStorage} from "../../enum/keys-storage";
import {LocationData} from "../../object/bo/location-data";
import {RequestDatabaseFirebaseProvider} from "../firebase/request-database-firebase";
import {GaleryServiceProvider} from "../galery/galery-service";

@Injectable()
export class CreateHistoryFromGaleryCuProvider {

  constructor(private GaleryService: GaleryServiceProvider,
              private requestStorageFirebase: RequestStorageFirebaseProvider,
              private requestDatabaseFirebase: RequestDatabaseFirebaseProvider,
              private nativeStorageService: NativeStorageServiceProvider,
              @Inject('LocationService') private locationService: LocationInterface) {
    console.log('Hello CreateHistoryFromGaleryCuProvider Provider');
  }

  execute(dayHistory: DayHistory): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.GaleryService.getImage().then(
          dateImage => {
            this.nativeStorageService.get(KeyStorage.USER_KEY.toString()).then(
              key => {
                this.locationService.getCurrentPosition().then(
                  (location: LocationData) => {
                    this.requestStorageFirebase.upImage(dayHistory.date.toString(), dateImage).then(
                      url => {
                        let trueHistory = new DayHistory(dayHistory.name, dayHistory.date, location, dayHistory.type, url);
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
                    ).catch(
                      error => {
                        reject(error);
                      }
                    )
                  }
                ).catch(
                  error => {
                    reject(error);
                  }
                )
              }
            ).catch(
              error => {
                reject(error);
              }
            )
          }
        )
      });
  }

}
