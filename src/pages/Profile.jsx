import AccountMenu from "../components/profileCPN/AccountMenu"
import ProfileCard from "../components/profileCPN/ProfileCard"

function Profile() {
  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-6 p-[150px]">
      <AccountMenu/>
      <ProfileCard/>
    </div>
  )
}

export default Profile