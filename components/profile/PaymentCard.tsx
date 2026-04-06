import { Card } from "@/types/Profile";
import { HiOutlineTrash } from "react-icons/hi";

const PaymentCard = ({ card }: { card: Card }) => {
    return (
        <div className="flex items-center justify-between h-20 border border-[#828282] rounded-[10px] py-4 px-8  max-md:py-2 max-md:px-4 ">
            <div className="flex items-center gap-3.5 ">
                <div>
                    <svg width="59" height="42" viewBox="0 0 59 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="58" height="41" rx="7.5" stroke="#D9D9D9" />
                        <path d="M19.791 23.4414L22.0352 16.4688H23.6582L20.5996 25H19.5039L19.791 23.4414ZM17.7168 16.4688L19.9434 23.4414L20.248 25H19.1465L16.0996 16.4688H17.7168ZM26.1836 16.4688V25H24.7129V16.4688H26.1836ZM33.9766 23.834V25H28.0527V23.834H33.9766ZM33.8418 17.377L28.5977 25H27.6133V24.0684L32.875 16.4688H33.8418V17.377ZM33.2969 16.4688V17.6406H27.6484V16.4688H33.2969ZM38.6582 17.6055L36.1094 25H34.5684L37.7793 16.4688H38.7637L38.6582 17.6055ZM40.791 25L38.2363 17.6055L38.125 16.4688H39.1152L42.3379 25H40.791ZM40.668 21.8359V23.002H36.0273V21.8359H40.668Z" fill="#003CFF" />
                    </svg>
                </div>
                <div >
                    <p className="font-medium text-balance text-[#5B5B5B] leading-[100%] mb-2 ">
                        7830 ilə bitən viza
                    </p>
                    <p className="font-normal text-xs text-[#828282] ">
                        Exp. tarix 06/24
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5 max-md:gap-3">

                {card.isPrimary ? (
                    <div className="cursor-pointer px-2.5 py-1.25 bg-black text-white text-xs rounded-lg max-md:text-center ">
                        Seçilmiş kart
                    </div>
                ) : (
                    <button className="cursor-pointer font-medium text-xs text-[#003CFF] max-md:text-center">
                        Əsas kart kimi təyin et
                    </button>
                )}

                <button className="group cursor-pointer">
                    <HiOutlineTrash
                        className="group-hover:text-red-600 transition-all duration-300"
                        size={24}
                    />
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;


