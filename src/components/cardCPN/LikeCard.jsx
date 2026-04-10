import ImgMockCard from '../../assets/hotelcardimgmock.png'
import { HeartLineLogo, HeartLogo, StarLogo } from '../../icons'
import useHotelStore from '../../stores/hotelStore'
import useUserStore from '../../stores/userStore'
import { motion } from 'motion/react'

function LikeCard({ hotel }) {
  const user = useUserStore(st => st.user)
  const createLike = useHotelStore(st => st.createLike)
  const unLike = useHotelStore(st => st.unLike)
  const getMyList = useHotelStore(st=>st.getMyList)

  const haveLike = hotel.likes?.some(el => el.userId === user?.id)

  const hdlLikeClick = async (e) => {
    e.preventDefault()
    e.stopPropagation() // Stops the click from bubbling up the HTML tree

    if (!user) {
      toast.error("Please log in to like a hotel")
      return
    }

    if (haveLike) {
      await unLike(user.id, hotel.id)
    } else {
      await createLike(user.id, hotel.id)
    }
    
    if (getMyList) {
      await getMyList()
    }
  }


  return (
    <div className="bg-white rounded-[12px] h-[330px] w-[270px]">
      <img src={hotel.hotelImg.img1} className='w-full h-[195px] rounded-t-[12px] object-cover' />
      <div className="flex flex-col w-full p-[20px]">
        <h1 className='text-[20px] line-clamp-1 hover:underline'>{hotel.name}</h1>
        <p className='font-[Whitney-Book] text-[14px] leading-4.5'>{hotel.city}</p>
        <div className="flex gap-1 items-center font-[Whitney-Book]">
          <StarLogo className="h-[14px] text-secondary" />
          <p className='text-[14px]'>4.8</p>
          <p className='text-[12px]'>(4 Reviews)</p>
        </div>

        <motion.button whileTap={{ scale: 1.2, transition: { duration: 0.2 } }} onClick={hdlLikeClick} className="h-[33px] ml-auto text-neutral opacity-80">
          {haveLike ? <HeartLogo className="h-[33px] ml-auto"/>
          : <HeartLineLogo  className="h-[33px] ml-auto text-neutral opacity-80"/> }
        </motion.button>

      </div>
    </div>
  )
}

export default LikeCard