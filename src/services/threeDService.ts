
import { toast } from "sonner";

interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const transformObject = async (
  objectId: number,
  position: [number, number, number]
): Promise<APIResponse> => {
  try {
    // In a real app, this would be a real API call
    // For demo purposes, we'll simulate a successful response
    // const response = await fetch('/api/transform', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ objectId, position }),
    // });
    
    // const data = await response.json();
    // if (!response.ok) {
    //   throw new Error(data.message || 'Failed to transform object');
    // }
    
    // return data;
    
    // Simulated successful response
    return {
      success: true,
      message: 'Object transformed successfully',
      data: { position }
    };
  } catch (error) {
    console.error('Transform error:', error);
    toast.error('Failed to transform object');
    return { success: false, message: 'Transform failed' };
  }
};

export const saveFurnitureState = async (
  furniture: any[]
): Promise<APIResponse> => {
  try {
    // In a real app, this would be a real API call
    // For demo purposes, we'll simulate a successful response
    // const response = await fetch('/api/save-state', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ furniture }),
    // });
    
    // const data = await response.json();
    // if (!response.ok) {
    //   throw new Error(data.message || 'Failed to save state');
    // }
    
    // return data;
    
    // Simulated successful response
    return {
      success: true,
      message: 'Furniture state saved successfully',
      data: { furniture }
    };
  } catch (error) {
    console.error('Save state error:', error);
    toast.error('Failed to save design state');
    return { success: false, message: 'Save failed' };
  }
};

export const downloadDesign = async (
  furniture: any[]
): Promise<APIResponse> => {
  try {
    // In a real app, this would be a real API call to generate a downloadable file
    // For demo purposes, we'll simulate a successful response
    // const response = await fetch('/api/download-design', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ furniture }),
    // });
    
    // const data = await response.json();
    // if (!response.ok) {
    //   throw new Error(data.message || 'Failed to prepare design for download');
    // }
    
    // return data;
    
    // Simulated successful response
    return {
      success: true,
      message: 'Design ready for download',
      data: { furniture }
    };
  } catch (error) {
    console.error('Download design error:', error);
    toast.error('Failed to prepare design for download');
    return { success: false, message: 'Download preparation failed' };
  }
};

// New function for getting material quality settings
export const getMaterialQuality = () => {
  return {
    roughness: 0.3,
    metalness: 0.1,
    envMapIntensity: 1.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    normalScale: 0.5,
    transmission: 0.0,
    ior: 1.5,
    reflectivity: 0.5
  };
};

// New function for getting realistic textures for different materials
export const getTextureSettings = (materialType: string) => {
  switch (materialType) {
    case 'wood':
      return {
        roughness: 0.65,
        metalness: 0.0,
        color: '#8b5a2b',
        bumpScale: 0.05
      };
    case 'fabric':
      return {
        roughness: 0.85,
        metalness: 0.0,
        color: '#e0e0e0',
        bumpScale: 0.02
      };
    case 'metal':
      return {
        roughness: 0.2,
        metalness: 0.8,
        color: '#c0c0c0',
        bumpScale: 0.01
      };
    case 'glass':
      return {
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.9,
        color: '#ffffff',
        clearcoat: 1.0
      };
    case 'leather':
      return {
        roughness: 0.6,
        metalness: 0.05,
        color: '#614126',
        bumpScale: 0.03
      };
    default:
      return {
        roughness: 0.5,
        metalness: 0.0,
        color: '#a0a0a0',
        bumpScale: 0.01
      };
  }
};
