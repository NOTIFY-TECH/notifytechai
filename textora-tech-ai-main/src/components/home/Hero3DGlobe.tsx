import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface GlobeProps {
  isMobile: boolean;
}

const Globe = ({ isMobile }: GlobeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const arcsRef = useRef<THREE.Group>(null);

  // Responsive geometry segments
  const segments = isMobile ? 32 : 64;
  const wireframeSegments = isMobile ? 16 : 32;

  // Generate connection points (cities) - fewer on mobile
  const connectionPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const cities = isMobile 
      ? [
          { lat: 28.6139, lng: 77.209 },   // Delhi
          { lat: 40.7128, lng: -74.006 },   // New York
          { lat: 51.5074, lng: -0.1278 },   // London
          { lat: 35.6762, lng: 139.6503 },  // Tokyo
        ]
      : [
          { lat: 28.6139, lng: 77.209 },   // Delhi
          { lat: 19.076, lng: 72.8777 },    // Mumbai
          { lat: 51.5074, lng: -0.1278 },   // London
          { lat: 40.7128, lng: -74.006 },   // New York
          { lat: 35.6762, lng: 139.6503 },  // Tokyo
          { lat: 1.3521, lng: 103.8198 },   // Singapore
          { lat: -33.8688, lng: 151.2093 }, // Sydney
          { lat: 25.2048, lng: 55.2708 },   // Dubai
        ];

    cities.forEach(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      points.push(new THREE.Vector3(x, y, z));
    });
    return points;
  }, [isMobile]);

  // Create particle field - reduced count on mobile
  const particles = useMemo(() => {
    const count = isMobile ? 500 : 2000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 0.1;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    return positions;
  }, [isMobile]);

  useFrame(({ clock }) => {
    const speed = isMobile ? 0.05 : 0.1;
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
    if (arcsRef.current) {
      arcsRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <group>
      {/* Main globe - reduced segments on mobile */}
      <Sphere ref={meshRef} args={[2, segments, segments]}>
        <meshPhongMaterial
          color="#1a365d"
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay - reduced segments */}
      <Sphere args={[2.01, wireframeSegments, wireframeSegments]}>
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Atmosphere glow - simplified on mobile */}
      {!isMobile && (
        <Sphere args={[2.2, 16, 16]}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      )}

      {/* Particle points on surface */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.03 : 0.02}
          color="#60a5fa"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Connection point markers - simplified geometry on mobile */}
      <group ref={arcsRef}>
        {connectionPoints.map((point, i) => (
          <group key={i}>
            <mesh position={point}>
              <sphereGeometry args={[0.05, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
            {/* Pulse ring - simplified on mobile */}
            {!isMobile && (
              <mesh position={point}>
                <ringGeometry args={[0.06, 0.08, 16]} />
                <meshBasicMaterial
                  color="#22c55e"
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>

      {/* Lighting - reduced on mobile */}
      <ambientLight intensity={isMobile ? 0.5 : 0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1} color="#ffffff" />
      {!isMobile && (
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#3b82f6" />
      )}
    </group>
  );
};

const Hero3DGlobe = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 7 : 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        frameloop={isMobile ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Globe isMobile={isMobile} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={isMobile ? 0.3 : 0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DGlobe;
