import { BrowserRouter, RouterProvider } from "react-router"
import { adminRouter, guestRouter, userRouter } from "./router/router"
import { ToastContainer } from "react-toastify";
import useUserStore from "./stores/userStore";
import { Suspense, useEffect } from "react";


function App() {
  // const user = null
  // const user = { email: 'peach@gmail.com'}
  const user = useUserStore(st=>st.user)
  // const finalRouter = user ? userRouter : guestRouter ;
  // const finalRouter = user.role === 'ADMIN' ? adminRouter : user ? userRouter : guestRouter ;
  const finalRouter = !user ? guestRouter : user.role === 'ADMIN' ? adminRouter : userRouter ;

  useEffect(()=>{
    const { user, rememberMe, logout } = useUserStore.getState();
    const isNewSession = !sessionStorage.getItem('session_active');

    if(user && !rememberMe && isNewSession) {
      logout()
    }

    sessionStorage.setItem('session_active', 'true')
  }, [])

  return (
    <>
    {/* <Suspense fallback={
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-300 backdrop-blur-sm">
        <span className="loading loading-dots loading-xl"></span>
      </div>
      }>
    </Suspense> */}
      <RouterProvider router={finalRouter}/>
      <ToastContainer theme="colored" position="top-center"/>
    </>
  )
}

export default App

