import { AlertTriangle, ArrowUpRight, Clock } from "lucide-react";

const projectOverview = [
  { label: "Active", value: 12 },
  { label: "Completed", value: 34 },
  { label: "Upcoming", value: 4 },
  { label: "Delayed", value: 2 },
];

const financialOverview = [
  { label: "Total Project Value", value: "$1,240,000" },
  { label: "Total Expenses", value: "$812,500" },
  { label: "Invoiced", value: "$980,000" },
  { label: "Collected", value: "$871,200" },
  { label: "Outstanding", value: "$108,800" },
];

const alerts = [
  { text: "3 tasks overdue on Riverside Villa", tone: "warning" },
  { text: "Cement stock below minimum threshold", tone: "warning" },
  { text: "Harbor View project delayed 4 days", tone: "danger" },
  { text: "Invoice #INV-00148 is overdue", tone: "danger" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500">Here's what's happening across your projects today.</p>
      </div>

      {/* Project overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {projectOverview.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink-300/20 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{s.label} Projects</p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Financial overview */}
        <div className="rounded-xl border border-ink-300/20 bg-white p-5 lg:col-span-2">
          <h2 className="font-semibold text-ink-900">Financial Overview</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {financialOverview.map((f) => (
              <div key={f.label}>
                <p className="text-xs text-ink-500">{f.label}</p>
                <p className="mt-1 font-semibold text-ink-900">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-ink-300/20 bg-white p-5">
          <h2 className="font-semibold text-ink-900">Alerts</h2>
          <ul className="mt-4 space-y-3">
            {alerts.map((a) => (
              <li key={a.text} className="flex items-start gap-2 text-sm">
                <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${a.tone === "danger" ? "text-red-500" : "text-amber-500"}`} />
                <span className="text-ink-700">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Today's work */}
      <div className="rounded-xl border border-ink-300/20 bg-white p-5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-brand-600" />
          <h2 className="font-semibold text-ink-900">Today's Work</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink-500">Tasks Due Today</p>
            <p className="mt-1 text-lg font-semibold text-ink-900">9</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Worker Assignments</p>
            <p className="mt-1 text-lg font-semibold text-ink-900">27</p>
          </div>
          <div>
            <p className="text-xs text-ink-500">Site Activities</p>
            <p className="mt-1 text-lg font-semibold text-ink-900">6 reports pending</p>
          </div>
        </div>
      </div>

      <a href="/dashboard/projects" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
        View all projects <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
