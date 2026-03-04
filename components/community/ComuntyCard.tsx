import { CommunityItem } from "@/types/community1"
import Image from "next/image"
import { Roboto } from "next/font/google";
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const ComuntyCard = ({ item }: { item: CommunityItem }) => {
  return (
    <div className={roboto.className}>
      <div className="w-full h-48 mb-4 flex items-center justify-center">
        <Image  width={440} height={220} src={item.image} alt={item.name} className="w-full h-full object-cover rounded-[20px]" />
      </div>
      <h3 className="text-2xl  font-semibold text-[#142A12] mb-5">{item.name}</h3>
      <p className="text-[#33443A] font-medium text-xl">{item.description}</p>
    </div>
  )
}

export default ComuntyCard