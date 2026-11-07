import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RobloxCharacterMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#e0ac69" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.0, 1.2, 0.5]} />
        <meshStandardMaterial color="#1f2125" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.75, 0.4, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#e0ac69" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.75, 0.4, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#e0ac69" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.25, -0.8, 0]}>
        <boxGeometry args={[0.45, 1.2, 0.45]} />
        <meshStandardMaterial color="#2b3038" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.25, -0.8, 0]}>
        <boxGeometry args={[0.45, 1.2, 0.45]} />
        <meshStandardMaterial color="#2b3038" />
      </mesh>
    </group>
  );
}

export const Avatar3DView: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-radial-gradient">
      <Canvas camera={{ position: [0, 1.2, 4.5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 7]} intensity={0.7} />
        <RobloxCharacterMesh />
        <OrbitControls enableZoom={true} enableDamping={true} maxPolarAngle={Math.PI / 2 + 0.1} />
      </Canvas>
    </div>
  );
};
