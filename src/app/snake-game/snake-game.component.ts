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
    const snakeEats = snakeHeadPositions.filter(snake => snake.equals(this.fruitPosition));
    snakeEats.onValue(() => { this.score ++  ; this.fruitPosition = Vector.random(this.boardSize);});
  }


  inputStreams() {
    const ticks = Bacon.interval(100);
    const keys = Bacon.fromEvent(document.body, 'keyup').map('.keyCode');
    const lefts = keys.filter(key => key === 37);
    const rights = keys.filter(key => key === 39);
    const up = keys.filter(key => key === 38);
    const down = keys.filter(key => key === 40);
    return { ticks, lefts, rights, up, down };
  }

  snakeHeadPositions({ ticks, lefts, rights, up, down }) {
    const leftRotations = lefts.map(() => Vector.rotateLeft);
    const rightRotations = rights.map(() => Vector.rotateRight);
    const upRotations = up.map(() => Vector.rotateUp);
    const downRotations = down.map(() => Vector.rotateDown);
    const actions1 = leftRotations.merge(rightRotations);
    const actions2 = upRotations.merge(downRotations);
    const actions = actions1.merge(actions2);

    const directions = actions.scan(this.initialSnakeDirection, (dir, f) => f(dir));
    return directions
      .sampledBy(ticks)
      .scan(this.initialSnakePosition, (pos, dir) => pos.add(dir).mod(this.boardSize));
  }
  ngOnInit() {
    console.log('Hello Home');

  }

}
