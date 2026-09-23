import { prisma } from "../utils/prisma.js";

export async function getOrganization(organizationId: string) {
  return prisma.organization.findUniqueOrThrow({ where: { id: organizationId } });
}

export async function updateOrganization(
  organizationId: string,
  data: Partial<{
    name: string;
    logoUrl: string;
    phone: string;
    email: string;
    address: string;
    currency: string;
    taxRate: number;
    businessHours: string;
  }>
) {
  return prisma.organization.update({ where: { id: organizationId }, data });
}

// Drives the onboarding checklist: company info -> employees -> clients ->
// first project -> budget -> materials. Each flag is derived, not stored,
// so it's always accurate.
export async function getOnboardingStatus(organizationId: string) {
  const [org, employeeCount, clientCount, projectCount, materialCount] = await Promise.all([
    prisma.organization.findUniqueOrThrow({ where: { id: organizationId } }),
    prisma.user.count({ where: { organizationId } }),
    prisma.client.count({ where: { organizationId } }),
    prisma.project.count({ where: { organizationId } }),
    prisma.material.count({ where: { organizationId } }),
  ]);

  return {
    steps: [
      { key: "company_info", label: "Add company information", done: Boolean(org.phone && org.address) },
      { key: "employees", label: "Add employees", done: employeeCount > 1 },
      { key: "clients", label: "Add clients", done: clientCount > 0 },
      { key: "first_project", label: "Create first project", done: projectCount > 0 },
      { key: "materials", label: "Add materials", done: materialCount > 0 },
    ],
  };
}
