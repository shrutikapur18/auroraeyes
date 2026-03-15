import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vortexVertexShader, vortexFragmentShader } from "./shaders";

interface GalaxyVortexProps {
  breathRef: React.MutableRefObject<number>;
}

const VORTEX_PARTICLES = 600;

const GalaxyVortex = ({ breathRef }: GalaxyVortexProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, angles, radii, speeds } = useMemo(() => {
    const positions = new Float32Array(VORTEX_PARTICLES * 3);
    const angles = new Float32Array(VORTEX_PARTICLES);
    const radii = new Float32Array(VORTEX_PARTICLES);
    const speeds = new Float32Array(VORTEX_PARTICLES);

    for (let i = 0; i < VORTEX_PARTICLES; i++) {
      const r = Math.random() * 3 + 0.2;
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      angles[i] = a;
      radii[i] = r;
      speeds[i] = (1.0 / (r + 0.5)) * (0.8 + Math.random() * 0.4);
    }

    return { positions, angles, radii, speeds };
  }, []);

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
    <points ref={pointsRef} position={[0, 0, -4]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aAngle" args={[angles, 1]} />
        <bufferAttribute attach="attributes-aRadius" args={[radii, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vortexVertexShader}
        fragmentShader={vortexFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default GalaxyVortex;
