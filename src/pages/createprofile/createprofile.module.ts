import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateprofilePage } from './createprofile';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateprofilePage),
  
  ],
})
export class CreateprofilePageModule {}
