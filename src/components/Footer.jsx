import { FacebookLogo, InstagramLogo, PinterestLogo, YoutubeLogo } from "../icons"
import { NavLink } from "react-router"

function Footer() {
  return (
    <div className="bg-secondary text-white px-25 pt-10 pb-5">
        <div className="flex justify-between">
            <div className="">
                <h1 className="text-[32px] tracking-[2.8px]">Pich & Go</h1>
                <p className="w-[245px] break-all font-['Whitney-Light'] text-[14px]">This website is intended for educational purposes only.PeachPeachPeachPeachPeachPeachPeachPeachPeachPeachPeachPeachPeachPeachPeach</p>
            </div>
            <div className="flex gap-10">
                <div className="flex flex-col gap-1.5">
                    <h2>About</h2>
                    <div className="font-['Whitney-Light'] text-[14px] flex flex-col gap-1">
                        <p>About Pich&Go</p>
                        <p>News</p>
                        <p>Careers</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <h2>Contact Us</h2>
                    <p className="font-['Whitney-Light'] text-[14px]">Customer Service</p>
                    <div className="flex h-8 mt-3 gap-4 text-white">
                        <NavLink to="https://www.instagram.com/piecahcih?igsh=Z3Y5bGd4NTY1bXMy&utm_source=qr"><InstagramLogo className="h-8"/></NavLink>
                        <PinterestLogo/>
                        <FacebookLogo/>
                        <NavLink to="https://www.youtube.com/watch?v=hE2DLtuxcUU"><YoutubeLogo className="h-8"/></NavLink>
                    </div>
                </div>
            </div>
        </div>

        <hr className="mb-5 mt-12 -mx-7" />
        <p className="font-['Whitney-Light'] text-[14px]">© 2026 Pich&Go. All Rights Reserved.</p>
    </div>
  )
}

export default Footer