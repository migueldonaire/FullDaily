import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {User} from "../../object/bo/user";
import {DayHistory} from "../../object/bo/day-history";
import {Observable} from "rxjs";
import {DayHistorySaved} from "../../object/bo/day-history-saved";

@Injectable()
export class RequestDatabaseFirebaseProvider {
  items: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  allHistorys: Observable<any[]>;

  //eliminar items
  constructor(private db: AngularFireDatabase) {
    console.log('Hello RequestDatabaseFirebaseProvider Provider');
  }

  addNewUser(user: User): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.items = this.db.list('users');
        this.items.push(user).then(
          value => {
            resolve(value.key)
          }
        ).catch(
          error => {
            reject(error);
          }
        );
      });
  }

  getUser(user: User): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.db.list('users', {
          query: {
            orderByChild: 'email',
            equalTo: user.email,
            limitToFirst: 1
          }
        }).subscribe(
          (value: any) => resolve(value[0].$key),
          error => reject(error)
        );
      });
  }

  addHistory(dayHistory: DayHistory, keyUser: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.db.list('history/' + keyUser + '/' + dayHistory.date).push(dayHistory).then(
          value => {
            resolve(value.key)
          }
        ).catch(
          error => {
            reject(error);
          }
        );
      });
  }

  getAllHistorys(keyUser: string, lastKey:string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.db.list('history/' + keyUser, {
          query: {
            limitToLast: 4,
            orderByKey: true,
            endAt: lastKey
          }
        }).subscribe(
          (value: any) => {
            let list: DayHistory[] = [];

            if( lastKey ){
              value.pop();
            }

            for (let index = value.length-1; index>=0; index--) {
              this.db.list('history/' + keyUser + '/' + value[index].$key, {
                query: {
                  orderByKey: true
                }
              }).subscribe(
                (value2: any) => {
                  for (let index2 = 0; index2 < value2.length; index2++) {
                    let dayHistory = new DayHistorySaved(value2[index2].name, value2[index2].date, value2[index2].location, value2[index2].type, value2[index2].content, value2[index2].$key);
                    list.push(dayHistory);
                  }
                },
                error => reject(error)
              );
              resolve(list);
            }
          },
          error => reject(error)
        );
      });
  }
}
