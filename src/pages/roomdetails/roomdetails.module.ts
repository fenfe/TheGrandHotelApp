import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomdetailsPage } from './roomdetails';

@NgModule({
  declarations: [
    RoomdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomdetailsPage),
  ],
})
export class RoomdetailsPageModule {}
