import homeBg from '../assets/homebg.png'
import { NavLink } from 'react-router'
import ReviewCard from '../components/cardCPN/ReviewCard'
import { LeftLogo, RightLogo } from '../icons'
import BKKImg from '../assets/cityimg/Bangkok.jpg'
import CMImg from '../assets/cityimg/Chiang Mai.jpg'
import CRImg from '../assets/cityimg/Chiang Rai.jpg'
import KrabiImg from '../assets/cityimg/Krabi.jpg'
import KhaoyaiImg from '../assets/cityimg/Nakhon Ratchasima.jpg'
import PhuketImg from '../assets/cityimg/Phuket.jpg'
import SuratImg from '../assets/cityimg/Suratthani.jpg'

// import Todlong from '../components/TODLONG/TodLong'

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import useHotelStore from '../stores/hotelStore'
import SearchBarHome from '../components/SearchBarHome'


function Home() {
  const destinations = [
    { name: 'Bangkok', slug: 'bangkok', img: BKKImg },
    { name: 'Chiang Mai', slug: 'chiang-mai', img: CMImg },
    { name: 'Chiang Rai', slug: 'chiang-rai', img: CRImg },
    { name: 'Krabi', slug: 'krabi', img: KrabiImg },
    { name: 'Nakhon Ratchasima', slug: 'nakhon-ratchasima', img: KhaoyaiImg },
    { name: 'Phuket', slug: 'phuket', img: PhuketImg },
    { name: 'Suratthani', slug: 'suratthani', img: SuratImg },
  ];

  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef })
  const maskImage = useScrollOverflowMask(scrollXProgress)

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const hotelCounts = useHotelStore(st=>st.hotelCounts)
  const getHotelCounts = useHotelStore(st=>st.getHotelCountsByCity)
  const getAllHotels = useHotelStore(st=>st.getAllHotels)

  useEffect(()=>{
    getHotelCounts()
  },[getHotelCounts])
  useEffect(()=>{
    getAllHotels()
  },[getAllHotels])
  

  const getCountForCity = (slug) => {
    const cityNameWithSpaces = slug.replaceAll('-', ' ');
    const match = hotelCounts?.find(
      item => item.city.toLowerCase() === cityNameWithSpaces.toLowerCase()
    );
    return match ? match._count.id : 0;
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Check if we are at the beginning
      setIsAtStart(scrollLeft <= 10);
      
      // Check if we reached the end (scrollWidth - clientWidth is the max scroll possible)
      // We subtract 5-10px as a "buffer" for different zoom levels
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      // 300px covers one card (264px) plus the gap (16px) and a bit extra
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [clickData, setClickData] = useState({
    destination: "",
    isOpen: false
  })
  const hdlDestinationClick = (cityName) => {
    setClickData({ destination: cityName, isOpen: true })
    // console.log(cityName)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  // console.log('clickDataHome', clickData)

  return (
    <div className="bg-white min-h-screen min-w-screen flex flex-col">

      <div className="relative">
        <img src={homeBg} className='h-[625px] w-full object-cover object-[38%_62%]' />
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit">
          <h2 className='text-center text-neutral-content text-[42px] pb-2'>Craft Your Journey</h2>
          <SearchBarHome clickData={clickData} />
        </div>
      </div>

      <div className="mx-[10%] mt-15 text-primary-content">
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-[26px] font-[Whitney-Bold]'>Top destinations in Thailand</h1>
            <p className='text-[16px] font-[Whitney-Medium]'>See all destinations in Thailand →</p>
          </div>
          <div className='flex gap-4'>
            <button onClick={() => scroll('left')} disabled={isAtStart}
            className="border rounded-[12px] border-base-content p-2 w-fit h-fit disabled:opacity-30">
              <LeftLogo className="w-8" />
            </button>
            <button onClick={() => scroll('right')} disabled={isAtEnd}
            className="border rounded-[12px] border-base-content p-2 w-fit h-fit disabled:opacity-30">
              <RightLogo className="w-8" />
            </button>
          </div>
        </div>

        <div>
              <motion.ul ref={scrollRef} style={{ maskImage }} onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth" >
                {destinations.map(el => {
                  const exactCount = getCountForCity(el.slug);
                  return(
                      <div key={el.name} onClick={()=>hdlDestinationClick(el.name)}
                        className="flex-none transition-transform hover:scale-[1.02]">
                        <img src={el.img} alt={el.name} className='rounded-[12px] w-[264px] h-[264px] object-cover'/>
                        <div className="mt-4 mx-2">
                          <h2>{el.name}</h2>
                          <p className='font-[Whitney-Book] text-[14px]'>
                            {exactCount} {exactCount === 1 ? 'accommodation' : 'accommodations'}
                          </p>
                        </div>
                      </div>

                  )
                })}
              </motion.ul>
        </div>

        {/* <div ref={scrollRef} className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth 
        [mask-image:linear-gradient(to_right,black_95%,transparent_100%)]">
          {destinations.map(el => (
                <NavLink to="/hotels/city" key={el.name}
                  className="flex-none transition-transform hover:scale-[1.02]">
                  <img src={el.img} alt={el.name} className='rounded-[12px] w-[264px] h-[264px] object-cover'/>
                  <div className="mt-4 mx-2">
                    <h2>{el.name}</h2>
                    <p className='font-[Whitney-Book] text-[14px]'>000 accommodations</p>
                  </div>
                </NavLink>
          ))}
        </div> */}

      </div>
      <div className="mx-[10%] my-25 text-primary-content">
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-[26px] font-[Whitney-Bold]'>The Art of Going</h1>
            <p className='text-[16px] font-[Whitney-Medium]'>Curated by Us, Rated by You →</p>
          </div>

          <div className='flex gap-4'>
            <div className="border rounded-[12px] border-base-content p-2 w-fit h-fit">
              <LeftLogo className="w-8" />
            </div>
            <div className="border rounded-[12px] border-base-content p-2 w-fit h-fit">
              <RightLogo className="w-8" />
            </div>
          </div>
        </div>


        <ReviewCard />


      </div>

      <div className="text-center p-4">
        <button onClick={()=> getAllHotels()} className='bg-primary text-center text-white p-4'>GetAllHotels</button>
      </div>

    </div>
  )
}

export default Home

const left = `0%`
const right = `100%`
const leftInset = `10%`
const rightInset = `90%`
const transparent = `#0000`
const opaque = `#000`
function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(scrollXProgress, "change", value => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      )
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}