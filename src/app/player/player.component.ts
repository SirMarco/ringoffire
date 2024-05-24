import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  @Input() name: any;
  @Input() playerActive: boolean = false;
}
