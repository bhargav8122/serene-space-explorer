
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

  const addFurniture = useCallback((option: any) => {
    const newFurniture: PlacedFurnitureItem = {
      id: Date.now(),
      type: option.type,
      color: selectedColor,
      materialType: option.materialType || 'default',
      size: option.size,
      position: [0, option.size[1]/2, 0]
    };
    setPlacedFurniture(prev => [...prev, newFurniture]);
    toast.success(`Added ${option.name}`);
  }, [selectedColor]);

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
    setPlacedFurniture(prev => 
      prev.map(item => 
        item.id === id ? { ...item, position: newPosition } : item
      )
    );
    
    // Call API to transform object
    transformObject(id, newPosition);
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
            <h1 className="text-3xl font-bold text-interior-navy mb-4">Bhargav Space 3D {getRoomTitle()} Designer</h1>
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
                        onDragStart={(position) => handleDragStart(item.id, position)}
                        onDragEnd={(position) => handleDragEnd(item.id, position)}
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
