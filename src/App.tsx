import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/dashboards/DashboardPage";
import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import MenuPage from "./pages/menu/MenuPage";
import POSPage from "./pages/pos/POSPage";
import InventoryPage from "./pages/inventory/InventoryPage";
import StaffPage from "./pages/staff/StaffPage";
import StaffLeaderboardPage from "./pages/staff/StaffLeaderboardPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CustomerDetailPage from "./pages/customers/CustomerDetailPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import RestaurantsPage from "./pages/restaurants/RestaurantsPage";
import RestaurantDetailPage from "./pages/restaurants/RestaurantDetailPage";
import FinancePage from "./pages/finance/FinancePage";
import OwnersPage from "./pages/owners/OwnersPage";
import TablesPage from "./pages/tables/TablesPage";
import VendorsPage from "./pages/vendors/VendorsPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import PurchasesPage from "./pages/purchases/PurchasesPage";
import StockLogsPage from "./pages/stock-logs/StockLogsPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import FinanceRecordsPage from "./pages/finance-records/FinanceRecordsPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import FeedbackPage from "./pages/feedback/FeedbackPage";
import ShareholdersPage from "./pages/shareholders/ShareholdersPage";
import KYCPage from "./pages/kyc/KYCPage";
import QROrdersPage from "./pages/qr-orders/QROrdersPage";
import SuperSettingsPage from "./pages/super-settings/SuperSettingsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import UnitsPage from "./pages/units/UnitsPage";
import CombosPage from "./pages/combos/CombosPage";
import RecipesPage from "./pages/recipes/RecipesPage";
import PLReportPage from "./pages/reports/PLReportPage";
import QRMenuPage from "./pages/qr-menu/QRMenuPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      {/* Public QR Menu - no auth required */}
      <Route path="/restaurant/:slug" element={<QRMenuPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
      <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path="/pos" element={<ProtectedRoute><POSPage /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
      <Route path="/staff-leaderboard" element={<ProtectedRoute><StaffLeaderboardPage /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
      <Route path="/customers/:id" element={<ProtectedRoute><CustomerDetailPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/restaurants" element={<ProtectedRoute><RestaurantsPage /></ProtectedRoute>} />
      <Route path="/restaurants/:id" element={<ProtectedRoute><RestaurantDetailPage /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute><FinancePage /></ProtectedRoute>} />
      <Route path="/owners" element={<ProtectedRoute><OwnersPage /></ProtectedRoute>} />
      <Route path="/tables" element={<ProtectedRoute><TablesPage /></ProtectedRoute>} />
      <Route path="/vendors" element={<ProtectedRoute><VendorsPage /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
      <Route path="/units" element={<ProtectedRoute><UnitsPage /></ProtectedRoute>} />
      <Route path="/combos" element={<ProtectedRoute><CombosPage /></ProtectedRoute>} />
      <Route path="/recipes" element={<ProtectedRoute><RecipesPage /></ProtectedRoute>} />
      <Route path="/purchases" element={<ProtectedRoute><PurchasesPage /></ProtectedRoute>} />
      <Route path="/stock-logs" element={<ProtectedRoute><StockLogsPage /></ProtectedRoute>} />
      <Route path="/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
      <Route path="/finance-records" element={<ProtectedRoute><FinanceRecordsPage /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
      <Route path="/shareholders" element={<ProtectedRoute><ShareholdersPage /></ProtectedRoute>} />
      <Route path="/kyc" element={<ProtectedRoute><KYCPage /></ProtectedRoute>} />
      <Route path="/qr-orders" element={<ProtectedRoute><QROrdersPage /></ProtectedRoute>} />
      <Route path="/super-settings" element={<ProtectedRoute><SuperSettingsPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/pl-report" element={<ProtectedRoute><PLReportPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
