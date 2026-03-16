// Shared GLSL utilities and shader code for the cosmic background

export const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uBreath;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.015;
    
    // Subtle mouse distortion — bending space
    vec2 mouseOffset = uv - uMouse;
    float mouseDist = length(mouseOffset);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.025;
    uv += normalize(mouseOffset + 0.001) * mouseInfluence;
    
    // Multi-octave nebula noise
    float n1 = snoise(vec3(uv * 1.0, t)) * 0.5 + 0.5;
    float n2 = snoise(vec3(uv * 2.2 + 5.0, t * 0.7)) * 0.5 + 0.5;
    float n3 = snoise(vec3(uv * 3.8 + 10.0, t * 0.4)) * 0.5 + 0.5;
    float nebula = n1 * 0.5 + n2 * 0.35 + n3 * 0.15;
    
    // Deep space base — midnight blue to deep indigo
    vec3 midnightBlue = vec3(0.027, 0.039, 0.094);   // #070A18
    vec3 deepIndigo   = vec3(0.043, 0.059, 0.165);    // #0B0F2A
    vec3 nebulaPlum   = vec3(0.18, 0.145, 0.39);      // #2E2564
    vec3 cosmicBlue   = vec3(0.106, 0.165, 0.42);     // #1B2A6B
    
    // Base gradient — vertical dark space
    vec3 base = mix(midnightBlue, deepIndigo, uv.y * 0.7 + n1 * 0.15);
    
    // Soft nebula wisps — very faint
    vec3 nebulaColor = mix(nebulaPlum, cosmicBlue, n2 * 0.6);
    base = mix(base, nebulaColor, nebula * 0.08);
    
    // Centered radial cosmic focus glow
    float centerDist = length(uv - vec2(0.5, 0.42));
    float radialGlow = smoothstep(0.65, 0.0, centerDist) * 0.06;
    vec3 glowColor = mix(nebulaPlum, cosmicBlue, 0.4);
    base += glowColor * radialGlow * (0.85 + n2 * 0.3);
    
    // Second softer glow — wider spread
    float wideGlow = smoothstep(0.9, 0.0, centerDist) * 0.03;
    base += vec3(0.06, 0.04, 0.14) * wideGlow;
    
    // Cosmic breathing — very subtle
    float breath = uBreath;
    base *= 0.97 + breath * 0.035;
    
    // Vignette — darken edges elegantly
    float vignette = 1.0 - smoothstep(0.15, 0.85, length(uv - 0.5) * 1.05);
    base *= mix(0.55, 1.0, vignette);
    
    gl_FragColor = vec4(base, 1.0);
  }
`;

// Starfield shaders — sharp tiny points
export const starfieldVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aBrightness;
  attribute float aTwinkleSpeed;
  uniform float uTime;
  uniform float uBreath;
  varying float vBrightness;
  varying float vPhase;
  varying float vTwinkleSpeed;

  void main() {
    vBrightness = aBrightness;
    vPhase = aPhase;
    vTwinkleSpeed = aTwinkleSpeed;
    
    vec3 pos = position;
    
    // Very slow drift
    pos.x += sin(uTime * 0.015 + aPhase * 6.28) * 0.04;
    pos.y += cos(uTime * 0.01 + aPhase * 3.14) * 0.025;
    
    // Subtle breathing
    pos *= 1.0 + uBreath * 0.004;
    
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
    
    // Small, sharp stars
    float baseSize = aSize;
    
    // Bright stars twinkle slowly
    float twinkle = 1.0;
    if (aTwinkleSpeed > 0.0) {
      twinkle = 0.5 + 0.5 * sin(uTime * aTwinkleSpeed + aPhase * 20.0);
    }
    
    gl_PointSize = baseSize * (100.0 / -mvPos.z) * twinkle;
  }
`;

export const starfieldFragmentShader = `
  varying float vBrightness;
  varying float vPhase;
  varying float vTwinkleSpeed;
  uniform float uTime;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    
    // Sharp crisp falloff
    float alpha = smoothstep(0.5, 0.08, d);
    alpha *= alpha;
    
    // Color: cool whites with slight blue/warm variation
    vec3 coolWhite = vec3(0.82, 0.85, 1.0);
    vec3 warmWhite = vec3(1.0, 0.94, 0.86);
    vec3 blueWhite = vec3(0.7, 0.78, 1.0);
    
    vec3 color = mix(coolWhite, mix(warmWhite, blueWhite, step(0.6, vPhase)), vPhase);
    color *= vBrightness;
    
    // Tiny bright core
    float core = smoothstep(0.12, 0.0, d) * 0.2 * vBrightness;
    color += core;
    
    gl_FragColor = vec4(color, alpha * vBrightness * 0.85);
  }
`;
