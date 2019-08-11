import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { LandhomePage } from '../landhome/landhome';
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
  
  room = {} as Room;
  booking = {} as Booking;
  Payment = {
    cardHolderName: null,
    cardnumber: null,
    cvv: null,
    expiration: null
  }
  public loading 
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast: ToastController, private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log(this.navParams);
    this.booking = this.navParams.data.booking;
    console.log('booking info', this.booking)
    this.room = this.navParams.data.room;
    console.log('room info', this.room)
  }

  //temporary seko remove it if i forget
  gopay(){
    this.navCtrl.push(PaymentmodalPage)
  }
  gopayform(){
    if (
     !this.Payment.cardHolderName||
     !this.Payment.cardnumber||
      !this.Payment.cvv ||
      !this.Payment.expiration){
        this.toast.create({
          message: 'Please full all form fields.',
          duration: 2000
        }).present();
      } else {
        let date = new Date(this.booking.checkout); // past
        let expiary = new Date(this.Payment.expiration); // the future
        let day = 1000 *60 *60 *24;
        let diff = expiary.valueOf() - date.valueOf();
        let actual = Math.floor(diff/ day);
        if (actual < 0){
          this.toast.create({
            message: 'Payment invalid. Your card will expire before you reach your checkout.',
            duration: 3000
          }).present();
        } else{ 
          this.db.collection('Bookings').doc(this.booking.roomname + " " + this.booking.uid).collection('Payment').doc(this.Payment.cardHolderName).set(this.Payment).then(res => {
            this.loading = this.loadingCtrl.create({
              duration: 3000
             // dismissOnPageChange: true,
            });
            this.loading.present();

            const alert =  this.alertCtrl.create({
              title: 'Payment Confirmation',
              message: 'Thank you for your booking, looking forwward seeing you!',
           
              buttons: [
                { text: 'Cancel' },
                {
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.setRoot(LandhomePage);
                  }
                }
              ]
            });
             alert.present();
            //this.navCtrl.push(ConfirmedPage);
          }).catch(err => {
            this.toast.create({
              message: 'Something went wrong',
              duration: 3000
            }).present();
          })
        }
      }
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