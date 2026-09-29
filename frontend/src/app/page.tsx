import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import {
  getAnnouncements,
  getCategories,
  getProducts,
} from "@/lib/strapi";

export default async function HomePage() {
  const [announcements, categories, products] = await Promise.all([
    getAnnouncements(),
    getCategories(),
    getProducts(),
  ]);

  return (
    <main className="flex min-h-screen w-full flex-col items-stretch bg-white">
      <Hero announcements={announcements} />
      <HowItWorks products={products} categories={categories} />
    </main>
  );
}
