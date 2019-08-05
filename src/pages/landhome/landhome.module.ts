import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandhomePage } from './landhome';

@NgModule({
  declarations: [
    LandhomePage,
  ],
  imports: [
    IonicPageModule.forChild(LandhomePage),
  ],
})
export class LandhomePageModule {}
