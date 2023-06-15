import * as THREE from "three";

const iShape: number[][] = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const jShape: number[][] = [
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
];

const lShape: number[][] = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

const oShape: number[][] = [
  [1, 1],
  [1, 1],
];

const sShape: number[][] = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];

const tShape: number[][] = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
];

const zShape: number[][] = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];

type ExtrudeSettings = {
  steps: number;
  depth: number;
  bevelEnabled: boolean;
  bevelThickness: number;
  bevelSize: number;
  curveSegments: number;
};

type SettingConfig = {
  field: {
    col: number;
    row: number;
    gap: number;
    count: number;
    nodes: THREE.Vector3[];
    offsetX: number;
    offsetY: number;
  };
  colors: {
    I: Float32Array;
    O: Float32Array;
    T: Float32Array;
    S: Float32Array;
    Z: Float32Array;
    J: Float32Array;
    L: Float32Array;
  };
  tetrominoes: {
    I: number[][];
    J: number[][];
    L: number[][];
    O: number[][];
    S: number[][];
    T: number[][];
    Z: number[][];
  };
  geometry: {
    shape: THREE.Shape;
    extrudeSettings: ExtrudeSettings;
  };
};

const setting: SettingConfig = {
  field: {
    col: 10,
    row: 15,
    gap: 0,
    count: 150,
    nodes: getFieldNodes(15, 10, 0),
    offsetX: getOffset(10, 0),
    offsetY: getOffset(15, 0),
  },
  colors: {
    I: Float32Array.from(new THREE.Color().set("#00FFFF").toArray()),
    O: Float32Array.from(new THREE.Color().set("#FFFF00").toArray()),
    T: Float32Array.from(new THREE.Color().set("#800080").toArray()),
    S: Float32Array.from(new THREE.Color().set("#00FF00").toArray()),
    Z: Float32Array.from(new THREE.Color().set("#FF0000").toArray()),
    J: Float32Array.from(new THREE.Color().set("#0000FF").toArray()),
    L: Float32Array.from(new THREE.Color().set("#FF8000").toArray()),
  },
  tetrominoes: {
    I: iShape,
    J: jShape,
    L: lShape,
    O: oShape,
    S: sShape,
    T: tShape,
    Z: zShape,
  },
  geometry: createRoundedBoxData(1, 1, 1, 0.1, 5),
};

function getFieldNodes(row: number, col: number, gap: number): THREE.Vector3[] {
  const temp: THREE.Vector3[] = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      temp.push(
        new THREE.Vector3(j * (1 + gap) + 0.5, -i * (1 + gap) - 0.5, 0)
      );
    }
  }
  return temp;
}

function getOffset(count: number, gap: number): number {
  return (count + (count - 1) * gap) / 2;
}

function createRoundedBoxData(
  width: number,
  height: number,
  depth: number,
  radius: number,
  smoothness: number
): {
  shape: THREE.Shape;
  extrudeSettings: ExtrudeSettings;
} {
  const shape: THREE.Shape = createShape(width, height, radius);
  const eps: number = 0.00001;
  const extrudeSettings: ExtrudeSettings = {
    steps: 1,
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelThickness: radius,
    bevelSize: radius - eps,
    curveSegments: smoothness,
  };
  return { shape: shape, extrudeSettings: extrudeSettings };
}

function createShape(
  width: number,
  height: number,
  radius0: number
): THREE.Shape {
  const eps: number = 0.00001;
  const shape: THREE.Shape = new THREE.Shape();
  const radius: number = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(
    width - radius * 2,
    height - radius * 2,
    eps,
    Math.PI / 2,
    0,
    true
  );
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}

export default setting;
