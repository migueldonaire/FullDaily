import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {Http, HttpModule} from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupwithEmailCuProvider } from '../providers/interactor/signupwith-email-cu';
import { RequestAuthFirebaseProvider } from '../providers/firebase/request-auth-firebase';
import { SignInWithEmailCuProvider } from '../providers/interactor/sign-in-with-email-cu';
import { SignOutCuProvider } from '../providers/interactor/sign-out-cu';
import { RequestDatabaseFirebaseProvider } from '../providers/firebase/request-database-firebase';
import {HistoryPage} from "../pages/history/history";
import {Geolocation} from '@ionic-native/geolocation';
import {LocationServiceProvider} from "../providers/location/location-service";
import {LocationStubServiceProvider} from "../providers/location/location-stub-service";
import { CreateHistoryFromTextCuProvider } from '../providers/interactor/create-history-from-text-cu';
import {NativeStorageServiceProvider} from "../providers/storage/native-storage";
import {LocalStorageServiceProvider} from "../providers/storage/local-storage";

import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { CameraServiceProvider } from '../providers/camera/camera-service';
import { CreateHistoryFromCameraCuProvider } from '../providers/interactor/create-history-from-camera-cu';
import { RequestStorageFirebaseProvider } from '../providers/firebase/request-storage-firebase';
import { CreateHistoryFromGaleryCuProvider } from '../providers/interactor/create-history-from-galery-cu';
import { GaleryServiceProvider } from '../providers/galery/galery-service';

import { ImagePicker } from '@ionic-native/image-picker';

export const firebaseConfig = {
  apiKey: "AIzaSyDSTvOqqF1TvYzbOARf0qlBHKgDLsH-0AQ",
  authDomain: "fulldaily-9bf56.firebaseapp.com",
  databaseURL: "https://fulldaily-9bf56.firebaseio.com",
  projectId: "fulldaily-9bf56",
  storageBucket: "fulldaily-9bf56.appspot.com",
  messagingSenderId: "761765115572"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    HistoryPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [{provide: 'LocationService',useClass: LocationServiceProvider}],
    SignupwithEmailCuProvider,
    RequestAuthFirebaseProvider,
    SignInWithEmailCuProvider,
    SignOutCuProvider,
    RequestDatabaseFirebaseProvider,
    Geolocation,
    Camera,
    ImagePicker,
    LocationServiceProvider,
    LocationStubServiceProvider,
    CreateHistoryFromTextCuProvider,
    NativeStorageServiceProvider,
    LocalStorageServiceProvider,
    CameraServiceProvider,
    CreateHistoryFromCameraCuProvider,
    RequestStorageFirebaseProvider,
    CreateHistoryFromGaleryCuProvider,
    GaleryServiceProvider,
    CreateHistoryFromGaleryCuProvider
  ]
})
export class AppModule {}
