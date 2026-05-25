import MembershipCard from "./MembershipCard"


function RewardCard() {
  return (
    <div className='bg-base-200 w-[655px] h-fit rounded-[20px] px-10 py-7 flex flex-col'>
        <h1 className='text-[26px] mb-5'>Rewards</h1>
        <MembershipCard/>
    </div>
  )
}

export default RewardCard