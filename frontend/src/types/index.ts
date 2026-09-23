export type RoleName =
  | "OWNER"
  | "PROJECT_MANAGER"
  | "SITE_SUPERVISOR"
  | "ACCOUNTANT"
  | "WORKER"
  | "CLIENT";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: RoleName;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  logoUrl?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  currency: string;
}

export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "DELAYED"
  | "COMPLETED"
  | "CANCELLED";

export interface ProjectSummary {
  id: string;
  projectNumber: string;
  name: string;
  clientName: string;
  status: ProjectStatus;
  progressPct: number;
  budgetTotal: number;
  spent: number;
}
