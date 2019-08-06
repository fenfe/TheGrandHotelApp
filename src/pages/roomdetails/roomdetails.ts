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
  room = {} as Room;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    console.log('data ', this.navParams);
    this.room = this.navParams.data;
    console.log('room dtaa ',   this.room );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
  }
gopay(){
  this.navCtrl.push(BookmodalPage)
}
}
export interface Room {
  name: string;
  type: string;
  image: string;
  features : [],
  price: number,
  highlights: [],
  amenities: [],
}