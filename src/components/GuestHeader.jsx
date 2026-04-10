import { NavLink } from "react-router"
import { LanguageLogo } from "../icons"
import SearchBarNav from "./SearchBarNav"
import { useEffect, useState } from "react"

function GuestHeader() {
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

  return (
    <div className={` transition-all duration-300 h-[80px] px-10 flex justify-between items-center ${
      isTransparent ? 'bg-transparent text-white' : 'bg-base-200 text-neutral shadow-sm'}`}>

      <NavLink to="/"><div className="text-[#D44A1B] text-[32px] tracking-[2.8px]">Pich & Go</div></NavLink>

        {!isSearchExpanded && <div onClick={()=>setIsSearchExpanded(true)} className={`pl-30 transition-opacity duration-300 ${isTransparent ? 'opacity-0 pointer-events-none': 'opacity-100'}`}>
          <SearchBarNav/>
        </div>}

        <div className="flex gap-10 text-[#505050] items-center">
          <div className="flex items-center">
            <LanguageLogo className={`h-5 ${isTransparent ? 'text-white' : 'text-neutral'}`}/>
            {/* <div className="divider divider-horizontal mx-0.5 -my-2 "></div> */}
            <div className={`divider divider-horizontal mx-0.5 -my-2 before:w-[1px] after:w-[1px] ${isTransparent ? 'before:bg-white after:bg-white' : ''}`}></div>
            <p className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>THB</p>
          </div>

          <NavLink to="./register"><span className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>Sign up</span></NavLink>
          <NavLink to="./login"><span className={`${isTransparent ? 'text-white' : 'text-neutral'}`}>Log in</span></NavLink>
        </div>
    </div>
  )
}

export default GuestHeader