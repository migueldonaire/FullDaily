import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RequestDatabaseFirebaseProvider} from "../../providers/firebase/request-database-firebase";
import {User} from "../../object/bo/user";
import {CameraServiceProvider} from "../../providers/camera/camera-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  list:string[]=["angola", "etiopía", "china"];

  constructor(private cameraServiceProvider:CameraServiceProvider) {
  }

}
