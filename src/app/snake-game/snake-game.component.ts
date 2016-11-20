import { Component, OnInit } from '@angular/core';
const Bacon = require('baconjs');

import { Vector } from '../shared';


@Component({
  selector: 'snk-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {
  public vector: Vector = new Vector(20, 20);
  constructor() {
  }

  inputStreams() {
  }

  ngOnInit() {
    console.log('Hello Home');

  }

}
