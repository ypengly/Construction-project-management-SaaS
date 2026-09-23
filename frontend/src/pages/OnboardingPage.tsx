import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface Step {
  key: string;
  label: string;
  done: boolean;
}

export default function OnboardingPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/organization/onboarding").then((r) => setSteps(r.data.steps));
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-ink-900">Let's set up your company</h1>
      <p className="mt-2 text-sm text-ink-500">A few quick steps before you dive in.</p>
      <ul className="mt-8 space-y-3">
        {steps.map((s) => (
          <li key={s.key} className="flex items-center gap-3 rounded-lg border border-ink-300/20 bg-white px-4 py-3">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                s.done ? "bg-brand-600 text-white" : "border border-ink-300/40 text-ink-300"
              }`}
            >
              {s.done ? "✓" : ""}
            </span>
            <span className={`text-sm ${s.done ? "text-ink-500 line-through" : "text-ink-900"}`}>{s.label}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Go to dashboard
      </button>
    </div>
  );
}
