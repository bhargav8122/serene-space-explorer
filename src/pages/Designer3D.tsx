
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, TransformControls, Sky, Bounds, SoftShadows, ContactShadows } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { MoveHorizontal, MoveVertical, Trash2, Download, Save, Cloud } from "lucide-react";
import { transformObject, saveFurnitureState, downloadDesign } from '../services/threeDService';
import { getCurrentUser } from '@/utils/authUtils';

// A realistic room model with enhanced materials and lighting
function Room({ roomType = 'living-room' }) {
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
    </group>
  );
}

// Types for furniture
interface FurnitureItem {
  id: number;
  name: string;
  type: string;
  color: string;
  size: [number, number, number]; 
}

interface PlacedFurnitureItem {
  id: number;
  type: string;
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
  onSelect 
}: { 
  position: [number, number, number], 
  color: string, 
  size: [number, number, number], 
  type: string,
  id: number,
  isSelected: boolean,
  onSelect: (id: number) => void
}) {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <mesh 
      position={position} 
      castShadow 
      receiveShadow
      onClick={handleClick}
    >
      {type === 'cube' && <boxGeometry args={size} />}
      {type === 'cylinder' && <cylinderGeometry args={[size[0], size[0], size[1], 32]} />}
      {type === 'sphere' && <sphereGeometry args={[size[0], 32, 32]} />}
      <meshStandardMaterial 
        color={color} 
        roughness={0.65}
        metalness={0.25}
        emissive={isSelected ? '#ff0000' : undefined}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
    </mesh>
  );
}

// Furniture with transform controls when selected
function FurnitureWithControls({
  item,
  isSelected,
  onSelect,
  onPositionChange
}: {
  item: PlacedFurnitureItem,
  isSelected: boolean,
  onSelect: (id: number) => void,
  onPositionChange: (id: number, newPosition: [number, number, number]) => void
}) {
  const transformRef = useRef<any>(null);
  
  const handleChange = async () => {
    if (transformRef.current && transformRef.current.object) {
      const newPosition = transformRef.current.object.position.toArray() as [number, number, number];
      
      // Call API to transform object
      const result = await transformObject(item.id, newPosition);
      if (result.success) {
        onPositionChange(item.id, newPosition);
      }
    }
  };

  return (
    <>
      <Furniture
        id={item.id}
        position={item.position}
        color={item.color}
        size={item.size}
        type={item.type}
        isSelected={isSelected}
        onSelect={onSelect}
      />
      {isSelected && (
        <TransformControls
          ref={transformRef}
          position={item.position}
          mode="translate"
          onObjectChange={handleChange}
        />
      )}
    </>
  );
}

