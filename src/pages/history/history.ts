import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {CreateHistoryFromTextCuProvider} from "../../providers/interactor/create-history-from-text-cu";
import {DayHistory} from "../../object/bo/day-history";
import {TypeHistory} from "../../enum/type-history";
import {CreateHistoryFromCameraCuProvider} from "../../providers/interactor/create-history-from-camera-cu";
import {ImputMethod} from "../../enum/input-method";
import {CreateHistoryFromGaleryCuProvider} from "../../providers/interactor/create-history-from-galery-cu";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  type: TypeHistory = TypeHistory.TEXT;
  content: string = "";
  today: Date = new Date();
  imput: ImputMethod = ImputMethod.NOTHING;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, private createHistoryFromTextCu: CreateHistoryFromTextCuProvider,
              private CreateHistoryFromCameraCu: CreateHistoryFromCameraCuProvider,
              private CreateHistoryFromGaleryCu:CreateHistoryFromGaleryCuProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  addText() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a pretty history",
      inputs: [
        {
          name: 'history',
          placeholder: 'History...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.content = data.history;
            this.today = new Date();
            this.type = TypeHistory.TEXT;
            this.imput = ImputMethod.TEXT;
            console.log('Saved clicked');
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
    let dayHistory = new DayHistory("Sin nombre", this.today.getMilliseconds(), null, this.type, this.content);
    switch(this.imput) {
      case ImputMethod.TEXT:
        this.createHistoryFromTextCu.execute(dayHistory).then(
          value => {
            console.log(value);
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        this.imput = ImputMethod.NOTHING;
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
        break;
    }
  }
}
