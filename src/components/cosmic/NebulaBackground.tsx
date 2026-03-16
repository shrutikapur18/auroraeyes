import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { nebulaVertexShader, nebulaFragmentShader } from "./shaders";

interface NebulaBackgroundProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  breathRef: React.MutableRefObject<number>;
}

const NebulaBackground = ({ mouseRef, breathRef }: NebulaBackgroundProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uBreath: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uMouse.value.set(
      mouseRef.current.x * 0.5 + 0.5,
      mouseRef.current.y * 0.5 + 0.5
    );
    mat.uniforms.uBreath.value = breathRef.current;
  });

  // Scale plane to cover the entire viewport with generous margin
  const scale = Math.max(viewport.width, viewport.height) * 3;

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};

export default NebulaBackground;
