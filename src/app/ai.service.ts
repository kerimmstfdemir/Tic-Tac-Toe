import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() { }

  getBestMove(board: string[]): number {
    return this.minimax(board, 'O').index;
  }

  minimax(newBoard: string[], player: string): { index: number, score: number } {
    const emptyIndexes = this.getEmptyIndexes(newBoard);

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    if (this.checkWin(newBoard, 'X')) {
      return { index: -1, score: -10 };
    } else if (this.checkWin(newBoard, 'O')) {
      return { index: -1, score: 10 };
    } else if (emptyIndexes.length === 0) {
      return { index: -1, score: 0 };
    }

    interface Move {
      index: number;
      score: number;
    }

    const moves: Move[] = [];

    for (let i = 0; i < emptyIndexes.length; i++) {
      const move: Move = { index: emptyIndexes[i]!, score: 0 };
      newBoard[emptyIndexes[i]!] = player;

      if (player === 'O') {
        const result = this.minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = this.minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[emptyIndexes[i]!] = '';

      moves.push(move);
    }

    let bestMove: number = 0;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  getEmptyIndexes(board: string[]) {
    return board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null) as number[];
  }

  checkWin(board: string[], player: string): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  }
}
