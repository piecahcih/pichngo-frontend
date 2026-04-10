import { useEffect, useState } from "react"
import useUserStore from "../../stores/userStore"
import TravelerInfoCard from "./TravelerInfoCard"
import { toast } from "react-toastify"

function TravelersCard() {
    const travelerInfo = useUserStore(st => st.travelerInfo)
    const getTravelerInfo = useUserStore(st => st.getTravelerInfo)
    const addTraveler = useUserStore(st => st.addTraveler)

    const [input, setInput] = useState({
        firstName: "",
        lastName: ""
    })

    

    useEffect(() => {
        // console.log("p")
        getTravelerInfo()
        // console.log("pp")
    }, [getTravelerInfo])

    const hdlChangeInput = (e)=>{
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
        // setInput(e.target.value)
    }

    const addOnSubmit = async () => {
        if(!input.firstName || !input.lastName) {
            return toast.error("Please fill in all fields")
        }

        await addTraveler(input)
        toast.success("Add Traveler Successfully")

        setInput({firstName:"", lastName:""})
        document.getElementById('add-form').close()
    }

    return (
        <>
            <div className='bg-base-200 w-[655px] h-fit rounded-[20px] px-10 py-7 flex flex-col'>
                <div className="flex justify-between items-center mb-5">
                    <h1 className='text-[26px]'>Traveler Info</h1>
                    <button onClick={() =>document.getElementById('add-form').showModal()} className="bg-primary font-[Whitney-Medium] rounded-[12px] text-neutral-content px-4 py-1">Add a new traveler</button>
                </div>
                {/* <button onClick={()=>getTravelerInfo()}>TestTVI</button> */}
                <div className="flex flex-col gap-5">
                    {travelerInfo?.map(tvl => (
                        <TravelerInfoCard key={tvl.id} tvl={tvl} />
                    ))}
                    {/* {travelerInfo.length < 1 && "Add your traveler info"} */}
                    {/* <pre>{JSON.stringify(travelerInfo, null, 2)}</pre> */}
                </div>
            </div>

            <dialog id="add-form" className="modal" >
                <div className="modal-box flex flex-col gap-4">
                    <h1 className="text-[26px]">Add a new traveler</h1>
                    <h3 className="text-[20px]">Name</h3>
                    <div className="flex gap-4">
                        <input type="text" placeholder="first name" name="firstName" 
                        value={input.firstName} onChange={hdlChangeInput} 
                        className="border p-2 rounded-[5px]" />
                        <input type="text" placeholder="last name" name="lastName" 
                        value={input.lastName} onChange={hdlChangeInput}  
                        className="border p-2 rounded-[5px]" />
                    </div>
                    <div className="flex justify-end gap-6 mt-4">
                        <button className="text-[20px] text-primary border border-primary rounded-[8px] px-4 py-1" 
                        onClick={() => document.getElementById('add-form').close()}>Cancel</button>
                        <button className="text-[20px] text-neutral-content bg-primary rounded-[8px] px-4 py-1" 
                        onClick={()=>addOnSubmit()} >Save</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default TravelersCard