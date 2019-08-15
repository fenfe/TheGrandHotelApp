import { ViewroomsPage } from './../viewrooms/viewrooms';
import { Component } from '@angular/core';

import {RegistermodalPage} from '../registermodal/registermodal';
import {LandhomePage} from '../landhome/landhome';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams,LoadingController,
  Loading,
  AlertController ,ModalController} from 'ionic-angular';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
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
 loginForm: FormGroup;
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: ProvidersUserProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public modalCtrl : ModalController) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(ViewroomsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        duration: 1000
       // dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  resetpassword(){
    this.navCtrl.setRoot(ResetpasswordPage)
  }
//create register modal
registerModal() {
  let registerModal = this.modalCtrl.create(RegistermodalPage);
  registerModal.present();
}
}
