import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  collection,
  docData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  items$;
  items;
  gameOver = false;
  gameId: string = '';
  gameData: undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.params.subscribe((params: any) => {
      this.gameId = params.id;
    });
    this.items$ = docData(this.getDataGameRef(this.gameId));
    this.items = this.items$.subscribe((game: any) => {
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.player_imgages = game.player_imgages;
      this.game.stack = game.stack;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    });
  }

  ngOnInit(): void {
    this.newGame();
  }

  getDataGameRef(id: string) {
    return doc(collection(this.firestore, 'games'), id);
  }

  newGame() {
    this.game = new Game();
  }

  //nur ausführen wenn pickCardAnimation = false
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length; // Modulu
      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard !== undefined) {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.saveGame();
          console.log(this.game);
        }
      }, 1500);

      console.log(this.game.currentPlayer);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        // existiert die variable name und ist die länge > 0
        this.game.players.push(name); // dann push
        this.saveGame();
      }
      console.log(this.game.players);
    });
  }

  async saveGame() {
    await updateDoc(this.getDataGameRef(this.gameId), this.game.toJson());
  }
}
