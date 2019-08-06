import { PaymentmodalPage } from './../paymentmodal/paymentmodal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmodal',
  templateUrl: 'bookmodal.html',
})
export class BookmodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmodalPage');
  }
gopayform(){
  this.navCtrl.push(PaymentmodalPage)
}
}
