import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LandhomePage} from '../landhome/landhome';
/**
 * Generated class for the CreateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createprofile',
  templateUrl: 'createprofile.html',
})
export class CreateprofilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateprofilePage');
  }
//gohome
gohome(){
  this.navCtrl.push(LandhomePage);
}
}
