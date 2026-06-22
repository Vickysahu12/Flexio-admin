// Placeholder data so the dashboard renders something real-looking
// while the backend (FastAPI) endpoints aren't wired up yet.
// Each shape here is what the corresponding component expects —
// keep the same shape when you swap this for a real fetch().

export const STATS = [
  { id: 'sales', label: 'TOTAL SALES', value: '$124,592.00', change: '+12.5%', changeType: 'up' },
  { id: 'orders', label: 'ORDERS TODAY', value: '1,482', change: '+8.2%', changeType: 'up' },
  { id: 'products', label: 'TOTAL PRODUCTS', value: '45,021', change: 'FLAT', changeType: 'flat' },
  { id: 'users', label: 'ACTIVE USERS', value: '12.4K', change: '+24.0%', changeType: 'up' },
];

export const RECENT_ORDERS = [
  { id: '#FX-9021', customer: 'Marcus Vane', items: '3x Items', total: '$450.00', status: 'SHIPPED' },
  { id: '#FX-8944', customer: 'Elena Rossi', items: '1x Items', total: '$1,200.00', status: 'PENDING' },
  { id: '#FX-8812', customer: 'Julian Thorne', items: '2x Items', total: '$890.00', status: 'SHIPPED' },
];

export const LOW_STOCK_ITEMS = [
  { id: 'cr-202', name: 'CyberRunner V2', sku: 'SKU: CR-202', left: 3 },
  { id: 'vh-011', name: 'Void Hoodie', sku: 'SKU: VH-011', left: 8 },
  { id: 'ts-505', name: 'Titan Sneakers', sku: 'SKU: TS-505', left: 2 },
];

export const PRODUCT_FILTERS = ['ALL', 'ACTIVE', 'INACTIVE'];

export const PRODUCTS = [
  { id: 'cr-202', name: 'CyberRunner V2', sku: 'CR-202', category: 'Footwear', price: '$220.00', stock: 3, active: true },
  { id: 'vh-011', name: 'Void Hoodie', sku: 'VH-011', category: 'Apparel', price: '$95.00', stock: 8, active: true },
  { id: 'ts-505', name: 'Titan Sneakers', sku: 'TS-505', category: 'Footwear', price: '$180.00', stock: 2, active: false },
  // add more rows as needed
];

// --- Orders page data ---

