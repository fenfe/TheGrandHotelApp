import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Booking, PaymentmodalPage } from '../paymentmodal/paymentmodal';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import * as firebase from 'firebase';
import { BookmodalPage } from '../bookmodal/bookmodal';
/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  result           = '';
  characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  charactersLength;
  booking = {} as Booking;
  db = firebase.firestore();
  storeVal 
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private userProvider: ProvidersUserProvider,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }
​
  ionViewDidLoad() {
    console.log(this.navParams);
    this.booking = this.navParams.data.booking;
    console.log('booking info', this.booking)
    this.booking.uid = this.userProvider.getUser();
    //console.log(this.navParams);
    console.log('User id',this.userProvider.getUser());
    this.getProfile();
   
  }
  getRandomInt() {
    for( var i = 0; i < length; i++ ) {
      this.result += this.characters.charAt(Math.floor(Math.random() * this.charactersLength));
    }
    return this.result;
  }
  confirm(){
    this.db.collection('Bookings').doc( this.booking.roomname + this.userProvider.getUser() + " "+ this.getRandomInt() ).set(this.booking).then(res => {
          this.toastCtrl.create({
            message: 'Success',
            duration: 3000
          }).present();
          this.navCtrl.push(PaymentmodalPage, {booking: this.booking, room: this.navParams.data});
        }).catch(err => {
          this.toastCtrl.create({
            message: 'Failed',
            duration: 3000
          }).present();
        });
  }
  getProfile() {
 
    let load = this.loadCtrl.create({
      content: 'Please wait.',
      duration: 1000
    });
    load.present();
  
    let users = this.db.collection('userProfile');
    
    let query = users.where("uid", "==", this.userProvider.getUser());
    query.get().then(querySnapshot => {
     
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.booking.name = doc.data().fullName;
          this.booking.email = doc.data().email;
          
        })
      } else {
        console.log('No data');
      }
     
      load.dismiss();
    }).catch(err => {
    
      console.log("Query Results: ", err);
     
      load.dismiss();
    })
  }
  gopayform(){
    this.navCtrl.setRoot(BookmodalPage)
  }
}
export interface Booking  {
  uid: null, 
  name: null, 
  surname: null, 
  checkin: null, 
  checkout: null, 
  adults: null, 
  children: null,
  Totalprice: 0, 
  days: 0, 
  roomname: null,
email: null,
dateBooked : null
};
export interface Room {
  name: string;
  description: string;
  image: string;
  features : [any],
  lastcreated: string;
  sleeps: any;
  price: number;
}