// Enhanced furniture options with more realistic items for each room type
const furnitureOptions: Record<string, FurnitureItem[]> = {
  'living-room': [
    { id: 1, name: "Modern Sofa", type: "cube", color: "#607d8b", size: [3, 1, 1.5] },
    { id: 2, name: "Glass Coffee Table", type: "cube", color: "#b0bec5", size: [2, 0.5, 1] },
    { id: 3, name: "Bookshelf", type: "cube", color: "#795548", size: [2, 3, 0.8] },
    { id: 4, name: "Armchair", type: "cube", color: "#546e7a", size: [1.2, 1, 1.2] },
    { id: 5, name: "Floor Lamp", type: "cylinder", color: "#9e9e9e", size: [0.3, 2.5, 0.3] },
    { id: 6, name: "TV Stand", type: "cube", color: "#6d4c41", size: [3, 0.8, 0.6] },
    { id: 7, name: "Area Rug", type: "cube", color: "#b39ddb", size: [4, 0.05, 3] },
    { id: 8, name: "Side Table", type: "cylinder", color: "#a1887f", size: [0.5, 0.6, 0.5] },
    { id: 9, name: "Wall Art", type: "cube", color: "#9fa8da", size: [1.5, 1, 0.05] },
    { id: 10, name: "Indoor Plant", type: "cylinder", color: "#81c784", size: [0.4, 1.2, 0.4] },
    { id: 11, name: "Ottoman", type: "cube", color: "#9b87f5", size: [0.8, 0.4, 0.8] },
    { id: 12, name: "Media Console", type: "cube", color: "#8d6e63", size: [4, 0.6, 0.6] }
  ],
  'kitchen': [
    { id: 1, name: "Dining Table", type: "cube", color: "#8d6e63", size: [2.5, 0.8, 1.5] },
    { id: 2, name: "Dining Chair", type: "cube", color: "#a1887f", size: [0.6, 1, 0.6] },
    { id: 3, name: "Kitchen Island", type: "cube", color: "#90a4ae", size: [2, 1, 1.5] },
    { id: 4, name: "Bar Stool", type: "cylinder", color: "#616161", size: [0.4, 0.8, 0.4] },
    { id: 5, name: "Cabinet", type: "cube", color: "#eceff1", size: [1.5, 1.8, 0.6] },
    { id: 6, name: "Refrigerator", type: "cube", color: "#cfd8dc", size: [1.2, 2.5, 0.8] },
    { id: 7, name: "Pendant Light", type: "cylinder", color: "#ffab91", size: [0.3, 0.4, 0.3] },
    { id: 8, name: "Microwave", type: "cube", color: "#616161", size: [0.6, 0.4, 0.5] },
    { id: 9, name: "Coffee Machine", type: "cube", color: "#424242", size: [0.5, 0.4, 0.3] },
    { id: 10, name: "Wine Rack", type: "cube", color: "#8d6e63", size: [0.6, 1.2, 0.3] },
    { id: 11, name: "Kitchen Utensil Holder", type: "cylinder", color: "#d7ccc8", size: [0.2, 0.3, 0.2] },
    { id: 12, name: "Cutting Board", type: "cube", color: "#bcaaa4", size: [0.5, 0.05, 0.3] }
  ],
  'bedroom': [
    { id: 1, name: "Nightstand", type: "cube", color: "#a1887f", size: [1, 0.8, 1] },
    { id: 2, name: "Dresser", type: "cube", color: "#8d6e63", size: [2, 1.2, 0.8] },
    { id: 3, name: "Accent Chair", type: "cube", color: "#90caf9", size: [0.8, 1, 0.8] },
    { id: 4, name: "Table Lamp", type: "cylinder", color: "#e0e0e0", size: [0.3, 0.6, 0.3] },
    { id: 5, name: "Wardrobe", type: "cube", color: "#8d6e63", size: [2, 4, 1] },
    { id: 6, name: "Vanity Table", type: "cube", color: "#bcaaa4", size: [1.5, 1.2, 0.6] },
    { id: 7, name: "Ottoman", type: "cube", color: "#b39ddb", size: [0.8, 0.4, 0.8] },
    { id: 8, name: "Floor Mirror", type: "cube", color: "#b0bec5", size: [1, 2, 0.1] },
    { id: 9, name: "Bookshelf", type: "cube", color: "#a1887f", size: [1, 2, 0.4] },
    { id: 10, name: "Desk", type: "cube", color: "#bcaaa4", size: [1.4, 0.8, 0.7] },
    { id: 11, name: "Desk Chair", type: "cube", color: "#9e9e9e", size: [0.6, 1, 0.6] },
    { id: 12, name: "Bedside Rug", type: "cube", color: "#ce93d8", size: [1.5, 0.05, 2.5] }
  ],
  'master-bedroom': [
    { id: 1, name: "King Bed Frame", type: "cube", color: "#5d4037", size: [3.5, 0.5, 2.2] },
    { id: 2, name: "Large Dresser", type: "cube", color: "#5d4037", size: [3, 1.2, 0.8] },
    { id: 3, name: "Elegant Chair", type: "cube", color: "#d1c4e9", size: [1, 1.2, 1] },
    { id: 4, name: "Floor Lamp", type: "cylinder", color: "#9e9e9e", size: [0.3, 2, 0.3] },
    { id: 5, name: "Walk-in Closet", type: "cube", color: "#6d4c41", size: [2.5, 3, 1] },
    { id: 6, name: "Chaise Lounge", type: "cube", color: "#9fa8da", size: [2, 0.8, 0.8] },
    { id: 7, name: "Area Rug", type: "cube", color: "#ce93d8", size: [3, 0.05, 2.5] },
    { id: 8, name: "TV Console", type: "cube", color: "#6d4c41", size: [2, 0.6, 0.5] },
    { id: 9, name: "Reading Nook", type: "cube", color: "#9fa8da", size: [1.5, 1.2, 1.5] },
    { id: 10, name: "Pendant Light", type: "sphere", color: "#ffcc80", size: [0.5, 16, 16] },
    { id: 11, name: "Wall Shelves", type: "cube", color: "#8d6e63", size: [2, 0.1, 0.5] },
    { id: 12, name: "Decorative Mirror", type: "cube", color: "#b0bec5", size: [1.8, 2.5, 0.1] }
  ],
  'hall': [
    { id: 1, name: "Console Table", type: "cube", color: "#8d6e63", size: [2, 0.8, 0.6] },
    { id: 2, name: "Wall Mirror", type: "cube", color: "#b0bec5", size: [1.5, 2, 0.1] },
    { id: 3, name: "Coat Rack", type: "cylinder", color: "#795548", size: [0.3, 2, 0.3] },
    { id: 4, name: "Bench", type: "cube", color: "#a1887f", size: [2, 0.5, 0.8] },
    { id: 5, name: "Floor Plant", type: "cylinder", color: "#558b2f", size: [0.4, 1, 0.4] },
    { id: 6, name: "Pendant Light", type: "sphere", color: "#ffcc80", size: [0.4, 16, 16] },
    { id: 7, name: "Runner Rug", type: "cube", color: "#9fa8da", size: [1, 0.05, 3] },
    { id: 8, name: "Wall Sconce", type: "cylinder", color: "#ffcc80", size: [0.2, 0.4, 0.2] },
    { id: 9, name: "Hall Table", type: "cube", color: "#8d6e63", size: [1.2, 0.9, 0.4] },
    { id: 10, name: "Key Holder", type: "cube", color: "#a1887f", size: [0.3, 0.5, 0.1] },
    { id: 11, name: "Umbrella Stand", type: "cylinder", color: "#616161", size: [0.2, 0.6, 0.2] },
    { id: 12, name: "Wall Art", type: "cube", color: "#9fa8da", size: [1, 1.5, 0.05] }
  ]
};

