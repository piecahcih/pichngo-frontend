import { useEffect, useRef, useState } from "react"
import { SearchLogo } from "../icons"
import useHotelStore from "../stores/hotelStore"
import { useNavigate, useParams, useSearchParams } from "react-router"
import DualCalendar from "./DualCalendar"
import { format } from "date-fns"
import { formatDay } from "react-day-picker"
import { toast, Bounce } from "react-toastify"

function SearchBarHome({clickData}) {
    // console.log('clickDataSBHome', clickData)

    const searchHotels = useHotelStore(st=>st.searchHotels)
    const getAllHotels = useHotelStore(st=>st.getAllHotels)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = useParams()


    const createSlug = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-')
    }
    const dismantleSlug = (text) => {
        // return text?.toCamelCase().replace('-', /\s+/g)
        if (!text) return ''
        return text.split('-').map(word=>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    }

    const[searchText, setSearchText]=useState(dismantleSlug(params.hotelname) || dismantleSlug(params.city) || "")

    const [isGuestOpen, setIsGuestOpen] = useState(false)
    const [rooms, setRooms] = useState(Number(searchParams.get("room")) || 1)
    const [adults, setAdults] = useState(Number(searchParams.get("adult")) || 1)
    const [childrenCount, setChildrenCount] = useState(Number(searchParams.get("children")) || 0)
    const hdlClear = () => {
        setRooms(1)
        setAdults(1)
        setChildrenCount(0)
    }

    const [pickDate, setPickDate] = useState(false)
    const [selectedDates, setSelectedDates] = useState(null)
    // const [selectedDates, setSelectedDates] = useState(()=>{
    //     const checkin = searchParams.get("checkin")
    //     const checkout = searchParams.get("checkout")
    //     return checkin && checkout ? { from: new Date(checkin), to: new Date(checkout) } : null;
    // })

    const hotelName = searchHotels.map( hotel => hotel.name)
    const hotelCity = [...new Set(searchHotels.map( hotel => hotel.city))]
    // console.log(hotelName)
    // console.log('hotelCity', hotelCity)
    // const suggestSearch = [...hotelName, ...hotelCity]
    // console.log('suggestSearch', suggestSearch)

    const [suggestOpen, setSuggesstOpen] = useState(false)
    const filteredCitySuggestions = hotelCity.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
    const filteredHotelSuggestions = hotelName.filter(item => item.toLowerCase().includes(searchText.toLowerCase())).slice(0,6)


    const hdlSearchSubmit = async (e) => {
        e.preventDefault()
        if(!searchText) return
        if (!selectedDates?.from || !selectedDates?.to) {
            setPickDate(true)
            return
        }

        try {
            const isCity = hotelCity.find(city => city.toLowerCase() === searchText.toLowerCase())
            const foundHotel = searchHotels.find(hotel => hotel.name.toLowerCase() === searchText.toLowerCase())
            const checkinDate = format(selectedDates.from, 'yyyy-MM-dd')
            const checkoutDate = format(selectedDates.to, 'yyyy-MM-dd')

            if(isCity){
                const slug = createSlug(searchText)
                navigate(`/hotels/${slug}/?checkin=${checkinDate}&checkout=${checkoutDate}&room=${rooms}&adult=${adults}${childrenCount>0?`&children=${childrenCount}`:''}`)
                return
            }
            if(foundHotel){
                const citySlug = createSlug(foundHotel.city)
                const hotelSlug = createSlug(searchText)
                navigate(`/hotels/${citySlug}/${hotelSlug}?checkin=${checkinDate}&checkout=${checkoutDate}&room=${rooms}&adult=${adults}${childrenCount>0?`&children=${childrenCount}`:''}`)
                return
            }

        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg, {transition : Bounce, autoClose: 2000})            
        }

    }

    useEffect(()=>{
      getAllHotels()
    },[getAllHotels])

    useEffect(() => {
        if (clickData?.destination) {
            setSearchText(clickData.destination);
            setTimeout(()=>{setPickDate(true)},150)
        }
    }, [clickData])


    const labelStyle = 'text-[11px] text-gray-600 font-[Whitney-Light] tracking-wider'
    const labelSGStyle = 'text-[11px] text-neutral font-[Whitney-Light] tracking-wider'
    const suggestionStyle = 'font-[Whitney-Book]'
    const inputStyle = 'text-[18px] bg-transparent outline-none text-neutral placeholder:text-neutral placeholder:font-[Whitney-Medium] w-full'
    const minusbtnStyle = 'w-6 h-6 rounded-md text-white flex justify-center items-center hover:bg-[#ebc4ba] transition-colors'
    const plusbtnStyle = "w-6 h-6 rounded-md bg-primary text-white flex justify-center items-center hover:bg-[#bf4116] transition-colors"
  return (
    <div>
        <form onSubmit={hdlSearchSubmit}
        className="flex border border-white bg-neutral-content/70 backdrop-blur-md rounded-[12px] h-[65px] items-center font-['Whitney-Book'] shadow-2xl">

            <div className="flex flex-col justify-center px-4 h-full border-r border-neutral-content/40 w-[280px]">
                <label className={labelStyle}>DESTINATION</label>
                <input type="text" placeholder="Where to?" className={inputStyle} 
                value={searchText} onChange={(e)=>setSearchText(e.target.value)} onFocus={()=>{setSuggesstOpen(true), setPickDate(false), setIsGuestOpen(false)}} onBlur={()=>setSuggesstOpen(false)} />
            </div>
            {/*Dropdown suggest ja*/}
            {suggestOpen && searchText.length > 0 && (filteredCitySuggestions.length>0 || filteredHotelSuggestions.length>0) &&(
                <div className="absolute top-[80px] left-0 bg-white rounded-[12px] shadow-xl w-[320px] max-h-[300px] overflow-y-auto z-50 flex flex-col text-black border border-gray-100 p-6 gap-4">
                    {filteredCitySuggestions.length>0 &&
                        (<div>
                            <div className={labelSGStyle}>
                                DESTINATIONS
                            </div>
                            {filteredCitySuggestions.map((item,index)=>(
                                <div key={index} onMouseDown={()=>{setSearchText(item), setSuggesstOpen(false)}}
                                className={suggestionStyle}>
                                    {item}
                                </div>
                            ))}
                        </div>)
                    }
                    
                    {filteredHotelSuggestions.length>0 &&
                        (<div>
                            <div className={labelSGStyle}>
                                HOTELS
                            </div>
                            {filteredHotelSuggestions.map((item,index)=>(
                                <div key={index} onMouseDown={()=>{setSearchText(item), setSuggesstOpen(false)}}
                                className={suggestionStyle}>
                                    {item}
                                </div>
                            ))}
                        </div>)
                    }
                </div>
            )}


            <button type='button' onClick={()=>{setPickDate(!pickDate), setIsGuestOpen(false)}} className="flex flex-col justify-center items-start px-4 h-full border-r border-neutral-content/40 w-[180px]">
                <label className={labelStyle}>STAY DATES</label>
                <span className="text-[18px] text-neutral font-[Whitney-Medium]">
                    {selectedDates?.from && selectedDates?.to 
                        ? `${format(selectedDates.from, 'MMM d')} - ${format(selectedDates.to, 'MMM d')}`
                        : selectedDates?.from 
                            ? `${format(selectedDates.from, 'MMM d')} - Check out`
                            : 'Add dates'
                    }
                </span>
            </button>
            {/*Dropdowncalendarja*/}
            {pickDate && 
                <div className="absolute top-[80px] left-14">
                    <DualCalendar onRangeSelect={(newRange)=>{
                        setSelectedDates(newRange)
                        if (newRange?.from && newRange?.to) {

                            setTimeout(() => {
                                setPickDate(false)
                                setTimeout(()=>{setIsGuestOpen(true)},150) 
                            }, 300);
                        }
                    }}/>
                </div>
            }


            <button onClick={()=> {setIsGuestOpen(!isGuestOpen),setPickDate(false)}} type='button' className="flex items-center h-full transition-colors cursor-pointer text-left">
                <div className="flex flex-col justify-center px-4 h-full border-r border-neutral-content/40 w-[112px]">
                    <label className={labelStyle}>ROOMS</label>
                    <span className="text-[18px] text-neutral font-[Whitney-Medium]">{rooms} Room{rooms > 1 ? 's' : ''}</span>
                </div>

                <div className="flex flex-col justify-center px-4 h-full w-[112px]">
                    <label className={labelStyle}>GUESTS</label>
                    <span className="text-[18px] text-neutral font-[Whitney-Medium]">{adults + childrenCount} Guest{adults + childrenCount > 1 ? 's' : ''}</span>
                </div>
            </button>
            {/*Dropdown+-ja*/}
            {isGuestOpen && (
                        <div className="absolute top-[80px] right-11 bg-white rounded-[16px] shadow-xl p-6 w-[250px] h-[225px] z-50 flex flex-col gap-4 text-black border border-gray-100">
                            
                            {/* Row 1: Rooms */}
                            <div className="flex justify-between items-center border-b border-neutral/50 pb-2">
                                <span>Rooms</span>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className={`${minusbtnStyle} ${rooms<2?'bg-[#F4D7D0]':'bg-primary'}`}>-</button>
                                    <span className="w-4 text-center">{rooms}</span>
                                    <button type="button" onClick={() => setRooms(rooms + 1)} className={plusbtnStyle}>+</button>
                                </div>
                            </div>

                            {/* Row 2: Adults */}
                            <div className="flex justify-between items-center -mt-2">
                                <span>Adults</span>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className={`${minusbtnStyle} ${adults<2?'bg-[#F4D7D0]':'bg-primary'}`}>-</button>
                                    <span className="w-4 text-center">{adults}</span>
                                    <button type="button" onClick={() => setAdults(adults + 1)} className={plusbtnStyle}>+</button>
                                </div>
                            </div>

                            {/* Row 3: Children */}
                            <div className="flex justify-between items-center pb-4">
                                <span>Children</span>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))} className={`${minusbtnStyle} ${childrenCount<1?'bg-[#F4D7D0]':'bg-primary'}`}>-</button>
                                    <span className="w-4 text-center">{childrenCount}</span>
                                    <button type="button" onClick={() => setChildrenCount(childrenCount + 1)} className={plusbtnStyle}>+</button>
                                </div>
                            </div>

                            <div className="flex gap-4 font-[Whitney-Medium]">
                                <button 
                                    type="button" 
                                    onClick={() => hdlClear()}
                                    className="w-full border border-neutral/50 text-black rounded-full py-1.5 hover:bg-[#bf4116] transition-colors"
                                >
                                    Reset
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsGuestOpen(false)}
                                    className="w-full bg-primary text-white rounded-full py-1.5 hover:bg-[#bf4116] transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                        )}

            <button type='submit' className="flex justify-center items-center bg-neutral-100 hover:bg-white transition-colors w-[120px] h-full rounded-r-[12px]"><SearchLogo className="h-6 text-black"/></button>
        </form>
    </div>
  )
}

export default SearchBarHome