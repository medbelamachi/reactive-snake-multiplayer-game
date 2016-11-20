import { Component, OnInit } from '@angular/core';
const Bacon = require('baconjs');
const _ = require('underscore');
import { Vector } from '../shared';


@Component({
  selector: 'snk-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {

  boardSize: Vector = new Vector(20, 10);
  snakePositions: Vector[] = [];
  fruitPosition: Vector = Vector.random(this.boardSize);
  initialSnakeDirection: Vector = new Vector(0, 1);
  initialSnakePosition: Vector = new Vector(0, 0);
  score = 0;
  initialSnakeLength = 3;

  constructor() {
    const snakeHeadPositions = this.snakeHeadPositions(this.inputStreams());
    const snakes = snakeHeadPositions.scan([], (snake, head) => {
      const biggerSnake = _.union(snake, [head]);
      const validSnake = _.last(biggerSnake, this.initialSnakeLength + this.score);
      return validSnake;
    });
    snakes.onValue(snake => this.snakePositions = snake);
  }


  inputStreams() {
    const ticks = Bacon.interval(100);
    const keys = Bacon.fromEvent(document.body, 'keyup').map('.keyCode');
    const lefts = keys.filter(key => key === 37);
    const rights = keys.filter(key => key === 39);
    return { ticks, lefts, rights };
  }

  snakeHeadPositions({ ticks, lefts, rights }) {
    const leftRotations = lefts.map(() => Vector.rotateLeft);
    const rightRotations = rights.map(() => Vector.rotateRight);
    const actions = leftRotations.merge(rightRotations);

    const directions = actions.scan(this.initialSnakeDirection, (dir, f) => f(dir));
    return directions
      .sampledBy(ticks)
      .scan(this.initialSnakePosition, (pos, dir) => pos.add(dir).mod(this.boardSize));
  }
  ngOnInit() {
    console.log('Hello Home');

  }

}
