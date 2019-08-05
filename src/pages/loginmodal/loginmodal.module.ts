import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginmodalPage } from './loginmodal';

@NgModule({
  declarations: [
    LoginmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginmodalPage),
  ],
})
export class LoginmodalPageModule {}
