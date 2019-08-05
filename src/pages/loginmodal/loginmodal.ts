import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {RegistermodalPage} from '../registermodal/registermodal';
import {LandhomePage} from '../landhome/landhome';
/**
 * Generated class for the LoginmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginmodal',
  templateUrl: 'loginmodal.html',
})
export class LoginmodalPage {

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginmodalPage');
  }

//gohome
gohome(){
  this.navCtrl.push(LandhomePage);
}

//login modal
loginModal() {
  let loginModal = this.modalCtrl.create(LoginmodalPage);
  loginModal.present();
}

//create register modal
registerModal() {
  let registerModal = this.modalCtrl.create(RegistermodalPage);
  registerModal.present();
}
}
