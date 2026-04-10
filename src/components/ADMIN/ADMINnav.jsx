import { useNavigate } from "react-router"

function ADMINnav() {
  const navigate = useNavigate()

  const btnStyle = 'h-[50px] w-[260px] flex items-center justify-start px-7'
  return (
    <div>
        <div className="bg-base-200 w-[260px] h-[550px] rounded-[20px] p-7 flex flex-col justify-center">
          <button onClick={()=>navigate('/admin')} className={btnStyle}>Admin Home Page</button>
          <button onClick={()=>navigate('/admin/allwaitingbookings')} className={btnStyle}>All Waiting Bookings</button>
          <button onClick={()=>navigate('/admin/allconfirmbookings')} className={btnStyle}>All Confirmed Bookings</button>
          <button onClick={()=>navigate('/admin/allcancelbookings')} className={btnStyle}>All Cancelled Bookings</button>
        </div>        
    </div>
  )
}

export default ADMINnav