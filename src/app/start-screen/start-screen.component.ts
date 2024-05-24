import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}
  //.then wird nur einmal ausgerufen, subscribe mehrfach
  async newGame() {
    let game = new Game();
    await addDoc(this.getGameRef(), game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }
}
