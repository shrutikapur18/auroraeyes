import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EYE_PARTICLES = 300;
const CYCLE_DURATION = 25; // seconds between eye formations
const FORMATION_DURATION = 6; // how long the eye is visible

const eyeVertexShader = `
  attribute vec3 aTarget;
  attribute float aPhase;
  uniform float uFormation;
  uniform float uTime;
  uniform float uBreath;
  varying float vAlpha;
  varying float vFormation;

  void main() {
    vFormation = uFormation;
    
    // Smoothly interpolate between scattered and eye formation
    vec3 pos = mix(position, aTarget, uFormation);
    
    // Add slight drift when scattered
    pos.x += sin(uTime * 0.1 + aPhase * 6.28) * (1.0 - uFormation) * 0.5;
    pos.y += cos(uTime * 0.08 + aPhase * 3.14) * (1.0 - uFormation) * 0.3;
    
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    
    float size = mix(1.5, 2.5, uFormation);
    gl_PointSize = size * (150.0 / -mvPos.z) * (1.0 + uBreath * 0.1);
    
    vAlpha = mix(0.15, 0.7, uFormation);
  }
`;

const eyeFragmentShader = `
  varying float vAlpha;
  varying float vFormation;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    
    vec3 scattered = vec3(0.4, 0.5, 0.7);
    vec3 formed = vec3(0.3, 0.7, 0.9);
    vec3 color = mix(scattered, formed, vFormation);
    
    // Glow when forming
    float glow = smoothstep(0.2, 0.0, d) * vFormation * 0.6;
    color += glow * vec3(0.5, 0.8, 1.0);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const CosmicEye = ({ breathRef }: { breathRef: React.MutableRefObject<number> }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, targets, phases } = useMemo(() => {
    const positions = new Float32Array(EYE_PARTICLES * 3);
    const targets = new Float32Array(EYE_PARTICLES * 3);
    const phases = new Float32Array(EYE_PARTICLES);

    // Generate eye shape targets
    for (let i = 0; i < EYE_PARTICLES; i++) {
      // Scatter positions
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 3;
      phases[i] = Math.random();

      // Eye shape — almond outline + iris + pupil
      const section = Math.random();
      let tx: number, ty: number;

      if (section < 0.4) {
        // Almond outline
        const angle = Math.random() * Math.PI * 2;
        const rx = 2.5;
        const ry = 1.0;
        tx = Math.cos(angle) * rx;
        ty = Math.sin(angle) * ry * Math.cos(angle * 0.5);
      } else if (section < 0.75) {
        // Iris circle
        const angle = Math.random() * Math.PI * 2;
        const r = 0.6 + Math.random() * 0.3;
        tx = Math.cos(angle) * r;
        ty = Math.sin(angle) * r;
      } else {
        // Pupil / center vortex
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.4;
        tx = Math.cos(angle) * r;
        ty = Math.sin(angle) * r;
      }

      targets[i * 3] = tx;
      targets[i * 3 + 1] = ty;
      targets[i * 3 + 2] = -3;
    }

    return { positions, targets, phases };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFormation: { value: 0 },
      uBreath: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uBreath.value = breathRef.current;

    // Calculate formation progress
    const cycleTime = mat.uniforms.uTime.value % CYCLE_DURATION;
    const formStart = CYCLE_DURATION - FORMATION_DURATION - 2;
    const formEnd = CYCLE_DURATION - 2;
    
    let formation = 0;
    if (cycleTime > formStart && cycleTime < formStart + 2) {
      // Forming (2s ease in)
      formation = (cycleTime - formStart) / 2;
      formation = formation * formation * (3 - 2 * formation); // smoothstep
    } else if (cycleTime >= formStart + 2 && cycleTime < formEnd) {
      formation = 1;
    } else if (cycleTime >= formEnd && cycleTime < formEnd + 2) {
      // Dissolving (2s ease out)
      formation = 1 - (cycleTime - formEnd) / 2;
      formation = formation * formation * (3 - 2 * formation);
    }

    mat.uniforms.uFormation.value = formation;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[targets, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={eyeVertexShader}
        fragmentShader={eyeFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CosmicEye;
