import { ContestProvider } from './../../providers/contest/contest';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest',
  templateUrl: 'contest.html',
})
export class ContestPage implements OnInit {
  lottery: any
  records: any[];
  constructor(
    public navCtrl: NavController, 
    private contestProvider: ContestProvider,
    public navParams: NavParams) {

  }

  ngOnInit(){
    this.lottery = this.navParams.get('lottery');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestPage');
  }

  
  addRegister() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    const $this = this;
    this.navCtrl.push('AddRegisterPage',{contest: $this.lottery.contest });
  }

  getRecords(){
    this.contestProvider.getRecordsUser().subscribe((response)=>{
      
    })
  }

}
