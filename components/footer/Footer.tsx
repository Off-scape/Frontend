"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display, Roboto } from "next/font/google";
import LocationIcon from "@/icons/locationIcon";
import EmailIcon from "@/icons/email-icon";
import PhoneIcon from "@/icons/phone-icon";
import Instagram from "@/icons/Instagram";
import WhatsappIcon from "@/icons/Whatsapp-icon";
import TikTokIcon from "@/icons/Tik-tok-icon";
import YoutubeIcon from "@/icons/Youtube-icon";
import FooterBottom from "@/components/footer/footerBottom";
import { EMAIL_REGEX } from "@/utils/validation";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setError("Düzgün email daxil edin");
      return;
    }

    setError("");
    console.log("Email doğrudur:", email);
  };
  return (
    <div className={`${roboto.className} bg-white`}>
      <footer className="bg-[#0B3E35] text-white rounded-t-3xl">
        <div className="max-w-7xl  px-14 py-13 max-[400px]:px-8 max-[400px]:py-8">
          <h2 className={`${playfair.className} text-4xl font-medium mb-12`}>
            Offscape
          </h2>

          <div className="grid grid-cols-1  xl:grid-cols-4  lg:grid-cols-2 sm:grid-cols-2 gap-12 items-start ">
            <div>
              <h3 className="font-black mb-6 text-2xl">Sürətli Keçidlər</h3>
              <ul className="space-y-4 text-lg text-white">
                <li>
                  <Link href="/" className="hover:underline">
                    Ana səhifə
                  </Link>
                </li>
                <li>
                  <Link href="/programlar" className="hover:underline">
                    Proqramlar
                  </Link>
                </li>
                <li>
                  <Link href="/tedbirler" className="hover:underline">
                    Tədbirlər
                  </Link>
                </li>
                <li>
                  <Link href="/qalereya" className="hover:underline">
                    Qalereya
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-6 text-2xl">Aktivliklər</h3>
              <ul className="space-y-4 text-lg text-white">
                <li>
                  <Link href="/camping" className="hover:underline">
                    Camping
                  </Link>
                </li>
                <li>
                  <Link href="/hiking" className="hover:underline">
                    Hiking
                  </Link>
                </li>
                <li>
                  <Link href="/yoga" className="hover:underline">
                    Yoga
                  </Link>
                </li>
                <li>
                  <Link
                    href="/psixoloji-sessiyalar"
                    className="hover:underline"
                  >
                    Psixoloji sessiyalar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-6 text-2xl">Əlaqə</h3>
              <ul className="space-y-4 text-lg text-white">
                <li className="hover:underline cursor-pointer flex items-center gap-2.5">
                  <LocationIcon /> Azərbaycan
                </li>
                <li className="hover:underline cursor-pointer flex items-center gap-2.5">
                  <EmailIcon /> info@layiheadi.az
                </li>
                <li className="hover:underline cursor-pointer flex items-center gap-2.5">
                  <PhoneIcon /> +994 XX XXX XX XX
                </li>
                <li className="flex items-center gap-5">
                  <Instagram /> <WhatsappIcon /> <TikTokIcon /> <YoutubeIcon />
                </li>
              </ul>
            </div>
            <div>
              <div className="text-white text-sm leading-[100%] ">
                <span className={`${playfair.className} font-bold`}>
                  OFFSCAPE{" "}
                </span>
                <span className="font-normal">
                  dən son xəbərləri qaçırmayın
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                <div
                  className="border-2 relative border-[#6A6A6D] rounded-[20px]
                    w-75 sm:w-75 lg:w-100 max-[1285px]:w-75!
                    h-11 sm:h-12 px-5 py-3.5 flex items-center mt-4"
                >
                  <input
                    type="text"
                    placeholder="E-poçtunuz burada"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-white text-base outline-0 w-[75%] max-[1285px]:w-[63%] max-sm:w-[75%] h-full bg-transparent"
                  />

                  <div className="absolute right-28 bottom-0 w-px h-full bg-[#6A6A6D]" />

                  <button
                    type="submit"
                    className="font-semibold text-base text-white leading-[100%] lg:pl-3 cursor-pointer"
                  >
                    Abunə ol
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
              {/* <div
                className="flex mt-4 w-full 
                lg:w-75 
                min-[1388px]:w-75 
                items-start"
              >
                <input
                  type="checkbox"
                  id="newsletter-checkbox"
                  className="accent-[#6A6A6D] w-5 h-5 sm:w-6 sm:h-6 border-2 mt-1 shrink-0"
                />

                <label
                  htmlFor="newsletter-checkbox"
                  className="text-white text-sm ml-2 w-full block font-normal leading-6"
                >
                  Qutunu işarələməklə, ən azı 18 yaşınızın olduğunu qəbul
                  edirsiniz.
                </label>
              </div> */}
            </div>
          </div>
        </div>
        <FooterBottom />
      </footer>
    </div>
  );
}
