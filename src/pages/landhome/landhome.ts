import { UserinfoPage } from './../userinfo/userinfo';
import { ViewroomsPage } from './../viewrooms/viewrooms';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { HomePage } from '../home/home';
import { LoginmodalPage } from '../loginmodal/loginmodal';
import * as firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Generated class for the LandhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landhome',
  templateUrl: 'landhome.html',
})
export class LandhomePage {
user
db = firebase.firestore();
userprofile = {};
personDetails = {
  image: '',
};
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider) {

  

  }

  ionViewDidLoad() {
    this.user = firebase.auth().currentUser.uid
  console.log(this.user)
  this.authService.setUser(this.user);
  
    let users = this.db.collection('userProfile');
    let query = users.where("uid", "==", this.authService.getUser());
    query.get().then(querySnapshot => {
      if (querySnapshot.empty !== true){
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          
          this.userprofile = doc.data();
          this.personDetails.image = doc.data().image;
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
  logout(): void {

    this.authService.logoutUser().then(() => {
      this.navCtrl.push(LoginmodalPage);
     
    });
  }

  goview(){
    this.navCtrl.push(ViewroomsPage);
  }
  userInfo(){
    this.navCtrl.push(UserinfoPage);
  }
}
