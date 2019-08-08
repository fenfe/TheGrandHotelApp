import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
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
    cellNo : ''
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService : ProvidersUserProvider,
    private alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
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
          console.log('Profile Document: ', this.userprofile)
        })
      } else {
        console.log('No data');
      }
      // dismiss the loading
    }).catch(err => {
      // catch any errors that occur with the query.
      console.log("Query Results: ", err);
    })
  }
  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      //subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.personDetails.fullName
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          }
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
}
