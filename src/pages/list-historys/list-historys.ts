import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {GetAllHistorysCuProvider} from "../../providers/interactor/get-all-historys-cu";
import {DayHistorySaved} from "../../object/bo/day-history-saved";

@IonicPage()
@Component({
  selector: 'page-list-historys',
  templateUrl: 'list-historys.html',
})
export class ListHistorysPage {

  historys:DayHistorySaved[]=[];
  lastKey:string = undefined;
  areMore:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private getAllHistorysCu:GetAllHistorysCuProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListHistorysPage');
    this.chargeHistorys(null);
  }

  chargeHistorys($event){
    if(this.historys.length>0){this.lastKey=this.historys[0].$key};
    this.getAllHistorysCu.exexute(this.lastKey).then(
      value=>{
        this.historys=value;
        if(this.historys.length==0){
          this.areMore=false;
        }else{
          this.areMore=true;
        }
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )

  }
}
