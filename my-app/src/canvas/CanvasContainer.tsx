import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Interface } from "./Interface";

export const CanvasContainer = () => {
  return (
    <Canvas
      gl={{
        antialias: true,
      }}
      style={{ background: "radial-gradient(#FFFDE4, #005AA7)" }}
    >
      <PerspectiveCamera position={[0, 0, 15]} fov={75} makeDefault />
      <OrbitControls makeDefault />
      <ambientLight />
      <pointLight position={[0, 200, 200]} intensity={0.5} />
      <Interface />
    </Canvas>
  );
};
