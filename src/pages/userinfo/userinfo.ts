import { ViewroomsPage } from './../viewrooms/viewrooms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { LoginmodalPage } from '../loginmodal/loginmodal';
/**
 * Generated class for the UserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
  db = firebase.firestore();
  userprofile = {};
  personDetails = {
    image: '',
    fullName: '',
    Dob : '',
    cellNo : '',
    email : ''
  };
  bookings = [];
  data= false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService : ProvidersUserProvider,
    private alertCtrl: AlertController,
    private profileService : UserProfileProvider,
    public loadingCtrl: LoadingController ) {
  }
  
  ionViewDidLoad() {
    this.retrieveBooking();
    this.authService.getUser();
    console.log('yoh', this.authService.getUser())
    this.db.collection('userProfile').doc(this.authService.getUser()).collection('Bookings').get().then(snapshot => {
      console.log('check : ', snapshot);
      if (!snapshot.empty) {
        this.data = true;
        snapshot.forEach( doc => {
          console.log;

          this.bookings.push(doc.data());
      })
      }
    }).catch(err => {
      console.log('An error occured');
      this.data= false;
    })

    let users = this.db.collection('userProfile');
    let query = users.where("uid", "==", this.authService.getUser());
    query.get().then(querySnapshot => {
      if (querySnapshot.empty !== true){
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          
          this.userprofile = doc.data();
          this.personDetails.image = doc.data().image;
          this.personDetails.Dob =doc.data().Dob
          this.personDetails.fullName =doc.data().fullName
          this.personDetails.cellNo =doc.data().cellNo
          this.personDetails.email =doc.data().email
          console.log('Profile Document: ', this.userprofile)
        })
      } else {
        console.log('No data');
      }
    
    }).catch(err => {
    
      console.log("Query Results: ", err);
    })
  }
  gohome(){
    this.navCtrl.push(ViewroomsPage);
  }
  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
     // subHeader: 'Your first name & last name',
      title: 'Update your name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.personDetails.fullName
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
          this.profileService.updateFullName(data.fullName);
          }
        }
      ]
    });
    await alert.present();
  }

  async updateDob(): Promise<void> {
    const alert = await this.alertCtrl.create({
     // subHeader: 'Your first name & last name',
      title: 'Update your Date of Birth',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.personDetails.Dob
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
          //  this.profileService.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    await alert.present();
  }

  async updateCell(): Promise<void> {
    const alert = await this.alertCtrl.create({
     // subHeader: 'Your first name & last name',
      title: 'Update your cellNumber',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.personDetails.cellNo
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
          //  this.profileService.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
     // subHeader: 'Your first name & last name',
      title: 'Update your email',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.personDetails.email
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
          //  this.profileService.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    await alert.present();
  }
  retrieveBooking() {
    let users = this.db.collection('Bookings');
    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    
    console.log('User Bookings: ', this.authService.getUser());
    let query = users.where("uid", "==", this.authService.getUser());
    query.get().then(querySnapshot => {
     
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.bookings.push(doc.data());
          console.log('Booking Document: ', this.bookings)
       
        });
      } else {
      //  this.showComp = true;
        console.log('No Booking data');
      }
      // dismiss the loading
      load.dismiss();
    }).catch(err => {
      // catch any errors that occur with the query.
      console.log("Query Results: ", err);
      // dismiss the loading
      load.dismiss();
    });
  }
  logout(): void {

    this.authService.logoutUser().then(() => {
      this.navCtrl.push(LoginmodalPage);
     
    });
  }
}
