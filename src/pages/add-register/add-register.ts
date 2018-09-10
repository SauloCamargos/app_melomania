import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { RecordProvider } from './../../providers/record/record';
import { ContestProvider } from './../../providers/contest/contest';
import { Component, OnInit, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-register',
  templateUrl: 'add-register.html',
})
export class AddRegisterPage implements OnInit, OnChanges {

    contest: any;
    base64Image: any;
    lottery_selected: any;
  constructor(
    private camera: Camera,
    public navCtrl: NavController, 
    public contestProvider: ContestProvider,
    public navParams: NavParams,
    public recordProvider: RecordProvider,
    public authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) {

  }

  ngOnInit(){
      this.contest = this.navParams.get('contest');
      console.log(this.contest);
      this.getLotteries()
  }
  ngOnChanges(){
   if(this.contest){
   }
  
  }

  getLotteries(){
      console.log(this.contest);
    this.contestProvider.getLotteries(this.contest.id).subscribe((response)=>{
      this.contest.lotteries = response.data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRegisterPage');
  }

  takeImage(){
    const $this = this;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
      console.log(imageData)
      $this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
  }

  cancelResult(){

  }

  saveResult(e){
    if(!this.lottery_selected){
      this.presentAlert("Selecione um sorteio válido!")
      return;
    }
    if(!this.base64Image){
      this.presentAlert("Anexe a imagem da cartela!")
      return;
    }
    let listNumbers;
    if(typeof e === 'string'){
      listNumbers = e.split(',')
    }else{
      listNumbers = e
    }
    if(listNumbers.length <= this.lottery_selected.hit){
      this.presentAlert("Selecione "+(this.lottery_selected.hit+1)+" números para a cartela")
      return;
    }
    if(listNumbers.length >= (this.lottery_selected.hit+2)){
      this.presentAlert("Selecione apenas "+(this.lottery_selected.hit+1)+" números para a cartela")
      return;
    }

    listNumbers = JSON.stringify(listNumbers);
    const user_id = this.authProvider.getUser().id
    const lottery_id = this.lottery_selected.id
    const image = this.base64Image;
    const price = this.contest.price;
    const admin_tax = this.contest.admin_tax;
    const dataSend = {
      lottery_id: lottery_id,
      user_id: user_id,
      numbers: listNumbers,
      image: image,
      price: price,
      admin_tax: admin_tax,
      order_id: 1,
    };
    const $this = this;
     const loader = this.loadingCtrl.create({
      spinner: "dots",
      content: ""
    });
    loader.present();
    this.recordProvider.create(dataSend).subscribe((response)=>{

      let alert = this.alertCtrl.create({
        title: 'Muito bem',
        subTitle: "O seu registro foi adicionado com sucesso!",
        buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          $this.navCtrl.setRoot(HomePage)
        }
      }]
      });
      alert.present();
      loader.dismiss()
    },(response)=>{
      this.presentAlert("Erro ao inserir registro, tente novamente !")
      loader.dismiss()
    }
    );

  }

  presentAlert(subtitle) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
  

}
