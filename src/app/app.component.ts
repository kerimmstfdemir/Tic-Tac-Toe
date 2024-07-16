import { Component, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;
  statusMessage: string = "It's X's turn";
  score = { X: 0, O: 0 };
  showResetButton: boolean = false;
  showContinueBtn: boolean = false;

  updateStatus(status: string) {
    this.statusMessage = status;
    if (status.includes('X wins')) {
      this.score.X++;
      this.showContinueBtn = true;
    } else if (status.includes('O wins')) {
      this.score.O++;
      this.showContinueBtn = true;
    } else if (status.includes('Draw')) {
      this.showContinueBtn = true;
    }
  }

  resetGame() {
    window.location.reload();
  }

  continueGame() {
    this.showContinueBtn = false;
    this.boardComponent.resetBoard();
  }

  displayContinueButton() {
    this.showContinueBtn = true;
  }
}
