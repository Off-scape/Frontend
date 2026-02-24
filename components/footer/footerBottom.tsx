import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const FooterBottom = () => {
  return (
    <div className={`${roboto.className}  px-14 py-6 max-[400px]:px-8 max-[400px]:pt-3 max-[400px]:pb-8`}>
      <div className="border-t-4 border-[#6A6A6D] pt-6">
        <div>
          <ul className="flex gap-12 max-[729px]:flex-col ">
            <li className="hover:underline cursor-pointer  font-normal">
              Xidmət Şərtləri
            </li>
            <li className="hover:underline cursor-pointer font-normal">
              Məxfilik Siyasəti
            </li>
            <li className="hover:underline cursor-pointer font-normal">
              Geri bildiriş
            </li>
            <li className="hover:underline cursor-pointer font-normal">
              Abunə ol
            </li>
            <li className="hover:underline cursor-pointer font-normal">Bloq</li>
          </ul>
        </div>
        <div className="mt-8">
          <p className="text-base text-center sm:text-left sm:text-lg font-medium ">
            © 2025 Grounded, MMC. Bütün hüquqları qorunur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
