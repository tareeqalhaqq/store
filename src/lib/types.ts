export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    hint: string;
  }[];
  category: string;
  variants?: {
    type: string; // e.g. "Size", "Color"
    options: {
      value: string;
      priceModifier?: number;
    }[];
  }[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  variant?: { [key: string]: string };
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
};


// Printify API Types
export type PrintifyShop = {
  id: number;
  title: string;
  sales_channel: string;
};

export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: PrintifyOption[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: any[]; // Define more specifically if needed
  sales_channel_properties: any[];
};

export type PrintifyOption = {
  name: string;
  type: string;
  values: {
    id: number;
    title: string;
  }[];
};

export type PrintifyVariant = {
  id: number;
  sku: string;
  price: number;
  cost: number;
  title: string;
  grams: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  options: number[];
  quantity: number;
};

export type PrintifyImage = {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
};
