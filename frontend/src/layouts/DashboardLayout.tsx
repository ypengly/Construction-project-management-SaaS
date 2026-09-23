import { Bell, HardHat, LogOut, Search } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { navForRole } from "../components/navConfig";
import { useAuthStore } from "../stores/authStore";

export default function DashboardLayout() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();
  const items = navForRole(user?.role ?? "WORKER");

  function handleLogout() {
    clear();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-ink-900/[.015]">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-col border-r border-ink-300/20 bg-white sm:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <HardHat className="h-6 w-6 text-brand-600" />
          <span className="text-lg font-semibold text-ink-900">BuildFlow</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-900/[.03]"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-ink-300/20 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-500 hover:bg-ink-900/[.03] hover:text-ink-900"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-ink-300/20 bg-white px-6 py-3">
          <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-ink-300/30 px-3 py-1.5">
            <Search className="h-4 w-4 text-ink-300" />
            <input
              placeholder="Search projects, clients, invoices…"
              className="w-full text-sm outline-none placeholder:text-ink-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 hover:bg-ink-900/[.03]">
              <Bell className="h-5 w-5 text-ink-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                {user?.fullName?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="hidden text-sm leading-tight sm:block">
                <p className="font-medium text-ink-900">{user?.fullName}</p>
                <p className="text-xs capitalize text-ink-500">{user?.role?.replace("_", " ").toLowerCase()}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
