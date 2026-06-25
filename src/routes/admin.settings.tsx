import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-route";
import { uploadImage, useSettings } from "@/lib/queries";
import type { SiteSettings } from "@/lib/types";
import { formatServerError } from "@/lib/format-error";
import { adminHead } from "@/lib/seo";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  beforeLoad: requireAdminSession,
  head: () => adminHead("Settings"),
  component: SettingsAdmin,
});

function SettingsAdmin() {
  const { settings, save, isLoading } = useSettings();
  const [s, setS] = useState<SiteSettings | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setS(settings);
  }, [settings]);

  const onLogo = (file: File | null) => {
    if (!file || !s) return;
    const r = new FileReader();
    r.onload = async () => {
      setUploading(true);
      try {
        const logo = await uploadImage(String(r.result));
        setS({ ...s, logo });
      } catch (e) {
        toast.error(formatServerError(e));
      } finally {
        setUploading(false);
      }
    };
    r.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!s) return;
    setSaving(true);
    try {
      await save(s);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(formatServerError(err));
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !s) {
    return (
      <AdminShell title="Settings">
        <p className="text-muted-foreground">Loading settings…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Settings">
      <form onSubmit={submit} className="space-y-6 max-w-3xl">
        <Section title="About">
          <Field label="About (English)">
            <textarea value={s.aboutEn} onChange={(e) => setS({ ...s, aboutEn: e.target.value })} rows={4} className={inputCls} />
          </Field>
          <Field label="About (Amharic)">
            <textarea value={s.aboutAm} onChange={(e) => setS({ ...s, aboutAm: e.target.value })} rows={4} className={inputCls} />
          </Field>
        </Section>

        <Section title="Contact">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone"><input value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} className={inputCls} /></Field>
            <Field label="WhatsApp number"><input value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} className={inputCls} /></Field>
            <Field label="Telegram handle (no @)"><input value={s.telegram} onChange={(e) => setS({ ...s, telegram: e.target.value })} className={inputCls} /></Field>
            <Field label="Email"><input type="email" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} className={inputCls} /></Field>
          </div>
        </Section>

        <Section title="Location">
          <Field label="Address">
            <input value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Google Maps link (directions)">
            <input
              value={s.mapUrl}
              onChange={(e) => setS({ ...s, mapUrl: e.target.value })}
              className={inputCls}
              placeholder="https://maps.app.goo.gl/... or Google Maps place URL"
            />
          </Field>
          <Field label="Google Maps embed URL (for map on Contact page)">
            <input
              value={s.mapEmbedUrl}
              onChange={(e) => setS({ ...s, mapEmbedUrl: e.target.value })}
              className={inputCls}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              In Google Maps: Share → Embed a map → copy the iframe <code className="text-foreground">src</code> URL.
            </p>
          </Field>
          {(s.mapEmbedUrl || s.mapUrl) && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border bg-muted">
              <iframe
                src={s.mapEmbedUrl || s.mapUrl}
                title="Map preview"
                className="w-full h-full border-0"
              />
            </div>
          )}
        </Section>

        <Section title="Branding">
          <Field label="Logo">
            <div className="flex items-center gap-4">
              {s.logo && <img src={s.logo} alt="Logo" className="h-20 w-20 rounded-lg object-contain border border-border bg-white p-1" />}
              <label className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 cursor-pointer hover:bg-muted">
                <Upload size={16} /> <span className="text-sm font-medium">{uploading ? "Uploading…" : "Upload logo"}</span>
                <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => onLogo(e.target.files?.[0] ?? null)} />
              </label>
            </div>
          </Field>
        </Section>

        <div className="flex items-center gap-3 sticky bottom-4">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-6 py-3.5 font-semibold hover:brightness-110 shadow-lg disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
