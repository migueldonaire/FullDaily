import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {GetAllHistorysCuProvider} from "../../providers/interactor/get-all-historys-cu";
import {DayHistorySaved} from "../../object/bo/day-history-saved";
import {TypeHistory} from "../../enum/type-history";

@IonicPage()
@Component({
  selector: 'page-list-historys',
  templateUrl: 'list-historys.html',
})
export class ListHistorysPage {

  historys:DayHistorySaved[];
  lastKey:string = undefined;
  areMore:boolean = true;
  typeHistory:any=TypeHistory;

  constructor(public navCtrl: NavController, public navParams: NavParams, private getAllHistorysCu:GetAllHistorysCuProvider) {
    this.historys=new Array();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListHistorysPage');
    this.chargeHistorys(null);
  }

  chargeHistorys(infiniteScroll:any){
    if(this.historys.length>0){this.lastKey=this.historys[this.historys.length-1].$key};
    this.getAllHistorysCu.exexute(this.lastKey).then(
      value=>{
        console.log(value);
        this.historys = value;
        if(value.length==0){
          this.areMore=false;
          if(infiniteScroll!=null){ infiniteScroll.complete();}
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
