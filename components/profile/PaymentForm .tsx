'use client'
import { useForm } from "react-hook-form";
import { validations } from "@/utils/validation";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { CreditCardsService } from "@/services/creditcards.services";
import { PaymentCard } from "@/types/Payment";



const PaymentForm = ({ setChanged }: { setChanged: (changed: boolean) => void }) => {
    const [checked, setChecked] = useState(false);
    const [checkedError, setCheckedError] = useState(false);
    const handleCheckboxChange = () => {
        setChecked(!checked);
        if (checkedError) {
            setCheckedError(false);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PaymentCard>();

    const onSubmit = async (data: PaymentCard) => {
        if (!checked) {
            setCheckedError(true);
            return
        }
        try {
            await CreditCardsService.createCard(data);
            alert("Kart uğurla əlavə edildi!");
            reset();                 // Clear all form inputs
            setChecked(false);       // Uncheck the checkbox
            setCheckedError(false);  // Clear checkbox error if any
            setChanged(true);        // Notify parent component about the change


        } catch (error) {
            console.error("Error submitting form:", error);
        }

    };

    return (
        <div className="mt-10 lg:mt-24 mb-20 ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-5 max-w-fit">
                    <div className="flex gap-8">
                        <div className="flex flex-col ">
                            <label htmlFor="name" className={`text-[#000000] font-medium text-base  ${errors.cardholder_name ? "text-[#FF0004]" : ""} `}>Ad Soyad</label>
                            <input
                                {...register("cardholder_name", validations.firstName())}
                                type="text"
                                id="name"
                                className={`border-[#828282] border outline-0 rounded-xl  h-10.5 w-full  px-3  text-base ${errors.cardholder_name ? "border-[#FF0004]" : ""} `}
                            />
                            {
                                errors.cardholder_name && (
                                    <p className="text-[#FF0004] text-sm mt-1">
                                        {errors.cardholder_name.message}
                                    </p>
                                )
                            }
                        </div>
                        <div className="flex flex-col">
                            <label
                                className={`mb-2 text-base font-medium ${errors.card_type ? "text-[#FF0004]" : "text-[#000000]"
                                    }`}
                            >
                                Kart tipi
                            </label>

                            <div className="relative">
                                <select
                                    {...register("card_type", validations.cardType())}
                                    defaultValue=""
                                    className={`h-10.5 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-base outline-none transition ${errors.card_type
                                        ? "border-[#FF0004]"
                                        : "border-[#828282]"
                                        }`}
                                >
                                    <option value="" disabled>
                                        Seçin
                                    </option>
                                    <option value="visa">Visa</option>
                                    <option value="mastercard">Mastercard</option>
                                    <option value="other">Digər</option>
                                </select>

                                <svg
                                    className={`pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 ${errors.card_type ? "text-[#FF0004]" : "text-gray-500"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {errors.card_type && (
                                <p className="mt-1 text-sm text-[#FF0004]">
                                    {errors.card_type.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="last_four_digits"
                            className={`text-base font-medium ${errors.last_four_digits ? "text-[#FF0004]" : "text-[#000000]"
                                }`}
                        >
                            Kartın son 4 rəqəmi
                        </label>

                        <input
                            {...register("last_four_digits", validations.lastFourDigits())}
                            id="last_four_digits"
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="1234"
                            className={`h-10.5 w-full rounded-xl border px-3 text-base outline-none ${errors.last_four_digits
                                ? "border-[#FF0004]"
                                : "border-[#828282]"
                                }`}
                            onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                            }}
                        />

                        {errors.last_four_digits && (
                            <p className="mt-1 text-sm text-[#FF0004]">
                                {errors.last_four_digits.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <label
                                className={`font-medium text-base ${errors.expiry_month ? "text-[#FF0004]" : ""
                                    }`}
                            >
                                Ay
                            </label>

                            <input
                                type="number"
                                min={1}
                                max={12}
                                placeholder="12"
                                {...register("expiry_month", validations.expiryMonth())}
                                className={`border rounded-xl h-10.5 px-3 ${errors.expiry_month ? "border-[#FF0004]" : "border-[#828282]"
                                    }`}
                            />

                            {errors.expiry_month && (
                                <p className="mt-1 text-sm text-[#FF0004]">
                                    {errors.expiry_month.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label
                                className={`font-medium text-base ${errors.expiry_year ? "text-[#FF0004]" : ""
                                    }`}
                            >
                                İl
                            </label>

                            <input
                                type="number"
                                min={new Date().getFullYear()}
                                placeholder="2027"
                                {...register("expiry_year", validations.expiryYear())}
                                className={`border rounded-xl h-10.5 px-3 ${errors.expiry_year ? "border-[#FF0004]" : "border-[#828282]"
                                    }`}
                            />

                            {errors.expiry_year && (
                                <p className="mt-1 text-sm text-[#FF0004]">
                                    {errors.expiry_year.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div>

                    <div className={`flex  gap-3.5 cursor-pointer w-max`} onClick={handleCheckboxChange}>
                        <div className={`w-5 h-5 rounded-sm border-2 p-0.5 mt-2 ${checked ? ' border-[#003CFF]' : 'border-[#828282] bg-transparent'} flex items-center justify-center cursor-pointer`}>
                            <FaCheck color={checked ? "#003CFF" : "#828282"} size={12} className={`${checked ? "scale-120" : "scale-0"} transition-all duration-100`} />
                        </div>
                        <p className="text-[#000000] text-base font-medium  leading-6 lg:w-full max-w-110  ">
                            Kart məlumatlarım Unibank infrastrukturu üzərindən
                            təhlükəsiz saxlanılır. <span className="text-[#003CFF]">Şərtlər və qaydalarla</span> razıyam.
                        </p>
                    </div>
                    {checkedError && (
                        <p className="text-red-500 text-sm mt-2">
                            Zəhmət olmasa şərtləri qəbul edin
                        </p>
                    )}
                    <button

                        className="cursor-pointer mt-12.5 w-48  py-4 px-6 bg-[#003CFF] text-white rounded-[14px] text-base font-medium">
                        Təsdiqlə
                    </button>
                </div>

            </form>
        </div>
    );
};

export default PaymentForm;