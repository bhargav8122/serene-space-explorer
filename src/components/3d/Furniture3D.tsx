
import { useRef, useState, useEffect } from 'react';
import { TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { getTextureSettings } from '../../services/threeDService';
import * as THREE from 'three';

// Types for furniture
export interface FurnitureItem {
  id: number;
  name: string;
  type: string;
  description?: string;
  materialType?: string;
  color: string;
  size: [number, number, number]; 
}

export interface PlacedFurnitureItem {
  id: number;
  type: string;
  materialType?: string;
  color: string;
  size: [number, number, number];
  position: [number, number, number];
}

// Enhanced furniture component with better materials and shadows
function Furniture({ 
  position, 
  color, 
  size, 
  type, 
  id, 
  isSelected, 
  onSelect,
  materialType = 'default'
}: { 
  position: [number, number, number], 
  color: string, 
  size: [number, number, number], 
  type: string,
  id: number,
  isSelected: boolean,
  onSelect: (id: number) => void,
  materialType?: string
}) {
  const textureSettings = getTextureSettings(materialType);
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(id);
  };

  const getRenderGeometry = () => {
    switch (type) {
      case 'l-shaped-sofa':
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[size[0], size[1], size[2]/2]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
                emissive={isSelected ? '#ff0000' : undefined}
                emissiveIntensity={isSelected ? 0.2 : 0}
              />
            </mesh>
            <mesh castShadow receiveShadow position={[size[0]/4, 0, size[2]/3]}>
              <boxGeometry args={[size[0]/2, size[1], size[2]/3]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
                emissive={isSelected ? '#ff0000' : undefined}
                emissiveIntensity={isSelected ? 0.2 : 0}
              />
            </mesh>
          </group>
        );
      case 'dining-table-set':
        return (
          <group>
            {/* Table */}
            <mesh castShadow receiveShadow position={[0, size[1]/2, 0]}>
              <boxGeometry args={[size[0], size[1]/10, size[2]]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
              />
            </mesh>
            {/* Table legs */}
            <mesh castShadow receiveShadow position={[size[0]/2.5, size[1]/4, size[2]/2.5]}>
              <boxGeometry args={[0.1, size[1]/2, 0.1]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/2.5, size[1]/4, size[2]/2.5]}>
              <boxGeometry args={[0.1, size[1]/2, 0.1]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[size[0]/2.5, size[1]/4, -size[2]/2.5]}>
              <boxGeometry args={[0.1, size[1]/2, 0.1]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/2.5, size[1]/4, -size[2]/2.5]}>
              <boxGeometry args={[0.1, size[1]/2, 0.1]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.4} />
            </mesh>
            {/* Chair 1 */}
            <mesh castShadow receiveShadow position={[size[0]/2 + 0.5, size[1]/4, 0]}>
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh castShadow receiveShadow position={[size[0]/2 + 0.5, size[1]/2, -0.25]}>
              <boxGeometry args={[0.6, 0.6, 0.1]} />
              <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
          </group>
        );
      case 'bed':
        return (
          <group>
            {/* Bed frame */}
            <mesh castShadow receiveShadow position={[0, size[1]/4, 0]}>
              <boxGeometry args={[size[0], size[1]/2, size[2]]} />
              <meshStandardMaterial color="#8b4513" roughness={0.7} />
            </mesh>
            {/* Mattress */}
            <mesh castShadow receiveShadow position={[0, size[1]/1.5, 0]}>
              <boxGeometry args={[size[0]-0.2, size[1]/3, size[2]-0.2]} />
              <meshStandardMaterial color="#f5f5dc" roughness={0.4} />
            </mesh>
            {/* Headboard */}
            <mesh castShadow receiveShadow position={[0, size[1], size[2]/2-0.1]}>
              <boxGeometry args={[size[0], size[1], 0.2]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            {/* Pillows */}
            <mesh castShadow receiveShadow position={[0, size[1]/1.2, size[2]/3]}>
              <boxGeometry args={[size[0]-0.6, size[1]/6, size[2]/6]} />
              <meshStandardMaterial color="white" roughness={0.3} />
            </mesh>
          </group>
        );
      case 'pendant-light':
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, -size[1]/3, 0]}>
              <sphereGeometry args={[size[0], 16, 16]} />
              <meshStandardMaterial 
                color={color} 
                roughness={0.2}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, size[1], 8]} />
              <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.6} />
            </mesh>
          </group>
        );
      case 'rug':
        return (
          <mesh castShadow receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[size[0], size[2]]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.9}
              metalness={0}
              emissive={isSelected ? '#ff0000' : undefined}
              emissiveIntensity={isSelected ? 0.2 : 0}
            />
          </mesh>
        );
      case 'bookshelf':
        return (
          <group>
            {/* Main frame */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[size[0], size[1], size[2]]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
                emissive={isSelected ? '#ff0000' : undefined}
                emissiveIntensity={isSelected ? 0.2 : 0}
              />
            </mesh>
            {/* Shelves */}
            <mesh castShadow receiveShadow position={[0, size[1]/4, 0]}>
              <boxGeometry args={[size[0]-0.1, 0.05, size[2]]} />
              <meshStandardMaterial color={color} roughness={textureSettings.roughness} metalness={textureSettings.metalness} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, size[1]/2, 0]}>
              <boxGeometry args={[size[0]-0.1, 0.05, size[2]]} />
              <meshStandardMaterial color={color} roughness={textureSettings.roughness} metalness={textureSettings.metalness} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, size[1]*3/4, 0]}>
              <boxGeometry args={[size[0]-0.1, 0.05, size[2]]} />
              <meshStandardMaterial color={color} roughness={textureSettings.roughness} metalness={textureSettings.metalness} />
            </mesh>
          </group>
        );
      case 'tv-console':
        return (
          <group>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[size[0], size[1], size[2]]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
                emissive={isSelected ? '#ff0000' : undefined}
                emissiveIntensity={isSelected ? 0.2 : 0}
              />
            </mesh>
            {/* Drawers */}
            <mesh castShadow receiveShadow position={[size[0]/4, size[1]/3, size[2]/2 + 0.01]}>
              <boxGeometry args={[size[0]/2 - 0.05, size[1]/3 - 0.05, 0.02]} />
              <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/4, size[1]/3, size[2]/2 + 0.01]}>
              <boxGeometry args={[size[0]/2 - 0.05, size[1]/3 - 0.05, 0.02]} />
              <meshStandardMaterial color="#5d4037" roughness={0.6} />
            </mesh>
          </group>
        );
      case 'accent-chair':
        return (
          <group>
            {/* Seat */}
            <mesh castShadow receiveShadow position={[0, size[1]/4, 0]}>
              <boxGeometry args={[size[0], size[1]/2, size[2]]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
              />
            </mesh>
            {/* Backrest */}
            <mesh castShadow receiveShadow position={[0, size[1]*0.7, -size[2]/2 + 0.1]}>
              <boxGeometry args={[size[0], size[1], 0.2]} />
              <meshStandardMaterial 
                color={color} 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
              />
            </mesh>
            {/* Legs */}
            <mesh castShadow receiveShadow position={[size[0]/3, size[1]/8, size[2]/3]}>
              <cylinderGeometry args={[0.05, 0.05, size[1]/4, 8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/3, size[1]/8, size[2]/3]}>
              <cylinderGeometry args={[0.05, 0.05, size[1]/4, 8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[size[0]/3, size[1]/8, -size[2]/3]}>
              <cylinderGeometry args={[0.05, 0.05, size[1]/4, 8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/3, size[1]/8, -size[2]/3]}>
              <cylinderGeometry args={[0.05, 0.05, size[1]/4, 8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        );
      case 'coffee-table':
        return (
          <group>
            {/* Table top */}
            <mesh castShadow receiveShadow position={[0, size[1]-0.05, 0]}>
              <boxGeometry args={[size[0], 0.1, size[2]]} />
              <meshStandardMaterial 
                color="#8d6e63" 
                roughness={textureSettings.roughness}
                metalness={textureSettings.metalness}
              />
            </mesh>
            {/* Legs */}
            <mesh castShadow receiveShadow position={[size[0]/3, size[1]/2, size[2]/3]}>
              <boxGeometry args={[0.1, size[1], 0.1]} />
              <meshStandardMaterial color="black" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/3, size[1]/2, size[2]/3]}>
              <boxGeometry args={[0.1, size[1], 0.1]} />
              <meshStandardMaterial color="black" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh castShadow receiveShadow position={[size[0]/3, size[1]/2, -size[2]/3]}>
              <boxGeometry args={[0.1, size[1], 0.1]} />
              <meshStandardMaterial color="black" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh castShadow receiveShadow position={[-size[0]/3, size[1]/2, -size[2]/3]}>
              <boxGeometry args={[0.1, size[1], 0.1]} />
              <meshStandardMaterial color="black" roughness={0.3} metalness={0.7} />
            </mesh>
          </group>
        );
      case 'indoor-plant':
        return (
          <group>
            {/* Pot */}
            <mesh castShadow receiveShadow position={[0, size[1]/8, 0]}>
              <cylinderGeometry args={[size[0], size[0]*0.8, size[1]/4, 16]} />
              <meshStandardMaterial color="#d7ccc8" roughness={0.6} />
            </mesh>
            {/* Plant */}
            <mesh castShadow receiveShadow position={[0, size[1]/2 + 0.2, 0]}>
              <sphereGeometry args={[size[0]*1.2, 16, 16, 0, Math.PI*2, 0, Math.PI/2]} />
              <meshStandardMaterial 
                color="#558b2f" 
                roughness={0.8}
                emissive={isSelected ? '#ff0000' : undefined}
                emissiveIntensity={isSelected ? 0.2 : 0}
              />
            </mesh>
            <mesh castShadow receiveShadow position={[0, size[1]/2, 0]}>
              <cylinderGeometry args={[0.08, 0.08, size[1]/2, 8]} />
              <meshStandardMaterial color="#6d4c41" roughness={0.7} />
            </mesh>
          </group>
        );
      case 'cube':
        return (
          <boxGeometry args={size} />
        );
      case 'cylinder':
        return (
          <cylinderGeometry args={[size[0], size[0], size[1], 32]} />
        );
      case 'sphere':
        return (
          <sphereGeometry args={[size[0], 32, 32]} />
        );
      default:
        return (
          <boxGeometry args={size} />
        );
    }
  };

  return (
    <mesh 
      position={position} 
      castShadow 
      receiveShadow
      onClick={handleClick}
    >
      {getRenderGeometry()}
      <meshStandardMaterial 
        color={color} 
        roughness={textureSettings.roughness}
        metalness={textureSettings.metalness}
        emissive={isSelected ? '#ff0000' : undefined}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
    </mesh>
  );
}

