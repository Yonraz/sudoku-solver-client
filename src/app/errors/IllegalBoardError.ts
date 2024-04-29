export class IllegalBoardError extends Error {
  override message: string = 'Board is Illegal or unsolvable';
  constructor() {
    super();
  }
}
