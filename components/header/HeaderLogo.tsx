import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const HeaderLogo = () => {
  return (
    <h1 className={`${playfair.className} ml-8 text-4xl font-medium`}>
      Offscape
    </h1>
  );
};

export default HeaderLogo;