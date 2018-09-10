import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  formLogin: FormGroup
  constructor(    
    public platform: Platform, 
    public navParams: NavParams,
    public navCtrl: NavController, 
    private statusBar: StatusBar,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider
    ) {
  }

  ngOnInit(){
    this.initForm()
  }

  ionViewDidLoad() {
  
    console.log('ionViewDidLoad LoginPage'); 
  }  

  initForm(){
    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  goToSignUp(){
    this.navCtrl.push("SignUpPage");
  }

  onSubmit(){
    const loader = this.loadingCtrl.create({
      spinner: "dots",
      content: ""
    });
    loader.present();
    this.authProvider.login(this.formLogin.value).subscribe((response)=>{
      if(response.error != true){
        this.navCtrl.setRoot(HomePage)
      }
      loader.dismiss()
    },
    (response) => {
      loader.dismiss()
    }
    )
  }

}
