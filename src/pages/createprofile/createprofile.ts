import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {LandhomePage} from '../landhome/landhome';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  user
  public userProfile: any;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profile= {
    uid: null,
    image: null,
    FullName: null,
    phone: null,
    gender: null,
    Dob: null
   
  } as Profile
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider, private profileService : UserProfileProvider,public toast: ToastController, public loadingCtrl: LoadingController,  public loading: LoadingController, public camera: Camera) {
  
  }

  ionViewDidLoad() {
    this.profileService.getUserProfile().get().then(userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      this.profile.uid = userProfileSnapshot.data().uid;
     // this.birthDate = userProfileSnapshot.data().birthDate;
     console.log('check',   this.userProfile  )
    });
  }
  async selectImage(){
    const option: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    await this.camera.getPicture(option).then( res => {
      console.log(res);
      const image = `data:image/jpeg;base64,${res}`;
      this.profile.image = image;
    }, err => {
      console.log("Something went wrong: ", err);
    })
  }
  createprofile()
  
  {
    if(
      !this.profile.FullName ||
      !this.profile.gender ||
      !this.profile.phone ||
      !this.profile.Dob
    ){
      this.toast.create({
        message: 'Please full all form fields.',
        duration: 2000
      }).present();
    }else{
      let load = this.loading.create({
        content: 'Please wait....',
        duration: 7000
      })
      let storageRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      let file = 'my-Profile-Pic/'+filename+'.jpg';
      const imageRef = storageRef.child(file);

    const upload = imageRef.putString(this.profile.image, 'data_url');
    upload.on('state_changed', snapshot => {
      let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (prog == 100){
      
      }
    },err => {
      console.log(err);
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('Room file Available at ', downloadURL);
        this.profile.image = downloadURL;
        console.log('Done');
        this.profileService.updateName(this.profile.FullName,this.profile.phone, this.profile.Dob,this.profile.gender, downloadURL);
       
        load.present().then(() =>{
          this.navCtrl.setRoot(LandhomePage)
        })
        load.dismiss();
      })
    })

     
    }


  }


//gohome

}
export interface Profile {
  uid: string;
  image?: string;
  FullName:string;
  email:string;
  phone: any;
  gender: string;
  Dob: string;
} 

