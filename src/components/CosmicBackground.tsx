import { useRef, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NebulaBackground from "./cosmic/NebulaBackground";
import CosmicParticles from "./cosmic/CosmicParticles";
import { useIsMobile } from "@/hooks/use-mobile";

// Manages the cosmic breathing rhythm and scroll depth
const CosmicController = ({
  breathRef,
  scrollRef,
}: {
  breathRef: React.MutableRefObject<number>;
  scrollRef: React.MutableRefObject<number>;
}) => {
  useFrame(({ camera }, delta) => {
    const t = performance.now() * 0.001;
    breathRef.current = Math.sin(t * (Math.PI * 2) / 20) * 0.5 + 0.5;

    const targetZ = 5 - scrollRef.current * 2;
    camera.position.z += (targetZ - camera.position.z) * delta * 0.3;
  });

  return null;
};

const CosmicBackground = () => {
  const isMobile = useIsMobile();
  const mouseRef = useRef({ x: 0, y: 0 });
  const breathRef = useRef(0);
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleScroll = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  // Fewer particles for a calm starfield
  const starCount = isMobile ? 300 : 800;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050510" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <CosmicController breathRef={breathRef} scrollRef={scrollRef} />
          <NebulaBackground mouseRef={mouseRef} breathRef={breathRef} />
          <CosmicParticles count={starCount} mouseRef={mouseRef} breathRef={breathRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CosmicBackground;
