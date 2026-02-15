export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#FF922B',
  accent: '#51CF66',
  background: '#0F0D0B',
  card: '#1A1614',
  glass: '#1F1B18',
  glassBorder: '#2E2824',
  text: '#F5F0EB',
  textMuted: '#8A7E74',
  destructive: '#FF4444',
  success: '#51CF66',
  warning: '#FFD43B',
  info: '#74C0FC',
} as const;

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  OWNER: 'owner',
  MANAGER: 'manager',
  WAITER: 'waiter',
  CUSTOMER: 'customer',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  owner: 'Owner',
  manager: 'Manager',
  waiter: 'Waiter',
  customer: 'Customer',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: '#FF6B6B',
  owner: '#FF922B',
  manager: '#74C0FC',
  waiter: '#51CF66',
  customer: '#E599F7',
};
