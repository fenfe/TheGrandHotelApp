
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/*
  Generated class for the ProvidersUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersUserProvider {
  storage = firebase.storage().ref();
  profileImage ='';
  rooms;
  user;
  db = firebase.firestore();
  constructor( public camera: Camera, public toastCtrl: ToastController) {
    console.log('Hello UserProvider Provider');
  }
  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      if (res.user.uid){
        this.db.collection('userProfile').where('uid', '==', res.user.uid).get().then(snapshot => {
          snapshot.forEach(doc => {
            console.log('Makhe sibone',doc.data());

          })
         
        })
      
      }
    }, err => {
      console.log("Error: ", err);
      //this.error = err.message;
      console.log('Owner user signin error: ', err);
     
    })
  }
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getUser(){
    return this.user;
  }
  setUser(val){
    this.user = val;
    console.log('User form Provider', this.user);
  }
  uploadProfile(val){
    const profileImages = this.storage.child('User Name.jpg');
    const upload = profileImages.putString(val, 'data_url');
  }
  createProfile(val){
    const profile = this.db.collection('userProfile').add(val);

    profile.then( res => {
      this.toastCtrl.create({
        message: 'Profile Created',
        duration: 2000
      }).present();
    }, err => {
      this.toastCtrl.create({
        message: 'Profile creation Error. Try again later',
        duration: 2000
      }).present();
    })
  }
}
