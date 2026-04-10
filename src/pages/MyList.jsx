import { NavLink } from 'react-router'
import LikeCard from '../components/cardCPN/LikeCard'
import useHotelStore from '../stores/hotelStore'
import useUserStore from '../stores/userStore'
import { useEffect } from 'react'

function MyList() {
  // const user = useUserStore(st=>st.user)
  // const hotels = useHotelStore(st=>st.hotels)
  // const isLike = hotels?.filter(hotel => hotel.likes?.some(like => like.userId === user?.id))
  const myLists = useHotelStore(st => st.myLists)
  const getMyList = useHotelStore(st => st.getMyList)

  useEffect(() => {
    getMyList()
  }, [getMyList])

  const createSlug = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 pt-[80px]">
      {/* <div className="my-15 text-primary-content"> */}
      <div className="mx-[10%] my-15 text-primary-content">
        {/* <div className="md:mx-[100px] lg:mx-[120px] xl:mx-[146px] my-15 text-primary-content"> */}
        <div>
          <h1 className='text-[26px] font-[Whitney-Bold]'>My Lists</h1>
          <p className='text-[16px] font-[Whitney-Medium] leading-1'>waiting to be experience</p>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 my-8">
            {/* <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 my-8"> */}
            {myLists?.map(hotel => (
              <NavLink key={hotel.id} to={`/hotels/${createSlug(hotel.city)}/${createSlug(hotel.name)}`}>
                <LikeCard hotel={hotel} />
              </NavLink>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default MyList