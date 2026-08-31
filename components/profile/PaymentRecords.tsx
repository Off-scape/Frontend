'use client'
import PaymentCart from "@/icons/PaymentCart"
import PaymentForm from "@/components/profile/PaymentForm ";
import { useEffect, useRef, useState } from "react";
import { CreditCardsService } from "@/services/creditcards.services";

const PaymentRecords = () => {
    const [isCardFormOpen, setIsCardFormOpen] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);
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
        const getAllCards = async () => {
            try {
                const response = await CreditCardsService.getCards()
                console.log("Credit Cards:", response.data);

            } catch (error) {
                console.error("Error fetching credit cards:", error);
            }

        }
        getAllCards()
    }, [])
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
                <div className="flex flex-col gap-5 lg:pr-5 xl:pr-0">
                    {/* {
                        cards.map((card) => (
                            <PaymentCard key={card.id} card={card} />
                        ))
                    } */}

                </div>
                <button onClick={handleOpenForm} className="cursor-pointer  w-max h-max mt-4 py-4 px-6 bg-[#003CFF] text-white rounded-[14px] text-base font-medium lg:hidden mb-10">
                    Yeni kart əlavə edin
                </button>
            </div>
            <div ref={formRef} className="lg:w-95  ">


                <PaymentForm />
            </div>

        </div>
    )
}

export default PaymentRecords





