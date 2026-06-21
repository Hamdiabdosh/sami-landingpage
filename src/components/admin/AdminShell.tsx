import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Package, Image as ImgIcon, Settings as SettingsIcon, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import { Logo } from "@/components/site/Logo";

const items: { to: "/admin" | "/admin/products" | "/admin/gallery" | "/admin/settings"; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/gallery", label: "Gallery", icon: ImgIcon },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) navigate({ to: "/admin/login" });
  }, [isPending, session, navigate]);

  if (isPending || !session) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-card border-b border-border h-14 px-4">
        <Logo size={28} />
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          aria-label="Toggle sidebar"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`fixed lg:sticky top-0 lg:top-0 z-30 h-screen w-64 shrink-0 bg-steel text-steel-foreground transition-transform ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-16 flex items-center px-5 border-b border-white/10">
            <Logo size={32} tone="light" />
          </div>
          <nav className="p-3 flex flex-col gap-1">
            {items.map((it) => {
              const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-gold text-gold-foreground"
                      : "text-steel-foreground/80 hover:bg-white/5 hover:text-steel-foreground"
                  }`}
                >
                  <it.icon size={18} />
                  {it.label}
                </Link>
              );
            })}
            <button
              onClick={async () => {
                await authClient.signOut();
                navigate({ to: "/admin/login" });
              }}
              className="mt-4 flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium text-steel-foreground/80 hover:bg-white/5 hover:text-steel-foreground"
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </aside>

        {open && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black/40"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex-1 min-w-0">
          <header className="hidden lg:flex sticky top-0 z-10 h-16 items-center justify-between bg-background/80 backdrop-blur border-b border-border px-8">
            <h1 className="font-display text-xl font-semibold">{title}</h1>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View site →
            </Link>
          </header>
          <div className="p-5 sm:p-8">
            <h1 className="lg:hidden font-display text-2xl font-semibold mb-5">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
