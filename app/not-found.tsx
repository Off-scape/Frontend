"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import notfoundImage from "@/public/common/assets/images/notfound-image.png";
import notfoundImage2 from "@/public/common/assets/images/ImageWithFallback.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Mobile Background */}
      <div className="fixed inset-0 hidden max-[1025px]:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${notfoundImage2.src})`,
          }}
        />

        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Desktop Image */}
      <div className="relative h-screen w-[60%] max-[1025px]:hidden">
        <Image
          src={notfoundImage}
          alt="Not Found"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="
          relative z-10
          flex
          w-[40%]
          flex-col
          justify-center
          px-14

          max-[1025px]:w-full
          max-[1025px]:items-center
          max-[1025px]:px-8
          max-[1025px]:text-center
        "
      >
        <h1
          className="
            font-inter
            font-bold
            tracking-normal
            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
            xl:text-[120px]
            2xl:text-[150px]
            leading-none
            xl:leading-[180px]
            2xl:leading-[238px]
            text-[#142A12]
            max-[1025px]:text-white
          "
        >
          404
        </h1>

        <h2
          className="
            mt-3
            font-bold
            tracking-[-0.3px]
            text-2xl
            sm:text-3xl
            md:text-[34px]
            lg:text-[40px]
            leading-tight
            text-[#1B3D2F]
            max-[1025px]:text-white
          "
        >
          Səhifə tapılmadı.
        </h2>

        <p
          className="
            mt-5
            max-w-lg
            text-base
            sm:text-lg
            lg:text-xl
            leading-relaxed
            text-[#7A8B83]
            max-[1025px]:text-gray-200
          "
        >
          Axtardığınız səhifə mövcud deyil və ya köçürülüb.
          Əsas səhifəyə qayıdın və marşrutunuzu yenidən qurun.
        </p>

        <div className="mt-10 flex flex-col gap-4 max-[600px]:w-full">
          <Link
            href="/"
            className="
              flex
              w-fit
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#142A12]
              px-7
              py-3
              text-white
              transition
              hover:bg-[#1d3c18]

              max-[600px]:w-full
            "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.99994 9.99997L3.29294 10.707L2.58594 9.99997L3.29294 9.29297L3.99994 9.99997ZM20.9999 18C20.9999 18.2652 20.8946 18.5195 20.707 18.7071C20.5195 18.8946 20.2652 19 19.9999 19C19.7347 19 19.4804 18.8946 19.2928 18.7071C19.1053 18.5195 18.9999 18.2652 18.9999 18H20.9999ZM8.29294 15.707L3.29294 10.707L4.70694 9.29297L9.70694 14.293L8.29294 15.707ZM3.29294 9.29297L8.29294 4.29297L9.70694 5.70697L4.70694 10.707L3.29294 9.29297ZM3.99994 8.99997H13.9999V11H3.99994V8.99997ZM20.9999 16V18H18.9999V16H20.9999ZM13.9999 8.99997C15.8565 8.99997 17.6369 9.73747 18.9497 11.0502C20.2624 12.363 20.9999 14.1435 20.9999 16H18.9999C18.9999 14.6739 18.4732 13.4021 17.5355 12.4644C16.5978 11.5268 15.326 11 13.9999 11V8.99997Z"
                fill="white"
              />
            </svg>

            Ana səhifəyə qayıt
          </Link>

          <button
            onClick={() => router.back()}
            className="
              flex
              w-fit
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[#142A12]
              px-7
              py-3
              text-[#142A12]
              transition
              hover:bg-[#142A12]
              hover:text-white

              max-[1025px]:border-white
              max-[1025px]:text-white

              max-[600px]:w-full
            "
          >
            Geri dön
          </button>
        </div>
      </div>
    </div>
  );
}