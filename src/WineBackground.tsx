import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WineWaveProps {
  pouring?: boolean;
}

interface WineBackgroundProps {
  pouring?: boolean;
  style?: React.CSSProperties;
}

const WineWave: React.FC<WineWaveProps> = ({ pouring = false }) => {
  const meshRef = useRef<THREE.Line>(null);
  const pourRef = useRef<THREE.Mesh>(null);

  // Create wave geometry
  const { positions, count } = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 2 - 1; // -1 to 1
      positions[i * 3] = x * 10; // x position
      positions[i * 3 + 1] = Math.sin(x * Math.PI * 2) * 0.5 - 2; // y position
      positions[i * 3 + 2] = 0; // z position
    }

    return { positions, count };
  }, []);

  // Create pouring geometry
  const pourGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.2, 0);
    shape.bezierCurveTo(-0.2, 0, -0.1, -1, 0, -1.5);
    shape.bezierCurveTo(0, -1.5, 0.1, -1, 0.2, 0);
    shape.bezierCurveTo(0.2, 0, 0.1, 0.2, 0, 0.2);
    shape.bezierCurveTo(0, 0.2, -0.1, 0.2, -0.2, 0);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.2,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Wave animation
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x = (i / (count - 1)) * 2 - 1;
        positions[i * 3 + 1] = Math.sin(x * Math.PI * 3 + time) * 0.3 - 2;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pouring animation
    if (pourRef.current && pouring) {
      pourRef.current.position.y = Math.sin(time * 0.5) * 0.1 + 4;
      pourRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Wine wave */}
      <line ref={meshRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#6d0a2d" linewidth={2} />
      </line>

      {/* Wine fill */}
      <mesh position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 3, 1]} />
        <meshBasicMaterial color="#6d0a2d" transparent opacity={0.8} />
      </mesh>

      {/* Optional pouring animation */}
      {pouring && (
        <mesh ref={pourRef} position={[0, 4, 0]}>
          <primitive object={pourGeometry} attach="geometry" />
          <meshBasicMaterial color="#6d0a2d" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
};

const WineBackground: React.FC<WineBackgroundProps> = ({
  pouring = false,
  style = {},
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <WineWave pouring={pouring} />
      </Canvas>
    </div>
  );
};

export default WineBackground;
