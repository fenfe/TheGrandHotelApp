import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import {LoginmodalPage} from '../loginmodal/loginmodal';
import {CreateprofilePage} from '../createprofile/createprofile';

@IonicPage()
@Component({
  selector: 'page-registermodal',
  templateUrl: 'registermodal.html',
})
export class RegistermodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public modalCtrl: ModalController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermodalPage');
  }

//gohome
gohome(){
  this.navCtrl.push(CreateprofilePage);
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
