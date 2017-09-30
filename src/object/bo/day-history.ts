import {LocationData} from "./location-data";
import {TypeHistory} from "../../enum/type-history";
/**
 * Created by miguel on 30/09/2017.
 */

export class DayHistory{
  constructor(readonly name:string, readonly date:number, readonly location:LocationData, readonly type:TypeHistory, readonly content:string){}
}
