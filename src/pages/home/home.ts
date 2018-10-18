import { ContestPage } from './../contest/contest';
import { LotteryProvider } from './../../providers/lottery/lottery';
import { ContestProvider } from './../../providers/contest/contest';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  configPaginator: any;
  lotterysUpcoming:any;
  loadingUpcoming: boolean;
  infiniteScrollEvent: any;
  constructor(
    public navCtrl: NavController,
    public lotteryProvider: LotteryProvider,
    public contestProvider: ContestProvider
    ) {

  }

  ngOnInit() {
    this.getData({qtd: 6}); 
  }

  getData(data, callback = null) {
    const $this = this;
    if(!data.append){
      this.lotterysUpcoming = [];
      this.loadingUpcoming = true;
    }
    // const pageGet = (data.page) ? data.page : 1;
    // const qtd = (data.qtd) ? data.qtd : undefined;    
    this.lotteryProvider.getUpcoming(data).subscribe(response => {
        this.configPaginator = response;
        if(!data.append){          
          this.lotterysUpcoming = response.data;
        }else{
          response.data.forEach(element => {
            $this.lotterysUpcoming.push(element)
          });
        }
        this.loadingUpcoming = false;
        if(typeof  callback === "function" ){
          callback(true);
        }
    });
  }

  doRefresh(refresher) {
    const $this = this;
    // console.log('Begin async operation', refresher);
    this.lotterysUpcoming = [];
    this.getData({qtd: 6,append: true}, ()=>{
      if($this.infiniteScrollEvent){
        $this.infiniteScrollEvent.enable(true)
      }
      refresher.complete();
    }); 
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    // }, 2000);
  }

  doInfinite(event){
    this.infiniteScrollEvent = event;
    if(this.configPaginator.current_page === this.configPaginator.last_page){
      event.complete()
      event.enable(false)
    }
    if(this.configPaginator.current_page < this.configPaginator.last_page){
      const page = this.configPaginator.current_page + 1
      const qtd = parseInt(this.configPaginator.per_page);
      this.getData({
        append: true,
        page: page,
        qtd: qtd
      }, ()=>{
        event.complete()
        if(this.configPaginator.current_page === this.configPaginator.last_page){
          event.enable(false)
        }
      })
    }
    
  }

  openContest(index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    const $this = this;
    this.navCtrl.push('ContestPage',{lottery: $this.lotterysUpcoming[index] });
  }
 
}
