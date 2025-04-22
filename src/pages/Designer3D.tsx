
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

// A simple room model
function Room(props: any) {
  return (
    <group {...props} dispose={null}>
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#f3f3f3" />
      </mesh>
      <mesh receiveShadow position={[0, 5, -5]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh receiveShadow position={[-5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" />
      </mesh>
      <mesh receiveShadow position={[5, 5, 0]}>
        <boxGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#e6e6e6" />
      </mesh>
    </group>
  );
}

// A simple movable furniture component
function Furniture({ position, color, size, type }: { position: [number, number, number], color: string, size: [number, number, number], type: string }) {
  return (
    <mesh position={position} castShadow>
      {type === 'cube' && <boxGeometry args={size} />}
      {type === 'cylinder' && <cylinderGeometry args={[size[0], size[0], size[1], 32]} />}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// List of furniture options
const furnitureOptions = [
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
  const [placedFurniture, setPlacedFurniture] = useState<Array<{id: number, type: string, color: string, size: [number, number, number], position: [number, number, number]}>>([]);
  const [selectedFurniture, setSelectedFurniture] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#8b4513");

  const addFurniture = (option: typeof furnitureOptions[0]) => {
    const newFurniture = {
      id: Date.now(),
      type: option.type,
      color: selectedColor,
      size: option.size,
      position: [0, option.size[1]/2, 0] as [number, number, number]
    };
    setPlacedFurniture([...placedFurniture, newFurniture]);
    toast.success(`Added ${option.name}`);
  };

  const saveDeisgn = () => {
    localStorage.setItem('savedDesign', JSON.stringify(placedFurniture));
    toast.success("Design saved successfully!");
  };

  const loadDesign = () => {
    const savedDesign = localStorage.getItem('savedDesign');
    if (savedDesign) {
      setPlacedFurniture(JSON.parse(savedDesign));
      toast.success("Design loaded successfully!");
    } else {
      toast.error("No saved design found");
    }
  };

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
                
                <div className="mt-6 space-y-2">
                  <Button
                    onClick={saveDeisgn}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Save Design
                  </Button>
                  <Button
                    onClick={loadDesign}
                    variant="outline"
                    className="w-full border-interior-navy text-interior-navy hover:bg-interior-navy hover:text-white"
                  >
                    Load Design
                  </Button>
                </div>
              </div>
              
              {/* 3D Canvas */}
              <div className="lg:col-span-3 bg-gray-100 rounded-lg shadow-md" style={{ height: "600px" }}>
                <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                  <pointLight position={[-10, -10, -10]} />
                  
                  <Room />
                  
                  {placedFurniture.map((item) => (
                    <Furniture
                      key={item.id}
                      position={item.position}
                      color={item.color}
                      size={item.size}
                      type={item.type}
                    />
                  ))}
                  
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  <Environment preset="apartment" />
                </Canvas>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-interior-navy">How to Use</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Click on furniture items from the menu to add them to your scene</li>
                <li>Use the color picker to select different colors for your furniture</li>
                <li>Click and drag in the 3D view to rotate the camera</li>
                <li>Use the scroll wheel to zoom in and out</li>
                <li>Save your design to come back to it later</li>
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
