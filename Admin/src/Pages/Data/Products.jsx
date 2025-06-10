// import { Product } from '../Types';

export const products = [
  {
    id: "1",
    name: "MacBook Pro 16-inch",
    category: "Laptops",
    subCategory: "Premium Laptops",
    price: 64990,
    oldPrice: 69900,
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life.",
    features: [
      "Apple M1 Pro chip for blazing-fast performance",
      "16-inch Liquid Retina XDR display",
      "16GB unified memory",
      "512GB SSD storage",
      "16-core Neural Engine",
      "10-core CPU, 16-core GPU"
    ],
    specifications: {
      "Processor": "Apple M1 Pro",
      "Memory": "16GB unified memory",
      "Storage": "512GB SSD",
      "Display": "16-inch Liquid Retina XDR display",
      "Graphics": "16-core GPU",
      "Battery Life": "Up to 21 hours",
      "Weight": "2.1 kg",
      "Color": "Space Grey"
    },
    image: "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.8,
    reviews: 256,
    stock: 15,
    isFeatured: true,
    isNew: true
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    category: "Phones",
    subCategory: "Smartphones",
    price: 119900,
    oldPrice: 129900,
    description: "The iPhone 15 Pro is a defining chapter for iPhone. It features a strong and light aerospace-grade titanium design with a textured matte-glass back.",
    features: [
      "6.1-inch Super Retina XDR display",
      "A17 Pro chip for unprecedented performance",
      "Pro camera system with 48MP main camera",
      "Up to 29 hours video playback",
      "Face ID for secure authentication",
      "iOS 17"
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR display",
      "Processor": "A17 Pro chip",
      "Camera": "48MP main, 12MP ultrawide, 12MP telephoto",
      "Front Camera": "12MP TrueDepth camera",
      "Battery": "Up to 29 hours video playback",
      "Storage": "256GB",
      "Water Resistance": "IP68 (6 meters for 30 minutes)",
      "Color": "Natural Titanium"
    },
    image: "https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/9555099/pexels-photo-9555099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.9,
    reviews: 431,
    stock: 23,
    isFeatured: true,
    isNew: true
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    subCategory: "Smartphones",
    price: 129900,
    description: "Meet Galaxy S24 Ultra, the ultimate AI phone. Take your creativity to the next level with ProVisual Engine and the built-in S Pen.",
    features: [
      "6.8-inch Dynamic AMOLED 2X display",
      "200MP wide camera",
      "Snapdragon 8 Gen 3 processor",
      "12GB RAM, 256GB storage",
      "5000mAh battery",
      "S Pen included"
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Memory": "12GB RAM",
      "Storage": "256GB",
      "Main Camera": "200MP wide",
      "Battery": "5000mAh",
      "OS": "Android 14, One UI 6.1",
      "Color": "Titanium Black"
    },
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.7,
    reviews: 302,
    stock: 18,
    isNew: true
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    category: "Accessories",
    subCategory: "Headphones",
    price: 34900,
    oldPrice: 38900,
    description: "Industry-leading noise cancellation with the newly developed V1 processor that cancels more high and mid frequency noise. With 8 microphones and Auto NC Optimizer, these headphones automatically optimize noise cancellation performance based on your wearing conditions and environment.",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Precise Voice Pickup Technology",
      "Alexa voice control",
      "Premium build and comfort",
      "LDAC support for high-resolution audio"
    ],
    specifications: {
      "Driver Unit": "30mm",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "Up to 30 hours",
      "Charging Time": "3.5 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, 3.5mm audio cable",
      "Color": "Black"
    },
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.8,
    reviews: 187,
    stock: 42,
    isBestseller: true
  },
  {
    id: "5",
    name: "Dell XPS 15",
    category: "Laptops",
    subCategory: "Premium Laptops",
    price: 189900,
    description: "The XPS 15 features a 15.6-inch InfinityEdge display, the latest 12th Gen Intel® Core™ processors and NVIDIA® GeForce RTX™ 3050 Ti graphics.",
    features: [
      "15.6-inch 4K UHD+ display",
      "12th Gen Intel Core i7",
      "16GB DDR5 RAM",
      "512GB SSD",
      "NVIDIA GeForce RTX 3050 Ti",
      "CNC machined aluminum chassis"
    ],
    specifications: {
      "Processor": "12th Gen Intel Core i7-12700H",
      "Memory": "16GB DDR5",
      "Storage": "512GB SSD",
      "Display": "15.6-inch 4K UHD+ (3840 x 2400)",
      "Graphics": "NVIDIA GeForce RTX 3050 Ti 4GB GDDR6",
      "Battery": "86WHr",
      "Weight": "1.92 kg",
      "Color": "Platinum Silver"
    },
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/934062/pexels-photo-934062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/669228/pexels-photo-669228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.6,
    reviews: 148,
    stock: 8,
    isBestseller: true
  },
  {
    "id": "6",
    "name": "Samsung 65\" QLED 4K Smart TV",
    "category": "Home Appliances",
    "subCategory": "Televisions",
    "price": 149900,
    "oldPrice": 179900,
    "description": "Experience breathtaking 4K resolution and vivid colors with this Samsung QLED TV. Quantum HDR enhances every image with incredible depth and detail.",
    "features": [
      "65-inch QLED 4K display",
      "Quantum Processor with 4K upscaling",
      "Object Tracking Sound",
      "Anti-reflection screen",
      "Motion Xcelerator Turbo+",
      "100% Color Volume with Quantum Dot"
    ],
    "specifications": {
      "Display": "65-inch QLED 4K",
      "Resolution": "3840 x 2160",
      "HDR": "Quantum HDR 1500",
      "Smart Platform": "Tizen",
      "Refresh Rate": "120Hz",
      "Audio": "40W, 2.2.2 channel",
      "Connectivity": "HDMI x4, USB x2, Wi-Fi, Bluetooth",
      "Color": "Titan Black"
    },
    "image": "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "images": [
      "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "rating": 4.7,
    "reviews": 215,
    "stock": 12,
    "isFeatured": true
  },
  {
    "id": "7",
    "name": "Apple AirPods Pro",
    "category": "Accessories",
    "subCategory": "Earphones",
    "price": 24900,
    "description": "AirPods Pro feature Active Noise Cancellation, Transparency mode, Spatial Audio, and are sweat and water resistant.",
    "features": [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial Audio with dynamic head tracking",
      "Adaptive EQ",
      "Force sensor control",
      "Sweat and water resistant"
    ],
    "specifications": {
      "Chip": "H2 headphone chip",
      "Noise Control": "Active Noise Cancellation, Transparency mode",
      "Sweat and Water Resistance": "IPX4",
      "Battery Life": "Up to 4.5 hours of listening time",
      "Charging Case": "MagSafe Charging Case with speaker and lanyard loop",
      "Sensors": "Pressure sensor, motion-detecting accelerometer, speech-detecting accelerometer",
      "Color": "White"
    },
    "image": "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "images": [
      "https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "rating": 4.8,
    "reviews": 322,
    "stock": 37,
    "isBestseller": true
  },
  {
    "id": "8",
    "name": "LG Refrigerator with InstaView Door-in-Door",
    "category": "Home Appliances",
    "subCategory": "Refrigerators",
    "price": 219900,
    "oldPrice": 259900,
    "description": "The LG InstaView Door-in-Door Refrigerator has innovative features like a glass panel that lets you see inside without opening the door and a door-in-door feature for easy access to your favorite items.",
    "features": [
      "InstaView Door-in-Door",
      "Linear Cooling",
      "DoorCooling+",
      "SmartThinQ Technology",
      "Fresh Balancer",
      "Energy efficient"
    ],
    "specifications": {
      "Capacity": "601 liters",
      "Defrost": "Auto Defrost",
      "Refrigerant": "R600a",
      "Energy Rating": "5 Star",
      "Dimensions (WxHxD)": "912 x 1790 x 716 mm",
      "Weight": "110 kg",
      "Color": "Dazzle Steel"
    },
    "image": "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "images": [
      "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5825578/pexels-photo-5825578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4049979/pexels-photo-4049979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "rating": 4.5,
    "reviews": 98,
    "stock": 5
  },
  {
    "id": "9",
    "name": "ASUS ROG Gaming Laptop",
    "category": "Laptops",
    "subCategory": "Gaming Laptops",
    "price": 179900,
    "description": "Dominate the battlefield with this powerful gaming laptop featuring advanced cooling for marathon gaming sessions.",
    "features": [
      "15.6-inch Full HD 300Hz display",
      "NVIDIA GeForce RTX 4070",
      "Intel Core i9-13900H",
      "32GB DDR5 RAM",
      "1TB PCIe NVMe SSD",
      "ROG Intelligent Cooling"
    ],
    "specifications": {
      "Processor": "Intel Core i9-13900H",
      "Memory": "32GB DDR5-4800MHz",
      "Storage": "1TB PCIe 4.0 NVMe M.2 SSD",
      "Display": "15.6-inch Full HD (1920x1080) 300Hz",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "Keyboard": "Per-key RGB backlit keyboard",
      "Battery": "90WHrs, 4-cell Lithium-ion",
      "Color": "Eclipse Gray"
    },
    "image": "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "images": [
      "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "rating": 4.7,
    "reviews": 176,
    "stock": 7,
    "isNew": true
  },
  {
    "id": "10",
    "name": "Dyson V15 Detect Vacuum Cleaner",
    "category": "Home Appliances",
    "subCategory": "Vacuum Cleaners",
    "price": 64900,
    "description": "The Dyson V15 Detect reveals microscopic dust with a precisely-angled laser while powerful suction and an acoustic piezo sensor count and categorize particles for proof of a deep clean.",
    "features": [
      "Laser Dust Detection",
      "Acoustic Dust Sensing",
      "HEPA filtration",
      "Up to 60 minutes of run time",
      "LCD screen",
      "11 attachments included"
    ],
    "specifications": {
      "Suction Power": "230 AW",
      "Bin Volume": "0.76L",
      "Dimensions (HxWxD)": "1261 x 250 x 261 mm",
      "Weight": "2.74 kg",
      "Battery Life": "Up to 60 minutes",
      "Charging Time": "4.5 hours",
      "Filtration": "Whole-machine HEPA filtration",
      "Color": "Nickel/Yellow"
    },
    "image": "https://images.pexels.com/photos/4108721/pexels-photo-4108721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "images": [
      "https://images.pexels.com/photos/4108721/pexels-photo-4108721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4108727/pexels-photo-4108727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "rating": 4.6,
    "reviews": 112,
    "stock": 9,
    "isNew": true
  },
  {
    id: "11",
    name: "GoPro HERO12 Black",
    category: "Accessories",
    subCategory: "Cameras",
    price: 41900,
    description: "The GoPro HERO12 Black has groundbreaking image quality and the most stable video ever. Shoot 5.3K video and 27MP photos that are stunningly clear and lifelike.",
    features: [
      "5.3K video and 27MP photos",
      "HyperSmooth 5.0 stabilization",
      "Waterproof to 33ft (10m)",
      "TimeWarp 3.0 and 8X Slo-Mo",
      "1080p Live Streaming",
      "Hindsight, Duration Capture, and HindSight"
    ],
    specifications: {
      "Photo": "27MP",
      "Video": "5.3K60, 4K120, 2.7K240",
      "Battery": "Enduro Battery (included)",
      "Battery Life": "Up to 120 minutes of continuous recording at 1080p30",
      "Display": "Front and rear touchscreen displays",
      "Connectivity": "Wi-Fi, Bluetooth, USB-C",
      "Color": "Black"
    },
    image: "https://images.pexels.com/photos/3552181/pexels-photo-3552181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/3552181/pexels-photo-3552181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/15885298/pexels-photo-15885298/free-photo-of-woman-hiking-with-action-camera-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/10349949/pexels-photo-10349949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.7,
    reviews: 87,
    stock: 21
  },
  {
    id: "12",
    name: "Philips Air Purifier Series 3000i",
    category: "Home Appliances",
    subCategory: "Air Purifiers",
    price: 42900,
    oldPrice: 49900,
    description: "The Philips Air Purifier Series 3000i connects to the Clean Home+ app, so you can control it from anywhere and monitor indoor air quality. It features real-time PM2.5, gas & allergen feedback and automatically purifies the air.",
    features: [
      "Removes 99.97% of ultra-fine particles",
      "HEPA and active carbon filtration",
      "Smart auto-purification mode",
      "Clean Home+ app control",
      "Real-time air quality feedback",
      "Quiet Sleep mode"
    ],
    specifications: {
      "Coverage Area": "Up to 95 sq.m.",
      "CADR": "400 m³/h",
      "Filter Life": "Up to 36 months",
      "Noise Level": "15-54 dB",
      "Dimensions (HxWxD)": "645 x 280 x 280 mm",
      "Power Consumption": "2-60W",
      "Color": "White"
    },
    image: "https://images.pexels.com/photos/5824511/pexels-photo-5824511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/5824511/pexels-photo-5824511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5824510/pexels-photo-5824510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4318822/pexels-photo-4318822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: 4.5,
    reviews: 64,
    stock: 15
  }
];


/**
 * @returns {Product[]}
 */
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

/**
 * @returns {Product[]}
 */
export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

/**
 * @returns {Product[]}
 */
export const getBestsellers = () => {
  return products.filter(product => product.isBestseller);
};

/**
 * @param {string} category
 * @returns {Product[]}
 */
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

/**
 * @param {string} id
 * @returns {Product | undefined}
 */
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

/**
 * @param {string} query
 * @returns {Product[]}
 */
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(searchTerm))
  );
};

/**
 * @param {Product[]} productsList
 * @param {number} minPrice
 * @param {number} maxPrice
 * @returns {Product[]}
 */
export const filterProductsByPriceRange = (productsList, minPrice, maxPrice) => {
  return productsList.filter(product => product.price >= minPrice && product.price <= maxPrice);
};
