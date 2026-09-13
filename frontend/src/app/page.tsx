import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
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
    <main className="flex min-h-screen flex-col items-center bg-white">
      <Hero announcements={announcements} />
      <HowItWorks products={products} categories={categories} />
    </main>
  );
}
