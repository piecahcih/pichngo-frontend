import { useState } from 'react'
import ProfilePic from './ProfilePic'
import useUserStore from '../../stores/userStore'
import { EditAccApi } from '../../api/mainAPI'
import { PhotoIcon } from '../../icons'
import uploadCloud from '../../utils/uploadCloud'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function ProfileCard() {
  const user = useUserStore(st=>st.user)
  const navigate = useNavigate();

  // const [isEdit, setIsEdit] = useState(false)
  const [editField, setEditField] = useState(null)
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const hdlChangeInput = (e)=>{
    setInput(e.target.value)
  }

  const saveUpdate = async (fieldName) => {
    console.log("What am I sending to the API?",`${fieldName} :`, input);

    setError("")

    if(input.trim() === "" && fieldName !== 'password') {
      setEditField(null)
      return
    }

    try {
      await useUserStore.getState().updateAcc({[fieldName] : input})
      setInput("")
      setEditField(null)  
    } catch (error) {
      console.log("Error:", error.response);
      const rawMessage = error.response?.data?.message
      try{
        const parsed = JSON.parse(rawMessage)
        if(Array.isArray(parsed)) {
          setError(parsed[0].message)
        } else {
          setError(rawMessage)
        }
      } catch{
          setError(rawMessage || "Update failed. Please try again.")
      }
      // const errMsg = error.response?.data?.message || "Update failed. Please try again."
      // setError(errMsg)

      console.error("Update failed", error)
    }
  }

  const hdlFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    // console.log("selectedFile:",selectedFile)
    if(!selectedFile) return;

    try {
      const imgUrl = await uploadCloud(selectedFile)
      console.log("imgUrl:", imgUrl)
      await useUserStore.getState().updateAcc({ profileImg: imgUrl})
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload process failed", error);
      setError("Failed to upload image. Please try again.");
    }
  }

  const deleteOnSubmit = async () => {
    const getId = user.id 
    // console.log(typeof getId)
    try {
      await useUserStore.getState().deleteAcc(getId)
      await useUserStore.getState().logout()
      toast.success("Delete User Successfully!");
      navigate("/")
    } catch (error) {
      console.error("Delete process failed", error);
      setError("Failed to Delete User. Please try again.");
    }
  }


  const InpStyle = 'font-[Whitney-Book] text-[14px] py-1 px-2 border border-neutral rounded-[8px] w-full h-full bg-base-300'
  const BtnStyle = 'bg-primary rounded-[8px] px-1 font-[Whitney-Book] text-[14px] text-white'

  return (
    <div>
      <div className='bg-base-200 w-[655px] h-[292px] rounded-[20px] px-10 py-7 flex flex-col'>
          <h1 className='text-[26px] mb-5'>Profile</h1>
          <div className="flex gap-20 items-center">
            <div className="relative group cursor-pointer h-[145px] w-[145px]">
              <ProfilePic imgSrc={user.profileImg} className="rounded-full h-[145px]"/>

              <div onClick={() => document.getElementById('fileInput').click()}
              className="absolute inset-0 flex flex-col items-center justify-center opacity-0 border-4 border-white rounded-full group-hover:opacity-80 bg-base-content transition-opacity duration-300">
                <PhotoIcon className="text-white w-10 h-10" />
              </div>

              <input type="file" id="fileInput" className="hidden" onChange={hdlFileChange} />

            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className='flex justify-between items-center'>
                <div>
                  <h2>Username</h2>
                  {editField === 'name' ? 
                  <input type='text' className={InpStyle} placeholder={user.name} onChange={hdlChangeInput}/>
                  : <p className='font-[Whitney-Book] text-[14px] text-neutral'>{user.name || 'Not added'}</p>
                  }
                  {editField === 'name' && error && <p className="text-[12px] text-error font-[Whitney-Light]">{error}</p>}
                </div>
                {editField === 'name' ?
                (<div className="flex items-center gap-2">
                  <button onClick={()=>{input.trim() !== "" ? saveUpdate('name') : setEditField(null)}} className={BtnStyle}>Save</button>
                  <button onClick={() => { setEditField(null), setError(""), setInput("");}} className="text-[20px] font-[Whitney-Light] text-neutral">x</button>
                </div>) 
                : <button onClick={()=>{setEditField('name'), setInput(user.name), setError("")}} className="font-[Whitney-Book] text-[14px] text-info">Edit</button>
                }
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <h2>Email</h2>
                  {editField === 'email' ? 
                  <input type='text' className={InpStyle} placeholder={user.email} onChange={hdlChangeInput}/>
                  :<p className='font-[Whitney-Book] text-[14px] text-neutral'>{user.email}</p>
                  }
                  {editField === 'email' && error && <p className="text-[12px] text-error font-[Whitney-Light]">{error}</p>}
                </div>
                {editField === 'email' ? 
                (<div className="flex items-center gap-2">
                  <button onClick={()=>{input.trim() !== "" ? saveUpdate('email') : setEditField(null)}} className={BtnStyle}>Save</button>
                  <button onClick={() => { setEditField(null), setError(""), setInput("");}} className="text-[20px] font-[Whitney-Light] text-neutral">x</button>
                </div>)
                : <button onClick={()=>{setEditField('email'), setInput(user.email), setError("")}} className="font-[Whitney-Book] text-[14px] text-info">Edit</button>
                }
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <h2>Password</h2>
                  {editField === 'password' ? 
                  <input type='password' className={InpStyle} placeholder="Enter new password" onChange={hdlChangeInput}/>
                  :<p className='font-[Whitney-Book] text-[14px] text-neutral'>**********</p>
                  }
                  {editField === 'password' && error && <p className="text-[12px] text-error font-[Whitney-Light]">{error}</p>}
                </div>
                {editField === 'password' ? 
                (<div className="flex items-center gap-2">
                  <button onClick={()=>{input.trim() !== "" ? saveUpdate('password') : setEditField(null)}} className={BtnStyle}>Save</button>
                  <button onClick={() => { setEditField(null), setError(""), setInput("");}} className="text-[20px] font-[Whitney-Light] text-neutral">x</button>
                </div>)
                : <button onClick={()=>{setEditField('password'), setInput(""), setError("")}} className="font-[Whitney-Book] text-[14px] text-info">Edit</button>
                }
              </div>
            </div>
          </div>
      </div>
      <div className=" mt-5 flex justify-center gap-2 font-[Whitney-Book] text-[12px]">
        <button onClick={deleteOnSubmit} className='underline font-bold'>Delete My Account</button>
        <p>Once deleted,  You will not be able to recover all account information.</p>
      </div>
    </div>
  )
}

export default ProfileCard