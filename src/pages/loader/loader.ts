import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatAccountMoipPage } from '../creat-account-moip/creat-account-moip';

/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoaderPage');
    setTimeout(() => {
      this.checkAuthentication()
    }, 1000);
  }

  checkAuthentication(){
    this.authProvider.check().subscribe((response)=>{
      if(response.user){
        // this.navCtrl.setRoot(HomePage);
        this.navCtrl.setRoot(CreatAccountMoipPage);
      }
    },
    (response) => {
      this.navCtrl.setRoot(LoginPage);
    }
    )

  }

}
