import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentmodalPage } from './paymentmodal';

@NgModule({
  declarations: [
    PaymentmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentmodalPage),
  ],
})
export class PaymentmodalPageModule {}
