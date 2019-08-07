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
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider) {
  this.user = firebase.auth().currentUser.uid
  console.log(this.user)
  this.authService.setUser(this.user);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandhomePage');
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
