import { Component, ViewChild } from '@angular/core';
import { IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController, ModalController} from 'ionic-angular';
import {LoginmodalPage} from '../loginmodal/loginmodal';
import {CreateprofilePage} from '../createprofile/createprofile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { EmailValidator } from '../../validators/email';
@IonicPage()
@Component({
  selector: 'page-registermodal',
  templateUrl: 'registermodal.html',
})
export class RegistermodalPage {
  public signupForm: FormGroup;
  public loading: Loading;
  constructor(public nav: NavController, public authData: ProvidersUserProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public modalCtrl: ModalController) {
      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.nav.setRoot(CreateprofilePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
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

     
    }
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
