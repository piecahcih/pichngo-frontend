import ADMINheader from '../components/ADMIN/ADMINheader'
import { Outlet, useLocation } from 'react-router'
import Footer from '../components/Footer'
import { useEffect, Suspense } from 'react';

function AdminLayout() {
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
        <ADMINheader/>
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
          <Outlet/>
        </Suspense>
        <Footer/>
    </div>
  )
}

export default AdminLayout