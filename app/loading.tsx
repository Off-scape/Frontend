import Image from "next/image";
import LoadingImage from '@/public/common/assets/images/Loading.png'
export default function Loading() {
  return (
    <div className="flex flex-col  h-screen items-center justify-center ">
      <Image
        src={LoadingImage}
        alt="Loading"
        fill
      />  

      Loading...
    </div>
  );
}