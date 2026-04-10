import { useEffect } from "react"
import { SearchLogo } from "../icons"
import useHotelStore from "../stores/hotelStore"
import { useParams, useSearchParams } from "react-router"
import { format } from "date-fns"

function SearchBarNav() {
    const hotels = useHotelStore(st=>st.hotels)
    const getAllHotels = useHotelStore(st=>st.getAllHotels)

    const hotelName = hotels.map( hotel => hotel.name)
    const hotelCity = [...new Set(hotels.map( hotel => hotel.city))]

    // console.log(hotelName)
    // console.log('hotelCity', hotelCity)
    // const suggestSearch = [...hotelName, ...hotelCity]
    // console.log('suggestSearch', suggestSearch)

    useEffect(()=>{
      getAllHotels()
    },[getAllHotels])

    const dismantleSlug = (text) => {
        // return text?.toCamelCase().replace('-', /\s+/g)
        if (!text) return ''
        return text.split('-').map(word=>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    }

    const {city, hotelname} = useParams()
    const [searchParams] = useSearchParams()
    
    const checkinQR = searchParams.get("checkin")
    const checkoutQR = searchParams.get("checkout")

    const checkin = checkinQR? format(checkinQR, 'MMM d'): null
    const checkout = checkoutQR? format(checkoutQR, 'MMM d'): null
    const room = searchParams.get("room")
    const adult = searchParams.get("adult")
    const children = searchParams.get("children")
    const guest = Number(adult) + Number(children || 0)

  return (
    <div>
        <form className="flex border border-base-content bg-neutral-content text-neutral rounded-[12px] h-[40px] items-center font-['Whitney-Book'] text-[14px]">
            <input type="text" placeholder={ dismantleSlug(hotelname || city) || 'Where to?' } 
              className="h-full rounded-l-[12px] w-[140px] p-3 text-neutral placeholder:text-neutral/60 outline-none truncate"/>
              {/* The magic of the truncate class is that it automatically applies three CSS rules at once: overflow: hidden, white-space: nowrap, and text-overflow: ellipsis. */}
            <input type="text" placeholder={(checkin && checkout) ? `${checkin}-${checkout}` : 'Add dates'} 
            className="h-full w-[120px] border-x text-center text-neutral placeholder:text-neutral/60 outline-none" />
            <button type='button' className="h-full flex items-center justify-center text-neutral/60">
                {/* <input type="text" disabled placeholder={`${room || 1} Room${room>1?'s':''}`} className="h-full w-[77px] border-r text-center"/>
                <input type="text" disabled placeholder={`${guest || 1} Guest${guest>1?'s':''}`} className="h-full w-[77px] text-center"/> */}
                <div className="h-full w-[77px] border-r flex items-center justify-center">
                  {room || 1} Room{room > 1 ? 's' : ''}
                </div>
                <div className="h-full w-[77px] flex items-center justify-center">
                    {guest || 1} Guest{guest > 1 ? 's' : ''}
                </div>
            </button>
            <button className="flex justify-center items-center bg-primary w-[77.3px] h-full rounded-r-[12px]"><SearchLogo className="h-6 text-white"/></button>
        </form>
    </div>
  )
}

export default SearchBarNav