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
    RoomdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersUserProvider
  ]
})
export class AppModule {}
