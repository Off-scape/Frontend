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
import { SubscriberService } from "@/services/subscriber.service";
import { getErrorMessage } from "@/services/api";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Footer() {
  const [pendingAction, setPendingAction] = useState<"subscribe" | "unsubscribe" | null>(null);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterError, setNewsletterError] = useState("");

  const handleNewsletterAction = async (action: "subscribe" | "unsubscribe") => {
    setPendingAction(action);
    setNewsletterMessage("");
    setNewsletterError("");
    try {
      if (action === "subscribe") {
        await SubscriberService.subscribe();
        setNewsletterMessage("Newsletter abunəliyiniz aktiv edildi.");
      } else {
        await SubscriberService.unsubscribe();
        setNewsletterMessage("Newsletter abunəliyiniz dayandırıldı.");
      }
    } catch (requestError) {
      const status = (requestError as { response?: { status?: number } })?.response?.status;
      if (action === "subscribe" && status === 409) {
        setNewsletterError("Bu email artıq newsletter-ə abunədir. Abunəlikdən çıxa bilərsiniz.");
      } else if (status === 401) {
        setNewsletterError("Newsletter-ə abunə olmaq üçün hesabınıza daxil olun.");
      } else {
        setNewsletterError(getErrorMessage(requestError));
      }
    } finally {
      setPendingAction(null);
    }
  };
  return (
    <div className={`${roboto.className} bg-white`}>
      <footer className="bg-[#0B3E35] text-white rounded-t-3xl">
        <div className="  px-14 py-13 max-[400px]:px-8 max-[400px]:py-8">
          <h2 className={`${playfair.className} text-4xl font-medium mb-12`}>
            OFFscape
          </h2>

          <div className="grid grid-cols-1  xl:grid-cols-3  lg:grid-cols-2 sm:grid-cols-2 gap-12 items-start   ">
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

            <div className="flex xl:justify-center ">
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
            </div>
            <div className=" flex flex-col xl:items-end">
              <div>

              <h3 className="font-black mb-6 text-2xl text-left">Əlaqə</h3>
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
            </div>
            <div id="newsletter" className="xl:col-span-3">
              <div className="text-white text-sm leading-[100%] ">
                <span className={`${playfair.className} font-bold`}>
                  OFFSCAPE{" "}
                </span>
                <span className="font-normal">
                  dən son xəbərləri qaçırmayın
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
                Yeniliklərdən xəbərdar olmaq üçün hesabınızla newsletter-ə abunə olun.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void handleNewsletterAction("subscribe")}
                  disabled={pendingAction !== null}
                  className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0B3E35] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pendingAction === "subscribe" ? "Abunə olunur..." : "Abunə ol"}
                </button>
                <button
                  type="button"
                  onClick={() => void handleNewsletterAction("unsubscribe")}
                  disabled={pendingAction !== null}
                  className="rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pendingAction === "unsubscribe" ? "Çıxılır..." : "Abunəlikdən çıx"}
                </button>
              </div>
              {newsletterMessage && <p role="status" className="mt-3 text-sm text-emerald-200">{newsletterMessage}</p>}
              {newsletterError && <p role="alert" className="mt-3 text-sm text-red-200">{newsletterError}</p>}
            </div>
          </div>
        </div>
        <FooterBottom />
      </footer>
    </div>
  );
}
