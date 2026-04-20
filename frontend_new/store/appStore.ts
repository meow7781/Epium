import { create } from 'zustand';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  artisan: string;
  artisanId: string;
  location: string;
  state: string;
  category: 'men' | 'women' | 'home-decor' | 'instruments' | 'gifts';
  images: string[];
  price: number;
  originalPrice?: number;
  story: string;
  details: string;
  material: string;
  sizes?: string[];
  colors?: string[];
  tags: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  artisanIncentive: number; // % that goes to artisan
  model3dUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  isGuest: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: 'razorpay' | 'cod';
  address: Address;
  createdAt: string;
  artisanIncentivePaid: number;
}

export interface Address {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// ─── App Store ────────────────────────────────────────────────────────────────

interface AppState {
  // Theme
  themeMode: 'dark' | 'light' | 'pink';
  setThemeMode: (mode: 'dark' | 'light' | 'pink') => void;
  isDark: boolean;
  toggleTheme: () => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Onboarding
  hasOnboarded: boolean;
  setHasOnboarded: (val: boolean) => void;
  preferences: {
    category?: string;
    style?: string | string[];
    region?: string;
    age?: string;
    birthday?: string;
    lovesAnime?: boolean | null;
    vibe?: string;
  };
  setPreferences: (prefs: Partial<AppState['preferences']>) => void;

  // Filters
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  themeMode: 'dark',
  setThemeMode: (mode) => set({ themeMode: mode, isDark: mode === 'dark' }),
  isDark: true,
  toggleTheme: () => set((s) => {
    const nextMode = s.themeMode === 'dark' ? 'light' : 'dark';
    return { themeMode: nextMode, isDark: nextMode === 'dark' };
  }),

  // Auth
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false, cart: [], wishlist: [] }),

  // Cart
  cart: [],
  addToCart: (product, quantity = 1, size, color) => {
    const cart = get().cart;
    const existing = cart.find(
      (i) => i.product.id === product.id && i.size === size && i.color === color
    );
    if (existing) {
      set({
        cart: cart.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      set({ cart: [...cart, { product, quantity, size, color }] });
    }
  },
  removeFromCart: (productId) =>
    set({ cart: get().cart.filter((i) => i.product.id !== productId) }),
  updateQuantity: (productId, quantity) =>
    set({
      cart: quantity === 0
        ? get().cart.filter((i) => i.product.id !== productId)
        : get().cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    }),
  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

  // Wishlist
  wishlist: [],
  toggleWishlist: (productId) => {
    const wl = get().wishlist;
    set({ wishlist: wl.includes(productId) ? wl.filter((id) => id !== productId) : [...wl, productId] });
  },
  isWishlisted: (productId) => get().wishlist.includes(productId),

  // Onboarding
  hasOnboarded: false,
  setHasOnboarded: (val) => set({ hasOnboarded: val }),
  preferences: {},
  setPreferences: (prefs) => set((s) => ({ preferences: { ...s.preferences, ...prefs } })),

  // Filters
  activeCategory: 'all',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
