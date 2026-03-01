import Image from "next/image"
import image from '@/images/whatsapp.svg'
const WhatsappIcon = () => {
    return (
        <div  className="cursor-pointer">

            <Image src={image} alt="Whatsapp Icon" width={24} height={24} />
        </div>
    )
}

export default WhatsappIcon
