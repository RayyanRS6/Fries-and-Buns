import pizzaImg from "@/assets/menu-pizza.jpg";
import burgerImg from "@/assets/menu-burger.jpg";
import chickenImg from "@/assets/menu-chicken.jpg";
import friesImg from "@/assets/menu-fries.jpg";

export type Category =
  | "Chai Shai"
  | "Starters"
  | "Paratha Rolls"
  | "Tortilla Wraps"
  | "Sandwich"
  | "Fried Burgers"
  | "Doner & Bites"
  | "Pastas"
  | "Fries"
  | "Special Pizzas"
  | "Regular Flavor Pizza";

export interface MenuItemVariant {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  variants?: MenuItemVariant[]; // Optional size/variant pricing
}

export const categories: Category[] = [
  "Chai Shai",
  "Starters",
  "Paratha Rolls",
  "Tortilla Wraps",
  "Sandwich",
  "Fried Burgers",
  "Doner & Bites",
  "Pastas",
  "Fries",
  "Special Pizzas",
  "Regular Flavor Pizza",
];

export const menuItems: MenuItem[] = [
  // Chai Shai
  {
    id: "chai-green-tea",
    name: "Green Tea",
    description: "Refreshing and light.",
    price: 80,
    image: chickenImg,
    category: "Chai Shai",
  },
  {
    id: "chai-karak-chai",
    name: "Karak Chai",
    description: "Strong, aromatic tea.",
    price: 130,
    image: chickenImg,
    category: "Chai Shai",
  },
  // Starters
  {
    id: "starter-hot-wings",
    name: "Hot Wings (6 pcs)",
    description: "Crispy wings with heat.",
    price: 400,
    image: chickenImg,
    category: "Starters",
  },
  {
    id: "starter-peri-wings",
    name: "Peri Peri Wings (6 pcs)",
    description: "Tangy peri peri spice.",
    price: 450,
    image: chickenImg,
    category: "Starters",
  },
  {
    id: "starter-nuggets",
    name: "Nuggets (9 pcs)",
    description: "Golden, tender bites.",
    price: 380,
    image: chickenImg,
    category: "Starters",
  },
  {
    id: "starter-crispy-chicken",
    name: "Crispy Chicken",
    description: "Crunchy and juicy.",
    price: 250,
    image: chickenImg,
    category: "Starters",
  },
  // Paratha Rolls
  {
    id: "roll-tikka",
    name: "Tikka Paratha Roll",
    description: "Spiced chicken tikka roll.",
    price: 300,
    image: burgerImg,
    category: "Paratha Rolls",
  },
  {
    id: "roll-zinger",
    name: "Zinger Paratha Roll",
    description: "Crispy zinger chicken roll.",
    price: 380,
    image: burgerImg,
    category: "Paratha Rolls",
  },
  {
    id: "roll-special",
    name: "Special Roll",
    description: "Loaded with flavor.",
    price: 350,
    image: burgerImg,
    category: "Paratha Rolls",
  },
  // Tortilla Wraps
  {
    id: "wrap-special",
    name: "Special Tortilla Wrap",
    description: "Tikka chicken, crispy chicken, fries + sauces.",
    price: 450,
    image: burgerImg,
    category: "Tortilla Wraps",
  },
  {
    id: "wrap-pocket",
    name: "Pocket Wrap",
    description: "Chicken + cheese + sauces + olives & jalapeño.",
    price: 550,
    image: burgerImg,
    category: "Tortilla Wraps",
  },
  // Sandwich
  {
    id: "sandwich-club",
    name: "Club Sandwich",
    description: "Classic triple-decker.",
    price: 440,
    image: burgerImg,
    category: "Sandwich",
  },
  {
    id: "sandwich-grilled",
    name: "Grilled Sandwich",
    description: "Toasty and melty.",
    price: 490,
    image: burgerImg,
    category: "Sandwich",
  },
  // Fried Burgers
  {
    id: "burger-crunchy",
    name: "Crunchy Burger",
    description: "Crispy fried chicken patty.",
    price: 420,
    image: burgerImg,
    category: "Fried Burgers",
  },
  {
    id: "burger-cheezy-zinger",
    name: "Cheezy Zinger Burger",
    description: "Zinger with extra cheese.",
    price: 490,
    image: burgerImg,
    category: "Fried Burgers",
  },
  {
    id: "burger-patty",
    name: "Patty Burger",
    description: "Classic patty, flavorful sauces.",
    price: 240,
    image: burgerImg,
    category: "Fried Burgers",
  },
  {
    id: "burger-anda-shami",
    name: "Anda Shami Burger",
    description: "Egg and shami kebab combo.",
    price: 180,
    image: burgerImg,
    category: "Fried Burgers",
  },
  // Doner & Bites
  {
    id: "doner-premium-chicken",
    name: "Premium Chicken Doner",
    description: "Juicy chicken doner wrap.",
    price: 590,
    image: burgerImg,
    category: "Doner & Bites",
  },
  {
    id: "bites-cheeze",
    name: "Cheeze Bites",
    description: "Chicken + cheese + veg + sauces.",
    price: 590,
    image: chickenImg,
    category: "Doner & Bites",
  },
  // Pastas (prices small shown)
  {
    id: "pasta-flaming",
    name: "Flaming Pasta (Small)",
    description: "Spicy, saucy goodness.",
    price: 480,
    image: pizzaImg,
    category: "Pastas",
    variants: [
      { id: "small", label: "Small", price: 480 },
      { id: "large", label: "Large", price: 780 },
    ],
  },
  {
    id: "pasta-creamy-white",
    name: "Creamy White Pasta (Small)",
    description: "Rich and creamy sauce.",
    price: 550,
    image: pizzaImg,
    category: "Pastas",
    variants: [
      { id: "small", label: "Small", price: 550 },
      { id: "large", label: "Large", price: 850 },
    ],
  },
  // Fries
  {
    id: "fries-french",
    name: "French Fries (Small)",
    description: "Golden and crispy.",
    price: 150,
    image: friesImg,
    category: "Fries",
    variants: [
      { id: "small", label: "Small", price: 150 },
      { id: "large", label: "Large", price: 250 },
    ],
  },
  {
    id: "fries-garlic-mayo",
    name: "Garlic Mayo Fries (Small)",
    description: "Garlic mayo drizzle.",
    price: 250,
    image: friesImg,
    category: "Fries",
    variants: [
      { id: "small", label: "Small", price: 250 },
      { id: "large", label: "Large", price: 350 },
    ],
  },
  {
    id: "fries-creamy-loaded",
    name: "Creamy Loaded Fries (Small)",
    description: "Creamy sauce and toppings.",
    price: 300,
    image: friesImg,
    category: "Fries",
    variants: [
      { id: "small", label: "Small", price: 300 },
      { id: "large", label: "Large", price: 500 },
    ],
  },
  {
    id: "fries-loaded",
    name: "Loaded Fries (Small)",
    description: "Chicken + cheese + sauces + olives + jalapeño + shimla.",
    price: 350,
    image: friesImg,
    category: "Fries",
    variants: [
      { id: "small", label: "Small", price: 350 },
      { id: "large", label: "Large", price: 550 },
    ],
  },
  // Special Pizzas (Small prices)
  {
    id: "pizza-crown-crust",
    name: "Crown Crust Pizza (Small)",
    description: "Signature stuffed crust.",
    price: 750,
    image: pizzaImg,
    category: "Special Pizzas",
  },
  {
    id: "pizza-behari-kabab",
    name: "Behari Kabab Pizza (Small)",
    description: "Smoky kabab flavor.",
    price: 750,
    image: pizzaImg,
    category: "Special Pizzas",
  },
  {
    id: "pizza-cheese-stuffer",
    name: "Cheese Stuffer Pizza (Small)",
    description: "Cheese-loaded delight.",
    price: 750,
    image: pizzaImg,
    category: "Special Pizzas",
  },
  {
    id: "pizza-mughali-special",
    name: "Mughali Special Pizza (Small)",
    description: "Rich desi flavors.",
    price: 700,
    image: pizzaImg,
    category: "Special Pizzas",
  },
  // Regular Flavor Pizza (Small prices)
  {
    id: "pizza-supreme",
    name: "Supreme (Small)",
    description: "Loaded with toppings.",
    price: 650,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
  {
    id: "pizza-fajita",
    name: "Fajita (Small)",
    description: "Fajita-style chicken.",
    price: 650,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
  {
    id: "pizza-tikka",
    name: "Tikka (Small)",
    description: "Classic chicken tikka.",
    price: 650,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
  {
    id: "pizza-cheese-lover",
    name: "Cheese Lover (Small)",
    description: "Extra-cheesy goodness.",
    price: 600,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
  {
    id: "pizza-hot-spicy",
    name: "Hot & Spicy (Small)",
    description: "For spice lovers.",
    price: 600,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
  {
    id: "pizza-veggie",
    name: "Veggie (Small)",
    description: "Colorful veggie mix.",
    price: 600,
    image: pizzaImg,
    category: "Regular Flavor Pizza",
  },
];
