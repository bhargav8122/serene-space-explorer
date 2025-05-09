import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { transformObject, saveFurnitureState, handleDragDrop } from '../services/threeDService';
import { getCurrentUser } from '@/utils/authUtils';
import Room3D from '../components/3d/Room3D';
import Furniture3D, { PlacedFurnitureItem } from '../components/3d/Furniture3D';
import { furnitureOptions } from '../components/3d/FurnitureData';
import DesignerControls from '../components/3d/DesignerControls';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Room size constants to be used for boundary checking
const ROOM_SIZE = {
  'living-room': { width: 10, depth: 10 },
  'kitchen': { width: 8, depth: 10 },
  'bedroom': { width: 8, depth: 8 },
  'hall': { width: 12, depth: 6 },
  'master-bedroom': { width: 10, depth: 10 },
};

const Designer3D = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#607d8b");
  const [roomType, setRoomType] = useState<string>('living-room');
  const [dragStart, setDragStart] = useState<[number, number, number] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const currentUser = getCurrentUser();
  
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

  // Function to check if a position is within room boundaries
  const isWithinRoomBoundaries = (position: [number, number, number], size: [number, number, number]): boolean => {
    const roomDimensions = ROOM_SIZE[roomType as keyof typeof ROOM_SIZE] || { width: 10, depth: 10 };
    
    // Calculate half dimensions for boundary checks
    const halfWidth = size[0] / 2;
    const halfDepth = size[2] / 2;
    const roomHalfWidth = roomDimensions.width / 2;
    const roomHalfDepth = roomDimensions.depth / 2;
    
    // Check if the furniture would be outside room boundaries
    if (
      position[0] - halfWidth < -roomHalfWidth || 
      position[0] + halfWidth > roomHalfWidth ||
      position[2] - halfDepth < -roomHalfDepth ||
      position[2] + halfDepth > roomHalfDepth
    ) {
      return false;
    }
    
    return true;
  };

  // Function to check if a position is valid (not overlapping with existing furniture)
  const isValidPosition = (newFurniture: PlacedFurnitureItem): boolean => {
    // First check room boundaries
    if (!isWithinRoomBoundaries(newFurniture.position, newFurniture.size)) {
      return false;
    }
    
    // Then check collision with other furniture
    for (const existing of placedFurniture) {
      // Skip checking against itself
      if (existing.id === newFurniture.id) continue;
      
      // Calculate distance between centers
      const dx = Math.abs(existing.position[0] - newFurniture.position[0]);
      const dz = Math.abs(existing.position[2] - newFurniture.position[2]);
      
      // Calculate minimum non-overlapping distance
      const minDistanceX = (existing.size[0] + newFurniture.size[0]) / 2;
      const minDistanceZ = (existing.size[2] + newFurniture.size[2]) / 2;
      
      // Check for overlap
      if (dx < minDistanceX && dz < minDistanceZ) {
        return false;
      }
    }
    return true;
  };

  const addFurniture = useCallback((option: any) => {
    const roomDimensions = ROOM_SIZE[roomType as keyof typeof ROOM_SIZE] || { width: 10, depth: 10 };
    
    // Start with a reasonable position in the room
    const newFurniture: PlacedFurnitureItem = {
      id: Date.now(),
      type: option.type,
      color: selectedColor,
      materialType: option.materialType || 'default',
      size: option.size,
      position: [0, option.size[1]/2, 0] // Start at center of room
    };
    
    // Find a valid position for the new furniture
    let attempts = 0;
    const maxAttempts = 30; // Increase attempts to find a valid position
    let validPosition = false;
    
    while (!validPosition && attempts < maxAttempts) {
      // Try different positions in a grid pattern, starting from center and moving outward
      const gridSize = 1;
      const x = ((attempts % 5) - 2) * gridSize;
      const z = (Math.floor(attempts / 5) - 2) * gridSize;
      
      newFurniture.position = [x, newFurniture.size[1]/2, z];
      validPosition = isValidPosition(newFurniture);
      attempts++;
    }
    
    if (validPosition) {
      setPlacedFurniture(prev => [...prev, newFurniture]);
      toast.success(`Added ${option.name}`);
    } else {
      toast.error("Not enough space to place this furniture. Try removing some items first.");
    }
  }, [selectedColor, placedFurniture, roomType]);

  const handleDragStart = useCallback((id: number, position: [number, number, number]) => {
    setDragStart(position);
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((id: number, endPosition: [number, number, number]) => {
    if (dragStart) {
      handleDragDrop(id, dragStart, endPosition);
      setDragStart(null);
      setIsDragging(false);
    }
  }, [dragStart]);

  const updateFurniturePosition = useCallback((id: number, newPosition: [number, number, number]) => {
    // Create a temporary furniture item with the new position to check for collisions
    const furnitureToUpdate = placedFurniture.find(item => item.id === id);
    
    if (!furnitureToUpdate) return;
    
    // Keep y position (height) unchanged
    const adjustedPosition: [number, number, number] = [
      newPosition[0],
      furnitureToUpdate.position[1], // Keep original height
      newPosition[2]
    ];
    
    const tempFurniture = {
      ...furnitureToUpdate,
      position: adjustedPosition
    };
    
    // Check if new position is valid (within boundaries and not overlapping)
    if (isValidPosition(tempFurniture)) {
      setPlacedFurniture(prev => 
        prev.map(item => 
          item.id === id ? { ...item, position: adjustedPosition } : item
        )
      );
      
      // Call API to transform object
      transformObject(id, adjustedPosition);
    } else {
      // If position is invalid, show message and don't update
      if (!isWithinRoomBoundaries(adjustedPosition, furnitureToUpdate.size)) {
        toast.error("Cannot move furniture outside the room boundaries.");
      } else {
        toast.error("Cannot move furniture to that position - it would overlap with another item.");
      }
    }
  }, [placedFurniture]);

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

  const loadDesign = () => {
    const savedDesign = localStorage.getItem(`savedDesign-${roomType}`);
    if (savedDesign) {
      try {
        const parsedDesign = JSON.parse(savedDesign) as PlacedFurnitureItem[];
        // Ensure all loaded furniture items have the correct types for size and position
        const typedDesign: PlacedFurnitureItem[] = parsedDesign.map(item => ({
          ...item,
          size: item.size as [number, number, number],
          position: item.position as [number, number, number]
        }));
        setPlacedFurniture(typedDesign);
        toast.success("Design loaded successfully!");
      } catch (error) {
        toast.error("Error loading design");
        console.error("Error loading design:", error);
      }
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
            <h1 className="text-3xl font-bold text-interior-navy mb-4">DreamSpace 3D {getRoomTitle()} Designer</h1>
            <p className="text-gray-700 mb-4">
              Design your dream {roomType.replace(/-/g, ' ')} in real-time with our modern 3D interior designer.
            </p>
            <div className="flex flex-wrap gap-2 overflow-x-auto py-2">
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
              {currentUser && (
                <Link to="/">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white ml-auto"
                  >
                    Homepage
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Canvas and Controls */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Furniture Controls */}
              <DesignerControls
                currentFurniture={getCurrentRoomFurniture()}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedFurniture={selectedFurniture}
                addFurniture={addFurniture}
                deleteFurniture={deleteFurniture}
                saveDesign={saveDesign}
                loadDesign={loadDesign}
                roomType={roomType}
              />
              
              {/* 3D Canvas */}
              <div className="lg:col-span-3 bg-gray-100 rounded-lg shadow-md" style={{ height: "600px" }}>
                <Canvas 
                  ref={canvasRef}
                  shadows 
                  camera={{ position: [10, 10, 10], fov: 50 }}
                  onClick={deselectAll}
                >
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
                  
                  <Room3D roomType={roomType} />
                  
                  <group>
                    {placedFurniture.map((item) => (
                      <Furniture3D
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
                    enabled={selectedFurniture === null && !isDragging}
                    maxPolarAngle={Math.PI / 2}
                  />
                </Canvas>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-interior-navy">How to Use</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Click on furniture items from the menu to add them to your room</li>
                <li>Use the color picker to select different colors for your furniture</li>
                <li>Click on any furniture item to select it - it will highlight in red</li>
                <li>Click and drag furniture items directly to move them around your room</li>
                <li>Use the arrow controls that appear to move the selected furniture precisely</li>
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
