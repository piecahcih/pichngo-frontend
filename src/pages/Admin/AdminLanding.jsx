import ADMINnav from "../../components/ADMIN/ADMINnav"

function AdminLanding() {
  return (
    <div className="bg-base-300 min-h-[67vh] flex justify-center gap-8 p-[70px]">
      <ADMINnav/>
      <div className="flex flex-col w-[600px] gap-6">
        <h1 className="text-6xl">ADMIN PAGE</h1>
      </div>
    </div>
  )
}

export default AdminLanding