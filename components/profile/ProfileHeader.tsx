import HeaderLogo from "@/components/header/HeaderLogo";
import Notification from "@/components/profile/Notification";
import ProfileAvatar from "@/components/profile/ProfileAvatar";

const ProfileHeader = () => {
<<<<<<<<< Temporary merge branch 1
  return (
    <div className=' className="w-[98%] rounded-[20px] lg:rounded-[40px] py-3.5 px-6 bg-[#0b3e35d1]  top-2.5 right-2 left-2 z-20"'>
      <div className="flex items-center justify-between">
        <HeaderLogo />
        <div className="flex items-center gap-8">
          <Notification />
          <ProfileAvatar />
=========
    return (
        <div className="w-[98%] rounded-[20px] lg:rounded-[40px] py-3.5 px-6 bg-[#0b3e35d1] fixed top-2.5 right-2 left-2 z-50">
            <div className='flex items-center justify-between'>
                <HeaderLogo />
                <div className='flex items-center gap-8'>
                    <Notification />
                    <ProfileAvatar />
                </div>
            </div>
>>>>>>>>> Temporary merge branch 2
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
