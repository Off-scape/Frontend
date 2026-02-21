import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeaderLogo = () => {
  return (
    <h1
      className={`${playfair.className} text-3xl lg:text-[44px] font-medium text-[#F5F5DC]`}
    >
      OFFscape

    </h1>
  );
};

export default HeaderLogo;
