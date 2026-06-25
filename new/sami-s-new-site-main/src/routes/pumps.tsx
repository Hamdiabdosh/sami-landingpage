import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CategoryPage, type Product } from "@/components/CategoryPage";
import img from "@/assets/cat-pumps.jpg";

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/pumps")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Water Pumps — Sami General Trading · Dire Dawa" },
      {
        name: "description",
        content:
          "Surface and submersible water pumps for homes, farms and industry. Stocked at Sami General Trading in Dire Dawa.",
      },
      { property: "og:title", content: "Water Pumps — Sami General Trading" },
      { property: "og:description", content: "Surface & submersible water pumps in Dire Dawa." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/pumps" }],
  }),
  component: PumpsPage,
});

const products: Product[] = [
  { title: "Submersible Pump 1HP", spec: "Single-phase · 230V · Deep well", image: img },
  { title: "Submersible Pump 2HP", spec: "Single-phase · 230V · Deep well", image: img },
  { title: "Submersible Pump 3HP", spec: "Three-phase · 400V · Heavy-duty", image: img },
  { title: "Surface Pump 0.5HP", spec: "Self-priming · Household", image: img },
  { title: "Surface Pump 1HP", spec: "Self-priming · Garden & farm", image: img },
  { title: "Centrifugal Pump 2HP", spec: "Cast iron body · Irrigation", image: img },
  { title: "Booster Pump", spec: "Auto pressure switch · Household", image: img },
  { title: "Diesel Water Pump 3\"", spec: "Engine-driven · Field use", image: img },
  { title: "Solar Submersible Pump", spec: "DC · Off-grid wells", image: img },
  { title: "Pump Control Box", spec: "Spare part · Single-phase", image: img },
  { title: "Foot Valve 2\"", spec: "Spare part · Brass", image: img },
  { title: "Pressure Switch", spec: "Spare part · Auto cut-off", image: img },
];

function PumpsPage() {
  const { page } = Route.useSearch();
  return (
    <CategoryPage
      category="pumps"
      eyebrow="Water Pumps"
      title="Water Pumps"
      blurb="Surface, submersible, solar and diesel pumps for households, farms and industry — plus the spares to keep them running."
      heroImage={img}
      products={products}
      page={page}
    />
  );
}
