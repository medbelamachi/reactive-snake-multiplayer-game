import { Component, Input } from '@angular/core';
import { Vector } from '../shared';
const underscore = require('underscore');

@Component({
    selector: 'snk-board',
    templateUrl: './board.component.html'
})
export class BoardComponent {
    @Input() size: Vector;
    @Input() snakePositions: Vector[];
    @Input() fruitPosition: Vector;
    _ = underscore;
    constructor() { }

    getStyleObjectFromVector(x: Number, y: Number): any {

        const pos = new Vector(x, y);
        return {
            cell: true,
            snake: this.snakePositions.find(p => p.equals(pos)),
            fruit: this.fruitPosition.equals(pos)
        };
    }
}

