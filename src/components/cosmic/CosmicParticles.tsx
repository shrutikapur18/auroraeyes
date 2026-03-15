import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "./shaders";

interface CosmicParticlesProps {
  count: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  breathRef: React.MutableRefObject<number>;
}

const CosmicParticles = ({ count, mouseRef, breathRef }: CosmicParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, phases, brightnesses } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const brightnesses = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      sizes[i] = Math.random() * 3 + 0.5;
      phases[i] = Math.random();
      brightnesses[i] = Math.random() * 0.7 + 0.3;
    }

    return { positions, sizes, phases, brightnesses };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBreath: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    mat.uniforms.uBreath.value = breathRef.current;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightnesses, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CosmicParticles;
