import { PaymentmodalPage } from './../paymentmodal/paymentmodal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
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
  db = firebase.firestore();
  // stores the room info
  room = {} as Room;
  // stores the form data
  Booking = {
    uid: null, 
    name: null, 
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

  userData;
  constructor(public navCtrl: NavController, public navParams: NavParams,private userProvider: ProvidersUserProvider,public loadCtrl: LoadingController,public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.room = this.navParams.data;
    this.Booking.roomname = this.room.name;
  this.Booking.uid = this.userProvider.getUser();
    //console.log(this.navParams);
    console.log('User id',this.userProvider.getUser());
    this.getProfile()
  }
gopayform(){
  this.navCtrl.push(PaymentmodalPage)
}
createBooking() {
  if (
    
  
    !this.Booking.checkin ||
    !this.Booking.checkout ||
    !this.Booking.adults
  ) { // CHECK IF INPUTS ARE EMPTY
    this.toastCtrl.create({
      message: 'All fields must be filled',
      duration: 3000
    }).present();
  } else {

    const start = new Date(this.Booking.checkin);
    const end = new Date(this.Booking.checkout);​​
    const days = 1000 * 60 * 60 * 24;
    const month = 1000 * 60;
    const diff = end.valueOf() - start.valueOf();
    const Verr = Math.floor(diff / days);
    if (Verr <= 0) { // CHECK IF THE DATE IS IN THE FUTURE
      this.toastCtrl.create({
        message: 'Pick a future date for check out',
        duration: 3000
      }).present();
    } else {
         {
        
            let StartDate = new Date(this.Booking.checkin);
            let EndDate = new Date(this.Booking.checkout);
          
            const days = 1000 * 60 * 60 * 24;
            const diff = EndDate.valueOf() - StartDate.valueOf();
            this.Booking.days = Math.floor(diff / days); // 2
          
            this.Booking.Totalprice = this.room.price * this.Booking.days * parseInt(this.Booking.adults); // 3
            console.log( 'tHE BOOKING INFO: ' ,this.Booking);
           
            this.Booking.dateBooked = Date(); 

              this.db.collection('Bookings').doc( this.Booking.roomname + this.userProvider.getUser().uid ).set(this.Booking).then(res => {
                this.toastCtrl.create({
                  message: 'Success',
                  duration: 3000
                }).present();
                this.navCtrl.push(PaymentmodalPage, {booking: this.Booking, room: this.navParams.data});
              }).catch(err => {
                this.toastCtrl.create({
                  message: 'Failed',
                  duration: 3000
                }).present();
              });
        }
    }
  }
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
        this.Booking.name = doc.data().fullName;
        this.Booking.email = doc.data().email;
        
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
}
export interface Room {
  name: string;
  description: string;
  image: string;
  features : [any],
  lastcreated: string;
  sleeps: any;
  price: number;
}