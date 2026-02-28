import Image from "next/image";

export default function PopularCategories() {
  const categories = [
    {
      id: 1,
      title: "Səyahət və təbiət",
      icon: "/tebietImg.svg",
      borderColor: "border-[#6A6A6D]",
      hoverGradient: "from-[#699033] to-[#80C737]",
    },
    {
      id: 2,
      title: "Sosial Aktivliklər",
      icon: "/socialImg.svg",
      borderColor: "border-[#6A6A6D]",
      hoverGradient: "from-[#EF8819] to-[#FC8C0C]",
    },
    {
      id: 3,
      title: "Hobilər və Tutqular",
      icon: "/hobbyImg.svg",
      borderColor: "border-[#6A6A6D]",
      hoverGradient: "from-[#2D4872] via-[#E15609] to-[#FC8C0C]",
    },
    {
      id: 4,
      title: "Sağlam Həyat",
      icon: "/lifeImg.svg",
      borderColor: "border-[#6A6A6D]",
      hoverGradient: "from-[#80C737] to-[#006738]",
    },
  ];

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
                min-h-[180px]
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
                 relative bottom-3 left-0 right-0 h-[15px] 
                bg-gradient-to-b ${category.hoverGradient}
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
