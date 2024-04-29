export function isLegalBoard(board: number[][]) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      let num = board[row][col];
      if (
        num !== 0 &&
        isInRow(board, num, row, col) &&
        isInCol(board, num, row, col) &&
        isInBlock(board, num, row, col)
      )
        return false;
    }
  }
  return true;
}

function isInCol(
  board: number[][],
  num: number,
  originalRow: number,
  col: number
) {
  for (let row = 0; row < board.length; row++) {
    if (originalRow !== row && board[row][col] === num) return true;
  }
  return false;
}

function isInRow(
  board: number[][],
  num: number,
  row: number,
  originalCol: number
) {
  for (let col = 0; col < board[row].length; col++) {
    if (col !== originalCol && board[row][col] === num) return true;
  }
  return false;
}

function isInBlock(board: number[][], num: number, row: number, col: number) {
  const floorRow = Math.floor(row / 3) * 3;
  const floorCol = Math.floor(col / 3) * 3;
  for (let i = floorRow; i < floorRow + 3; i++) {
    for (let j = floorCol; j < floorCol + 3; j++) {
      if (i !== row && j !== col && board[i][j] === num) return true;
    }
  }
  return false;
}

export function getLegalMoves(
  board: number[][],
  row: number,
  col: number
): number[] {
  const nums: Record<number, boolean> = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  board[row].forEach((num) => {
    if (nums[num]) {
      delete nums[num];
    }
  });
  for (let i = 0; i < board.length; i++) {
    let num = board[i][col];
    if (nums[num]) {
      delete nums[num];
    }
  }
  const floorRow = Math.floor(row / 3) * 3;
  const floorCol = Math.floor(col / 3) * 3;
  for (let i = floorRow; i < floorRow + 3; i++) {
    for (let j = floorCol; j < floorCol + 3; j++) {
      let num = board[i][j];
      if (nums[num]) {
        delete nums[num];
      }
    }
  }
  return Object.keys(nums).map((n) => parseInt(n));
}
