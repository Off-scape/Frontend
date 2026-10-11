import ProfileImage from "@/public/common/assets/images/ProfileImage.svg"
import Image from "next/image"
import { useProfileAvatar } from "./ProfileAvatarContext"
import { getAvatarImageSrc } from "@/utils/avatar"

const ProfileAvatar = () => {
  const { avatarUrl } = useProfileAvatar()
  const avatarSrc = getAvatarImageSrc(avatarUrl)

  return (
    <div className="cursor-pointer">
      {avatarSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarSrc}
          alt="Profile Image"
          loading="lazy"
          width={80}
          height={80}
          decoding="async"
          className="rounded-full object-cover"
        />
      ) : (
        <Image src={ProfileImage} alt="Profile Image" width={80} height={80} className="rounded-full" />
      )}
    </div>
  )
}

export default ProfileAvatar
