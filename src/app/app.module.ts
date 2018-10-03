import { ComponentsModule } from './../components/components.module';
import { SettingsProvider } from './../providers/settings';
import { UserProvider } from './../providers/user/user';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderPage } from '../pages/loader/loader';
import { CrudProvider } from '../providers/crud';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { RefreshTokenInterceptor } from '../interceptors/refresh-token.interceptor';
import { ContestProvider } from '../providers/contest/contest';
import { LotteryProvider } from '../providers/lottery/lottery';
import { Camera } from '@ionic-native/camera';
import { RecordProvider } from '../providers/record/record';
import { CreatAccountMoipPage } from '../pages/creat-account-moip/creat-account-moip';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoaderPage,
    LoginPage,
    CreatAccountMoipPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoaderPage,    
    LoginPage,
    CreatAccountMoipPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    CrudProvider,
    SettingsProvider,
    UserProvider,
    AuthProvider,
    ContestProvider,
    LotteryProvider,
    RecordProvider
  ] 
})
export class AppModule {}
