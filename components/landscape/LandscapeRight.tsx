import LandscapeImage from '@/public/common/assets/Vector.svg'
import Image from 'next/image'
const LandscapeRight = () => {
    return (
        <div className='max-lg:w-10/12'>
            <Image
                src={LandscapeImage}
                alt='LandscapeImage' />
        </div>
    )
}

export default LandscapeRight
