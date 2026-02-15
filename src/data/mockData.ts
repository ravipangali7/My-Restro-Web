import { UserRole } from '@/constants/theme';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  restaurantId?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  kycDocument?: string;
  rejectReason?: string;
  isShareholder?: boolean;
  sharePercentage?: number;
  balance?: number;
  dueBalance?: number;
  isActive?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  phone: string;
  isActive: boolean;
  isOpen: boolean;
  slug: string;
  balance: number;
  dueBalance: number;
  subscriptionStart: string;
  subscriptionEnd: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  restaurantId: string;
  type?: 'veg' | 'non-veg';
  dishType?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  unit: string;
  price: number;
  discountType: 'flat' | 'percentage';
  discount: number;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  restaurantId: string;
  itemCount: number;
}

export interface Order {
  id: string;
  tableNo: number;
  items: { menuItemId: string; name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'paid';
  orderType: 'table' | 'packing' | 'delivery';
  paymentStatus: 'pending' | 'success' | 'paid';
  paymentMethod?: 'cash' | 'e_wallet' | 'bank';
  waiterId: string;
  waiterName: string;
  customerPhone?: string;
  restaurantId: string;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  restaurantId: string;
  perDaySalary: number;
  isActive: boolean;
  attendance: number;
  toPay: number;
  toReceive: number;
  designation: string;
  joinedAt: string;
  isSuspended: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  costPerUnit: number;
  restaurantId: string;
  vendorId?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  credit: number;
  lastVisit: string;
  address?: string;
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  restaurantId: string;
  toPay: number;
  toReceive: number;
  image?: string;
}

export interface Purchase {
  id: string;
  restaurantId: string;
  vendorId: string;
  vendorName: string;
  items: { rawMaterialId: string; name: string; quantity: number; price: number; total: number }[];
  subtotal: number;
  discountType: 'flat' | 'percentage';
  discount: number;
  total: number;
  isPaid: boolean;
  createdAt: string;
}

export interface StockLog {
  id: string;
  restaurantId: string;
  rawMaterialName: string;
  type: 'in' | 'out';
  quantity: number;
  reference: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  amount: number;
  vendorId?: string;
  vendorName?: string;
  isPaid: boolean;
  createdAt: string;
}

export interface Attendance {
  id: string;
  restaurantId: string;
  staffId: string;
  staffName: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
  leaveReason?: string;
}

export interface PaidRecord {
  id: string;
  restaurantId: string;
  name: string;
  amount: number;
  vendorId?: string;
  vendorName?: string;
  staffId?: string;
  staffName?: string;
  paymentMethod: 'cash' | 'e_wallet' | 'bank';
  remarks?: string;
  createdAt: string;
}

export interface ReceivedRecord {
  id: string;
  restaurantId: string;
  name: string;
  customerId?: string;
  customerName?: string;
  orderId?: string;
  paymentMethod: 'cash' | 'e_wallet' | 'bank';
  amount: number;
  remarks?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  restaurantId?: string;
  restaurantName?: string;
  amount: number;
  paymentStatus: 'pending' | 'success' | 'paid';
  transactionType: 'in' | 'out';
  category: string;
  isSystem: boolean;
  remarks?: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  restaurantId: string;
  customerName: string;
  customerPhone: string;
  orderId: string;
  staffName?: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface SuperSetting {
  id: string;
  perQrStandPrice: number;
  subscriptionFeePerMonth: number;
  perTransactionFee: number;
  isSubscriptionFee: boolean;
  dueThreshold: number;
  isWhatsappUsage: boolean;
  whatsappPerUsage: number;
  shareDistributionDay: number;
  balance: number;
}

export interface QrStandOrder {
  id: string;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'accepted' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'success';
  createdAt: string;
}

export interface ShareholderWithdrawal {
  id: string;
  userName: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectReason?: string;
  remarks?: string;
  createdAt: string;
}

export interface BulkNotification {
  id: string;
  restaurantId: string;
  message: string;
  type: 'sms' | 'whatsapp';
  sentCount: number;
  totalCount: number;
  createdAt: string;
}

export interface TableItem {
  id: string;
  restaurantId: string;
  name: string;
  capacity: number;
  floor: string;
  nearBy: string;
}

// Mock users
export const mockUsers: User[] = [
  { id: 'u1', name: 'Rajesh Kumar', phone: '9876543210', role: 'super_admin', isActive: true, isShareholder: true, sharePercentage: 40, balance: 125000, dueBalance: 0 },
  { id: 'u2', name: 'Amit Sharma', phone: '9876543211', role: 'owner', restaurantId: 'r1', kycStatus: 'approved', isActive: true, isShareholder: true, sharePercentage: 30, balance: 85000 },
  { id: 'u3', name: 'Priya Singh', phone: '9876543212', role: 'manager', restaurantId: 'r1', isActive: true },
  { id: 'u4', name: 'Vikram Patel', phone: '9876543213', role: 'waiter', restaurantId: 'r1', isActive: true },
  { id: 'u5', name: 'Sanjay Gupta', phone: '9876543214', role: 'owner', restaurantId: 'r2', kycStatus: 'approved', isActive: true, isShareholder: true, sharePercentage: 30, balance: 65000 },
  { id: 'u6', name: 'Neha Verma', phone: '9876543215', role: 'owner', restaurantId: 'r4', kycStatus: 'pending', isActive: true },
  { id: 'u7', name: 'Rohit Jain', phone: '9876543216', role: 'owner', restaurantId: 'r5', kycStatus: 'rejected', rejectReason: 'Blurry document, please re-upload', isActive: false },
  { id: 'u8', name: 'Arjun Reddy', phone: '9988776655', role: 'customer', isActive: true },
];

export const mockRestaurants: Restaurant[] = [
  { id: 'r1', name: 'Spice Garden', ownerId: 'u2', address: '123 MG Road, Mumbai', phone: '022-12345678', isActive: true, isOpen: true, slug: 'spice-garden', balance: 45000, dueBalance: 1200, subscriptionStart: '2026-01-15', subscriptionEnd: '2026-07-15', createdAt: '2024-01-15' },
  { id: 'r2', name: 'Royal Biryani', ownerId: 'u5', address: '456 Park Street, Delhi', phone: '011-87654321', isActive: true, isOpen: true, slug: 'royal-biryani', balance: 32000, dueBalance: 800, subscriptionStart: '2026-02-01', subscriptionEnd: '2026-08-01', createdAt: '2024-03-20' },
  { id: 'r3', name: 'Tandoor Express', ownerId: 'u2', address: '789 Lake Road, Bangalore', phone: '080-11223344', isActive: false, isOpen: false, slug: 'tandoor-express', balance: 5000, dueBalance: 15000, subscriptionStart: '2025-06-10', subscriptionEnd: '2025-12-10', createdAt: '2024-06-10' },
  { id: 'r4', name: 'Mumbai Masala', ownerId: 'u6', address: '321 Marine Drive, Mumbai', phone: '022-99887766', isActive: true, isOpen: true, slug: 'mumbai-masala', balance: 18000, dueBalance: 500, subscriptionStart: '2026-01-01', subscriptionEnd: '2026-07-01', createdAt: '2025-01-01' },
];

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Main Course', restaurantId: 'r1', itemCount: 5 },
  { id: 'cat2', name: 'Starters', restaurantId: 'r1', itemCount: 3 },
  { id: 'cat3', name: 'Breads', restaurantId: 'r1', itemCount: 2 },
  { id: 'cat4', name: 'Beverages', restaurantId: 'r1', itemCount: 2 },
  { id: 'cat5', name: 'Desserts', restaurantId: 'r1', itemCount: 1 },
  { id: 'cat6', name: 'Combos', restaurantId: 'r1', itemCount: 3 },
];

export const mockMenuItems: MenuItem[] = [
  { id: 'm1', name: 'Butter Chicken', price: 350, category: 'Main Course', isAvailable: true, restaurantId: 'r1', type: 'non-veg', dishType: 'Main' },
  { id: 'm2', name: 'Paneer Tikka', price: 250, category: 'Starters', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Starter' },
  { id: 'm3', name: 'Dal Makhani', price: 220, category: 'Main Course', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Main' },
  { id: 'm4', name: 'Naan', price: 40, category: 'Breads', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Bread' },
  { id: 'm5', name: 'Biryani', price: 300, category: 'Main Course', isAvailable: true, restaurantId: 'r1', type: 'non-veg', dishType: 'Main' },
  { id: 'm6', name: 'Gulab Jamun', price: 120, category: 'Desserts', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Dessert' },
  { id: 'm7', name: 'Masala Chai', price: 60, category: 'Beverages', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Beverage' },
  { id: 'm8', name: 'Tandoori Roti', price: 30, category: 'Breads', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Bread' },
  { id: 'm9', name: 'Chicken 65', price: 280, category: 'Starters', isAvailable: false, restaurantId: 'r1', type: 'non-veg', dishType: 'Starter' },
  { id: 'm10', name: 'Mango Lassi', price: 90, category: 'Beverages', isAvailable: true, restaurantId: 'r1', type: 'veg', dishType: 'Beverage' },
];

export const mockProductVariants: ProductVariant[] = [
  { id: 'pv1', productId: 'm1', unit: 'Half', price: 200, discountType: 'flat', discount: 0 },
  { id: 'pv2', productId: 'm1', unit: 'Full', price: 350, discountType: 'percentage', discount: 10 },
  { id: 'pv3', productId: 'm5', unit: 'Single', price: 200, discountType: 'flat', discount: 0 },
  { id: 'pv4', productId: 'm5', unit: 'Family', price: 550, discountType: 'percentage', discount: 5 },
];

export const mockOrders: Order[] = [
  { id: 'o1', tableNo: 3, items: [{ menuItemId: 'm1', name: 'Butter Chicken', qty: 2, price: 350 }, { menuItemId: 'm4', name: 'Naan', qty: 4, price: 40 }], total: 860, status: 'served', orderType: 'table', paymentStatus: 'pending', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-11T10:30:00' },
  { id: 'o2', tableNo: 7, items: [{ menuItemId: 'm5', name: 'Biryani', qty: 1, price: 300 }, { menuItemId: 'm7', name: 'Masala Chai', qty: 2, price: 60 }], total: 420, status: 'preparing', orderType: 'table', paymentStatus: 'pending', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-11T11:15:00' },
  { id: 'o3', tableNo: 1, items: [{ menuItemId: 'm2', name: 'Paneer Tikka', qty: 1, price: 250 }, { menuItemId: 'm3', name: 'Dal Makhani', qty: 1, price: 220 }], total: 470, status: 'pending', orderType: 'table', paymentStatus: 'pending', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-11T11:45:00' },
  { id: 'o4', tableNo: 5, items: [{ menuItemId: 'm6', name: 'Gulab Jamun', qty: 3, price: 120 }], total: 360, status: 'paid', orderType: 'table', paymentStatus: 'paid', paymentMethod: 'cash', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-11T09:00:00' },
  { id: 'o5', tableNo: 2, items: [{ menuItemId: 'm1', name: 'Butter Chicken', qty: 1, price: 350 }, { menuItemId: 'm5', name: 'Biryani', qty: 1, price: 300 }], total: 650, status: 'ready', orderType: 'packing', paymentStatus: 'pending', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-11T10:00:00' },
  { id: 'o6', tableNo: 4, items: [{ menuItemId: 'm2', name: 'Paneer Tikka', qty: 2, price: 250 }], total: 500, status: 'paid', orderType: 'delivery', paymentStatus: 'paid', paymentMethod: 'e_wallet', waiterId: 'u4', waiterName: 'Vikram', restaurantId: 'r1', createdAt: '2026-02-10T19:00:00' },
];

export const mockStaff: StaffMember[] = [
  { id: 'u4', name: 'Vikram Patel', phone: '9876543213', role: 'waiter', restaurantId: 'r1', perDaySalary: 500, isActive: true, attendance: 22, toPay: 3000, toReceive: 0, designation: 'Senior Waiter', joinedAt: '2024-06-01', isSuspended: false },
  { id: 's1', name: 'Rahul Verma', phone: '9876543215', role: 'waiter', restaurantId: 'r1', perDaySalary: 500, isActive: true, attendance: 20, toPay: 1500, toReceive: 0, designation: 'Waiter', joinedAt: '2024-08-15', isSuspended: false },
  { id: 's2', name: 'Anita Desai', phone: '9876543216', role: 'waiter', restaurantId: 'r1', perDaySalary: 450, isActive: true, attendance: 24, toPay: 0, toReceive: 500, designation: 'Waiter', joinedAt: '2024-09-01', isSuspended: false },
  { id: 's3', name: 'Karan Mehta', phone: '9876543217', role: 'manager', restaurantId: 'r1', perDaySalary: 800, isActive: true, attendance: 25, toPay: 0, toReceive: 0, designation: 'Floor Manager', joinedAt: '2024-03-01', isSuspended: false },
  { id: 's4', name: 'Deepa Nair', phone: '9876543218', role: 'waiter', restaurantId: 'r1', perDaySalary: 500, isActive: false, attendance: 10, toPay: 5000, toReceive: 0, designation: 'Waiter', joinedAt: '2025-01-10', isSuspended: true },
];

export const mockInventory: InventoryItem[] = [
  { id: 'i1', name: 'Chicken', unit: 'kg', currentStock: 15, minStock: 5, costPerUnit: 200, restaurantId: 'r1', vendorId: 'v1' },
  { id: 'i2', name: 'Paneer', unit: 'kg', currentStock: 8, minStock: 3, costPerUnit: 280, restaurantId: 'r1', vendorId: 'v2' },
  { id: 'i3', name: 'Rice (Basmati)', unit: 'kg', currentStock: 25, minStock: 10, costPerUnit: 120, restaurantId: 'r1', vendorId: 'v1' },
  { id: 'i4', name: 'Flour (Atta)', unit: 'kg', currentStock: 2, minStock: 5, costPerUnit: 45, restaurantId: 'r1', vendorId: 'v2' },
  { id: 'i5', name: 'Oil (Mustard)', unit: 'L', currentStock: 10, minStock: 3, costPerUnit: 180, restaurantId: 'r1', vendorId: 'v3' },
  { id: 'i6', name: 'Butter', unit: 'kg', currentStock: 1, minStock: 2, costPerUnit: 450, restaurantId: 'r1', vendorId: 'v2' },
  { id: 'i7', name: 'Tomato', unit: 'kg', currentStock: 12, minStock: 5, costPerUnit: 40, restaurantId: 'r1', vendorId: 'v3' },
  { id: 'i8', name: 'Onion', unit: 'kg', currentStock: 18, minStock: 8, costPerUnit: 30, restaurantId: 'r1', vendorId: 'v3' },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Arjun Reddy', phone: '9988776655', totalOrders: 45, totalSpent: 18500, credit: 0, lastVisit: '2026-02-10', address: '12 Hill Road, Mumbai' },
  { id: 'c2', name: 'Meera Joshi', phone: '9988776656', totalOrders: 32, totalSpent: 14200, credit: 500, lastVisit: '2026-02-09', address: '45 Park Lane, Mumbai' },
  { id: 'c3', name: 'Ravi Shankar', phone: '9988776657', totalOrders: 12, totalSpent: 5800, credit: 0, lastVisit: '2026-02-11' },
  { id: 'c4', name: 'Neha Kapoor', phone: '9988776658', totalOrders: 67, totalSpent: 28900, credit: 1200, lastVisit: '2026-02-11' },
  { id: 'c5', name: 'Suresh Iyer', phone: '9988776659', totalOrders: 8, totalSpent: 3200, credit: 0, lastVisit: '2026-01-28' },
  { id: 'c6', name: 'Kavita Patel', phone: '9988776660', totalOrders: 23, totalSpent: 9800, credit: 300, lastVisit: '2026-02-08' },
];

export const mockVendors: Vendor[] = [
  { id: 'v1', name: 'Fresh Farms Pvt Ltd', phone: '9876000001', restaurantId: 'r1', toPay: 12000, toReceive: 0 },
  { id: 'v2', name: 'Dairy Direct', phone: '9876000002', restaurantId: 'r1', toPay: 5500, toReceive: 0 },
  { id: 'v3', name: 'Sabzi Mandi Wholesale', phone: '9876000003', restaurantId: 'r1', toPay: 0, toReceive: 800 },
  { id: 'v4', name: 'Spice Traders Co', phone: '9876000004', restaurantId: 'r1', toPay: 3200, toReceive: 0 },
];

export const mockPurchases: Purchase[] = [
  { id: 'p1', restaurantId: 'r1', vendorId: 'v1', vendorName: 'Fresh Farms Pvt Ltd', items: [{ rawMaterialId: 'i1', name: 'Chicken', quantity: 10, price: 200, total: 2000 }, { rawMaterialId: 'i3', name: 'Rice', quantity: 15, price: 120, total: 1800 }], subtotal: 3800, discountType: 'flat', discount: 0, total: 3800, isPaid: true, createdAt: '2026-02-10' },
  { id: 'p2', restaurantId: 'r1', vendorId: 'v2', vendorName: 'Dairy Direct', items: [{ rawMaterialId: 'i2', name: 'Paneer', quantity: 5, price: 280, total: 1400 }, { rawMaterialId: 'i6', name: 'Butter', quantity: 3, price: 450, total: 1350 }], subtotal: 2750, discountType: 'percentage', discount: 5, total: 2613, isPaid: false, createdAt: '2026-02-09' },
  { id: 'p3', restaurantId: 'r1', vendorId: 'v3', vendorName: 'Sabzi Mandi Wholesale', items: [{ rawMaterialId: 'i7', name: 'Tomato', quantity: 20, price: 40, total: 800 }, { rawMaterialId: 'i8', name: 'Onion', quantity: 25, price: 30, total: 750 }], subtotal: 1550, discountType: 'flat', discount: 50, total: 1500, isPaid: true, createdAt: '2026-02-08' },
];

export const mockStockLogs: StockLog[] = [
  { id: 'sl1', restaurantId: 'r1', rawMaterialName: 'Chicken', type: 'in', quantity: 10, reference: 'Purchase #p1', createdAt: '2026-02-10T08:00:00' },
  { id: 'sl2', restaurantId: 'r1', rawMaterialName: 'Chicken', type: 'out', quantity: 2, reference: 'Order #o1', createdAt: '2026-02-11T10:30:00' },
  { id: 'sl3', restaurantId: 'r1', rawMaterialName: 'Rice', type: 'in', quantity: 15, reference: 'Purchase #p1', createdAt: '2026-02-10T08:00:00' },
  { id: 'sl4', restaurantId: 'r1', rawMaterialName: 'Paneer', type: 'in', quantity: 5, reference: 'Purchase #p2', createdAt: '2026-02-09T09:00:00' },
  { id: 'sl5', restaurantId: 'r1', rawMaterialName: 'Paneer', type: 'out', quantity: 1, reference: 'Order #o3', createdAt: '2026-02-11T11:45:00' },
  { id: 'sl6', restaurantId: 'r1', rawMaterialName: 'Butter', type: 'out', quantity: 0.5, reference: 'Order #o1', createdAt: '2026-02-11T10:30:00' },
  { id: 'sl7', restaurantId: 'r1', rawMaterialName: 'Tomato', type: 'in', quantity: 20, reference: 'Purchase #p3', createdAt: '2026-02-08T07:00:00' },
  { id: 'sl8', restaurantId: 'r1', rawMaterialName: 'Onion', type: 'in', quantity: 25, reference: 'Purchase #p3', createdAt: '2026-02-08T07:00:00' },
];

export const mockExpenses: Expense[] = [
  { id: 'e1', restaurantId: 'r1', name: 'Gas Cylinder Refill', description: 'Monthly gas refill for kitchen', amount: 2500, isPaid: true, createdAt: '2026-02-08' },
  { id: 'e2', restaurantId: 'r1', name: 'Napkins & Tissues', description: 'Disposable items for dining', amount: 800, vendorId: 'v4', vendorName: 'Spice Traders Co', isPaid: true, createdAt: '2026-02-07' },
  { id: 'e3', restaurantId: 'r1', name: 'Electricity Bill', description: 'Feb electricity', amount: 12000, isPaid: false, createdAt: '2026-02-05' },
  { id: 'e4', restaurantId: 'r1', name: 'Pest Control', description: 'Monthly pest control service', amount: 3000, isPaid: true, createdAt: '2026-02-01' },
  { id: 'e5', restaurantId: 'r1', name: 'Water Supply', description: 'Tanker water delivery', amount: 1500, isPaid: true, createdAt: '2026-02-03' },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', restaurantId: 'r1', staffId: 'u4', staffName: 'Vikram Patel', date: '2026-02-11', status: 'present' },
  { id: 'a2', restaurantId: 'r1', staffId: 's1', staffName: 'Rahul Verma', date: '2026-02-11', status: 'present' },
  { id: 'a3', restaurantId: 'r1', staffId: 's2', staffName: 'Anita Desai', date: '2026-02-11', status: 'leave', leaveReason: 'Family function' },
  { id: 'a4', restaurantId: 'r1', staffId: 's3', staffName: 'Karan Mehta', date: '2026-02-11', status: 'present' },
  { id: 'a5', restaurantId: 'r1', staffId: 'u4', staffName: 'Vikram Patel', date: '2026-02-10', status: 'present' },
  { id: 'a6', restaurantId: 'r1', staffId: 's1', staffName: 'Rahul Verma', date: '2026-02-10', status: 'absent' },
  { id: 'a7', restaurantId: 'r1', staffId: 's2', staffName: 'Anita Desai', date: '2026-02-10', status: 'present' },
  { id: 'a8', restaurantId: 'r1', staffId: 's3', staffName: 'Karan Mehta', date: '2026-02-10', status: 'present' },
];

export const mockPaidRecords: PaidRecord[] = [
  { id: 'pr1', restaurantId: 'r1', name: 'Vendor Payment - Fresh Farms', amount: 3800, vendorId: 'v1', vendorName: 'Fresh Farms Pvt Ltd', paymentMethod: 'bank', createdAt: '2026-02-10' },
  { id: 'pr2', restaurantId: 'r1', name: 'Staff Salary - Vikram', amount: 8000, staffId: 'u4', staffName: 'Vikram Patel', paymentMethod: 'cash', createdAt: '2026-02-05' },
  { id: 'pr3', restaurantId: 'r1', name: 'Vendor Payment - Sabzi Mandi', amount: 1500, vendorId: 'v3', vendorName: 'Sabzi Mandi Wholesale', paymentMethod: 'e_wallet', createdAt: '2026-02-08' },
  { id: 'pr4', restaurantId: 'r1', name: 'Gas Cylinder Expense', amount: 2500, paymentMethod: 'cash', createdAt: '2026-02-08' },
  { id: 'pr5', restaurantId: 'r1', name: 'Staff Salary - Rahul', amount: 7000, staffId: 's1', staffName: 'Rahul Verma', paymentMethod: 'bank', createdAt: '2026-02-05' },
];

export const mockReceivedRecords: ReceivedRecord[] = [
  { id: 'rr1', restaurantId: 'r1', name: 'Order Payment', customerId: 'c1', customerName: 'Arjun Reddy', orderId: 'o4', paymentMethod: 'cash', amount: 360, createdAt: '2026-02-11' },
  { id: 'rr2', restaurantId: 'r1', name: 'Order Payment', customerId: 'c4', customerName: 'Neha Kapoor', orderId: 'o6', paymentMethod: 'e_wallet', amount: 500, createdAt: '2026-02-10' },
  { id: 'rr3', restaurantId: 'r1', name: 'Credit Settlement', customerId: 'c2', customerName: 'Meera Joshi', paymentMethod: 'bank', amount: 2000, remarks: 'Partial credit payment', createdAt: '2026-02-09' },
  { id: 'rr4', restaurantId: 'r1', name: 'Order Payment', customerId: 'c3', customerName: 'Ravi Shankar', orderId: 'o2', paymentMethod: 'cash', amount: 420, createdAt: '2026-02-11' },
];

export const mockTransactions: Transaction[] = [
  { id: 'tx1', restaurantId: 'r1', restaurantName: 'Spice Garden', amount: 15, paymentStatus: 'success', transactionType: 'out', category: 'transaction_fee', isSystem: true, createdAt: '2026-02-11' },
  { id: 'tx2', restaurantId: 'r1', restaurantName: 'Spice Garden', amount: 2999, paymentStatus: 'success', transactionType: 'out', category: 'subscription_fee', isSystem: false, remarks: 'Monthly subscription', createdAt: '2026-02-01' },
  { id: 'tx3', restaurantId: 'r2', restaurantName: 'Royal Biryani', amount: 2999, paymentStatus: 'success', transactionType: 'out', category: 'subscription_fee', isSystem: false, createdAt: '2026-02-01' },
  { id: 'tx4', restaurantId: 'r1', restaurantName: 'Spice Garden', amount: 2.5, paymentStatus: 'success', transactionType: 'out', category: 'whatsapp_usage', isSystem: true, createdAt: '2026-02-11' },
  { id: 'tx5', amount: 50000, paymentStatus: 'success', transactionType: 'in', category: 'share_distribution', isSystem: true, remarks: 'Monthly distribution - Feb', createdAt: '2026-02-01' },
  { id: 'tx6', amount: 15000, paymentStatus: 'success', transactionType: 'out', category: 'share_withdrawal', isSystem: false, remarks: 'Withdrawal by Amit Sharma', createdAt: '2026-02-05' },
  { id: 'tx7', restaurantId: 'r3', restaurantName: 'Tandoor Express', amount: 15000, paymentStatus: 'pending', transactionType: 'out', category: 'due_paid', isSystem: false, remarks: 'Overdue payment', createdAt: '2026-02-08' },
];

export const mockFeedback: Feedback[] = [
  { id: 'f1', restaurantId: 'r1', customerName: 'Arjun Reddy', customerPhone: '9988776655', orderId: 'o4', staffName: 'Vikram Patel', rating: 5, review: 'Excellent food and service! Will definitely come back.', createdAt: '2026-02-11' },
  { id: 'f2', restaurantId: 'r1', customerName: 'Meera Joshi', customerPhone: '9988776656', orderId: 'o6', staffName: 'Rahul Verma', rating: 4, review: 'Good food, service was a bit slow.', createdAt: '2026-02-10' },
  { id: 'f3', restaurantId: 'r1', customerName: 'Neha Kapoor', customerPhone: '9988776658', orderId: 'o1', staffName: 'Vikram Patel', rating: 5, review: 'Best butter chicken in town!', createdAt: '2026-02-11' },
  { id: 'f4', restaurantId: 'r1', customerName: 'Ravi Shankar', customerPhone: '9988776657', orderId: 'o3', rating: 3, review: 'Food was okay, portion size could be bigger.', createdAt: '2026-02-11' },
  { id: 'f5', restaurantId: 'r1', customerName: 'Kavita Patel', customerPhone: '9988776660', orderId: 'o5', staffName: 'Anita Desai', rating: 4, review: 'Nice ambiance and tasty food.', createdAt: '2026-02-08' },
];

export const mockSuperSetting: SuperSetting = {
  id: 'ss1',
  perQrStandPrice: 500,
  subscriptionFeePerMonth: 2999,
  perTransactionFee: 15,
  isSubscriptionFee: true,
  dueThreshold: 10000,
  isWhatsappUsage: true,
  whatsappPerUsage: 2.5,
  shareDistributionDay: 1,
  balance: 250000,
};

export const mockQrStandOrders: QrStandOrder[] = [
  { id: 'qr1', restaurantId: 'r1', restaurantName: 'Spice Garden', quantity: 5, total: 2500, status: 'delivered', paymentStatus: 'success', createdAt: '2026-01-20' },
  { id: 'qr2', restaurantId: 'r2', restaurantName: 'Royal Biryani', quantity: 3, total: 1500, status: 'shipped', paymentStatus: 'success', createdAt: '2026-02-05' },
  { id: 'qr3', restaurantId: 'r4', restaurantName: 'Mumbai Masala', quantity: 10, total: 5000, status: 'pending', paymentStatus: 'pending', createdAt: '2026-02-10' },
];

export const mockShareholderWithdrawals: ShareholderWithdrawal[] = [
  { id: 'sw1', userName: 'Amit Sharma', userId: 'u2', amount: 15000, status: 'approved', createdAt: '2026-02-05' },
  { id: 'sw2', userName: 'Sanjay Gupta', userId: 'u5', amount: 10000, status: 'pending', createdAt: '2026-02-10' },
  { id: 'sw3', userName: 'Rajesh Kumar', userId: 'u1', amount: 25000, status: 'approved', createdAt: '2026-01-15' },
];

export const mockNotifications: BulkNotification[] = [
  { id: 'n1', restaurantId: 'r1', message: 'Special Diwali discount - 20% off on all orders!', type: 'whatsapp', sentCount: 42, totalCount: 45, createdAt: '2026-02-01' },
  { id: 'n2', restaurantId: 'r1', message: 'New menu items added! Try our special biryani.', type: 'sms', sentCount: 38, totalCount: 38, createdAt: '2026-01-25' },
];

export const mockTables: TableItem[] = [
  { id: 't1', restaurantId: 'r1', name: 'Table 1', capacity: 4, floor: 'Ground', nearBy: 'Entrance' },
  { id: 't2', restaurantId: 'r1', name: 'Table 2', capacity: 2, floor: 'Ground', nearBy: 'Window' },
  { id: 't3', restaurantId: 'r1', name: 'Table 3', capacity: 6, floor: 'Ground', nearBy: 'Kitchen' },
  { id: 't4', restaurantId: 'r1', name: 'Table 4', capacity: 4, floor: 'Ground', nearBy: 'Bar' },
  { id: 't5', restaurantId: 'r1', name: 'Table 5', capacity: 8, floor: 'Ground', nearBy: 'Center' },
  { id: 't6', restaurantId: 'r1', name: 'Table 6', capacity: 4, floor: '1st Floor', nearBy: 'Balcony' },
  { id: 't7', restaurantId: 'r1', name: 'Table 7', capacity: 2, floor: '1st Floor', nearBy: 'Window' },
  { id: 't8', restaurantId: 'r1', name: 'Table 8', capacity: 6, floor: '1st Floor', nearBy: 'Private' },
  { id: 't9', restaurantId: 'r1', name: 'Table 9', capacity: 10, floor: '1st Floor', nearBy: 'Party Hall' },
  { id: 't10', restaurantId: 'r1', name: 'Table 10', capacity: 4, floor: 'Terrace', nearBy: 'Open Air' },
  { id: 't11', restaurantId: 'r1', name: 'Table 11', capacity: 2, floor: 'Terrace', nearBy: 'Corner' },
  { id: 't12', restaurantId: 'r1', name: 'Table 12', capacity: 6, floor: 'Terrace', nearBy: 'Garden View' },
];

export const salesData = [
  { name: '9AM', sales: 2400 },
  { name: '10AM', sales: 4200 },
  { name: '11AM', sales: 3800 },
  { name: '12PM', sales: 7200 },
  { name: '1PM', sales: 8900 },
  { name: '2PM', sales: 6100 },
  { name: '3PM', sales: 3200 },
  { name: '4PM', sales: 2800 },
  { name: '5PM', sales: 4500 },
  { name: '6PM', sales: 5800 },
  { name: '7PM', sales: 9200 },
  { name: '8PM', sales: 11500 },
  { name: '9PM', sales: 8700 },
  { name: '10PM', sales: 4100 },
];

export const weeklySalesData = [
  { name: 'Mon', sales: 32000, orders: 42 },
  { name: 'Tue', sales: 28000, orders: 38 },
  { name: 'Wed', sales: 35000, orders: 48 },
  { name: 'Thu', sales: 30000, orders: 41 },
  { name: 'Fri', sales: 42000, orders: 56 },
  { name: 'Sat', sales: 55000, orders: 72 },
  { name: 'Sun', sales: 48000, orders: 63 },
];

export const categoryData = [
  { name: 'Main Course', value: 45, fill: '#FF6B6B' },
  { name: 'Starters', value: 20, fill: '#FF922B' },
  { name: 'Breads', value: 15, fill: '#FFD43B' },
  { name: 'Beverages', value: 12, fill: '#74C0FC' },
  { name: 'Desserts', value: 8, fill: '#51CF66' },
];
export const monthlySalesData = [
  { name: 'Jan', revenue: 280000, expenses: 180000, profit: 100000 },
  { name: 'Feb', revenue: 320000, expenses: 195000, profit: 125000 },
  { name: 'Mar', revenue: 350000, expenses: 210000, profit: 140000 },
  { name: 'Apr', revenue: 310000, expenses: 200000, profit: 110000 },
  { name: 'May', revenue: 380000, expenses: 220000, profit: 160000 },
  { name: 'Jun', revenue: 400000, expenses: 240000, profit: 160000 },
];

// Additional models from spec

export interface UnitItem {
  id: string;
  name: string;
  symbol: string;
  restaurantId: string;
}

export interface ComboSet {
  id: string;
  restaurantId: string;
  name: string;
  products: string[];
  productNames: string[];
  price: number;
}

export interface ProductRawMaterial {
  id: string;
  restaurantId: string;
  productId: string;
  productName: string;
  productVariantId: string;
  variantUnit: string;
  rawMaterialId: string;
  rawMaterialName: string;
  rawMaterialQuantity: number;
}

export const mockUnits: UnitItem[] = [
  { id: 'un1', name: 'Kilogram', symbol: 'kg', restaurantId: 'r1' },
  { id: 'un2', name: 'Liter', symbol: 'L', restaurantId: 'r1' },
  { id: 'un3', name: 'Piece', symbol: 'pc', restaurantId: 'r1' },
  { id: 'un4', name: 'Gram', symbol: 'g', restaurantId: 'r1' },
  { id: 'un5', name: 'Dozen', symbol: 'dz', restaurantId: 'r1' },
  { id: 'un6', name: 'Milliliter', symbol: 'ml', restaurantId: 'r1' },
];

export const mockComboSets: ComboSet[] = [
  { id: 'cs1', restaurantId: 'r1', name: 'Lunch Special', products: ['m1', 'm4', 'm7'], productNames: ['Butter Chicken', 'Naan', 'Masala Chai'], price: 399 },
  { id: 'cs2', restaurantId: 'r1', name: 'Biryani Feast', products: ['m5', 'm10', 'm6'], productNames: ['Biryani', 'Mango Lassi', 'Gulab Jamun'], price: 449 },
  { id: 'cs3', restaurantId: 'r1', name: 'Starter Platter', products: ['m2', 'm9'], productNames: ['Paneer Tikka', 'Chicken 65'], price: 450 },
];

export const mockProductRawMaterials: ProductRawMaterial[] = [
  { id: 'prm1', restaurantId: 'r1', productId: 'm1', productName: 'Butter Chicken', productVariantId: 'pv2', variantUnit: 'Full', rawMaterialId: 'i1', rawMaterialName: 'Chicken', rawMaterialQuantity: 0.3 },
  { id: 'prm2', restaurantId: 'r1', productId: 'm1', productName: 'Butter Chicken', productVariantId: 'pv2', variantUnit: 'Full', rawMaterialId: 'i6', rawMaterialName: 'Butter', rawMaterialQuantity: 0.05 },
  { id: 'prm3', restaurantId: 'r1', productId: 'm1', productName: 'Butter Chicken', productVariantId: 'pv2', variantUnit: 'Full', rawMaterialId: 'i7', rawMaterialName: 'Tomato', rawMaterialQuantity: 0.2 },
  { id: 'prm4', restaurantId: 'r1', productId: 'm1', productName: 'Butter Chicken', productVariantId: 'pv1', variantUnit: 'Half', rawMaterialId: 'i1', rawMaterialName: 'Chicken', rawMaterialQuantity: 0.15 },
  { id: 'prm5', restaurantId: 'r1', productId: 'm5', productName: 'Biryani', productVariantId: 'pv3', variantUnit: 'Single', rawMaterialId: 'i1', rawMaterialName: 'Chicken', rawMaterialQuantity: 0.2 },
  { id: 'prm6', restaurantId: 'r1', productId: 'm5', productName: 'Biryani', productVariantId: 'pv3', variantUnit: 'Single', rawMaterialId: 'i3', rawMaterialName: 'Rice (Basmati)', rawMaterialQuantity: 0.3 },
  { id: 'prm7', restaurantId: 'r1', productId: 'm5', productName: 'Biryani', productVariantId: 'pv3', variantUnit: 'Single', rawMaterialId: 'i8', rawMaterialName: 'Onion', rawMaterialQuantity: 0.1 },
  { id: 'prm8', restaurantId: 'r1', productId: 'm2', productName: 'Paneer Tikka', productVariantId: '', variantUnit: 'Regular', rawMaterialId: 'i2', rawMaterialName: 'Paneer', rawMaterialQuantity: 0.2 },
  { id: 'prm9', restaurantId: 'r1', productId: 'm3', productName: 'Dal Makhani', productVariantId: '', variantUnit: 'Regular', rawMaterialId: 'i6', rawMaterialName: 'Butter', rawMaterialQuantity: 0.03 },
  { id: 'prm10', restaurantId: 'r1', productId: 'm4', productName: 'Naan', productVariantId: '', variantUnit: 'Regular', rawMaterialId: 'i4', rawMaterialName: 'Flour (Atta)', rawMaterialQuantity: 0.1 },
];

export const paymentMethodData = [
  { name: 'Cash', value: 40, fill: '#FF6B6B' },
  { name: 'E-Wallet', value: 35, fill: '#FF922B' },
  { name: 'Bank', value: 25, fill: '#51CF66' },
];

export const orderTypeData = [
  { name: 'Table', value: 55, fill: '#FF6B6B' },
  { name: 'Packing', value: 30, fill: '#FF922B' },
  { name: 'Delivery', value: 15, fill: '#74C0FC' },
];

export const staffLeaderboard = [
  { id: 'u4', name: 'Vikram Patel', orders: 18, sales: 12500, rating: 4.8, tips: 850 },
  { id: 's1', name: 'Rahul Verma', orders: 14, sales: 9800, rating: 4.2, tips: 620 },
  { id: 's2', name: 'Anita Desai', orders: 12, sales: 8200, rating: 4.6, tips: 540 },
];
