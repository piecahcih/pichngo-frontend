import { useState } from 'react'
import ImgMockCard from '../../assets/hotelcardimgmock.png'
import { HeartLineLogo, HeartLogo, StarLogo } from '../../icons'
import useHotelStore from '../../stores/hotelStore'
import useUserStore from '../../stores/userStore'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import { LoginSwal } from '../swal/LoginAlert'
import { useNavigate } from 'react-router';
import { formatPrice } from '../../utils/formatNum'


function HotelCard({hotel}) {
    const user = useUserStore(st => st.user)
    const createLike = useHotelStore(st => st.createLike)
    const unLike = useHotelStore(st => st.unLike)

    const navigate = useNavigate()

    const haveLike = hotel.likes?.some(el => el.userId === user?.id)

    const hdlLikeClick = async (e) => {
        e.preventDefault()
        e.stopPropagation() // Stops the click from bubbling up the HTML tree

        if(!user) {
            LoginSwal(navigate)
            // toast.error("Please log in to like a hotel")
            return
        }

        if(haveLike) {
            await unLike(user.id, hotel.id)
        } else {
            await createLike(user.id, hotel.id)
        }
    }

  return (
    <div className="bg-white rounded-[12px] h-[375px] w-[270px]">
        <img src={hotel.hotelImg.img1} className='w-full h-[195px] rounded-t-[12px] object-cover'/>
        <div className="flex flex-col justify-evenly w-full p-[20px]">
            {/* {hotel.name.length < 6 ? <h1 className='text-[20px] hover:underline'>{hotel.name}</h1> : <h1 className='text-[20px] line-clamp-1 hover:underline'>{hotel.name}</h1> } */}
            <h1 className='text-[20px] line-clamp-1 hover:underline'>{hotel.name}</h1>
            <p className='font-[Whitney-Book] text-[14px] leading-4.5'>{hotel.city}</p>
            <div className="flex gap-1 items-center font-[Whitney-Book]">
                <StarLogo className="h-[14px] text-secondary"/>
                <p className='text-[14px]'>4.8</p>
                <p className='text-[12px]'>(4 Reviews)</p>
            </div>
            <div className='flex items-end mt-7'>
                <div className="flex flex-col">
                    <p className='text-[12px] font-[Whitney-Light] leading-1'>Starting at</p>
                    {/* <h1 className='text-[26px]'>THB {Number(hotel.rooms[0].nightlyRate).toLocaleString()}</h1> */}
                    <h1 className='text-[26px]'>{formatPrice(hotel.rooms[0].nightlyRate)}</h1>
                    <p className='text-[10px] font-[Whitney-Light] leading-1'>Total price incl. taxes & fees</p>
                </div>

                <motion.button whileTap={{ scale: 1.2, transition: { duration: 0.2 } }} onClick={hdlLikeClick} className="h-[33px] ml-auto text-neutral opacity-80">
                    {haveLike ? <HeartLogo className="h-[33px] ml-auto"/>
                    : <HeartLineLogo  className="h-[33px] ml-auto text-neutral opacity-80"/> }
                </motion.button>

            </div>
        </div>
    </div>
  )
}

export default HotelCard