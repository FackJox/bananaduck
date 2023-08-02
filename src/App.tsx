import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { useGLTF, Environment } from "@react-three/drei";

import Banana from "./components/Banana";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

type AppProps = {
  count: number;
  depth: number;
};

export default function App() {

  const count = 150
    const depth = 100
    
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
      <color attach="background" args={["#ffe07c"]} />
      {/* <ambientLight intensity={0.2} /> */}
      {/* <spotLight position={[10, 10, 10]} intensity={1} /> */}
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} z={-(i / count) * depth -10} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 5]}
            focalLength={0.5}
            bokehScale={11}
            height={800}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
