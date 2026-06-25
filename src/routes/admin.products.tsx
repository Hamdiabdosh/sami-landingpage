import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-route";
import { uploadImage, useProducts } from "@/lib/queries";
import type { Product, Category, Spec } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/categories";
import { formatServerError } from "@/lib/format-error";
import { toast } from "sonner";
import { adminHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/products")({
  beforeLoad: requireAdminSession,
  head: () => adminHead("Products"),
  component: ProductsAdmin,
});

const CAT_LABEL: Record<Category, string> = {
  bikes: CATEGORY_LABEL.bikes.en,
  pumps: CATEGORY_LABEL.pumps.en,
  scales: CATEGORY_LABEL.scales.en,
  other: CATEGORY_LABEL.other.en,
};

const emptyProduct = (): Product => ({
  id: "",
  nameEn: "",
  nameAm: "",
  category: "bikes",
  subtype: "",
  descriptionEn: "",
  descriptionAm: "",
  image: "",
  specs: [{ label: "", value: "" }],
  active: true,
});

function ProductsAdmin() {
  const { products, upsert, remove } = useProducts({ admin: true });
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <AdminShell title="Products">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{products.length} products total</p>
        <button
          onClick={() => setEditing(emptyProduct())}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 font-semibold hover:brightness-110"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3">
                    {p.image ? (
                      <img src={p.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-muted" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{p.nameEn}</div>
                    <div className="text-xs text-muted-foreground">{p.subtype}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{CAT_LABEL[p.category]}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}>
                      {p.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setEditing(p)} className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-muted">
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={async () => { if (confirm(`Delete "${p.nameEn}"?`)) await remove(p.id); }}
                        className="h-9 w-9 grid place-items-center rounded-lg border border-border text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No products yet. Click "Add Product".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <ProductDialog
            initial={editing}
            saving={saving}
            onClose={() => setEditing(null)}
            onSave={async (p) => {
              setSaving(true);
              try {
                await upsert(p);
                setEditing(null);
              } catch (e) {
                toast.error(formatServerError(e));
              } finally {
                setSaving(false);
              }
            }}
          />
        )}
      </AnimatePresence>
    </AdminShell>
  );
}

function ProductDialog({ initial, onSave, onClose, saving }: { initial: Product; onSave: (p: Product) => void | Promise<void>; onClose: () => void; saving?: boolean }) {
  const [p, setP] = useState<Product>(initial);
  const [uploading, setUploading] = useState(false);

  const onFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      try {
        const url = await uploadImage(String(reader.result));
        setP((prev) => ({ ...prev, image: url }));
      } catch (e) {
        toast.error(formatServerError(e));
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const setSpec = (i: number, patch: Partial<Spec>) => {
    setP({ ...p, specs: p.specs.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  };
  const addSpec = () => setP({ ...p, specs: [...p.specs, { label: "", value: "" }] });
  const rmSpec = (i: number) => setP({ ...p, specs: p.specs.filter((_, idx) => idx !== i) });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
        className="relative w-full max-w-3xl rounded-3xl bg-card text-card-foreground my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl font-bold">{initial.nameEn ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-muted">
            <X size={18} />
          </button>
        </header>

        <form
          onSubmit={(e) => { e.preventDefault(); onSave(p); }}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name (English)">
              <input required value={p.nameEn} onChange={(e) => setP({ ...p, nameEn: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Name (Amharic, optional)">
              <input value={p.nameAm} onChange={(e) => setP({ ...p, nameAm: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Category">
              <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value as Category })} className={inputCls}>
                <option value="bikes">Bicycles & Parts</option>
                <option value="pumps">Water Pumps</option>
                <option value="scales">Scales</option>
                <option value="other">Other</option>
              </select>
            </Field>
            <Field label={p.category === "other" ? "Type / subtype (required for Other)" : "Subtype"}>
              <input value={p.subtype} onChange={(e) => setP({ ...p, subtype: e.target.value })} placeholder="e.g. Mountain bike" className={inputCls} />
            </Field>
          </div>

          <Field label="Description (English)">
            <textarea value={p.descriptionEn} onChange={(e) => setP({ ...p, descriptionEn: e.target.value })} rows={3} className={inputCls} />
          </Field>
          <Field label="Description (Amharic, optional)">
            <textarea value={p.descriptionAm} onChange={(e) => setP({ ...p, descriptionAm: e.target.value })} rows={3} className={inputCls} />
          </Field>

          <Field label="Image">
            <div className="flex items-center gap-4">
              {p.image && <img src={p.image} alt="" className="h-20 w-20 rounded-lg object-cover border border-border" />}
              <label className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 cursor-pointer hover:bg-muted">
                <Upload size={16} />
                <span className="text-sm font-medium">{uploading ? "Uploading…" : p.image ? "Replace image" : "Upload image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>
          </Field>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Specifications</label>
              <button type="button" onClick={addSpec} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                <Plus size={14} /> Add row
              </button>
            </div>
            <div className="space-y-2">
              {p.specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s.label} onChange={(e) => setSpec(i, { label: e.target.value })} placeholder="Label (e.g. Capacity)" className={inputCls} />
                  <input value={s.value} onChange={(e) => setSpec(i, { value: e.target.value })} placeholder="Value (e.g. 150 kg)" className={inputCls} />
                  <button type="button" onClick={() => rmSpec(i)} className="h-11 w-11 shrink-0 grid place-items-center rounded-xl border border-border text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-border p-4 cursor-pointer">
            <input type="checkbox" checked={p.active} onChange={(e) => setP({ ...p, active: e.target.checked })} className="h-5 w-5 accent-primary" />
            <div>
              <div className="font-medium">Active</div>
              <div className="text-xs text-muted-foreground">Visible on the public catalog when checked.</div>
            </div>
          </label>

          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button type="button" onClick={onClose} className="px-5 py-3 rounded-xl border border-border font-semibold hover:bg-muted">Cancel</button>
            <button type="submit" disabled={saving || uploading} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 disabled:opacity-60">
              {saving ? "Saving…" : "Save Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
