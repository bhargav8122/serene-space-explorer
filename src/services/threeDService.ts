
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
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objectId, position }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to transform object');
    }
    
    return data;
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
    const response = await fetch('/api/save-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ furniture }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to save state');
    }
    
    return data;
  } catch (error) {
    console.error('Save state error:', error);
    toast.error('Failed to save design state');
    return { success: false, message: 'Save failed' };
  }
};
