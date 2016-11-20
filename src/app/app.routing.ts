import { RouterModule, Routes } from '@angular/router';

import { SnakeGameComponent } from './snake-game/snake-game.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: SnakeGameComponent },
  { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(routes);
