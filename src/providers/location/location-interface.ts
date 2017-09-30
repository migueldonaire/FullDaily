import {LocationData} from "../../object/bo/location-data";
export interface LocationInterface{
  getCurrentPosition():Promise<LocationData>;
}
