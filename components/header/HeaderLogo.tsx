
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeaderLogo = () => {
  const navigation = useRouter();

  return (
    <h1
      onClick={() => navigation.push("/")}
      className={`${playfair.className} text-3xl lg:text-[44px] font-medium text-[#F5F5DC] cursor-pointer`}
    >
      OFFscape

    </h1>
  );
};

export default HeaderLogo;
