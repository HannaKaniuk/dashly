import { STEPS } from "@/data/steps";
import type { Product, ProductCategory } from "@/lib/strapi";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";

type Props = {
  shopStep: number;
  compact: number;
  products: Product[];
  categories: ProductCategory[];
  activeCategoryId: string | null;
  onCategoryChange: (documentId: string) => void;
};

export function ProductShelf({
  shopStep,
  compact,
  products,
  categories,
  activeCategoryId,
  onCategoryChange,
}: Props) {
  return (
    <aside
      id="products-shelf"
      className="sticky top-[4.5rem] self-start overflow-visible"
      style={{
        paddingBottom: `${Math.max(0, 8 - compact / 2)}px`,
        maxHeight: "calc(100vh - 5.5rem)",
      }}
    >
      <div className="flex w-full flex-col items-start gap-3 overflow-visible">
        <p className="text-base font-bold leading-[1.1] text-neutral-900">
          {STEPS[shopStep]?.cta ?? "Shop cleansers"}
        </p>
        <CategoryTabs
          categories={categories}
          activeId={activeCategoryId}
          onChange={onCategoryChange}
        />
        <div className="-mx-2 w-[calc(100%+1rem)] overflow-x-auto overflow-y-visible p-4 scrollbar-hide">
          <div className="flex w-max items-stretch gap-3 pr-2">
            {products.length ? (
              products.map((product) => (
                <ProductCard key={product.documentId} product={product} />
              ))
            ) : (
              <p className="rounded-3xl bg-neutral-200 px-6 py-10 text-base font-medium text-neutral-800">
                No products in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
