import { useEffect, useRef, useState } from "react"
import useUserStore from "../../stores/userStore"
import { DoorIcon, RemoveIcon } from "../../icons"
import useBookingStore from "../../stores/bookingStore"

function BGuestInfo({room}) {
    const user = useUserStore(st=>st.user)
    const travelerInfo = useUserStore(st=>st.travelerInfo)

    const [suggestOpen, setSuggesstOpen] = useState(null)
    const wrapperRef = useRef(null)
    useEffect(()=>{
        const hdlClickOutside = (e) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
                setSuggesstOpen(null)
            }
        }
        document.addEventListener("mousedown", hdlClickOutside)
        return()=>{
            document.removeEventListener("mousedown",hdlClickOutside)
        }
    },[])

    const roomCount = Number(room.room) || 1
    const [roomGuestsData, setRoomGuestsData] = useState(()=>{
        const initialRooms = []
        for(let i = 0; i< roomCount; i++) {
            if (i === 0) {
                initialRooms.push([{ 
                    firstName: travelerInfo?.[0]?.firstName || "", 
                    lastName: travelerInfo?.[0]?.lastName || "" 
                }])             
            } else {
                initialRooms.push([{ firstName: "", lastName: "" }])
            }
        }
        return initialRooms
    })

    useEffect(()=>{
        const roomGuestList = roomGuestsData.flat()
        useBookingStore.getState().setGuestList(roomGuestList)
    },[roomGuestsData])

    // const [guests, setGuests] = useState([{
    //     firstName: travelerInfo?.[0]?.firstName || "" ,
    //     lastName: travelerInfo?.[0]?.lastName || "" 
    // }])

    // useEffect(()=>{
    //     useBookingStore.getState().setGuestList(guests)
    // },[guests])

    const addGuest = (roomIndex) => {
        const updatedRoomGuests = [...roomGuestsData]
        if(updatedRoomGuests[roomIndex].length < 2) {
            updatedRoomGuests[roomIndex] = [...updatedRoomGuests[roomIndex], { firstName: "", lastName: "" }];
            setRoomGuestsData(updatedRoomGuests);           
        }
        // if(guests.length < 2){
        //     setGuests([...guests, { firstName: "", lastName: ""}])
        // }
    }

    const removeGuest = (roomIndex, guestIndex) => {
        const updatedRoomGuests = [...roomGuestsData];
       updatedRoomGuests[roomIndex] = updatedRoomGuests[roomIndex].filter((_, i) => i !== guestIndex);
        setRoomGuestsData(updatedRoomGuests);
        // setGuests(guests.filter((_,i)=> i !== index))
    }

    const hdlChange = (roomIndex, guestIndex, field, value) => {
        const updatedRoomGuests = [...roomGuestsData];
        updatedRoomGuests[roomIndex][guestIndex][field] = value;
        setRoomGuestsData(updatedRoomGuests);
        // const updatedGuests = [...guests]
        // updatedGuests[index][field] = value
        // setGuests(updatedGuests)
    }

    const applySavedTraveler = (roomIndex, guestIndex, tvl) => {
        hdlChange(roomIndex, guestIndex, 'firstName', tvl.firstName);
        hdlChange(roomIndex, guestIndex, 'lastName', tvl.lastName);
        setActiveSuggest(null); // Close the dropdown after applying
    }

    return (
        <div className='bg-base-200 w-[40vw] h-fit rounded-[12px] p-6 flex flex-col'>
            <section>
                <h1 className="text-[24px]">Guest Information</h1>
                <p className="text-[14px] font-[Whitney-Light] text-neutral">Guest names must match the valid ID which will be used at check-in.</p>
                
                {roomGuestsData.map((roomGuests, roomIndex) => (
                    <div key={roomIndex}>
                        <div className="flex justify-between items-end mt-4">
                            {Number(room.room)>1 && <h3 className="font-[Whitney-Medium] leading-4 mt-4 flex items-center gap-2"><DoorIcon className="w-5"/>Room {roomIndex + 1}</h3>}
                            {roomGuests.length < 2 && (
                                <button type="button" onClick={()=>addGuest(roomIndex)} className="ml-auto text-neutral font-[Whitney-Book] text-[14px] underline">
                                    + Add New Guest (Optional)</button>
                            )}
                        </div>

                        {roomGuests.map((guest, guestIndex) => (
                            <div key={guestIndex} >                    
                                {roomGuests.length < 1 && <h3 className="font-[Whitney-Medium] leading-4 mt-4">Guest {guestIndex + 1}</h3>}
                                <div className="flex items-center gap-3">
                                    <div className="grid grid-cols-2 gap-4 flex-1">
                                        <InputField label="First name" value={guest.firstName} name="firstName" placeholder="Use only English letters"
                                        onChange={(e) => hdlChange(roomIndex, guestIndex, 'firstName', e.target.value)}
                                        onFocus={()=>{setSuggesstOpen(`${roomIndex}-${guestIndex}`)}} />
                                        <InputField label="Last name" value={guest.lastName} name="lastName" placeholder="Use only English letters"
                                        onChange={(e) => hdlChange(roomIndex, guestIndex, 'lastName', e.target.value)}
                                        onFocus={()=>{setSuggesstOpen(`${roomIndex}-${guestIndex}`)}} />
                                    </div>
                                    {roomGuests.length > 1 && (
                                        <div className="w-6 mt-4">
                                            <button type="button" onClick={()=> removeGuest(roomIndex, guestIndex)}>
                                                <RemoveIcon className="text-primary w-5 h-5"/>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {/* dropdownsuggest */}
                                {suggestOpen === `${roomIndex}-${guestIndex}`&& travelerInfo?.length > 0 &&(
                                    <div ref={wrapperRef} className="absolute z-50 left-38 bg-white border border-gray-200 shadow-xl rounded-[8px] p-4 mt-1 w-[250px]">
                                        <h3 className="text-[12px] font-[Whitney-Medium] text-gray-500 mb-2">Select guest(s)</h3>
                                        {travelerInfo.map((tvl, idx) => (
                                            <div 
                                                key={idx} 
                                                className="hover:bg-blue-50 p-2 rounded-[4px] cursor-pointer transition-colors"
                                                onMouseDown={() => applySavedTraveler(roomIndex, guestIndex, tvl)}
                                            >
                                                <p className="font-[Whitney-Medium] text-neutral text-[16px]">{tvl.firstName} {tvl.lastName}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                ))}
            </section>
            
            <section>
                {roomGuestsData.length > 1 && <h2 className="text-[24px] mt-6">Contact info</h2>}
                <InputField label="Email" value={user.email} name="email" type="email" readOnly={true} />
                <p className="font-[Whitney-Light] text-[14px] text-neutral">Booking confirmation will be sent to this email</p>
                {/* <p>{JSON.stringify(room)}</p> */}
            </section>
            {/* <pre>{JSON.stringify(travelerInfo, null, 2)}</pre> */}
        </div>
    )
}

export default BGuestInfo



    const InputField = ({ label, value, onChange, onFocus, name, type = "text", placeholder }) => {
        return (
            <div className="relative mt-4">
                {/* The Notched Label */}
                <label className="absolute -top-2.5 left-3 bg-base-200 px-1 text-[12px] font-[Whitney-Medium] text-neutral-500 z-10">
                    {label} <span className="text-error">*</span>
                </label>

                {/* The Input Box */}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    autoComplete="nope"
                    className="w-full border border-gray-300 rounded-[8px] px-4 py-3 text-[18px] 
                    font-[Whitney-Medium] outline-none focus:border-primary transition-colors 
                    placeholder:text-neutral/40 placeholder:font-[Whitney-Book] placeholder:text-[16px]"
                />
            </div>
        )
    }

                {/* {guests.map((guest, index) => (
                    <div key={index} >                    
                        {room > 1 && <h3 className="font-[Whitney-Medium] leading-4 mt-4"><DoorIcon className="w-5"/>Room {index + 1}</h3>}
                        {guests.length > 1 && <h3 className="font-[Whitney-Medium] leading-4 mt-4">Guest {index + 1}</h3>}
                        <div className="flex items-center gap-3">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                <InputField label="First name" value={guest.firstName} name="firstName" placeholder="Use only English letters"
                                onChange={(e) => hdlChange(index, 'firstName', e.target.value)} />
                                <InputField label="Last name" value={guest.lastName} name="lastName" placeholder="Use only English letters"
                                onChange={(e) => hdlChange(index, 'lastName', e.target.value)} />
                            </div>
                            {guests.length > 1 && (
                                <div className="w-6 mt-4">
                                    <button onClick={()=> removeGuest(index)}>
                                        <RemoveIcon className="text-primary w-5 h-5"/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))} */}