import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/*
  Generated class for the UserProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProfileProvider {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
user
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

  getUser(){
    return this.user;
  }
  setUser(val){
    this.user = val;
    console.log('User form Provider', this.user);
  }
  updateName(fullName: string, cellNo: string, Dob: string, gender:string,image:string,uid:string): Promise<any> {
    return this.userProfile.update({ fullName, cellNo ,Dob,gender,image,uid});
  }
}
