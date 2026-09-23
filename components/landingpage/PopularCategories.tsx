import Link from "next/link";
import { categories as defaultCategories } from "@/data/Categories";
import Image from "next/image";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

type CategoryItem = {
  id?: number | string;
  title?: string;
  name?: string;
  slug?: string;
  icon?: string;
  borderColor?: string;
  bottomGradient?: string;
};

interface PopularCategoriesProps {
  categories?: CategoryItem[];
}

export default function PopularCategories({
  categories = defaultCategories,
}: PopularCategoriesProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16">
      <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
        Ən populyar kateqoriyalar
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const categoryTitle = category.title || category.name || "Kateqoriya";
          const categorySlug = category.slug || slugify(categoryTitle);
          const categoryIcon = category.icon || "/tebietImg.svg";

          return (
            <Link
              key={category.id ?? categorySlug}
              href={`/kategoriyalar/${categorySlug}`}
              className="group relative block cursor-pointer overflow-hidden rounded-[20px]"
            >
              <div
                className={`
                  bg-white rounded-[20px] border-[3px] ${category.borderColor ?? "border-[#6A6A6D]"}
                  p-6
                  transition-all duration-300 ease-in-out
                  flex flex-col items-start justify-between
                  min-h-45
                  relative
                  z-10
                `}
              >
                <h3 className="mx-2 text-3xl font-bold leading-tight text-gray-700">
                  {categoryTitle}
                </h3>

                <div className="mt-auto self-end">
                  <Image
                    src={categoryIcon}
                    alt={categoryTitle}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className={`
                  relative bottom-3 left-0 right-0 h-3.75
                  bg-linear-to-r ${category.bottomGradient ?? "from-[#699033] to-[#80C737]"}
                  rounded-b-[20px]
                  opacity-40 group-hover:opacity-100
                  transform scale-y-[1.2] group-hover:scale-y-[2]
                  transition-all duration-500 ease-in-out
                `}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
