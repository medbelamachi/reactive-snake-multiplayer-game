import { Component,Input } from '@angular/core';
import { Vector } from '../shared';

@Component({
    selector: 'snk-board',
    templateUrl: './board.component.html'
})
export class BoardComponent {
    @Input() size: Vector;
    constructor() {
    }
}
