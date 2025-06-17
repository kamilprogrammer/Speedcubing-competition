"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import IllRight from "../ui/ill_right";

function CubeModel() {
  const { scene } = useGLTF("/cube.glb");
  scene.rotateY(Math.PI / 8);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <primitive
      object={scene}
      scale={isMobile ? 0.02 : 0.025}
      position={[0, 0, 0]}
    />
  );
}

export default function Cube() {
  return (
    <div className="-mt-30">
      <IllRight small={false} height={1165} width={1156} right={true} />
      <div className="flex flex-col items-center justify-center gap-12 py-12 mx-auto w-full">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center -pb-20 mt-10">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
            <span className="inline-flex bg-gradient-to-r from-orange-500 to-orange-200 bg-clip-text text-transparent">
              3D Cube
            </span>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="w-full max-w-[1300px] h-[370px] sm:h-[420px] md:h-[500px] px-4">
          <Canvas
            className="w-full h-full"
            camera={{ fov: 65, near: 0.1, far: 1000, position: [0, 0, 10] }}
          >
            <color attach="background" args={["#090F1B"]} />
            <OrbitControls enableDamping enablePan={false} enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Suspense fallback={null}>
              <CubeModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
