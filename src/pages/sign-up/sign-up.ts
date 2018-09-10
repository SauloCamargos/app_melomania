import { LoginPage } from './../login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  formSignUp: FormGroup;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private userProvider: UserProvider,
    public loadingCtrl: LoadingController
    ) {
    
       this.initForm();
  }

 
  ionViewDidLeave(){
    console.log('ionViewDidLeave SignUpPage');
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleBlackOpaque();
    this.statusBar.styleDefault();
    
  }

  presentErrorAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Ops!!!',
      subTitle: message,
      buttons: ['Fechar']
    });
    alert.present();
  }

  presentToastSuccess() {
    let toast = this.toastCtrl.create({
      message: 'Cadastro realizado com sucesso! Realize o login.',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  initForm(){
    this.formSignUp = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      status: [1, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]      
    });
  }

  onSubmit(){
    const loader = this.loadingCtrl.create({
      spinner: "circles",
      content: ""
    });
    loader.present();
    this.userProvider.create(this.formSignUp.value).subscribe((response)=>{
      console.log("Salvo com sucesso!")
      this.initForm();
      this.navCtrl.setRoot(LoginPage);
      this.presentToastSuccess();
      loader.dismiss()
    },(response)=>{
      console.log(response.error.errors)
      loader.dismiss()
      for (const key in response.error.errors) {
      console.log(response.error.errors[key])
      if(response.error.errors[key][0])
        this.presentErrorAlert(response.error.errors[key][0]);
        return;
      }
    });
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SignUpPage');
  }

}
