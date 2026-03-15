import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple zodiac/rune symbol patterns encoded as point clusters
const SYMBOL_SETS = [
  // Aries ♈ — V shape
  [[-0.3, 0.4], [0, 0], [0.3, 0.4], [0, 0], [0, -0.3]],
  // Triangle — basic mystical
  [[0, 0.4], [-0.35, -0.2], [0.35, -0.2], [0, 0.4]],
  // Cross
  [[0, 0.4], [0, -0.4], [-0.35, 0], [0.35, 0]],
  // Star points
  [[0, 0.5], [0.15, 0.15], [0.5, 0], [0.15, -0.15], [0, -0.5], [-0.15, -0.15], [-0.5, 0], [-0.15, 0.15]],
  // Diamond
  [[0, 0.4], [0.3, 0], [0, -0.4], [-0.3, 0]],
];

const PARTICLES_PER_SYMBOL = 40;
const TOTAL = PARTICLES_PER_SYMBOL * SYMBOL_SETS.length;

const symbolVertexShader = `
  attribute float aSymbolIndex;
  attribute vec2 aSymbolTarget;
  attribute float aPhase;
  uniform float uTime;
  uniform float uActiveSymbol;
  varying float vAlpha;

  void main() {
    float mySymbol = aSymbolIndex;
    float active = step(abs(mySymbol - uActiveSymbol), 0.5);
    
    // Cycle: show each symbol for ~4s, with 8s gaps
    float cycleT = mod(uTime, 60.0);
    float symbolTime = mySymbol * 12.0;
    float localT = cycleT - symbolTime;
    float fadeIn = smoothstep(0.0, 2.0, localT);
    float fadeOut = smoothstep(4.0, 2.0, localT);
    float visible = fadeIn * fadeOut * step(0.0, localT) * step(localT, 4.0);
    
    vec3 pos = position;
    // Move toward symbol shape when visible
    pos.x = mix(pos.x, aSymbolTarget.x + (mySymbol - 2.0) * 4.0, visible);
    pos.y = mix(pos.y, aSymbolTarget.y, visible);
    
    pos.x += sin(uTime * 0.05 + aPhase * 10.0) * (1.0 - visible) * 0.3;
    pos.y += cos(uTime * 0.04 + aPhase * 7.0) * (1.0 - visible) * 0.2;
    
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = mix(1.0, 2.5, visible) * (120.0 / -mvPos.z);
    
    vAlpha = mix(0.03, 0.4, visible);
  }
`;

const symbolFragmentShader = `
  varying float vAlpha;
  
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    vec3 color = vec3(0.4, 0.6, 0.9);
    gl_FragColor = vec4(color, alpha);
  }
`;

const MysticalSymbols = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, symbolIndices, symbolTargets, phases } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const symbolIndices = new Float32Array(TOTAL);
    const symbolTargets = new Float32Array(TOTAL * 2);
    const phases = new Float32Array(TOTAL);

    let idx = 0;
    for (let s = 0; s < SYMBOL_SETS.length; s++) {
      const points = SYMBOL_SETS[s];
      for (let p = 0; p < PARTICLES_PER_SYMBOL; p++) {
        // Random scatter position
        positions[idx * 3] = (Math.random() - 0.5) * 14;
        positions[idx * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[idx * 3 + 2] = -5 + Math.random() * 2;

        // Target position on symbol shape
        const pt = points[p % points.length];
        symbolTargets[idx * 2] = pt[0] + (Math.random() - 0.5) * 0.1;
        symbolTargets[idx * 2 + 1] = pt[1] + (Math.random() - 0.5) * 0.1;

        symbolIndices[idx] = s;
        phases[idx] = Math.random();
        idx++;
      }
    }

    return { positions, symbolIndices, symbolTargets, phases };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActiveSymbol: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value += delta;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSymbolIndex" args={[symbolIndices, 1]} />
        <bufferAttribute attach="attributes-aSymbolTarget" args={[symbolTargets, 2]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={symbolVertexShader}
        fragmentShader={symbolFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default MysticalSymbols;
