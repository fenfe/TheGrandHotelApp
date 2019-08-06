import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the PaymentmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentmodal',
  templateUrl: 'paymentmodal.html',
})
export class PaymentmodalPage {
  db = firebase.firestore();
  payment = {
    
    name: '',
    surname: '',
    cardnumber: null,
    cvv: null,
    expiration: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.navParams);
  }

  

}
