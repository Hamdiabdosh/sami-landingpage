import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CategoryPage, type Product } from "@/components/CategoryPage";
import img from "@/assets/cat-bikes.jpg";

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/bicycles")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Bicycles & Spare Parts — Sami General Trading · Dire Dawa" },
      {
        name: "description",
        content:
          "City, mountain and kids bicycles plus spare parts. Available at Sami General Trading in Dire Dawa, Ethiopia.",
      },
      { property: "og:title", content: "Bicycles — Sami General Trading" },
      { property: "og:description", content: "Bicycles & spare parts in Dire Dawa." },
      { property: "og:image", content: img },
    ],
    links: [{ rel: "canonical", href: "/bicycles" }],
  }),
  component: BicyclesPage,
});

const products: Product[] = [
  { title: 'Mountain Bike 26"', spec: "21-speed · Steel frame · Disc brakes", image: img },
  { title: "City Bike — Classic", spec: "Single-speed · Comfort saddle", image: img },
  { title: "Kids Bike 20\"", spec: "Training wheels · Coaster brake", image: img },
  { title: 'BMX 20"', spec: "Reinforced frame · Stunt pegs", image: img },
  { title: "Mountain Bike 27.5\"", spec: "Front suspension · 24-speed", image: img },
  { title: "Folding Bike", spec: "Compact · 6-speed · Steel", image: img },
  { title: "Cargo Bike", spec: "Front rack · Heavy-duty tires", image: img },
  { title: "Tire — 26\" Knobby", spec: "Spare part · Pair", image: img },
  { title: "Inner Tube 26\"", spec: "Spare part · Schrader valve", image: img },
  { title: "Brake Pads (Set)", spec: "Spare part · V-brake", image: img },
  { title: "Chain — 1/2 x 1/8\"", spec: "Spare part · Single-speed", image: img },
  { title: "Saddle — Comfort", spec: "Spare part · Padded", image: img },
  { title: "Pedals — Aluminum", spec: "Spare part · 9/16\"", image: img },
  { title: "Bell & Reflector Kit", spec: "Accessory pack", image: img },
];

function BicyclesPage() {
  const { page } = Route.useSearch();
  return (
    <CategoryPage
      category="bicycles"
      eyebrow="Bicycles & Spare Parts"
      title="Bicycles & Spare Parts"
      blurb="City, mountain, kids and cargo bikes — backed by a deep range of spares for everyday repairs and maintenance."
      heroImage={img}
      products={products}
      page={page}
    />
  );
}
