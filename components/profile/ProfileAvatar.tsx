import ProfileImage from "@/public/common/assets/images/ProfileImage.svg"
import Image from "next/image"

const ProfileAvatar = () => {
  return (
    <div className="cursor-pointer">
      <Image src={ProfileImage} alt="Profile Image" width={80} height={80} className="rounded-full" />
    </div>
  )
}

export default ProfileAvatar
