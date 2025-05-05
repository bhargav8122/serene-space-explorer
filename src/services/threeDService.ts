
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

// Enhanced quality settings for better material rendering
export const getMaterialQuality = () => {
  return {
    roughness: 0.25,
    metalness: 0.15,
    envMapIntensity: 1.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.05,
    normalScale: 0.7,
    transmission: 0.0,
    ior: 1.5,
    reflectivity: 0.6,
    aoMapIntensity: 1.0,
    lightMapIntensity: 1.0,
    displacementScale: 0.1
  };
};

// Enhanced texture settings for more realistic materials
export const getTextureSettings = (materialType: string) => {
  switch (materialType) {
    case 'wood':
      return {
        roughness: 0.65,
        metalness: 0.0,
        color: '#a67c52',
        bumpScale: 0.05,
        aoMapIntensity: 1.0,
        envMapIntensity: 0.8,
        clearcoat: 0.1,
        clearcoatRoughness: 0.3
      };
    case 'fabric':
      return {
        roughness: 0.9,
        metalness: 0.0,
        color: '#e0e0e0',
        bumpScale: 0.03,
        aoMapIntensity: 1.0,
        envMapIntensity: 0.5,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0
      };
    case 'metal':
      return {
        roughness: 0.1,
        metalness: 0.9,
        color: '#d0d0d0',
        bumpScale: 0.01,
        aoMapIntensity: 1.0,
        envMapIntensity: 1.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1
      };
    case 'glass':
      return {
        roughness: 0.03,
        metalness: 0.0,
        transmission: 0.95,
        color: '#ffffff',
        clearcoat: 1.0,
        ior: 1.5,
        envMapIntensity: 2.0,
        clearcoatRoughness: 0.02
      };
    case 'leather':
      return {
        roughness: 0.5,
        metalness: 0.05,
        color: '#614126',
        bumpScale: 0.04,
        aoMapIntensity: 1.0,
        envMapIntensity: 0.7,
        clearcoat: 0.2,
        clearcoatRoughness: 0.2
      };
    case 'marble':
      return {
        roughness: 0.15,
        metalness: 0.0,
        color: '#f5f5f5',
        bumpScale: 0.02,
        aoMapIntensity: 0.7,
        envMapIntensity: 1.0,
        clearcoat: 0.7,
        clearcoatRoughness: 0.05
      };
    case 'concrete':
      return {
        roughness: 0.8,
        metalness: 0.0,
        color: '#c2c2c2',
        bumpScale: 0.05,
        aoMapIntensity: 1.2,
        envMapIntensity: 0.5,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0
      };
    case 'ceramic':
      return {
        roughness: 0.25,
        metalness: 0.0,
        color: '#f7f7f7',
        bumpScale: 0.01,
        aoMapIntensity: 0.8,
        envMapIntensity: 0.9,
        clearcoat: 0.4,
        clearcoatRoughness: 0.1
      };
    default:
      return {
        roughness: 0.4,
        metalness: 0.0,
        color: '#a0a0a0',
        bumpScale: 0.02,
        aoMapIntensity: 1.0,
        envMapIntensity: 1.0,
        clearcoat: 0.1,
        clearcoatRoughness: 0.1
      };
  }
};

// New function to get lighting settings based on room type
export const getLightingSettings = (roomType: string) => {
  switch (roomType) {
    case 'living-room':
      return {
        ambientIntensity: 0.5,
        directionalIntensity: 1.6,
        pointLightIntensity: 0.7,
        pointLightColor: '#fff9e0',
        shadowSoftness: 0.8,
      };
    case 'kitchen':
      return {
        ambientIntensity: 0.6,
        directionalIntensity: 1.8,
        pointLightIntensity: 0.9,
        pointLightColor: '#ffffff',
        shadowSoftness: 0.6,
      };
    case 'bedroom':
      return {
        ambientIntensity: 0.4,
        directionalIntensity: 1.4,
        pointLightIntensity: 0.6,
        pointLightColor: '#fff2d6',
        shadowSoftness: 0.9,
      };
    case 'hall':
      return {
        ambientIntensity: 0.45,
        directionalIntensity: 1.5,
        pointLightIntensity: 0.7,
        pointLightColor: '#fffaed',
        shadowSoftness: 0.7,
      };
    case 'master-bedroom':
      return {
        ambientIntensity: 0.35,
        directionalIntensity: 1.3,
        pointLightIntensity: 0.6,
        pointLightColor: '#ffedcc',
        shadowSoftness: 1.0,
      };
    default:
      return {
        ambientIntensity: 0.5,
        directionalIntensity: 1.5,
        pointLightIntensity: 0.7,
        pointLightColor: '#ffffff',
        shadowSoftness: 0.8,
      };
  }
};

// Enhanced color schemes for different design styles
export const getRoomColorScheme = (designStyle: string) => {
  switch (designStyle) {
    case 'modern':
      return {
        primary: '#3b4a6b',
        secondary: '#f5f5f5',
        accent: '#c0a080',
        neutral: '#e0e0e0',
        wood: '#a67c52'
      };
    case 'minimalist':
      return {
        primary: '#2a2a2a',
        secondary: '#ffffff',
        accent: '#a0a0a0',
        neutral: '#f0f0f0',
        wood: '#d7cca1'
      };
    case 'scandinavian':
      return {
        primary: '#f9f9f9',
        secondary: '#e8e8e8',
        accent: '#7ea1c4',
        neutral: '#d8d4d0',
        wood: '#e3d5c0'
      };
    case 'industrial':
      return {
        primary: '#5a5a5a',
        secondary: '#d0ccc0',
        accent: '#8b5a2b',
        neutral: '#a9a9a9',
        wood: '#64483c'
      };
    case 'mid-century':
      return {
        primary: '#e8d5b5',
        secondary: '#2a4747',
        accent: '#ea6a47',
        neutral: '#c9c9c9',
        wood: '#8b5a2b'
      };
    default:
      return {
        primary: '#3b4a6b',
        secondary: '#f5f5f5',
        accent: '#c0a080',
        neutral: '#e0e0e0',
        wood: '#8b5a2b'
      };
  }
};
