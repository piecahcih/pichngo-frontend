import AccountMenu from "../components/profileCPN/AccountMenu"
import TravelersCard from "../components/profileCPN/TravelersCard"


function ProfileTravelers() {
  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 p-[150px]">
      <AccountMenu/>
      <TravelersCard/>
    </div>
  )
}

export default ProfileTravelers