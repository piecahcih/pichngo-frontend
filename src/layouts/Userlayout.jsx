import { Outlet, useLocation } from "react-router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, Suspense } from "react";
import AIchatButton from "../components/AIchatButton";

function Userlayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-100">
        <Header/>
      </div>
      <div className="fixed bottom-9 right-3 z-100">
        <AIchatButton/>
      </div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
        <Outlet/>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default Userlayout