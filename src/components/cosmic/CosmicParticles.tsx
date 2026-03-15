import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { starfieldVertexShader, starfieldFragmentShader } from "./shaders";

interface CosmicParticlesProps {
  count: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  breathRef: React.MutableRefObject<number>;
}

const CosmicParticles = ({ count, mouseRef, breathRef }: CosmicParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, phases, brightnesses, twinkleSpeeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a wide field
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      phases[i] = Math.random();

      // Most stars: very small and dim. A few: slightly brighter with twinkle.
      const isBright = Math.random() < 0.08; // 8% are "bright" stars
      if (isBright) {
        sizes[i] = Math.random() * 1.5 + 1.0; // still small
        brightnesses[i] = Math.random() * 0.4 + 0.6;
        twinkleSpeeds[i] = Math.random() * 1.5 + 0.5; // slow twinkle
      } else {
        sizes[i] = Math.random() * 0.6 + 0.2; // tiny
        brightnesses[i] = Math.random() * 0.3 + 0.1; // dim
        twinkleSpeeds[i] = 0.0; // no twinkle
      }
    }

    return { positions, sizes, phases, brightnesses, twinkleSpeeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBreath: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uBreath.value = breathRef.current;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightnesses, 1]} />
        <bufferAttribute attach="attributes-aTwinkleSpeed" args={[twinkleSpeeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starfieldVertexShader}
        fragmentShader={starfieldFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CosmicParticles;
