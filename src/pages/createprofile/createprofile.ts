import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {LandhomePage} from '../landhome/landhome';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ProvidersUserProvider } from '../../providers/providers-user/providers-user';
import { UserProfileProvider } from '../../providers/user-profile/user-profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  //firstName: AbstractControl;
  profileForm : FormGroup;
  public userProfile: any;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  uid
  profile= {
    uid: null,
    image: null,
    FullName: null,
    phone: null,
    gender: null,
    Dob: null
   
  } as Profile
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : ProvidersUserProvider, private profileService : UserProfileProvider,public toast: ToastController, public loadingCtrl: LoadingController,  public loading: LoadingController, public camera: Camera,   private formBuilder: FormBuilder, private FormsModule:FormsModule, private reactiveformsmodule: ReactiveFormsModule) {
  this.uid = firebase.auth().currentUser.uid;
      this.profileService.setUser(this.uid)
      this.authService.setUser(this.uid)
  //form group validators
this.profileForm = this.formBuilder.group({
  firstName: new  FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)])),
  phone: new  FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
  Dob: new  FormControl('', Validators.required),
  gender: ['']
});
    
  }
  
   get FirstName(){
  return this.profileForm.get('firstName');
  }
  ionViewDidLoad() {


    let loader = this.loadingCtrl.create({
      content: "Getting you ready"
    })
    loader.present();
    this.profileService.getUserProfile().get().then(userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
     // this.profile.uid = this.profileService.getUser();
     // this.birthDate = userProfileSnapshot.data().birthDate;
     loader.dismiss();
     console.log('check',   this.userProfile  )
     console.log(this.uid)
     console.log( this.profile.uid)


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
     !this.profileForm.valid
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


        this.profileService.updateName(this.profile.FullName,this.profile.phone, this.profile.Dob,this.profile.gender, downloadURL, this.uid );
       
        load.present().then(() =>{
          this.navCtrl.setRoot(LandhomePage)
        })
        load.dismiss();
      })
    })

     
    }


  }
  validation_messages = {
    'firstName': [
      { type: 'required', message: 'Fullname is required.' },
      { type: 'minlength', message: 'Fullname must be at least 4 characters long.' },
      { type: 'maxlength', message: 'Fullname cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your name must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'phone': [
      { type: 'required', message: 'Cellnumber is required.' }
    ],
    
  };

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

