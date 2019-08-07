import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { RoomdetailsPage } from '../roomdetails/roomdetails';
/**
 * Generated class for the ViewroomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewrooms',
  templateUrl: 'viewrooms.html',
})
export class ViewroomsPage {
  db = firebase.firestore();
  roomList = [];
  r = {};
  public eventListRef: firebase.firestore.CollectionReference;
    constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams,) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.eventListRef = firebase
            .firestore()
            .collection(`/Room`);
        }
      });
    }
    ngOnInit() {
      this.db.collection('Room').get().then(res =>{
       res.forEach(doc =>{
         console.log( 'Room: ', doc.data());
  this.roomList.push(doc.data());
       })
      }).catch(err => {
        console.log('No data');
        
      })
      }
      viewRoom(value){
        this.navCtrl.push(RoomdetailsPage, value)
      }

      //modal
      

}
