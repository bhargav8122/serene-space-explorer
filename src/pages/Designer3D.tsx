import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, TransformControls, Sky, Bounds, SoftShadows, ContactShadows } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { MoveHorizontal, MoveVertical, Trash2, Download, Save, Cloud } from "lucide-react";
import { transformObject, saveFurnitureState, downloadDesign } from '../services/threeDService';
import { getCurrentUser } from '@/utils/authUtils';

// Enable better shadows for more realistic rendering
// SoftShadows() should be called inside the Canvas component, so removing this.

// A simple room model with enhanced realism
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow castShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Back Wall */}
      <mesh receiveShadow position={[0, 5, -5]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.75} />
      </mesh>
      
      {/* Left Wall */}
      <mesh receiveShadow position={[-5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" roughness={0.75} />
      </mesh>
      
      {/* Right Wall */}
      <mesh receiveShadow position={[5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" roughness={0.75} />
      </mesh>
      
      {/* Baseboard */}
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
    </group>
  );
}

// Types for furniture
interface FurnitureItem {
  id: number;
  name: string;
  type: string;
  color: string;
  size: [number, number, number]; // Explicitly typed as tuple with 3 elements
}

interface PlacedFurnitureItem {
  id: number;
  type: string;
  color: string;
  size: [number, number, number]; // Explicitly typed as tuple with 3 elements
  position: [number, number, number];
}

// A selectable and movable furniture component with enhanced materials
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
      <meshStandardMaterial 
        color={color} 
        roughness={0.7}
        metalness={0.2}
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

// List of furniture options
const furnitureOptions: FurnitureItem[] = [
  { id: 1, name: "Sofa", type: "cube", color: "#8b4513", size: [3, 1, 1.5] },
  { id: 2, name: "Coffee Table", type: "cube", color: "#d2b48c", size: [2, 0.5, 1] },
  { id: 3, name: "Dining Table", type: "cube", color: "#a0522d", size: [2.5, 0.8, 1.5] },
  { id: 4, name: "Chair", type: "cube", color: "#deb887", size: [0.8, 1.2, 0.8] },
  { id: 5, name: "Plant", type: "cylinder", color: "#228b22", size: [0.5, 1.5, 0.5] },
  { id: 6, name: "Bookshelf", type: "cube", color: "#cd853f", size: [2, 3, 0.8] }
];

// Color options for furniture
const colorOptions = ["#8b4513", "#d2b48c", "#a0522d", "#deb887", "#228b22", "#cd853f", "#f5f5dc", "#b22222"];

const Designer3D = () => {
  const navigate = useNavigate();
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurnitureItem[]>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#8b4513");
  
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
      localStorage.setItem('savedDesign', JSON.stringify(placedFurniture));
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
      downloadAnchorNode.setAttribute("download", "room-design.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  };

  const loadDesign = () => {
    const savedDesign = localStorage.getItem('savedDesign');
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl font-bold text-interior-navy mb-4">3D Interior Designer</h1>
            <p className="text-gray-700 mb-4">
              Design your dream space in real-time with our 3D interior designer.
            </p>
          </div>
        </section>

        {/* Canvas and Controls */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Furniture Controls */}
              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-interior-navy">Furniture</h2>
                <div className="space-y-4">
                  {furnitureOptions.map((option) => (
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
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
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
                  <ambientLight intensity={0.3} />
                  <spotLight 
                    position={[0, 10, 10]} 
                    angle={0.3} 
                    penumbra={1} 
                    intensity={1} 
                    castShadow 
                    shadow-mapSize={[2048, 2048]}
                  />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  
                  <Room />
                  
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
                    opacity={0.4} 
                    scale={10} 
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
                <li>Click on furniture items from the menu to add them to your scene</li>
                <li>Use the color picker to select different colors for your furniture</li>
                <li>Click on any furniture item to select it - it will highlight in red</li>
                <li>Use the arrow controls that appear to move the selected furniture</li>
                <li>Click the "Remove Item" button to delete selected furniture</li>
                <li>Click and drag in the 3D view to rotate the camera (when no item is selected)</li>
                <li>Use the scroll wheel to zoom in and out</li>
                <li>Save your design to come back to it later</li>
                <li>Download your design as a file to share or import later</li>
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
