import LandscapeImage from '@/public/common/assets/Vector.svg'
import Image from 'next/image'
const LandscapeRight = () => {
    return (
        <div className='max-lg:w-10/12 max-[850px]:min-w-11/12 max-md:flex max-md:justify-center max-md:mx-auto'>
            <Image
                src={LandscapeImage}
                alt='LandscapeImage' />
        </div>
    )
}

export default LandscapeRight
