import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { LoginmodalPage } from '../loginmodal/loginmodal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  public resetPasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: ProvidersUserProvider, private alertCtrl: AlertController,
    private formBuilder: FormBuilder,) {

      this.resetPasswordForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }
  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:',
        resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
               this.navCtrl.setRoot(LoginmodalPage)
                }
              }
            ]
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await errorAlert.present();
        }
      );
    }
  }
}
