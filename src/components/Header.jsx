import { NavLink, useLocation } from "react-router"
import { HamburgerNavLogo, HeartLogo, LanguageLogo } from "../icons"
import SearchBarNav from "./SearchBarNav"
import useUserStore from "../stores/userStore"
import ProfilePic from "./profileCPN/ProfilePic"
import { useEffect, useState } from "react"
import SearchBarHome from "./SearchBarHome"

function Header() {
  const user = useUserStore(st=>st.user)
  const logout = useUserStore(st=>st.logout)

  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const hdlScroll = () => {
      if(window.scrollY > 320) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll',hdlScroll)
    return () => window.removeEventListener('scroll', hdlScroll)
  },[])

  const isTransparent = isHome && !isScrolled
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const hdlGoSearch = () => {
      window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
   <div> 
    {/* // <div className="flex justify-between items-center bg-base-200 h-[80px] px-10"> */}
    <div className={` transition-all duration-300 h-[80px] px-10 flex justify-between items-center ${
      isTransparent ? 'bg-transparent text-white' : 'bg-base-200 text-neutral shadow-sm'}`}>

        <NavLink to="/"><div className="text-[#D44A1B] text-[32px] tracking-[2.8px]">Pich & Go</div></NavLink>

        {!isSearchExpanded && <div onClick={()=>isHome? hdlGoSearch() : setIsSearchExpanded(true)} className={`pl-30 transition-opacity duration-300 ${isTransparent ? 'opacity-0 pointer-events-none': 'opacity-100'}`}>
          <SearchBarNav/>
        </div>}

        <div className="flex gap-10 text-neutral items-center">
          <div className="flex items-center">
            <LanguageLogo className={`h-5 ${isTransparent ? 'text-white' : 'text-neutral'}`}/>
            {/* <div className="divider divider-horizontal mx-0.5 -my-2 "></div> */}
            <div className={`divider divider-horizontal mx-0.5 -my-2 before:w-[1px] after:w-[1px] ${isTransparent ? 'before:bg-white after:bg-white' : ''}`}></div>
            <p className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>THB</p>
          </div>

          {/* <div className="border rounded-[12px] border-base-content p-2 bg-neutral-content"> */}
          <div className={`border rounded-[12px] p-2 transition-colors ${
            isTransparent ? 'border-white/40 bg-black/20 hover:bg-black/40' : 'border-base-content bg-neutral-content'
          }`}>
            <NavLink to="/mylists"><HeartLogo className="w-8"/></NavLink>
          </div>

          <div className="dropdown dropdown-end">
              {/* <div tabIndex={0} role="button" className="btn m-1 btn-circle overflow-hidden"> */}
              {/* <div tabIndex={0} role="button" className="border rounded-[12px] border-base-content px-2 py-1 flex gap-2 bg-neutral-content"> */}
              <div tabIndex={0} role="button" className={`border rounded-[12px] px-2 py-1 flex gap-2 items-center transition-colors ${
                isTransparent ? 'border-white/40 bg-black/20 hover:bg-black/40' : 'border-base-content bg-neutral-content'
              }`}>
                <ProfilePic imgSrc={user.profileImg} className='rounded-full h-[40px]' />
                <HamburgerNavLogo className={`w-4 ${isTransparent ? 'text-white' : 'text-neutral'}`}/>
              </div>
            
              <ul tabIndex={0} className="dropdown-content menu bg-neutral-content rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><NavLink to='/account/profile'>Profile</NavLink></li>
                  <li><a onClick={logout}>Sign out</a></li>
              </ul>
          </div>
        </div>

    </div>
    {isSearchExpanded && (
      <div className="flex justify-center bg-base-200 p-4 pb-8">
        <div 
          className="fixed inset-0 bg-black/40 -z-10" 
          onClick={() => setIsSearchExpanded(false)} 
        />
        <SearchBarHome onClose={() => setIsSearchExpanded(false)} />
      </div>
    )}
  </div>
  )
}

export default Header