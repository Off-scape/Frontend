import { categories } from "@/data/Categories";
import Image from "next/image";

export default function PopularCategories() {


  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Ən populyar kateqoriyalar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-[20px] cursor-pointer"
          >
            {/* Main Card */}
            <div
              className={`
                bg-white rounded-[20px] border-[3px] ${category.borderColor}
                p-6
                transition-all duration-300 ease-in-out
                flex flex-col items-start justify-between
                min-h-45
                relative
                z-10
                
              `}
            >
              <h3 className="text-3xl font-bold  text-gray-700 mx-2  leading-tight">
                {category.title}
              </h3>

              <div className="self-end mt-auto">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
            </div>

            <div
              className={`
                 relative bottom-3 left-0 right-0 h-3.75
                bg-linear-to-b ${category.hoverGradient}
                rounded-[20px]
                opacity-30 group-hover:opacity-100
                transform  scale-y-120 group-hover:scale-y-200 rounded-b-2xl
                transition-all duration-600 ease-in-out
              `}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
