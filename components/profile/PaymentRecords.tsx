'use client'
import PaymentCart from "@/icons/PaymentCart"
import PaymentForm from "@/components/profile/PaymentForm ";
import PaymentCard from "@/components/profile/PaymentCard";
import { useEffect, useRef, useState } from "react";
import { CreditCardsService } from "@/services/creditcards.services";
import { IPaymentCard } from "@/types/Payment";

const PaymentRecords = () => {
    const [isCardFormOpen, setIsCardFormOpen] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);
    const [changed, setChanged] = useState(false);
    const [cards, setCards] = useState<IPaymentCard[]>([]);
    const handleAllCarts = async () => {
        const response = await CreditCardsService.getCards()

        return response.data
    }
    const handleOpenForm = () => {
        setIsCardFormOpen(true);

        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };
    useEffect(() => {
        handleAllCarts()
            .then((data) => {
                setCards(data.data);
            });
    }, [changed])

    const handleDeleteCard = async (id: number) => {
        try {
            await CreditCardsService.deleteCard(id.toString());
            setChanged(!changed);
            alert("Kart uğurla silindi.");
        } catch (error) {
            console.error("Kart silinərkən xəta baş verdi:", error);
        }
    };

    const handleSetDefaultCard = async (id: number) => {
        try {
            await CreditCardsService.setDefaultCard(id.toString());
            setChanged(!changed);
            alert("Kart uğurla əsas kart kimi təyin edildi.");
        } catch (error) {
            console.error("Kartı əsas kart kimi təyin edərkən xəta baş verdi:", error);
        }
    };
    
    return (
        <div>
            <div className="grid gap-8 grid-cols-1 xl:grid-cols-[380px_480px]">
                <div>
                    <h2 className="text-[32px] text-[#142A12] font-bold mb-5 flex items-center gap-3">
                        <PaymentCart />  Ödəniş kartı
                    </h2>
                    <p className="text-[#000000] text-base font-medium ">
                        Kredit kartlarınızı və ödəniş seçimlərinizi idarə edin
                    </p>
                    <button onClick={handleOpenForm} className="cursor-pointer  w-max h-max mt-11 py-4 px-6 bg-[#003CFF] text-white rounded-[14px] text-base font-medium hidden lg:block ">
                        Yeni kart əlavə edin
                    </button>

                </div>
                <div className="flex flex-col gap-5 lg:pr-5 xl:pr-0 max-h-[280px] overflow-y-auto hide-scrollbar ">
                    {
                        cards.map((card) => (
                            <PaymentCard key={card.id} card={card} handleDeleteCard={handleDeleteCard} handleSetDefaultCard={handleSetDefaultCard} />
                        ))
                    }

                </div>
                <button onClick={handleOpenForm} className="cursor-pointer  w-max h-max mt-4 py-4 px-6 bg-[#003CFF] text-white rounded-[14px] text-base font-medium lg:hidden mb-10">
                    Yeni kart əlavə edin
                </button>
            </div>


            <div ref={formRef}>
                <PaymentForm setChanged={setChanged} />
            </div>


        </div>
    )
}

export default PaymentRecords





