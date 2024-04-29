import { IllegalBoardError } from '../errors/IllegalBoardError';
import { SolverResponse } from '../types/solverTypes';
import { isLegalBoard, getLegalMoves } from '../utils/solverUtils';

export class Solver {
  isLoading = false;
  async trySolveAsync(givenBoard: number[][]): Promise<SolverResponse> {
    this.isLoading = true;
    return new Promise((resolve) => {
      try {
        if (!isLegalBoard(givenBoard)) throw new IllegalBoardError();
        const solved = this.solve(givenBoard);
        if (solved === null) throw new Error();
        const res = {
          board: solved ?? givenBoard,
          isSolved: solved != null,
          message: 'Sudoku solved successfully!',
        };
        resolve(res);
      } catch (err: any) {
        console.error(err);
        let message = 'Could not solve sudoku!';
        if (err instanceof IllegalBoardError) {
          message = err.message;
        }
        const res = {
          board: givenBoard,
          isSolved: false,
          message,
        };
        resolve(res);
      }
      this.isLoading = false;
    });
  }

  solve(board: number[][]): number[][] | null {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (board[row][col] === 0) {
          const moves = getLegalMoves(board, row, col);
          if (moves.length === 0) return null;
          for (let num of moves) {
            board[row][col] = num;
            const result = this.solve(board);
            if (result !== null) return result;
            board[row][col] = 0;
          }
          return null;
        }
      }
    }
    return board;
  }
}
