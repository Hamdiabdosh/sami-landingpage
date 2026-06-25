import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CategoryPage, type Product } from "@/components/CategoryPage";
import img from "@/assets/cat-scales.jpg";

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/scales")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Weighing Scales — Sami General Trading · Dire Dawa" },
      {
        name: "description",
        content:
          "Platform, counter and digital weighing scales for daily trade. Calibrated and stocked at Sami General Trading.",
      },
      { property: "og:title", content: "Weighing Scales — Sami General Trading" },
      { property: "og:description", content: "Platform, counter & digital scales in Dire Dawa." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/scales" }],
  }),
  component: ScalesPage,
});

const products: Product[] = [
  { title: "Platform Scale 150kg", spec: "Digital · LCD · Rechargeable", image: img },
  { title: "Platform Scale 300kg", spec: "Digital · Heavy-duty · Floor", image: img },
  { title: "Platform Scale 500kg", spec: "Digital · Industrial", image: img },
  { title: "Counter Scale 30kg", spec: "Retail · Price computing", image: img },
  { title: "Counter Scale 40kg", spec: "Retail · Dual display", image: img },
  { title: "Hanging Scale 100kg", spec: "Digital · Crane hook", image: img },
  { title: "Hanging Scale 300kg", spec: "Digital · Industrial hook", image: img },
  { title: "Kitchen Scale 5kg", spec: "Tabletop · Stainless plate", image: img },
  { title: "Mechanical Platform 200kg", spec: "Beam · No power needed", image: img },
  { title: "Pocket Scale 500g", spec: "Precision · 0.1g", image: img },
  { title: "Load Cell — Spare", spec: "Spare part · 500kg rated", image: img },
];

function ScalesPage() {
  const { page } = Route.useSearch();
  return (
    <CategoryPage
      category="scales"
      eyebrow="Weighing Scales"
      title="Weighing Scales"
      blurb="Platform, counter, hanging and precision scales — calibrated for shops, warehouses and farms."
      heroImage={img}
      products={products}
      page={page}
    />
  );
}
