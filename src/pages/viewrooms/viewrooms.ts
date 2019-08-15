import { UserinfoPage } from './../userinfo/userinfo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { RoomdetailsPage } from '../roomdetails/roomdetails';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
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
  user

userprofile = {};
personDetails = {
  image: '',
};
  public eventListRef: firebase.firestore.CollectionReference;
    constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.eventListRef = firebase
            .firestore()
            .collection(`/Room`);
        }
      });
    }
    ngOnInit() {
      this.user = firebase.auth().currentUser.uid
      console.log('Hey there user ID:',this.user)
      this.authService.setUser(this.user);
      
        let users = this.db.collection('userProfile');
        let query = users.where("uid", "==", this.authService.getUser());
        query.get().then(querySnapshot => {
          if (querySnapshot.empty !== true){
            console.log('Got data', querySnapshot);
            querySnapshot.forEach(doc => {
              
              this.userprofile = doc.data();
              this.personDetails.image = doc.data().image;
              console.log('Profile Document: ', this.userprofile)
            })
          } else {
            console.log('No data');
          }
          // dismiss the loading
        }).catch(err => {
          // catch any errors that occur with the query.
          console.log("Query Results: ", err);
        })

      this.db.collection('Room').get().then(res =>{
       res.forEach(doc =>{
         console.log( 'Room: ', doc.data());
  this.roomList.push(doc.data());
       })
      }).catch(err => {
        console.log('No data');
        
      })
      }
      viewprofile(){
        this.navCtrl.setRoot(UserinfoPage);
      }
      viewRoom(value){
        this.navCtrl.setRoot(RoomdetailsPage, value)
      }

      //modal
      

}
