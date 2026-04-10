import { useState } from "react"
import useUserStore from "../../stores/userStore"
import { toast } from "react-toastify"
import { ErrorLogo } from "../../icons"
import { DeleteSwal } from "../swal/DeleteAlert.js"

function TravelerInfoCard({ tvl }) {
    const user = useUserStore(st => st.user)
    const updateTravelerInfo = useUserStore(st => st.updateTravelerInfo)
    const [editField, setEditField] = useState(null)
    const [input, setInput] = useState({
        firstName: tvl.firstName,
        lastName: tvl.lastName
    })

    const hdlChangeInput = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlEditToggle = () => {
        setEditField('editing')
        setInput({ firstName: tvl.firstName, lastName: tvl.lastName })
    }

    const saveUpdate = async () => {
        try {
            if (!input.firstName.trim() || !input.lastName.trim()) {
                return toast.error("Names cannot be empty")
            }

            await updateTravelerInfo({ ...input, id: tvl.id })
            toast.success("Updated successfully")
            setEditField(null)
        } catch (error) {
            toast.error("Update failed")
        }
    }

    const deleteOnSubmit = async () => {
        const travelerId = tvl.id
        // console.log(travelerId)
        try {
            await useUserStore.getState().deleteTravelerInfo(travelerId)
            toast.success("Delete Traveler Successfully!")
            // closeModal()
        } catch (error) {
            console.error("Delete process failed", error)
            toast.error("Deleted fail")
        }
    }

    const InpStyle = 'font-[Whitney-Book] text-[14px] py-1 px-2 border border-neutral/50 rounded-[8px] w-full h-fit'
    const BtnStyle = 'bg-primary rounded-[8px] px-1 font-[Whitney-Book] text-[14px] text-white'
    return (
        <>
            <div className='bg-base-100 rounded-[12px] text-[20px] p-5 flex justify-between items-center'>
                {editField ?
                    (<div className="flex gap-4">
                        <div>
                            <p className="text-[16px]">first name</p>
                            <input type='text' placeholder="first name" name="firstName"
                                value={input.firstName} onChange={hdlChangeInput}
                                className={InpStyle} />
                        </div>
                        <div>
                            <p className="text-[16px]">last name</p>
                            <input type='text' placeholder="last name" name="lastName"
                                value={input.lastName} onChange={hdlChangeInput}
                                className={InpStyle} />
                        </div>
                    </div>)
                    : <p className='font-[Whitney-Medium] text-neutral'>{tvl.firstName || 'Not added'} {tvl.lastName || 'Not added'}</p>
                }

                <div className="flex gap-5 items-center">
                    {editField ?
                        (<div className="flex items-center gap-2">
                            <button onClick={saveUpdate} className={BtnStyle}>Save</button>
                            <button onClick={() => setEditField(null)}
                             className="text-[14px] font-[Whitney-Light] text-neutral border border-neutral/50 rounded-[8px] px-1">Cancel</button>
                        </div>)
                        : <div className="flex gap-4">
                            <button onClick={hdlEditToggle} className="font-[Whitney-Book] text-[16px] text-info">Edit</button>
                            <button onClick={() => DeleteSwal({ tvl, deleteOnSubmit })} className="text-[20px] font-[Whitney-Light] text-neutral">x</button>
                        </div>
                    }

                    
                </div>
            </div>
        </>

    )
}

export default TravelerInfoCard


// <>
//     <div className='bg-base-100 rounded-[12px] text-[20px] p-5 flex justify-between items-center'>
//         {editField === ('firstName' || 'lastName') ?
//             <input type='text' className="text-red-400"
//                 placeholder={`${tvl.firstName} ${tvl.lastName}`} onChange={hdlChangeInput} />
//             : <p className='font-[Whitney-Medium] text-neutral'>{tvl.firstName || 'Not added'} {tvl.lastName || 'Not added'}</p>
//         }
//         <div className="flex gap-5 items-center">
//             <button className="font-[Whitney-Book] text-[16px] text-info">Edit</button>
//             <button onClick={() =>document.getElementById('delete-form').showModal()} className="text-[20px] font-[Whitney-Light] text-neutral">x</button>
//         </div>
//     </div>
//     <dialog id="delete-form" className="modal" >
//         <div className="modal-box">
//             <h3><span><ErrorLogo className="w-2 text-primary"/></span>Delete information for {tvl.firstName} {tvl.lastName}?</h3>
//             <button onClick={() =>document.getElementById('delete-form').close()}>Cancel</button>
//             <button onClick={deleteOnSubmit} className="text-[20px] font-[Whitney-Light] text-neutral">Delete</button>
//         </div>
//     </dialog>
// </>