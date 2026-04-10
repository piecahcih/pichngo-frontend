import AccountMenu from "../components/profileCPN/AccountMenu"
import RewardCard from "../components/profileCPN/RewardCard"

function ProfileRewards() {
  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 p-[150px]">
      <AccountMenu/>
      <RewardCard/>
    </div>
  )
}

export default ProfileRewards