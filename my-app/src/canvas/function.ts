import setting from "./setting";

const { tetrominoes } = setting;

export function fieldInit(row: number, col: number): number[][] {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => 0)
  );
}

export function initColor(
  count: number,
  color: [number, number, number, number]
): Float32Array {
  return Float32Array.from(new Array(count).fill(null).flatMap(() => color));
}

export function rotate(matrix: number[][]): number[][] {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((_, j) => matrix[N - j][i]));
  return result;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomTetrominoName(): string {
  const sequence: string[] = ["I", "J", "L", "O", "S", "T", "Z"];
  const name = sequence[getRandomInt(0, sequence.length - 1)];
  return name;
}

export type Tetromino = {
  name: string;
  matrix: number[][];
  row: number;
  col: number;
};

export function getTetromino(name: string): Tetromino {
  const shape = tetrominoes[name as keyof typeof tetrominoes];
  const matrix = shape;
  const col = 5 - Math.ceil(matrix[0].length / 2);
  const row = name === "I" ? -2 : -1;
  return {
    name: name,
    matrix: matrix,
    row: row,
    col: col,
  };
}

export function isValidMove(
  gameField: (number | string)[][],
  tetrominoMatrix: number[][],
  tetrominoRow: number,
  tetrominoCol: number
): boolean {
  for (let matrixRow = 0; matrixRow < tetrominoMatrix.length; matrixRow++) {
    for (
      let matrixCol = 0;
      matrixCol < tetrominoMatrix[matrixRow].length;
      matrixCol++
    ) {
      const collisionCell =
        gameField[tetrominoRow + matrixRow] === undefined
          ? undefined
          : gameField[tetrominoRow + matrixRow][tetrominoCol + matrixCol];
      if (
        tetrominoMatrix[matrixRow][matrixCol] && //if it's 0, return true directly
        (tetrominoCol + matrixCol < 0 || //check exceed playfield left
          tetrominoCol + matrixCol >= gameField[0].length || //check exceed playfield right
          tetrominoRow + matrixRow >= gameField.length || //check exceed playfield bottom
          collisionCell) //check collision, if playfield cell is not 0, means trigger collision
      ) {
        return false;
      }
    }
  }
  return true;
}

export function generateDefaultData(): GameData {
  return {
    fps: 0,
    playfield: fieldInit(15, 10),
    score: 0,
    tetromino: getTetromino(getRandomTetrominoName()),
  };
}

export type GameData = {
  fps: number;
  playfield: (number | string)[][];
  score: number;
  tetromino: Tetromino;
};

export function toLeft(gameData: GameData): GameData {
  const { playfield, tetromino } = gameData;
  const nextCol = tetromino.col - 1;
  if (isValidMove(playfield, tetromino.matrix, tetromino.row, nextCol)) {
    const updateTetromino = { ...tetromino, col: nextCol };
    return { ...gameData, tetromino: updateTetromino };
  }
  return gameData;
}

export function toRight(gameData: GameData): GameData {
  const { playfield, tetromino } = gameData;
  const nextCol = tetromino.col + 1;
  if (isValidMove(playfield, tetromino.matrix, tetromino.row, nextCol)) {
    const updateTetromino = { ...tetromino, col: nextCol };
    return { ...gameData, tetromino: updateTetromino };
  }
  return gameData;
}

export function toRotate(gameData: GameData): GameData {
  const { playfield, tetromino } = gameData;
  const matrix = rotate(tetromino.matrix);
  if (isValidMove(playfield, matrix, tetromino.row, tetromino.col)) {
    const updateTetromino = { ...tetromino, matrix: matrix };
    return { ...gameData, tetromino: updateTetromino };
  }
  return gameData;
}

export function toDrop(gameData: GameData): {
  isValid: boolean;
  gameData: GameData;
} {
  const { playfield, tetromino } = gameData;
  const nextRow = tetromino.row + 1;
  if (!isValidMove(playfield, tetromino.matrix, nextRow, tetromino.col)) {
    return { isValid: false, gameData: gameData };
  } else {
    //isValid
    const updateTetromino = { ...tetromino, row: nextRow };
    return {
      isValid: true,
      gameData: { ...gameData, tetromino: updateTetromino },
    };
  }
}