// Improved draggable furniture with transform controls when selected
function Furniture3D({
  item,
  isSelected,
  onSelect,
  onPositionChange,
  checkValidPosition
}: {
  item: PlacedFurnitureItem,
  isSelected: boolean,
  onSelect: (id: number) => void,
  onPositionChange: (id: number, newPosition: [number, number, number]) => void,
  checkValidPosition: (id: number, newPosition: [number, number, number]) => boolean
}) {
  const transformRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, scene, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<[number, number, number]>([0, 0, 0]);
  
  // Handle position change from transform controls
  const handleTransformChange = () => {
    if (transformRef.current && transformRef.current.object) {
      const newPosition = transformRef.current.object.position.toArray() as [number, number, number];
      // Keep the same height (y coordinate)
      const adjustedPosition: [number, number, number] = [
        newPosition[0], 
        item.position[1], 
        newPosition[2]
      ];
      
      if (checkValidPosition(item.id, adjustedPosition)) {
        onPositionChange(item.id, adjustedPosition);
      } else {
        // Reset to original position if invalid
        transformRef.current.object.position.set(item.position[0], item.position[1], item.position[2]);
      }
    }
  };

  // Custom dragging implementation with improved hit detection
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [pointer] = useState(() => new THREE.Vector2());
  const [plane] = useState(() => new THREE.Plane(new THREE.Vector3(0, 1, 0))); // Horizontal plane
  const [planeIntersection] = useState(() => new THREE.Vector3());
  
  // Create an invisible box for better dragging hit detection
  const hitBoxRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!hitBoxRef.current) return;
      
      // Convert pointer to normalized device coordinates
      pointer.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
      
      raycaster.setFromCamera(pointer, camera);
      
      // Check if we're hitting the furniture item's hit box
      const intersects = raycaster.intersectObject(hitBoxRef.current);
      
      if (intersects.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
        onSelect(item.id);
        
        // Store the initial object position
        setDragStartPos([item.position[0], item.position[1], item.position[2]]);
        
        // Calculate drag plane height to match the object's current position
        plane.constant = -item.position[1];
        
        // Start tracking pointer move and up events
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        
        return false; // Prevent event from propagating to room
      }
    };
    
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      
      // Convert pointer to normalized device coordinates
      pointer.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
      
      // Cast a ray to the plane
      raycaster.setFromCamera(pointer, camera);
      
      // Get the point where the ray intersects the plane
      if (raycaster.ray.intersectPlane(plane, planeIntersection)) {
        const newPosition: [number, number, number] = [
          planeIntersection.x,
          item.position[1], // Keep original height
          planeIntersection.z
        ];
        
        // Check if new position is valid
        if (checkValidPosition(item.id, newPosition)) {
          onPositionChange(item.id, newPosition);
        }
      }
      
      event.preventDefault();
    };
    
    const handlePointerUp = (event: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        
        // Clean up event listeners
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      }
    };
    
    // Add event listener for pointer down on the canvas
    gl.domElement.addEventListener('pointerdown', handlePointerDown);
    
    // Cleanup event listeners
    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    item, 
    isDragging, 
    raycaster, 
    pointer, 
    camera, 
    onPositionChange, 
    onSelect, 
    checkValidPosition, 
    plane, 
    planeIntersection,
    gl.domElement
  ]);

  return (
    <group>
      {/* Invisible hit box for better drag detection */}
      <mesh
        ref={hitBoxRef}
        position={item.position}
        scale={[item.size[0] * 1.1, item.size[1] * 1.1, item.size[2] * 1.1]}
        visible={false}
      >
        <boxGeometry />
        <meshBasicMaterial opacity={0} transparent={true} />
      </mesh>
      
      {/* Actual visible furniture */}
      <Furniture
        id={item.id}
        position={item.position}
        color={item.color}
        size={item.size}
        type={item.type}
        materialType={item.materialType}
        isSelected={isSelected}
        onSelect={onSelect}
      />
      
      {isSelected && (
        <TransformControls
          ref={transformRef}
          position={item.position}
          mode="translate"
          onObjectChange={handleTransformChange}
          showX={true}
          showY={false} // Prevent vertical movement
          showZ={true}
          size={0.7}
          translationSnap={0.25} // Snap to grid for better placement
        />
      )}
    </group>
  );
}

export default Furniture3D;
