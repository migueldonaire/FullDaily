import {LocationData} from "./location-data";
import {TypeHistory} from "../../enum/type-history";
import {DayHistory} from "./day-history";
/**
 * Created by miguel on 01/10/2017.
 */
export class DayHistorySaved extends DayHistory{
  constructor(readonly name:string, readonly date:number, readonly location:LocationData, readonly type:TypeHistory, readonly content:string, readonly $key?:string){
    super(name,date,location,type,content);
  }
}
