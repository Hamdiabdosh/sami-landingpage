import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Image as ImgIcon, Settings as SettingsIcon, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-route";
import { useProducts, useGallery } from "@/lib/queries";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAdminSession,
  head: () => ({ meta: [{ title: "Dashboard — Sami Admin" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { products } = useProducts({ admin: true });
  const { items } = useGallery();
  const active = products.filter((p) => p.active).length;

  const cards = [
    { to: "/admin/products" as const, label: "Products", value: `${products.length}`, sub: `${active} active`, icon: Package },
    { to: "/admin/gallery" as const, label: "Gallery images", value: `${items.length}`, sub: "in gallery", icon: ImgIcon },
    { to: "/admin/settings" as const, label: "Site settings", value: "Edit", sub: "about, contact, branding", icon: SettingsIcon },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group rounded-2xl bg-card border border-border p-6 hover:border-gold transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <c.icon size={20} />
              </span>
              <ArrowRight size={18} className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>
            <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
            <p className="mt-1 font-display text-3xl font-bold">{c.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{c.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-lg font-semibold">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Manage your catalog and shop info from here. Changes are saved to the database and appear on the public site immediately.
        </p>
      </div>
    </AdminShell>
  );
}
