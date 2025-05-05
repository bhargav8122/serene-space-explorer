
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Download, Save, Cloud } from "lucide-react";
import { FurnitureItem } from './Furniture3D';
import { colorOptions } from './FurnitureData';
import { saveFurnitureState, downloadDesign } from '../../services/threeDService';
import { getCurrentUser } from '@/utils/authUtils';

interface DesignerControlsProps {
  currentFurniture: FurnitureItem[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedFurniture: number | null;
  addFurniture: (option: FurnitureItem) => void;
  deleteFurniture: () => void;
  saveDesign: () => void;
  loadDesign: () => void;
  roomType: string;
}

const DesignerControls = ({
  currentFurniture,
  selectedColor,
  setSelectedColor,
  selectedFurniture,
  addFurniture,
  deleteFurniture,
  saveDesign,
  loadDesign,
  roomType
}: DesignerControlsProps) => {
  
  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-interior-navy">Furniture</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {currentFurniture.map((option) => (
          <Button
            key={option.id}
            onClick={() => addFurniture(option)}
            className="w-full justify-between bg-interior-navy hover:bg-blue-900 flex flex-col items-start p-3"
          >
            <div className="flex justify-between w-full">
              <span>{option.name}</span>
              <span className="text-xs px-2 py-0.5 bg-white/20 rounded">Add</span>
            </div>
            {option.description && (
              <p className="text-xs text-left text-white/80 mt-1 line-clamp-2">{option.description}</p>
            )}
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
          onClick={() => {
            const currentUser = getCurrentUser();
            if (!currentUser) {
              toast.error("Please log in to download your design");
              return;
            }
            
            downloadDesign([]).then(result => {
              if (result.success) {
                toast.success("Design prepared for download!");
                
                // Create and trigger download
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({}));
                const downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download", `${roomType}-design.json`);
                document.body.appendChild(downloadAnchorNode);
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
              }
            });
          }}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <Download className="mr-2 h-4 w-4" /> Download Design
        </Button>
      </div>
    </div>
  );
};

export default DesignerControls;
