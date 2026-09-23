import { HardHat } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuthStore } from "../stores/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [form, setForm] = useState({ organizationName: "", fullName: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      setSession(data.user, data.accessToken, data.refreshToken);
      navigate("/onboarding");
    } catch (err: any) {
      setError(err.response?.data?.error?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900/[.02] px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <HardHat className="h-6 w-6 text-brand-600" />
          <span className="text-lg font-semibold text-ink-900">BuildFlow</span>
        </div>
        <div className="rounded-2xl border border-ink-300/20 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-ink-900">Start your free trial</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Company name" value={form.organizationName} onChange={update("organizationName")} />
            <Field label="Your full name" value={form.fullName} onChange={update("fullName")} />
            <Field label="Email" type="email" value={form.email} onChange={update("email")} />
            <Field label="Password" type="password" value={form.password} onChange={update("password")} minLength={8} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Start Free"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  minLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700">{props.label}</label>
      <input
        type={props.type ?? "text"}
        required
        minLength={props.minLength}
        value={props.value}
        onChange={props.onChange}
        className="mt-1 w-full rounded-lg border border-ink-300/40 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}
