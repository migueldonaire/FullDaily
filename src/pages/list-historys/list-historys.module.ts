import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListHistorysPage } from './list-historys';

@NgModule({
  declarations: [
    ListHistorysPage,
  ],
  imports: [
    IonicPageModule.forChild(ListHistorysPage),
  ],
})
export class ListHistorysPageModule {}
