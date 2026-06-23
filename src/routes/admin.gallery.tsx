import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUp, ArrowDown, Trash2, Upload, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-route";
import { uploadImage, useGallery } from "@/lib/queries";
import { adminHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/gallery")({
  beforeLoad: requireAdminSession,
  head: () => adminHead("Gallery"),
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const { items, add, update, remove, move } = useGallery();
  const [pending, setPending] = useState<{ src: string; captionEn: string; captionAm: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const onFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      try {
        const src = await uploadImage(String(reader.result));
        setPending({ src, captionEn: "", captionAm: "" });
      } catch (e) {
        alert(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const savePending = async () => {
    if (!pending) return;
    await add(pending);
    setPending(null);
  };

  return (
    <AdminShell title="Gallery">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{items.length} images</p>
        <label className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 font-semibold cursor-pointer hover:brightness-110">
          <Plus size={16} /> {uploading ? "Uploading…" : "Add Image"}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        </label>
      </div>

      {pending && (
        <div className="mb-6 rounded-2xl bg-card border border-border p-5 flex flex-col sm:flex-row gap-4">
          <img src={pending.src} alt="" className="h-32 w-32 rounded-lg object-cover" />
          <div className="flex-1 space-y-3">
            <input placeholder="Caption (English)" value={pending.captionEn} onChange={(e) => setPending({ ...pending, captionEn: e.target.value })} className={inputCls} />
            <input placeholder="Caption (Amharic)" value={pending.captionAm} onChange={(e) => setPending({ ...pending, captionAm: e.target.value })} className={inputCls} />
            <div className="flex gap-2">
              <button onClick={savePending} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold">Add to Gallery</button>
              <button onClick={() => setPending(null)} className="px-4 py-2.5 rounded-xl border border-border font-semibold">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((img, i) => (
          <div key={img.id} className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              <img src={img.src} alt={img.captionEn} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
              <input
                defaultValue={img.captionEn}
                onBlur={(e) => update({ ...img, captionEn: e.target.value })}
                placeholder="Caption (EN)"
                className={inputCls}
              />
              <input
                defaultValue={img.captionAm}
                onBlur={(e) => update({ ...img, captionAm: e.target.value })}
                placeholder="Caption (AM)"
                className={inputCls}
              />
              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-1">
                  <button disabled={i === 0} onClick={() => move(img.id, -1)} className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40">
                    <ArrowUp size={15} />
                  </button>
                  <button disabled={i === items.length - 1} onClick={() => move(img.id, 1)} className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-muted disabled:opacity-40">
                    <ArrowDown size={15} />
                  </button>
                </div>
                <button
                  onClick={() => { if (confirm("Delete this image?")) remove(img.id); }}
                  className="h-9 w-9 grid place-items-center rounded-lg border border-border text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && !pending && (
          <div className="col-span-full text-center py-16 text-muted-foreground rounded-2xl border border-dashed border-border">
            <Upload size={28} className="mx-auto mb-2 opacity-50" />
            <p>No images yet. Click "Add Image" to upload your first one.</p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold";
