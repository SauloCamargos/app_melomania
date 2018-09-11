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
  recordsList: any[];
loadingRecords: boolean;
configPaginator: boolean;
  constructor(
    public navCtrl: NavController, 
    private contestProvider: ContestProvider,
    public navParams: NavParams) {

  }

  ngOnInit(){
    this.lottery = this.navParams.get('lottery');
    this.getRecords({qtd: 12});
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

  getRecords(data, callback = null) {
    const $this = this;
    if(!data.append){
      this.recordsList = [];
      this.loadingRecords = true;
    }
    // const pageGet = (data.page) ? data.page : 1;
    // const qtd = (data.qtd) ? data.qtd : undefined;   
    data.id = this.lottery.contest.id; 
    data.user_id = 1; 
    this.contestProvider.getRecordsUser(data).subscribe(response => {
        this.configPaginator = response;
        if(!data.append){          
          this.recordsList = response.data;
        }else{
          response.data.forEach(element => {
            $this.recordsList.push(element)
          });
        }
        this.loadingRecords = false;
        if(typeof  callback === "function" ){
          callback(true);
        }
    });
  }
}
