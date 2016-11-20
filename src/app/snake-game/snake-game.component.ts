import { Component, OnInit } from '@angular/core';
const Bacon = require('baconjs');

import { Vector } from '../shared';


@Component({
  selector: 'snk-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {

  boardSize: Vector = new Vector(20, 10);
  snakePositions: Vector[] = [new Vector(0, 0)];
  fruitPosition: Vector = Vector.random(this.boardSize);

  constructor() {
  }

  inputStreams() {
  }

  ngOnInit() {
    console.log('Hello Home');

  }

}
