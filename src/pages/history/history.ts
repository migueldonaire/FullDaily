import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {CreateHistoryFromTextCuProvider} from "../../providers/interactor/create-history-from-text-cu";
import {DayHistory} from "../../object/bo/day-history";
import {TypeHistory} from "../../enum/type-history";
import {CreateHistoryFromCameraCuProvider} from "../../providers/interactor/create-history-from-camera-cu";
import {ImputMethod} from "../../enum/input-method";
import {CreateHistoryFromGaleryCuProvider} from "../../providers/interactor/create-history-from-galery-cu";
import {RequestDatabaseFirebaseProvider} from "../../providers/firebase/request-database-firebase";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  name:string="Sin nombre";
  type: TypeHistory = TypeHistory.TEXT;
  content: string = "";
  today: Date = new Date();
  imput: ImputMethod = ImputMethod.NOTHING;
  messageOk:string = "Historía añadida con éxito";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private createHistoryFromTextCu: CreateHistoryFromTextCuProvider,
              private CreateHistoryFromCameraCu: CreateHistoryFromCameraCuProvider,
              private CreateHistoryFromGaleryCu:CreateHistoryFromGaleryCuProvider,
              public toastCtrl: ToastController,
              private RequestDatabaseFirebase:RequestDatabaseFirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  addText() {
    let prompt = this.alertCtrl.create({
      title: this.name,
      message: "Qué te cuentas?",
      inputs: [
        {
          name: 'history',
          placeholder: 'Querido diario...'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            this.content = data.history;
            this.today = new Date();
            this.type = TypeHistory.TEXT;
            this.imput = ImputMethod.TEXT;
          }
        }
      ]
    });
    prompt.present();
  }

  changeName(){
    let prompt = this.alertCtrl.create({
      title: 'Cambia el títutlo',
      inputs: [
        {
          name: 'name',
          placeholder: this.name
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {
            this.name = data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  addCamera() {
    this.today = new Date();
    this.type = TypeHistory.IMAGE;
    this.imput = ImputMethod.CAMERA;
  }

  createHistory() {
    let dayHistory = new DayHistory(this.name, this.today.getTime(), null, this.type, this.content);
    console.log(dayHistory);
    switch(this.imput) {
      case ImputMethod.TEXT:
        this.createHistoryFromTextCu.execute(dayHistory).then(
          value => {
            this.presentToast(this.messageOk);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        this.imput = ImputMethod.NOTHING;
        this.content = "";
        break;
      case ImputMethod.CAMERA:
        this.CreateHistoryFromCameraCu.execute(dayHistory).then(
          value => {
            console.log(value);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        this.imput = ImputMethod.NOTHING;
        this.content = "";
        break;
      case ImputMethod.GALERY:
        this.CreateHistoryFromGaleryCu.execute(dayHistory).then(
          value => {
            console.log(value);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        this.imput = ImputMethod.NOTHING;
        this.content = "";
        break;
    }
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
