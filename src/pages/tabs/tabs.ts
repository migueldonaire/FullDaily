import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListHistorysPage} from "../list-historys/list-historys";
import {HistoryPage} from "../history/history";
import {SearchPage} from "../search/search";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HistoryPage;
  tab2Root = ListHistorysPage;
  tab3Root = SearchPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