export const ORDER_STATUS_TABS = ['All Orders', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export const ORDERS = [
  { id: '#FX-9021', customer: 'Marcus Vane', date: '2026-06-18', items: 3, total: '$450.00', payment: 'Card', status: 'Shipped' },
  { id: '#FX-8944', customer: 'Elena Rossi', date: '2026-06-17', items: 1, total: '$1,200.00', payment: 'UPI', status: 'Pending' },
  { id: '#FX-8812', customer: 'Julian Thorne', date: '2026-06-16', items: 2, total: '$890.00', payment: 'Card', status: 'Delivered' },
  { id: '#FX-8765', customer: 'Sara Kim', date: '2026-06-15', items: 4, total: '$610.00', payment: 'Wallet', status: 'Confirmed' },
  { id: '#FX-8702', customer: 'David Cho', date: '2026-06-14', items: 1, total: '$220.00', payment: 'Card', status: 'Cancelled' },
  { id: '#FX-8650', customer: 'Priya Nair', date: '2026-06-13', items: 2, total: '$340.00', payment: 'UPI', status: 'Shipped' },
  { id: '#FX-8590', customer: 'Tom Becker', date: '2026-06-12', items: 5, total: '$980.00', payment: 'Card', status: 'Pending' },
  { id: '#FX-8531', customer: 'Mina Aoki', date: '2026-06-11', items: 1, total: '$180.00', payment: 'Wallet', status: 'Delivered' },
  { id: '#FX-8470', customer: 'Leo Fischer', date: '2026-06-10', items: 2, total: '$410.00', payment: 'Card', status: 'Confirmed' },
  { id: '#FX-8412', customer: 'Aisha Khan', date: '2026-06-09', items: 3, total: '$560.00', payment: 'UPI', status: 'Shipped' },
  { id: '#FX-8355', customer: 'Noah Park', date: '2026-06-08', items: 1, total: '$95.00', payment: 'Card', status: 'Pending' },
  { id: '#FX-8290', customer: 'Zara Malik', date: '2026-06-07', items: 2, total: '$300.00', payment: 'Wallet', status: 'Delivered' },
];

// --- Add Product page data ---

export const CATEGORY_OPTIONS = ['Footwear', 'Apparel', 'Accessories'];

export const SUBCATEGORY_OPTIONS = ['Sneakers', 'Hoodies', 'T-Shirts', 'Caps', 'Bags'];

export const DEFAULT_COLOR_SWATCHES = ['#0a0a0a', '#c8ff00', '#ffffff', '#ff4d4d', '#4d79ff'];
// --- Order status badge styles (used by OrdersTable) ---

export const ORDER_STATUS_STYLES = {
  Pending:   { background: 'rgba(255, 184, 77, 0.12)', color: '#ffb84d' },
  Confirmed: { background: 'rgba(93, 169, 255, 0.12)',  color: '#5da9ff' },
  Shipped:   { background: 'rgba(200, 255, 0, 0.12)',   color: '#c8ff00' },
  Delivered: { background: 'rgba(72, 199, 116, 0.12)',  color: '#48c774' },
  Cancelled: { background: 'rgba(255, 90, 90, 0.12)',   color: '#ff5a5a' },
};

// --- Users page data ---

export const USER_FILTERS = ['All', 'Active', 'Banned'];

export const USER_STATUS_STYLES = {
  Active: { background: 'rgba(200, 255, 0, 0.12)', color: '#c8ff00' },
  Banned: { background: 'rgba(255, 90, 90, 0.12)', color: '#ff5a5a' },
};

export const USERS = [
  {
    id: 'u-1001',
    name: 'Marcus Thorne',
    email: 'marcus@flexio.vip',
    phone: '+44 7911 123456',
    orders: 12,
    joined: 'Dec 02, 2023',
    status: 'Active',
    membership: 'Elite Member',
    orderHistory: [
      { id: '#FX-99210-A', item: 'Luxe Shell Jacket x1', price: '$1,250', time: '3 days ago' },
      { id: '#FX-98441-C', item: 'Vapor Max Boots x1', price: '$890', time: '2 weeks ago' },
    ],
  },
  {
    id: 'u-1002',
    name: 'Elena Vlasov',
    email: 'elena@vlasov.co',
    phone: '+7 900 332-11-00',
    orders: 3,
    joined: 'Jan 15, 2024',
    status: 'Banned',
    membership: 'Standard',
    orderHistory: [
      { id: '#FX-87750-B', item: 'CyberRunner V2 x1', price: '$220', time: '1 month ago' },
    ],
  },
  {
    id: 'u-1003',
    name: 'Jaxson Kade',
    email: 'jk@subversive.tech',
    phone: '+1 212 555-0199',
    orders: 42,
    joined: 'Aug 28, 2022',
    status: 'Active',
    membership: 'Elite Member',
    orderHistory: [
      { id: '#FX-95012-D', item: 'Void Hoodie x2', price: '$190', time: '5 days ago' },
      { id: '#FX-94300-A', item: 'Titan Sneakers x1', price: '$180', time: '3 weeks ago' },
    ],
  },
  {
    id: 'u-1004',
    name: 'Sofia Chen',
    email: 'sofia.c@gmail.com',
    phone: '+86 10 6400 1111',
    orders: 8,
    joined: 'Mar 11, 2024',
    status: 'Active',
    membership: 'Standard',
    orderHistory: [
      { id: '#FX-90112-C', item: 'Vapor Max Boots x1', price: '$890', time: '1 week ago' },
    ],
  },
];