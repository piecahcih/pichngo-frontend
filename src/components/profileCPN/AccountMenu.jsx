import React from 'react'
import useUserStore from '../../stores/userStore'
import ProfilePic from './ProfilePic'
import { useNavigate } from 'react-router'

function AccountMenu() {
    const user = useUserStore(st=>st.user)
    const logout = useUserStore(st=>st.logout)
    const navigate = useNavigate()

    const btnStyle = 'h-[50px] w-[260px] flex items-center justify-start px-7'
  return (
    <div className='bg-base-200 w-[260px] h-[550px] rounded-[20px] p-7 flex flex-col justify-between'>
        <div className="flex flex-col items-center gap-2 pt-5">
            <ProfilePic imgSrc={user?.profileImg} className="rounded-full h-[115px]"/>
            <h1 className='text-[20px]'>{user.name || 'Pich User'}</h1>
        </div>
        <div className="flex flex-col -mx-7 -mb-7">
            <button onClick={()=>navigate('/account/profile')} type='button' className={btnStyle}>Profile</button>
            <button onClick={()=>navigate('/account/bookings')} className={btnStyle}>Bookings</button>
            <button onClick={()=>navigate('/account/traveler-info')} className={btnStyle}>Saved Guests</button>
            <button onClick={()=>navigate('/account/rewards')} className={btnStyle}>Rewards</button>
            <button onClick={()=>navigate('/account/reviews')} className={btnStyle}>Reviews</button>
            <hr className='mx-6 text-base-400 opacity-70'/>
            <button onClick={()=>logout()} className={`${btnStyle} h-[62px] text-neutral opacity-70 rounded-b-[12px]`}>Sign Out</button>
        </div>
            {/* <span>{JSON.stringify(user)}</span> */}
    </div>
  )
}

export default AccountMenu