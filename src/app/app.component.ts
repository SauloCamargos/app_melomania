import { UserProvider } from './../providers/user/user';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoaderPage } from '../pages/loader/loader';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoaderPage;

  pages: Array<{title: string, component: any,icon:any}>;
  user: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public menuController: MenuController,
    public userProvider: UserProvider,
    public events: Events
    ) {
    this.initializeApp();    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:"home" },
      { title: 'Extrato', component: "BalancesPage",icon:"list-box" },
      { title: 'List', component: ListPage,icon:"" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      this.menuController.swipeEnable(false)
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#1e68c1');
      // this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
      // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    });
  }

  ngOnInit(){
    this.user = this.authProvider.getUser();
    console.log('ngOnInit App');
    this.events.subscribe('menu:opened', () => {
      this.user = this.authProvider.getUser();
      this.getBalanceUser();     
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad App');
  }

  menuClosed() {
    this.events.publish('menu:closed');
  }

  menuOpened() {
      this.events.publish('menu:opened');
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



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
