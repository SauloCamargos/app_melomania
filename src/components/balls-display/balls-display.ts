import { Component, Output, Input, EventEmitter, OnInit, OnChanges } from '@angular/core';

/**
 * Generated class for the BallsDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'balls-display',
  templateUrl: 'balls-display.html'
})
export class BallsDisplayComponent implements OnInit, OnChanges {

  @Input() balls: any[];
  ballsHandler: any[];
  @Output() saveList = new EventEmitter();
  @Output() cancelList = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.renderArrayBalls();
  }

  ngOnChanges() {
    console.log('teste')
    this.renderArrayBalls();
  }

  renderArrayBalls() {
    if (typeof this.balls === 'string') {
      this.balls = JSON.parse(this.balls);
    }
    if(!this.balls){
      this.balls = [];
    }
    const arrayAux = [];
    let status;
    for (let index = 1; index <= 100; index++) {
      if (this.balls) {
        status = (this.balls.indexOf(index) > -1) ? true : false;
      } else {
        status = false;
      }
      const element = {
        id: index,
        active: status
      };
      arrayAux.push(element);
    }
    this.ballsHandler = arrayAux;
  }

  toggleStatus(index) {
    this.ballsHandler[index].active = !this.ballsHandler[index].active;
  }

  confirmList() {
    const returnList = [];
    this.ballsHandler.forEach((element) => {
      if (element.active) {
        returnList.push(parseInt(element.id));
      }
    });
    this.saveList.emit(returnList.join(','));
  }

  cancelEvent() {
    this.cancelList.emit(true);
  }
}