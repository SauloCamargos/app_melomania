import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the CreatAccountMoipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'creat-account-moip',
  templateUrl: 'creat-account-moip.html'
})
export class CreatAccountMoipComponent implements OnInit {
  @ViewChild(Slides) slides: Slides;
  text: string;
  showSubmitButton: boolean = false;
  showPrevButton: boolean = false;
  // formsAccountMoip: FormGroup[]
  formsAccountMoip = []

  person: {
    name: string
    lastName: string
    birthDate: Date
    phone:{
      areaCode: string
      number:string
    },
    address : {
      street: string
      streetNumber: string
      district: string
      zipCode: string
      city: string
      state: string
    },
    taxDocument:{
      type:string
      number:string
    }
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    console.log('Hello CreatAccountMoipComponent Component');
    this.text = 'Hello World';
    
  }
  
  ngOnInit(){
    // this.slides.lockSwipes(true);
    this.initForm();
    setTimeout(()=>{
      this.checkIsEnd()
      this.checkIsBeginning()
    },1000)
  }

  initForm(){
    this.formsAccountMoip[0] = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      taxDocumentNumber: [null, Validators.required],
    });
  }

  goToNext(){
    console.log("Next")
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex > 0){
      if(!this.validateDataForm((currentIndex - 1))){
        return;
      }
    }
    
    this.slides.slideNext()
    this.checkIsEnd()
    this.checkIsBeginning()
    
  }
  
  goToPrevius(){
    console.log("Prev")
    this.slides.slidePrev()
    this.checkIsEnd()
    this.checkIsBeginning()
  }

  checkIsEnd(){
    if(this.slides.isEnd()){
      this.showSubmitButton = true;
    }else{
      this.showSubmitButton = false;
    }
  }
  
  checkIsBeginning(){
    if(this.slides.isBeginning()){
      this.showPrevButton = false;
    }else{
      this.showPrevButton = true;
    }
  }

  onSubmit(){
    console.log("Enviar os dados")
  }

  validateDataForm(indexValidate){
    // console.log(this.slides.getActiveIndex())
    console.log(this.formsAccountMoip[indexValidate].invalid)
    // if(this.formAccountMoip.valid){

    // }
  }


}
