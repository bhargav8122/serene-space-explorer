
import { FurnitureItem } from './Furniture3D';

// Enhanced furniture options with more realistic items for each room type
export const furnitureOptions: Record<string, FurnitureItem[]> = {
  'living-room': [
    { 
      id: 1, 
      name: "Modern L-Shaped Sofa", 
      type: "l-shaped-sofa", 
      color: "#607d8b", 
      size: [3, 1, 1.5],
      materialType: "fabric",
      description: "A realistic 3D model of a modern L-shaped sectional sofa with soft fabric texture, fine seams, and adjustable cushions."
    },
    { 
      id: 2, 
      name: "Minimalist Coffee Table", 
      type: "coffee-table", 
      color: "#b0bec5", 
      size: [2, 0.5, 1],
      materialType: "wood",
      description: "A 3D low-profile minimalist coffee table in matte black metal frame with a wooden top surface, with physically accurate reflections."
    },
    { 
      id: 3, 
      name: "Bookshelf", 
      type: "bookshelf", 
      color: "#795548", 
      size: [2, 3, 0.8],
      materialType: "wood",
      description: "A tall 3D bookshelf model with adjustable shelf heights, wood grain textures, loaded with a few books and decor pieces."
    },
    { 
      id: 4, 
      name: "Accent Chair", 
      type: "accent-chair", 
      color: "#d6bcfa", 
      size: [1.2, 1, 1.2],
      materialType: "fabric",
      description: "A 3D interior accent chair with velvet fabric texture, curved backrest, golden metal legs, and soft shadows."
    },
    { 
      id: 5, 
      name: "TV Console", 
      type: "tv-console", 
      color: "#6d4c41", 
      size: [3, 0.8, 0.6],
      materialType: "wood",
      description: "A realistic 3D TV console in mid-century modern style, walnut finish, matte texture, clean lines, with doors and drawers."
    },
    { 
      id: 6, 
      name: "Area Rug", 
      type: "rug", 
      color: "#b39ddb", 
      size: [4, 0.05, 3],
      materialType: "fabric",
      description: "A soft textured 3D rug in bohemian style, thick fibers, placed under furniture with realistic shadowing."
    },
    { 
      id: 7, 
      name: "Pendant Light", 
      type: "pendant-light", 
      color: "#ffab91", 
      size: [0.4, 2, 0.4],
      materialType: "metal",
      description: "3D pendant lighting model hanging from ceiling, industrial style with warm light emission and soft shadows."
    },
    { 
      id: 8, 
      name: "Indoor Plant", 
      type: "indoor-plant", 
      color: "#81c784", 
      size: [0.4, 1.2, 0.4],
      materialType: "default",
      description: "A 3D indoor plant model in a ceramic pot, high poly leaves with natural green texture and light scatter."
    }
  ],
  'kitchen': [
    { 
      id: 1, 
      name: "Dining Table Set", 
      type: "dining-table-set", 
      color: "#8d6e63", 
      size: [2.5, 0.8, 1.5],
      materialType: "wood",
      description: "A realistic 3D dining table set including a rectangular oak wood table and six cushioned chairs, realistic wood grain."
    },
    { 
      id: 2, 
      name: "Kitchen Island", 
      type: "cube", 
      color: "#90a4ae", 
      size: [2, 1, 1.5],
      materialType: "wood",
      description: "Modern kitchen island with stone top surface, storage cabinets, and space for bar stools."
    },
    { 
      id: 3, 
      name: "Bar Stool", 
      type: "cylinder", 
      color: "#616161", 
      size: [0.4, 0.8, 0.4],
      materialType: "metal",
      description: "Contemporary bar stool with metal frame and comfortable seat, perfect for kitchen islands."
    },
    { 
      id: 4, 
      name: "Cabinet", 
      type: "cube", 
      color: "#eceff1", 
      size: [1.5, 1.8, 0.6],
      materialType: "wood",
      description: "Modern kitchen cabinet with clean lines, adjustable shelves, and soft-close mechanisms."
    },
    { 
      id: 5, 
      name: "Refrigerator", 
      type: "cube", 
      color: "#cfd8dc", 
      size: [1.2, 2.5, 0.8],
      materialType: "metal",
      description: "Stainless steel refrigerator with realistic texture, door handles, and slight reflection properties."
    },
    { 
      id: 6, 
      name: "Pendant Light", 
      type: "pendant-light", 
      color: "#ffcc80", 
      size: [0.3, 0.4, 0.3],
      materialType: "metal",
      description: "Modern pendant light fixture ideal for illuminating kitchen islands and dining areas."
    },
    { 
      id: 7, 
      name: "Wine Rack", 
      type: "cube", 
      color: "#8d6e63", 
      size: [0.6, 1.2, 0.3],
      materialType: "wood",
      description: "Elegant wine rack with slots for multiple bottles, made from rich wood with a satin finish."
    },
    { 
      id: 8, 
      name: "Kitchen Rug", 
      type: "rug", 
      color: "#b0bec5", 
      size: [2, 0.05, 1],
      materialType: "fabric",
      description: "Durable kitchen runner rug with non-slip backing, perfect for high-traffic areas."
    }
  ],
  'bedroom': [
    { 
      id: 1, 
      name: "Bed with Bedding", 
      type: "bed", 
      color: "#a1887f", 
      size: [3, 1, 2],
      materialType: "fabric",
      description: "A king-size bed 3D model with high-resolution textures for sheets, pillows, and blanket — includes fabric folds and wood headboard."
    },
    { 
      id: 2, 
      name: "Nightstand", 
      type: "cube", 
      color: "#a1887f", 
      size: [1, 0.8, 1],
      materialType: "wood",
      description: "Elegant bedside table with drawer, perfect height for bedside essentials."
    },
    { 
      id: 3, 
      name: "Dresser", 
      type: "cube", 
      color: "#8d6e63", 
      size: [2, 1.2, 0.8],
      materialType: "wood",
      description: "Spacious bedroom dresser with multiple drawers and detailed wood grain texture."
    },
    { 
      id: 4, 
      name: "Accent Chair", 
      type: "accent-chair", 
      color: "#90caf9", 
      size: [0.8, 1, 0.8],
      materialType: "fabric",
      description: "Comfortable bedroom reading chair with soft upholstery and elegant design."
    },
    { 
      id: 5, 
      name: "Table Lamp", 
      type: "pendant-light", 
      color: "#e0e0e0", 
      size: [0.3, 0.6, 0.3],
      materialType: "metal",
      description: "Bedside lamp with warm light emission and decorative base."
    },
    { 
      id: 6, 
      name: "Wardrobe", 
      type: "cube", 
      color: "#8d6e63", 
      size: [2, 4, 1],
      materialType: "wood",
      description: "Full-height wardrobe with realistic wood texture and functional doors."
    },
    { 
      id: 7, 
      name: "Bedroom Rug", 
      type: "rug", 
      color: "#ce93d8", 
      size: [2.5, 0.05, 3],
      materialType: "fabric",
      description: "Soft plush area rug for bedrooms with realistic fabric details."
    },
    { 
      id: 8, 
      name: "Indoor Plant", 
      type: "indoor-plant", 
      color: "#81c784", 
      size: [0.4, 1.2, 0.4],
      materialType: "default",
      description: "Decorative bedroom plant in stylish pot to add a touch of nature."
    }
  ],
  'master-bedroom': [
    { 
      id: 1, 
      name: "Luxury King Bed", 
      type: "bed", 
      color: "#5d4037", 
      size: [3.5, 1.2, 2.2],
      materialType: "fabric",
      description: "Premium king-sized bed with upholstered headboard, luxury linens, and realistic fabric details."
    },
    { 
      id: 2, 
      name: "Elegant Dresser", 
      type: "cube", 
      color: "#5d4037", 
      size: [3, 1.2, 0.8],
      materialType: "wood",
      description: "Sophisticated master bedroom dresser with multiple drawers and high-quality wood finish."
    },
    { 
      id: 3, 
      name: "Chaise Lounge", 
      type: "cube", 
      color: "#9fa8da", 
      size: [2, 0.8, 0.8],
      materialType: "fabric",
      description: "Elegant chaise lounge for the master bedroom with curved design and premium upholstery."
    },
    { 
      id: 4, 
      name: "Floor Lamp", 
      type: "cylinder", 
      color: "#9e9e9e", 
      size: [0.3, 2, 0.3],
      materialType: "metal",
      description: "Stylish floor lamp with adjustable height and warm lighting for master bedroom corner."
    },
    { 
      id: 5, 
      name: "Luxury Area Rug", 
      type: "rug", 
      color: "#ce93d8", 
      size: [3, 0.05, 2.5],
      materialType: "fabric",
      description: "Premium large area rug with intricate patterns and rich colors for master bedroom."
    },
    { 
      id: 6, 
      name: "Bedside Table", 
      type: "cube", 
      color: "#5d4037", 
      size: [1, 0.8, 1],
      materialType: "wood",
      description: "Elegant nightstand with drawer and shelf, perfect height for master bedroom."
    },
    { 
      id: 7, 
      name: "Decorative Mirror", 
      type: "cube", 
      color: "#b0bec5", 
      size: [1.8, 2.5, 0.1],
      materialType: "glass",
      description: "Large decorative mirror with elegant frame, adding depth and light to the master bedroom."
    },
    { 
      id: 8, 
      name: "Pendant Light", 
      type: "pendant-light", 
      color: "#ffcc80", 
      size: [0.5, 2, 0.5],
      materialType: "metal",
      description: "Sophisticated pendant light fixture with warm glow and elegant design."
    }
  ],
  'hall': [
    { 
      id: 1, 
      name: "Console Table", 
      type: "cube", 
      color: "#8d6e63", 
      size: [2, 0.8, 0.6],
      materialType: "wood",
      description: "Elegant hall console table with slim profile and decorative elements."
    },
    { 
      id: 2, 
      name: "Wall Mirror", 
      type: "cube", 
      color: "#b0bec5", 
      size: [1.5, 2, 0.1],
      materialType: "glass",
      description: "Stylish wall mirror with frame, creating an illusion of more space in hallways."
    },
    { 
      id: 3, 
      name: "Coat Rack", 
      type: "cylinder", 
      color: "#795548", 
      size: [0.3, 2, 0.3],
      materialType: "wood",
      description: "Functional coat rack with multiple hooks for hallway organization."
    },
    { 
      id: 4, 
      name: "Bench", 
      type: "cube", 
      color: "#a1887f", 
      size: [2, 0.5, 0.8],
      materialType: "wood",
      description: "Hallway bench with seat cushion, perfect for putting on shoes or temporary seating."
    },
    { 
      id: 5, 
      name: "Runner Rug", 
      type: "rug", 
      color: "#9fa8da", 
      size: [1, 0.05, 3],
      materialType: "fabric",
      description: "Long runner rug for hallways with durable materials and decorative patterns."
    },
    { 
      id: 6, 
      name: "Wall Sconce", 
      type: "pendant-light", 
      color: "#ffcc80", 
      size: [0.2, 0.4, 0.2],
      materialType: "metal",
      description: "Elegant wall lighting fixture for hallways with warm illumination."
    },
    { 
      id: 7, 
      name: "Floor Plant", 
      type: "indoor-plant", 
      color: "#558b2f", 
      size: [0.4, 1.5, 0.4],
      materialType: "default",
      description: "Tall decorative plant for hallway corners, adding natural elements to the space."
    },
    { 
      id: 8, 
      name: "Key Holder", 
      type: "cube", 
      color: "#a1887f", 
      size: [0.4, 0.6, 0.15],
      materialType: "wood",
      description: "Wall-mounted key organizer with hooks and small shelf for hallway essentials."
    }
  ]
};

// Modern color palette for furniture
export const colorOptions = [
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
