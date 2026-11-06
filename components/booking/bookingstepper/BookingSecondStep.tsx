
'use client'
import { CreditCardsService } from "@/services/creditcards.services";
import { IPaymentCard, PaymentCard } from "@/types/Payment";
import { ITourDate } from "@/types/Tour";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  chosenTourDate: ITourDate | null;
  bookData: { tourDateId: number | null; seats: number | null; childSeats: number | null; cardId: number | null }
  setBookData: Dispatch<SetStateAction<{ tourDateId: number | null; seats: number | null; childSeats: number | null; cardId: number | null }>>
}
const BookingSecondStep = ({ setStep, chosenTourDate, bookData, setBookData }: Props) => {
  const [userCards, setUserCards] = useState<IPaymentCard[]>([]);
  const [cardForm, setCardForm] = useState<PaymentCard>({
    cardholder_name: "",
    last_four_digits: "",
    card_type: "",
    expiry_month: 0,
    expiry_year: 0,
  });


  const handleCardFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value,   } = e.target;
    setCardForm((prev) => ({
      ...prev,
      [name]:
        name === "expiry_month" || name === "expiry_year"
          ? Number(value)
          : value,
    }));
  };
  const getUserCards = async () => {
    try {
      const response = await CreditCardsService.getCards()
      setUserCards(response.data.data)
      response.data.data.forEach((card: IPaymentCard) => {
        if (card.isDefault) {
          setBookData((prevData) => ({ ...prevData, cardId: card.id }));
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const getUserCards = async () => {
      try {
        const response = await CreditCardsService.getCards()
        setUserCards(response.data.data)
        response.data.data.forEach((card: IPaymentCard) => {
          if (card.isDefault) {
            setBookData((prevData) => ({ ...prevData, cardId: card.id }));
            console.log("Default Card ID set in bookData:", card.id);
          }
        })
      } catch (error) {
        console.log(error)
      }

    }

    getUserCards()
  }, [])

  const handleChooseDefaultCard = async (cardId: number) => {
    try {
      await CreditCardsService.setDefaultCard(cardId);

      getUserCards()

    } catch (error) {
      console.error("Error setting default card:", error);
    }
  };
  const handLeNextStep = () => {
    if (bookData.cardId) {
      setStep(3)
    } else {
      alert("Zəhmət olmasa ödəniş kartını seçin.")
    }

  }
  const handleAddCard = async () => {

    const payload = {
      cardholder_name: cardForm.cardholder_name,
      last_four_digits: String(cardForm.last_four_digits),
      card_type: cardForm.card_type,
      expiry_month: Number(cardForm.expiry_month),
      expiry_year: Number(cardForm.expiry_year),
    };
    try {
      const response = await CreditCardsService.createCard(payload);
      if (response.status === 201) {
        alert("Kart uğurla əlavə edildi.");
        setCardForm({
          cardholder_name: "",
          last_four_digits: "",
          card_type: "",
          expiry_month: 0,
          expiry_year: 0,
        });
        getUserCards();
      } else {
        alert("Kart əlavə edilərkən xəta baş verdi.");
      }
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Kart əlavə edilərkən xəta baş verdi.");
    }
  };
  return (
    <div className="grid grid-cols-2 gap-6 max-[1024px]:grid-cols-1">
      <div className="">
        <div className="border h-full border-[#C4C4C4] rounded-[10px]  p-5 mb-5  max-[430px]:p-2.5  flex flex-col">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Yeni Kart Əlavə Et
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4]" />
          <h4 className="text-[#142A12] text-[15px] font-medium mb-3 mt-6">
            Kart Sahibinin Adı və Soyadı
          </h4>
          <div className="flex items-center justify-between mt-5 border border-[#C4C4C4] rounded-[10px] p-5 h-[60px] max-[430px]:p-2.5">

            <input
              type="text"
              placeholder="Məs: ELVIN ALIYEV"
              name="cardholder_name"
              value={cardForm.cardholder_name}
              onChange={handleCardFormChange}
              className="text-ms text-[#142A12] w-full font-normal focus:outline-none focus:border-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 max-[430px]:grid-cols-1">
            <div className="flex flex-col">
              <h4 className="text-[#142A12] text-[15px] font-medium mb-3">
                Kart Nömrəsi
              </h4>
              <div className="flex items-center border border-[#C4C4C4] rounded-[10px] px-5 h-[60px] max-[430px]:px-2.5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  name="last_four_digits"
                  value={cardForm.last_four_digits}
                  onChange={handleCardFormChange}
                  className="text-[#142A12] font-normal focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[#142A12] text-[15px] font-medium mb-3">
                Kart tipi
              </h4>
              <div className="relative h-[60px]">
                <select
                  name="card_type"
                  value={cardForm.card_type}
                  onChange={handleCardFormChange}
                  className="h-full w-full appearance-none rounded-[10px] border border-[#C4C4C4] bg-white px-5 pr-10 text-[#142A12] font-normal outline-none focus:border-[#142A12]"
                >
                  <option value="" disabled>
                    Seçin
                  </option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="other">Digər</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#142A12]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-7 mb-7">
            <div className="flex-1">
              <label
                className="block text-sm font-bold text-gray-900 mb-1"
              >
                Ay
              </label>

              <input
                type="number"
                min={1}
                max={12}
                placeholder="MM"
                name="expiry_month"
                value={cardForm.expiry_month}
                onChange={handleCardFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-800 focus:outline-none "
              />

            </div>

            <div className="flex-1">
              <label
                className="block text-sm font-bold text-gray-900 mb-1"
              >
                İl
              </label>

              <input
                type="number"
                min={new Date().getFullYear()}
                placeholder="YYYY"
                name="expiry_year"
                value={cardForm.expiry_year}
                onChange={handleCardFormChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-800 focus:outline-none "
              />

            </div>
          </div>
          <div>
            <input type="checkbox" id="defaultcard" name="isDefault" onChange={handleCardFormChange} />
            <label htmlFor="defaultcard" className="font-normal text-[#888888] text-[15px] inline-block ml-2.5">
              &quot;Default kart et&quot; - Növbəti ödənişlər üçün saxlanılsın
            </label>
          </div>
          <button className=" mt-auto   text-white bg-[#142A12] w-full py-2.5 rounded-[5px] cursor-pointer " onClick={handleAddCard}>
            Kartı Əlavə Et
          </button>
        </div>
      </div>
      <div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5 mb-5  max-[430px]:p-2.5 ">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-3">
            Saxlanılmış Kartların Siyahısı
          </h4>
          <div className="w-full h-[0.5px] bg-[#C4C4C4] mb-3" />
          <div className="flex flex-col gap-2">
            {


              userCards.length === 0 ? (
                <p className="text-[#142A12] text-[15px] font-medium ">Saxlanılmış kart yoxdur</p>
              ) : (
                userCards.map((card) => (
                  <div key={card.id} className={` border ${card.isDefault ? 'border-[#3866FF] bg-[#EBF0FF]' : 'border-[#C4C4C4]'} p-3  rounded-[5px] flex items-center justify-between  cursor-pointer`} onClick={() => handleChooseDefaultCard(card.id)}>
                    <div className="flex items-center ">
                      <div className={` w-4 h-4 rounded-full border ${card.isDefault ? 'border-[#3866FF]' : 'border-[#C4C4C4]'}  flex items-center justify-center mr-5`}>
                        {
                          card.isDefault && (
                            <div className="w-2 h-2 bg-[#3866FF] rounded-full"></div>
                          )
                        }
                      </div>
                      <div className="flex items-center">
                        <div className="py-2 px-2.5 bg-[#06174F] rounded-[5px] text-white  font-medium text-xs w-fit mr-5">
                          {card.cardType.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[#142A12] text-[15px] font-medium ">**** {card.lastFourDigits}</p>
                          <p className="text-[#142A12] text-xs font-normal ">
                            Bitmə tarixi: {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear.toString().slice(-2)}
                          </p>
                        </div>
                      </div>

                    </div>
                    <div>
                      {
                        card.isDefault && (
                          <button className="text-[#0327A0] bg-[#C3D1F8] cursor-pointer rounded-[5px] py-2 px-4 text-xs font-normal">
                            Default Kart
                          </button>
                        )
                      }
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
        <div className="border border-[#C4C4C4] rounded-[10px]  p-5   max-[430px]:p-2.5  flex flex-col">
          <h4 className="text-[#142A12] text-[18px] font-medium mb-2.5">
            Seçim Xülasəsi
          </h4>
          <div>
            <h4 className="text-[#142A12] text-[15px] font-medium">
              {chosenTourDate?.startDate || "Seçim edin"} – {chosenTourDate?.endDate || "Seçim edin"}
            </h4>
            <p className="text-[#7D7D7D] text-xs font-normal">
              {bookData.seats} Böyük, {bookData.childSeats} Uşaq
            </p>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[15px] text-[#7D7D7D] font-medium ">
                Tur qiyməti
              </p>
              <p className="tetx-[#142A12] font-medium text-[15px]">
                {chosenTourDate?.price || "0"} {chosenTourDate?.currency || "AZN"}
              </p>
            </div>
            <div className="w-full h-[1px] bg-[#C4C4C4]" />
            <div className="flex items-center justify-between mb-4 mt-3">
              <p className="text-[20px] text-[#142A12] font-medium ">
                Ödəniləcək:
              </p>
              <p className="tetx-[#142A12] font-medium text-[20px]">
                {((bookData.seats ?? 0) + (bookData.childSeats ?? 0)) * Number(chosenTourDate?.price ?? 0)} {chosenTourDate?.currency || "AZN"}
              </p>
            </div>
          </div>
          <button
            onClick={handLeNextStep}

            className=" text-white bg-[#142A12] w-full py-2.5 rounded-[5px] cursor-pointer ">
            Növbəti: Təsdiqləmə
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSecondStep
