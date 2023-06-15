import * as THREE from "three";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import setting from "./setting";
import {
  Tetromino,
  generateDefaultData,
  initColor,
  toLeft,
  toRight,
  toRotate,
} from "./function";
import { useFrame } from "@react-three/fiber";
import useKeyboardControls from "./useKeyboardControls";

const {
  field: { nodes, offsetX, offsetY },
  geometry,
  colors,
} = setting;

type PlayfieldProps = {
  gameStart: boolean;
  gameReset: boolean;
  handleGameOver: () => void;
};

export const Playfield: React.FC<PlayfieldProps> = ({
  gameStart,
  gameReset,
  handleGameOver,
}) => {
  const ref =
    useRef<THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material>>(null);
  const gameData = useRef(generateDefaultData());
  const movement = useKeyboardControls(); //keyboard events
  const [init, setInit] = useState<boolean>(false); //everything wait useLayoutEffect complete

  useLayoutEffect(() => {
    if (init) return;
    nodes.forEach((element, index) => {
      const dummy: THREE.Object3D = new THREE.Object3D();
      dummy.position.set(element.x, element.y, element.z);
      dummy.updateMatrix();
      if (ref.current) {
        ref.current.setMatrixAt(index, dummy.matrix);
      }
    });
    if (ref.current) {
      ref.current.instanceMatrix.needsUpdate = true;
    }
    setInit(true);
  }, []);

  useEffect(() => {
    function reset() {
      gameData.current = generateDefaultData();
    }
    reset();
  }, [gameReset]);

  useEffect(() => {
    if (!init) return;
    const { forward, backward, left, right, space, shift } = movement;
    if (!gameData) return;
    if (forward) {
      gameData.current = toRotate(gameData.current);
    }
    if (backward) console.log(backward);
    if (left) {
      gameData.current = toLeft(gameData.current);
    }
    if (right) {
      gameData.current = toRight(gameData.current);
    }
    if (space) console.log(space);
    if (shift) console.log(shift);
    console.log(gameData.current.tetromino);
  }, [movement]);

  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group position={[-offsetX, offsetY, 0]}>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, 150]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry args={[geometry.shape, geometry.extrudeSettings]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[initColor(150, [0.25, 0.5, 0.5, 0.5]), 4]}
          />
        </extrudeGeometry>
        <meshPhongMaterial attach="material" vertexColors transparent />
      </instancedMesh>
    </group>
  );
};
