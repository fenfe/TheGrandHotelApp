import { PaymentmodalPage } from './../pages/paymentmodal/paymentmodal';
import { BookmodalPage } from './../pages/bookmodal/bookmodal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegistermodalPage} from '../pages/registermodal/registermodal';
import {LoginmodalPage} from '../pages/loginmodal/loginmodal';
import {LandhomePage} from '../pages/landhome/landhome';
import {CreateprofilePage} from '../pages/createprofile/createprofile';
import { ProvidersUserProvider } from '../providers/providers-user/providers-user';
import { Camera } from "@ionic-native/camera";
import { ViewroomsPage } from '../pages/viewrooms/viewrooms';
import { RoomdetailsPage } from '../pages/roomdetails/roomdetails';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistermodalPage,
    LoginmodalPage,
    LandhomePage,
    CreateprofilePage,
    ViewroomsPage,
    RoomdetailsPage,
    BookmodalPage,
    PaymentmodalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistermodalPage,
    LoginmodalPage,
    LandhomePage,
    CreateprofilePage,
    ViewroomsPage,
    RoomdetailsPage,
    BookmodalPage,
    PaymentmodalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersUserProvider,
    Camera
  ]
})
export class AppModule {}
