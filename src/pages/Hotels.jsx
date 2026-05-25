import FilterCard from "../components/cardCPN/FilterCard"
import HotelCard from "../components/cardCPN/HotelCard"
import { NavLink, useParams, useSearchParams } from "react-router"
import useHotelStore from "../stores/hotelStore"
import { useEffect, useState, useMemo } from "react"
import { DropDownIcon } from "../icons"

function Hotels() {
    const { city } = useParams()

    const hotels = useHotelStore(st=>st.hotels)
    const getHotelsByCity = useHotelStore(st=>st.getHotelsByCity)

    const [sortBy, setSortBy] = useState('Best match')
    const hdlSortChange = (option) => {
        setSortBy(option)
        const ele = document.activeElement
        if(ele) {
            ele?.blur()
        }
    }

    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 100000,
        starRatings: [],
        facilities: []
    })



    const [searchParams] = useSearchParams()
    const checkin = searchParams.get("checkin")
    const checkout = searchParams.get("checkout")
    const room = searchParams.get("room")
    const adult = searchParams.get("adult")
    const children = searchParams.get("children")

    useEffect(()=>{
        if(city) {
            getHotelsByCity(city)
        }
    }, [city, getHotelsByCity])




    const sortedHotels = useMemo(() => {
        if (!hotels || hotels.length === 0) return []

        let hotelsCopy = [...hotels]

        hotelsCopy = hotelsCopy.filter(hotel => {
            const minRoomPrice = hotel.rooms && hotel.rooms.length > 0 
                ? Math.min(...hotel.rooms.map(r => r.nightlyRate)) 
                : 0

            if (filters.minPrice > 0 && minRoomPrice < filters.minPrice) return false
            if (filters.maxPrice < 100000 && minRoomPrice > filters.maxPrice) return false

            if (filters.starRatings.length > 0) {
                const avg = hotel.averageRating != null ? Number(hotel.averageRating) : 0
                const roundedRating = Math.floor(avg)
                if (!filters.starRatings.includes(roundedRating)) return false
            }

            if (filters.facilities.length > 0) {
                const amenitiesStr = hotel.amenities?.toLowerCase() || ''
                const hasAllFacs = filters.facilities.every(fac => 
                    amenitiesStr.includes(fac.toLowerCase())
                )
                if (!hasAllFacs) return false
            }

            return true
        })

        
        return hotelsCopy.sort((a,b) => {
            const getMinPrice = (hotel) => {
                if (!hotel.rooms || hotel.rooms.length === 0) return 0
                return Math.min(...hotel.rooms.map(room => room.nightlyRate))   
            }
            if (sortBy === 'Lowest price') {
                return getMinPrice(a) - getMinPrice(b)//asc
            }
            if (sortBy === 'Highest price') {
                return getMinPrice(b) - getMinPrice(a)//desc
            }

            return 0 
        })
    }, [hotels, sortBy, filters])


    const createSlug = (text) => {
        return text.toLowerCase().replace(/\s+/g, '-')
    }

  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 pt-[80px]">
        <div className="flex justify-between gap-10 my-15">
            
            <FilterCard filters={filters} setFilters={setFilters} />

            <div className="text-primary-content flex-1">
                <div className="flex justify-between items-center">
                    <h1 className='text-[26px] font-[Whitney-Bold]'>{sortedHotels?.length} properties in {hotels?.[0]?.city || city}</h1>
                    {/* <button className="bg-base-200 px-2 py-2.5 font-[Whitney-Book] rounded-[8px]">Sort By: Best</button> */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn w-52 bg-base-200 p-4 rounded-[8px] font-[Whitney-Book] text-[16px] flex justify-between">
                            <p>Sort By : {sortBy}</p>
                            <DropDownIcon className="w-4"/>
                        </div>
                        <ul tabIndex="-1"  className="menu dropdown-content w-52 shadow-sm bg-base-200 p-4 mt-2 font-[Whitney-Light] rounded-[8px] text-[16px]">
                            <li><a onClick={()=> hdlSortChange('Best match')} >Best match</a></li>
                            <li><a onClick={()=> hdlSortChange('Lowest price')} >Lowest price</a></li>
                            <li><a onClick={()=> hdlSortChange('Highest price')} >Highest price</a></li>
                        </ul>
                    </div>
                </div>
                
                {sortedHotels?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 my-8">
                        {sortedHotels.map( hotel => (
                            <NavLink key={hotel.id} 
                            to={`/hotels/${createSlug(hotel.city)}/${createSlug(hotel.name)}?checkin=${checkin}&checkout=${checkout}&room=${room}&adult=${adult}${children>0?`&children=${children}`:''}`}>
                                <HotelCard hotel={hotel} />
                            </NavLink>
                        ))}
                    </div>
                ) : (
                    <div className="bg-amber-500 w-[60vw] flex flex-col items-center justify-center my-32 text-neutral/50">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h2 className="text-[22px] font-[Whitney-Bold] text-neutral/70">No properties match your filters</h2>
                        <p className="text-[15px] font-[Whitney-Book] mt-2">Try adjusting or clearing your filters to see more results.</p>
                    </div>
                )}
                    {/* <pre>{JSON.stringify(hotels, null, 2)}</pre>
                    <pre>{typeof(hotels)}</pre>
                    <pre>ar{Array.isArray(hotels).toString()}</pre> */}
            </div>
        
        </div>

    </div>
  )
}

export default Hotels