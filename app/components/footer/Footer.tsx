import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <div className="bg-white">
      <footer className="bg-[#0B3E35] text-white rounded-t-3xl">
        <div className="max-w-7xl  px-14 py-13">
          <h2 className={`${playfair.className} text-4xl font-medium mb-12`}>
            Offscape
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            <div>
              <h3 className="font-black mb-6 text-lg ">Sürətli Keçidlər</h3>
              <ul className="space-y-4 text-sm text-white">
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
              <h3 className="font-black mb-6 text-lg">Aktivliklər</h3>
              <ul className="space-y-4 text-sm text-white">
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
        </div>
      </footer>
    </div>
  );
}
