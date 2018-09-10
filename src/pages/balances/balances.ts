import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the BalancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balances',
  templateUrl: 'balances.html',
})
export class BalancesPage implements OnInit {
  user: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public userProvider: UserProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancesPage');
  }

  ngOnInit(){
    this.user = this.authProvider.getUser();
    this.getBalanceUser();
    console.log('ngOnInit App');   

  }

    getBalanceUser(){
    if(this.user){
      if(this.user.access_token_moip){
        this.userProvider.getBalances(this.user.access_token_moip).subscribe(
          (response)=> {
            this.user.balances = response
            console.log(response)
          }
          )
      }
    }
  }

}
