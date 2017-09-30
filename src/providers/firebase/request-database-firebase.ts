import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {User} from "../../object/bo/user";
import {DayHistory} from "../../object/bo/day-history";

@Injectable()
export class RequestDatabaseFirebaseProvider {
  items: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;

  //eliminar items
  constructor(private db: AngularFireDatabase) {
    console.log('Hello RequestDatabaseFirebaseProvider Provider');
  }

  addNewUser(user:User):Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.items= this.db.list('users');
        this.items.push(user).then(
          value=>{resolve(value.key)}
        ).catch(
          error=>{
            reject(error);
          }
        );
      });
  }

  getUser(user:User):Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.db.list('users', {
          query: {
            orderByChild: 'email',
            equalTo: user.email,
            limitToFirst: 1
          }
        }).subscribe(
          (value:any)=>resolve(value[0].$key),
          error=>reject(error)
        );
      });
  }

  addHistory(dayHistory:DayHistory, keyUser:string){
    return new Promise(
      (resolve, reject) => {
        this.db.list('history/'+keyUser+'/'+dayHistory.date).push(dayHistory).then(
          value=>{resolve(value.key)}
        ).catch(
          error=>{
            reject(error);
          }
        );
      });
  }
}
