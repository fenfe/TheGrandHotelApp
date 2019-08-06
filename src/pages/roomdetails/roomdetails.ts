import { BookmodalPage } from './../bookmodal/bookmodal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the RoomdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roomdetails',
  templateUrl: 'roomdetails.html',
})
export class RoomdetailsPage {
  db = firebase.firestore();
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    console.log('View Hotel Params received: ', this.navParams);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
  }
gopay(){
  this.navCtrl.push(BookmodalPage)
}
}
