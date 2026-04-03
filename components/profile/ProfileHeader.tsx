
import HeaderLogo from '@/components/header/HeaderLogo'
import Notification from '@/components/profile/Notification'
import ProfileAvatar from '@/components/profile/ProfileAvatar'
import { MdOutlineMenu } from 'react-icons/md'

const ProfileHeader = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
    return (
        <div className="w-[98%] rounded-[20px] lg:rounded-[40px] py-3.5 px-6 bg-[#0b3e35d1] fixed top-2.5 right-2 left-2 z-50">
            <div className='flex items-center justify-between'>
                <HeaderLogo />
                <div className=' items-center gap-8 hidden lg:flex'>
                    <Notification />
                    <ProfileAvatar />
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden"
                >
                    <MdOutlineMenu size={24} color='#fff' />

                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
