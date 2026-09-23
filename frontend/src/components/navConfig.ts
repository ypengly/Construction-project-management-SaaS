import {
  Building2,
  ClipboardList,
  FileText,
  HardHat,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import type { RoleName } from "../types";

export interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const ALL_ITEMS: (NavItem & { roles: RoleName[] })[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["OWNER", "PROJECT_MANAGER", "SITE_SUPERVISOR", "ACCOUNTANT", "WORKER", "CLIENT"] },
  { label: "Projects", href: "/dashboard/projects", icon: Building2, roles: ["OWNER", "PROJECT_MANAGER", "SITE_SUPERVISOR", "ACCOUNTANT", "WORKER", "CLIENT"] },
  { label: "Clients", href: "/dashboard/clients", icon: Users, roles: ["OWNER", "ACCOUNTANT"] },
  { label: "Workers", href: "/dashboard/workers", icon: HardHat, roles: ["OWNER", "PROJECT_MANAGER", "SITE_SUPERVISOR"] },
  { label: "Materials", href: "/dashboard/materials", icon: Package, roles: ["OWNER", "PROJECT_MANAGER", "SITE_SUPERVISOR"] },
  { label: "Equipment", href: "/dashboard/equipment", icon: Truck, roles: ["OWNER", "PROJECT_MANAGER"] },
  { label: "Estimates", href: "/dashboard/estimates", icon: ClipboardList, roles: ["OWNER", "ACCOUNTANT", "CLIENT"] },
  { label: "Expenses", href: "/dashboard/expenses", icon: Wallet, roles: ["OWNER", "PROJECT_MANAGER", "ACCOUNTANT"] },
  { label: "Invoices", href: "/dashboard/invoices", icon: Receipt, roles: ["OWNER", "ACCOUNTANT", "CLIENT"] },
  { label: "Reports", href: "/dashboard/reports", icon: FileText, roles: ["OWNER", "ACCOUNTANT"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["OWNER"] },
];

export function navForRole(role: RoleName): NavItem[] {
  return ALL_ITEMS.filter((item) => item.roles.includes(role)).map(({ roles: _roles, ...rest }) => rest);
}
