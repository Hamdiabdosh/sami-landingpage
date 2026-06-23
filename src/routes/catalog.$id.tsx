import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Send, Phone, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getProductById } from "@/fns/products";
import { getSettings } from "@/fns/settings";
import { EASE, fadeUp, hoverLift, staggerContainer, tapScale } from "@/lib/motion";
import { buildSeoHead, jsonLdScript, productJsonLd, truncate } from "@/lib/seo";

export const Route = createFileRoute("/catalog/$id")({
  loader: async ({ params }) => {
    const [product, settings] = await Promise.all([
      getProductById({ data: { id: params.id } }),
      getSettings(),
    ]);
    if (!product) throw notFound();
    return { product, settings };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product } = loaderData;
    const seo = buildSeoHead({
      title: product.nameEn,
      description: truncate(product.descriptionEn),
      path: `/catalog/${product.id}`,
      image: product.image,
      type: "product",
    });
    return {
      ...seo,
      scripts: [jsonLdScript(productJsonLd(product))],
    };
  },
  pendingComponent: () => (
    <div className="container-x py-14">
      <div className="h-4 w-32 rounded skeleton-shimmer bg-muted" />
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl skeleton-shimmer bg-muted" />
        <div className="space-y-4">
          <div className="h-6 w-24 rounded-full skeleton-shimmer bg-muted" />
          <div className="h-10 w-3/4 rounded skeleton-shimmer bg-muted" />
          <div className="h-24 w-full rounded skeleton-shimmer bg-muted" />
        </div>
      </div>
    </div>
  ),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/catalog" className="mt-4 inline-block text-gold">← Back to catalog</Link>
    </div>
  ),
});

function ProductDetail() {
  const { product, settings } = Route.useLoaderData();
  const { t, lang } = useI18n();

  const name = lang === "en" ? product.nameEn : product.nameAm;
  const desc = lang === "en" ? product.descriptionEn : product.descriptionAm;

  const inquiryText = encodeURIComponent(
    lang === "am"
      ? `ሰላም ሳሚ ጄኔራል ትሬዲንግ፣ ስለ ${product.nameAm} መረጃ እፈልጋለሁ።`
      : `Hello Sami General Trading, I'd like to inquire about: ${product.nameEn}`,
  );
  const waLink = `https://wa.me/251${settings.whatsapp.replace(/^0/, "")}?text=${inquiryText}`;
  const tgLink = `https://t.me/${settings.telegram}?text=${inquiryText}`;
  const telLink = `tel:${settings.phone}`;
  const mailLink = `mailto:${settings.email}?subject=${encodeURIComponent("Product inquiry: " + product.nameEn)}`;

  return (
    <section className="container-x py-10 md:py-14">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} /> {t("product.back")}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <motion.div
          layoutId={`product-image-${product.id}`}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-muted group"
        >
          <img
            src={product.image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
            <motion.span variants={fadeUp} className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              {product.subtype}
            </motion.span>
            <motion.h1 variants={fadeUp} className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
              {name}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
              {desc}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <h2 className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">{t("product.specs")}</h2>
              <div className="mt-4 rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s: { label: string; value: string }, i: number) => (
                      <tr key={i} className="border-b border-border last:border-b-0">
                        <td className="px-5 py-3 text-muted-foreground bg-muted/30 w-1/2">{s.label}</td>
                        <td className="px-5 py-3 font-medium">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
              <motion.a
                whileHover={hoverLift}
                whileTap={tapScale}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 font-semibold text-white hover:brightness-105 transition-all"
              >
                <MessageCircle size={18} /> {t("product.inquire.wa")}
              </motion.a>
              <motion.a
                whileHover={hoverLift}
                whileTap={tapScale}
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-5 py-4 font-semibold text-white hover:brightness-105 transition-all"
              >
                <Send size={18} /> {t("product.inquire.tg")}
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-4 flex flex-wrap gap-4 text-sm">
              <a href={telLink} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                <Phone size={14} /> {t("product.call")}: {settings.phone}
              </a>
              <a href={mailLink} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                <Mail size={14} /> {t("product.email")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}