// Modern color palette for furniture
const colorOptions = [
  "#455a64", // Dark blue-gray
  "#607d8b", // Blue-gray
  "#90a4ae", // Light blue-gray
  "#bcaaa4", // Taupe
  "#8d6e63", // Brown
  "#5d4037", // Dark brown
  "#7986cb", // Blue-lavender
  "#9fa8da", // Lavender
  "#ffcc80", // Light orange
  "#ffab91", // Peach
  "#a5d6a7", // Light green
  "#81c784", // Green
  "#fff59d", // Light yellow
  "#e6ee9c",  // Lime
  "#9b87f5", // Primary purple
  "#7E69AB", // Secondary purple
  "#D6BCFA", // Light purple
  "#F2FCE2", // Soft green
  "#FEF7CD", // Soft yellow
  "#FEC6A1", // Soft orange
  "#E5DEFF", // Soft purple
  "#FFDEE2", // Soft pink
  "#FDE1D3", // Soft peach
  "#D3E4FD"  // Soft blue
];

const Designer3D = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#607d8b");
  const [roomType, setRoomType] = useState<string>('living-room');
  
  // Get room type from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const room = params.get('room');
    if (room && ['living-room', 'kitchen', 'bedroom', 'hall', 'master-bedroom'].includes(room)) {
      setRoomType(room);
    }
  }, [location]);
  
  // Check if user is logged in and redirect if not
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Please log in or register to access the 3D designer");
      navigate('/login');
    }
  }, [navigate]);

  const addFurniture = (option: FurnitureItem) => {
    const newFurniture: PlacedFurnitureItem = {
      id: Date.now(),
      type: option.type,
      color: selectedColor,
      size: option.size,
      position: [0, option.size[1]/2, 0]
    };
    setPlacedFurniture([...placedFurniture, newFurniture]);
    toast.success(`Added ${option.name}`);
  };

  const updateFurniturePosition = useCallback((id: number, newPosition: [number, number, number]) => {
    setPlacedFurniture(prev => 
      prev.map(item => 
        item.id === id ? { ...item, position: newPosition } : item
      )
    );
  }, []);

  const deleteFurniture = useCallback(() => {
    if (selectedFurniture !== null) {
      setPlacedFurniture(prev => prev.filter(item => item.id !== selectedFurniture));
      setSelectedFurniture(null);
      toast.success("Item removed");
    }
  }, [selectedFurniture]);

  const saveDesign = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Please log in to save your design");
      return;
    }
    
    const result = await saveFurnitureState(placedFurniture);
    if (result.success) {
      toast.success("Design saved successfully!");
      localStorage.setItem(`savedDesign-${roomType}`, JSON.stringify(placedFurniture));
    }
  };

  const downloadDesignFile = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Please log in to download your design");
      return;
    }
    
    const result = await downloadDesign(placedFurniture);
    if (result.success) {
      toast.success("Design prepared for download!");
      
      // Create and trigger download
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(placedFurniture));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${roomType}-design.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  const loadDesign = () => {
    const savedDesign = localStorage.getItem(`savedDesign-${roomType}`);
    if (savedDesign) {
      const parsedDesign = JSON.parse(savedDesign) as PlacedFurnitureItem[];
      // Ensure all loaded furniture items have the correct types for size and position
      const typedDesign: PlacedFurnitureItem[] = parsedDesign.map(item => ({
        ...item,
        size: item.size as [number, number, number],
        position: item.position as [number, number, number]
      }));
      setPlacedFurniture(typedDesign);
      toast.success("Design loaded successfully!");
    } else {
      toast.error("No saved design found");
    }
  };

  const deselectAll = useCallback(() => {
    setSelectedFurniture(null);
  }, []);

  const getCurrentRoomFurniture = () => {
    return furnitureOptions[roomType] || furnitureOptions['living-room'];
  };

  const getRoomTitle = () => {
    switch (roomType) {
      case 'kitchen': return "Kitchen";
      case 'bedroom': return "Bedroom";
      case 'hall': return "Hall";
      case 'master-bedroom': return "Master Bedroom";
      case 'living-room':
      default: return "Living Room";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold text-interior-navy mb-4">3D {getRoomTitle()} Designer</h1>
            <p className="text-gray-700 mb-4">
              Design your dream {roomType.replace(/-/g, ' ')} in real-time with our modern 3D interior designer.
            </p>
            <div className="flex gap-2 overflow-x-auto py-2">
              <Button
                variant={roomType === 'living-room' ? "default" : "outline"}
                className={roomType === 'living-room' ? "bg-interior-navy" : "border-interior-navy text-interior-navy"}
                onClick={() => navigate('/3d-designer?room=living-room')}
              >
                Living Room
              </Button>
              <Button
                variant={roomType === 'kitchen' ? "default" : "outline"}
                className={roomType === 'kitchen' ? "bg-interior-navy" : "border-interior-navy text-interior-navy"}
                onClick={() => navigate('/3d-designer?room=kitchen')}
              >
                Kitchen
              </Button>
              <Button
                variant={roomType === 'bedroom' ? "default" : "outline"}
                className={roomType === 'bedroom' ? "bg-interior-navy" : "border-interior-navy text-interior-navy"}
                onClick={() => navigate('/3d-designer?room=bedroom')}
              >
                Bedroom
              </Button>
              <Button
                variant={roomType === 'master-bedroom' ? "default" : "outline"}
                className={roomType === 'master-bedroom' ? "bg-interior-navy" : "border-interior-navy text-interior-navy"}
                onClick={() => navigate('/3d-designer?room=master-bedroom')}
              >
                Master Bedroom
              </Button>
              <Button
                variant={roomType === 'hall' ? "default" : "outline"}
                className={roomType === 'hall' ? "bg-interior-navy" : "border-interior-navy text-interior-navy"}
                onClick={() => navigate('/3d-designer?room=hall')}
              >
                Hall
              </Button>
            </div>
          </div>
        </section>

        {/* Canvas and Controls */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Furniture Controls */}
              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-interior-navy">Furniture</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {getCurrentRoomFurniture().map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => addFurniture(option)}
                      className="w-full justify-between bg-interior-navy hover:bg-blue-900"
                    >
                      {option.name} <span className="text-xs">Add</span>
                    </Button>
                  ))}
                </div>

                <h2 className="text-xl font-semibold my-4 text-interior-navy">Colors</h2>
                <div className="grid grid-cols-8 gap-2 mb-4">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
                
                {selectedFurniture !== null && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-3">Item Controls</h3>
                    <Button
                      onClick={deleteFurniture}
                      className="w-full bg-red-500 hover:bg-red-600 mb-2"
                      variant="destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove Item
                    </Button>
                    <p className="text-xs text-gray-600 mt-1">
                      Click and drag the arrows in the 3D view to move the selected item
                    </p>
                  </div>
                )}
                
                <div className="mt-6 space-y-2">
                  <Button
                    onClick={saveDesign}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Design
                  </Button>
                  <Button
                    onClick={loadDesign}
                    variant="outline"
                    className="w-full border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white"
                  >
                    <Cloud className="mr-2 h-4 w-4" /> Load Design
                  </Button>
                  <Button
                    onClick={downloadDesignFile}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Design
                  </Button>
                </div>
              </div>
              
              {/* 3D Canvas */}
              <div className="lg:col-span-3 bg-gray-100 rounded-lg shadow-md" style={{ height: "600px" }}>
                <Canvas 
                  shadows 
                  camera={{ position: [10, 10, 10], fov: 50 }}
                  onClick={deselectAll}
                >
                  <SoftShadows />
                  <ambientLight intensity={0.4} />
                  <spotLight 
                    position={[0, 10, 10]} 
                    angle={0.3} 
                    penumbra={1} 
                    intensity={1.5} 
                    castShadow 
                    shadow-mapSize={[2048, 2048]}
                  />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  
                  <Room roomType={roomType} />
                  
                  <group>
                    {placedFurniture.map((item) => (
                      <FurnitureWithControls
                        key={item.id}
                        item={item}
                        isSelected={selectedFurniture === item.id}
                        onSelect={setSelectedFurniture}
                        onPositionChange={updateFurniturePosition}
                      />
                    ))}
                  </group>
                  
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true} 
                    enabled={selectedFurniture === null}
                    maxPolarAngle={Math.PI / 2}
                  />
                  
                  <Environment preset="apartment" />
                  <ContactShadows 
                    position={[0, 0, 0]} 
                    opacity={0.5} 
                    scale={12} 
                    blur={1.5} 
                    far={10}
                  />
                  <Sky distance={450000} turbidity={8} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
                </Canvas>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-interior-navy">How to Use</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Click on furniture items from the menu to add them to your room</li>
                <li>Use the color picker to select different colors for your furniture</li>
                <li>Click on any furniture item to select it - it will highlight in red</li>
                <li>Use the arrow controls that appear to move the selected furniture</li>
                <li>Click the "Remove Item" button to delete selected furniture</li>
                <li>Click and drag in the 3D view to rotate the camera (when no item is selected)</li>
                <li>Use the scroll wheel to zoom in and out</li>
                <li>Save your design to come back to it later</li>
                <li>Switch between different room types using the buttons at the top</li>
                <li>Create a modern look using our designer-selected color palette</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Designer3D;
