'use client'
import { useForm } from "react-hook-form";
import { validations } from "@/utils/validation";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

type FormData = {
    name: string;
    surname: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    
};

const PaymentForm = () => {
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="mt-10 lg:mt-24 mb-20 ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-5 max-w-fit">
                    <div className="flex gap-8">
                        <div className="flex flex-col ">
                            <label htmlFor="name" className="text-[#000000] font-medium text-base ">Ad</label>
                            <input
                                {...register("name", validations.firstName())}
                                type="text"
                                id="name"
                                className="border-[#828282] border outline-0 rounded-xl  h-10.5  px-3 w-full text-base "
                            />
                            {
                                errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )
                            }
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="surname" className="text-[#000000] font-medium text-base ">Soyad</label>
                            <input
                                {...register("surname", validations.lastName())}
                                type="text"
                                id="surname"
                                className="border-[#828282] border outline-0 rounded-xl  h-10.5  px-3 w-full  text-base "
                            />
                            {
                                errors.surname && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.surname.message}
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="cardNumber" className="text-[#000000] font-medium text-base ">Kart nömrəsi</label>
                        <input
                            {...register("cardNumber", validations.cardNumber())}
                            type="text"
                            id="cardNumber"
                            className="border-[#828282] border outline-0 rounded-xl  h-10.5  w-full  px-3  text-base "
                        />
                        {
                            errors.cardNumber && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cardNumber.message}
                                </p>
                            )
                        }
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col ">
                            <label htmlFor="expiryDate" className="text-[#000000] font-medium text-base ">AA/İİ</label>
                            <input
                                {...register("expiryDate", validations.expiryDate())}
                                type="text"
                                id="expiryDate"
                                className="border-[#828282] border outline-0 rounded-xl  h-10.5 w-full  px-3  text-base "
                            />
                            {
                                errors.expiryDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.expiryDate.message}
                                    </p>
                                )
                            }
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="cvc" className="text-[#000000] font-medium text-base ">CVC</label>
                            <input
                                {...register("cvc", validations.cvc())}
                                type="text"
                                id="cvc"
                                className="border-[#828282] border outline-0 rounded-xl  h-10.5 w-full  px-3  text-base "
                            />
                            {
                                errors.cvc && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cvc.message}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>

                    <div className="flex  gap-3.5 cursor-pointer" onClick={handleCheckboxChange}>
                        <div className={`w-5 h-5 rounded-sm border-2 p-0.5 mt-2 ${checked ? ' border-[#003CFF]' : 'border-[#828282] bg-transparent'} flex items-center justify-center cursor-pointer`}>
                            <FaCheck color={checked ? "#003CFF" : "#828282"} size={12} className={`${checked ? "scale-120" : "scale-0"} transition-all duration-100`} />
                        </div>
                        <p className="text-[#000000] text-base font-medium  leading-6 lg:w-full max-w-110  ">
                            Kart məlumatlarım Unibank infrastrukturu üzərindən
                            təhlükəsiz saxlanılır. <span className="text-[#003CFF]">Şərtlər və qaydalarla</span> razıyam.
                        </p>
                    </div>
                    <button className="cursor-pointer mt-12.5 w-48  py-4 px-6 bg-[#003CFF] text-white rounded-[14px] text-base font-medium">
                        Davam et
                    </button>
                </div>

            </form>
        </div>
    );
};

export default PaymentForm;