import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { HomePage } from '../home/home';
import { LoginmodalPage } from '../loginmodal/loginmodal';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandhomePage');
  }
  logout(): void {

    this.authService.logoutUser().then(() => {
      this.navCtrl.push(LoginmodalPage);
     
    });
  }
}
