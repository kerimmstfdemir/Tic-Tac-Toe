import { Component, Output, EventEmitter } from '@angular/core';
import { AiService } from '../ai.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Output() statusChange = new EventEmitter<string>();
  @Output() gameOver = new EventEmitter<void>();
  board: string[] = ['', '', '', '', '', '', '', '', ''];
  currentPlayer: string = 'X';
  statusMessage: string = "It's X's turn";

  constructor(private aiService: AiService) {}

  makeMove(index: number) {
    if (this.board[index] === '' && !this.checkWin()) {
      this.board[index] = this.currentPlayer;
      if (this.checkWin()) {
        this.statusMessage = `${this.currentPlayer} wins!`;
        this.statusChange.emit(this.statusMessage);
        this.gameOver.emit();
        return;
      } else if (this.board.indexOf('') === -1) {
        this.statusMessage = 'Draw!';
        this.statusChange.emit(this.statusMessage);
        this.gameOver.emit();
        return;
      }

      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.statusMessage = `It's ${this.currentPlayer}'s turn`;
      this.statusChange.emit(this.statusMessage);

      if (this.currentPlayer === 'O') {
        const aiMove = this.aiService.getBestMove(this.board);
        this.board[aiMove] = this.currentPlayer;
        if (this.checkWin()) {
          this.statusMessage = `${this.currentPlayer} wins!`;
          this.statusChange.emit(this.statusMessage);
          this.gameOver.emit();
          return;
        } else if (this.board.indexOf('') === -1) {
          this.statusMessage = 'Draw!';
          this.statusChange.emit(this.statusMessage);
          this.gameOver.emit();
          return;
        }
        this.currentPlayer = 'X';
        this.statusMessage = `It's ${this.currentPlayer}'s turn`;
        this.statusChange.emit(this.statusMessage);
      }
    }
  }

  checkWin(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }
    return false;
  }

  resetBoard() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.statusMessage = "It's X's turn";
    this.statusChange.emit(this.statusMessage);
  }
}
