import { Component, ViewChild } from '@angular/core';
import {  IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { RegistermodalPage } from '../registermodal/registermodal';
import {LoginmodalPage} from '../loginmodal/loginmodal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slides') slides:Slides;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController ) {

  }

  // dummy array just for display
  onboardingSlides: any = [
    { image: '../../assets/imgs/5-stars.svg', title: 'Welcome', text: 'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque'},
    { image: '../../assets/imgs/food.svg', title: 'select', text: 'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque'},
    { image: '../../assets/imgs/shower', title: 'bath', text: 'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque'},
    { image: '../../assets/imgs/bed1.svg', title: 'food', text: 'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque'},
    { image: '../../assets/imgs/bed1.svg', title: 'food', text: 'Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque'}
    
  ]
//naviagte to next Slides
next(){
  this.slides.slideNext();
 /*  if(this.slides._activeIndex == 4) {
    this.navCtrl.setRoot(RegistermodalPage);
  } */
}


  //create register modal
  registerModal() {
    let registerModal = this.modalCtrl.create(RegistermodalPage);
    registerModal.present();
  }

  

}
