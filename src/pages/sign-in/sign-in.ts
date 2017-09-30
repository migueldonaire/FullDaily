import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {SignupwithEmailCuProvider} from "../../providers/interactor/signupwith-email-cu";
import {UserCredentials} from "../../object/bo/user-credentials";

import { ToastController } from 'ionic-angular';
import {SignInWithEmailCuProvider} from "../../providers/interactor/sign-in-with-email-cu";
import {HomePage} from "../home/home";
import {HistoryPage} from "../history/history";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  email:string = "miquel.donaire@uji.es";
  password:string= "contrasena";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private signupwithEmailCu:SignupwithEmailCuProvider, public toastCtrl: ToastController,
              private signInWithEmailCu:SignInWithEmailCuProvider, private app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signUp(){
    let user = new UserCredentials(this.email, this.password);
    this.signupwithEmailCu.execute(user).then(
      value=>{
        console.log(value);
        this.app.getRootNav().setRoot(HomePage);
      }
    ).catch(
      error=>{
        this.presentToast(error.message);
      }
    );

  }

  signIn(){
    let user = new UserCredentials(this.email, this.password);
    this.signInWithEmailCu.execute(user).then(
      value=>{
        this.app.getRootNav().setRoot(HistoryPage);
      }
    ).catch(
      error=>{
        this.presentToast(error.message);
      }
    );
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
