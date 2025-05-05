
import { Environment, ContactShadows, Sky } from '@react-three/drei';

// A realistic room model with enhanced materials and lighting
function Room3D({ roomType = 'living-room' }) {
  // Adjust the room appearance based on room type with more realistic colors
  const getWallColor = () => {
    switch (roomType) {
      case 'kitchen': return "#f2f2f2";
      case 'bedroom': return "#f5f2ea";
      case 'hall': return "#e8e8e8";
      case 'master-bedroom': return "#e6e1d6";
      case 'living-room':
      default: return "#fbfbfb";
    }
  };
  
  const getFloorColor = () => {
    switch (roomType) {
      case 'kitchen': return "#d2cbc2";
      case 'bedroom': return "#c09a6b";
      case 'hall': return "#9c7b54";
      case 'master-bedroom': return "#8b5a2b";
      case 'living-room':
      default: return "#d7cec7";
    }
  };

  return (
    <group>
      {/* Floor with enhanced material properties */}
      <mesh receiveShadow castShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={getFloorColor()} roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Back Wall with enhanced material */}
      <mesh receiveShadow position={[0, 5, -5]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshStandardMaterial color={getWallColor()} roughness={0.65} />
      </mesh>
      
      {/* Left Wall */}
      <mesh receiveShadow position={[-5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" roughness={0.65} />
      </mesh>
      
      {/* Right Wall */}
      <mesh receiveShadow position={[5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" roughness={0.65} />
      </mesh>
      
      {/* Baseboards with enhanced details */}
      <mesh position={[0, 0.25, -4.95]} castShadow>
        <boxGeometry args={[10, 0.5, 0.1]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      <mesh position={[-4.95, 0.25, 0]} castShadow>
        <boxGeometry args={[0.1, 0.5, 10]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      <mesh position={[4.95, 0.25, 0]} castShadow>
        <boxGeometry args={[0.1, 0.5, 10]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Window for living-room */}
      {roomType === 'living-room' && (
        <group position={[0, 3.5, -4.9]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#87CEEB" opacity={0.7} transparent={true} />
          </mesh>
          <mesh position={[0, 0, 0.1]} castShadow>
            <boxGeometry args={[3.2, 2.2, 0.1]} />
            <meshStandardMaterial color="#a0a0a0" />
          </mesh>
        </group>
      )}
      
      {/* Kitchen-specific fixtures */}
      {roomType === 'kitchen' && (
        <>
          {/* Modern kitchen counter */}
          <mesh position={[0, 1, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[8, 1, 1]} />
            <meshStandardMaterial color="#EFEFEF" roughness={0.4} />
          </mesh>
          
          {/* Kitchen sink */}
          <mesh position={[2, 1.55, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.1, 0.8]} />
            <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
          </mesh>
          
          {/* Kitchen cabinets */}
          <mesh position={[-3, 1, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[2, 2, 0.8]} />
            <meshStandardMaterial color="#EFEFEF" roughness={0.5} />
          </mesh>
          
          {/* Kitchen island */}
          <mesh position={[0, 1, -2]} castShadow receiveShadow>
            <boxGeometry args={[3, 1, 2]} />
            <meshStandardMaterial color="#EFEFEF" roughness={0.4} />
          </mesh>
        </>
      )}
      
      {/* Bedroom-specific fixtures */}
      {roomType === 'bedroom' && (
        <>
          {/* Simple bed frame */}
          <mesh position={[0, 0.3, -3]} castShadow receiveShadow>
            <boxGeometry args={[4, 0.6, 6]} />
            <meshStandardMaterial color="#8b4513" roughness={0.7} />
          </mesh>
          
          {/* Mattress */}
          <mesh position={[0, 0.75, -3]} castShadow receiveShadow>
            <boxGeometry args={[3.8, 0.5, 5.8]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.5} />
          </mesh>
          
          {/* Pillows */}
          <mesh position={[0, 1.1, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.3, 1]} />
            <meshStandardMaterial color="white" roughness={0.3} />
          </mesh>
          
          {/* Nightstand */}
          <mesh position={[2.5, 0.6, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[1, 1.2, 1]} />
            <meshStandardMaterial color="#a0522d" roughness={0.6} />
          </mesh>
        </>
      )}
      
      {/* Master bedroom-specific fixtures */}
      {roomType === 'master-bedroom' && (
        <>
          {/* Larger bed frame */}
          <mesh position={[0, 0.3, -3]} castShadow receiveShadow>
            <boxGeometry args={[5, 0.6, 6]} />
            <meshStandardMaterial color="#5d4037" roughness={0.7} />
          </mesh>
          
          {/* Mattress */}
          <mesh position={[0, 0.85, -3]} castShadow receiveShadow>
            <boxGeometry args={[4.8, 0.7, 5.8]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.4} />
          </mesh>
          
          {/* Pillows */}
          <mesh position={[0, 1.3, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[4, 0.4, 1]} />
            <meshStandardMaterial color="white" roughness={0.3} />
          </mesh>
          
          {/* Nightstands */}
          <mesh position={[3, 0.7, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.4, 1.2]} />
            <meshStandardMaterial color="#5d4037" roughness={0.6} />
          </mesh>
          
          <mesh position={[-3, 0.7, -0.8]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.4, 1.2]} />
            <meshStandardMaterial color="#5d4037" roughness={0.6} />
          </mesh>
          
          {/* Dresser */}
          <mesh position={[-3, 1, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 2, 0.8]} />
            <meshStandardMaterial color="#5d4037" roughness={0.6} />
          </mesh>
        </>
      )}
      
      {/* Hall-specific fixtures */}
      {roomType === 'hall' && (
        <>
          {/* Console table */}
          <mesh position={[0, 1, -4.5]} castShadow receiveShadow>
            <boxGeometry args={[3, 0.8, 0.8]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
          </mesh>
          
          {/* Mirror */}
          <mesh position={[0, 3, -4.9]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 3, 0.1]} />
            <meshStandardMaterial color="#a0a0a0" roughness={0.2} metalness={0.5} />
          </mesh>
          
          {/* Coat rack */}
          <mesh position={[3.5, 2, -4.5]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
            <meshStandardMaterial color="#8b4513" roughness={0.7} />
          </mesh>
          
          {/* Coat rack top - fixed the TypeScript error by removing rotation from args */}
          <mesh position={[3.5, 3.8, -4.5]} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
            <meshStandardMaterial color="#8b4513" roughness={0.7} />
          </mesh>
        </>
      )}
      
      {/* Add common lighting and environment */}
      <Environment preset="apartment" />
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.5} 
        scale={12} 
        blur={1.5} 
        far={10}
      />
      <Sky distance={450000} turbidity={8} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
    </group>
  );
}

export default Room3D;
