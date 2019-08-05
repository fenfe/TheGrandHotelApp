import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomViewPage } from './room-view';

@NgModule({
  declarations: [
    RoomViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomViewPage),
  ],
})
export class RoomViewPageModule {}
