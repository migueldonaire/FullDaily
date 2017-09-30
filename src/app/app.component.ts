import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignOutCuProvider} from "../providers/interactor/sign-out-cu";
import { ToastController } from 'ionic-angular';
import {HistoryPage} from "../pages/history/history";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HistoryPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController,
              private signOutCu: SignOutCuProvider,public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  signOut() {
    this.signOutCu.execute().then(
      value=>{
        this.menuCtrl.close();
        this.nav.setRoot(SignInPage);
      }
    ).catch(
      error=>{
        this.presentToast(error.message);
      }
    )
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

