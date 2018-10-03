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
  formAccountMoip: FormGroup
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
    this.formAccountMoip = this.formBuilder.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      taxDocumentNumber: [null, Validators.required],
    });
  }

  goToNext(){
    console.log("Next")
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

}
