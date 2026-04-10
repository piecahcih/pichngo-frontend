import { NavLink, useNavigate } from "react-router"
import { AppleLogo, FacebookLogo, GoogleLogo } from "../../icons"
import useUserStore from "../../stores/userStore"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from "../../validators/schema"
import { toast } from 'react-toastify'
import loginImg from '../../assets/loginimg.png'

function LoginCard() {
    const token = useUserStore(st=>st.token)
    const user = useUserStore(st=>st.user)
    const login = useUserStore(st=>st.login)
    const {register, handleSubmit, formState } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit'
    })
    const {errors, isSubmitting, isValid} = formState

    const navigate = useNavigate()

    const onSubmit = async (body) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const res = await login(body)
            toast.success(res.data.message)

            const loggedInUser = res.data.user
            if(loggedInUser?.role === 'ADMIN') {
                navigate("/admin") 
                return
            }
            navigate("/")         
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg)
        }
    }

  return (
    <div className="bg-base-200 w-[900px] h-[600px] rounded-[20px] p-7 flex justify-between">
        <div className="bg-primary w-[400px]  rounded-[20px]">
            <img src={loginImg} />
        </div>
        <div className="w-5/10 flex justify-center">
            <div className=" w-fit m-9">
                <div className="flex flex-col">
                    <h1 className="font-['Whitney-Bold'] text-[32px] text-black">Log In</h1>
                    <p className="font-['Whitney-Book'] text-[14px]">Welcome back! enjoy your next trip with <span className="text-primary font-bold">Pich & Go</span></p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={isSubmitting}>
                        <div className="font-['Whitney-Book'] flex flex-col gap-2 my-8">
                            <input type="text" placeholder="Email" {...register('email')} 
                            className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]"/>
                            <p className="text-sm text-error">{errors.email?.message}</p>
                            
                            <input type="password" placeholder="Password" {...register('password')} 
                            className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]" />
                            <p className="text-sm text-error">{errors.password?.message}</p>

                            <div className="font-['Whitney-Book'] text-[12px] flex justify-between">
                                <div className="flex">
                                    <input type="checkbox" className="ml-4 mr-2 accent-primary" {...register('rememberMe')}/>
                                    <p>Remember Me</p>
                                </div>
                                <button>Forgot Password?</button>
                            </div>
                        </div>
                        <button className="bg-primary text-white rounded-[18px] p-2 w-[328px] mb-4" disabled={!isValid}>
                            Continue {isSubmitting && <span className="loading loading-dots loading-md"></span>}
                        </button>
                    </fieldset>
                </form>

                <div className="divider mx-6 font-['Whitney-Light'] text-[12px]">OR</div>
        
                <div className="flex justify-center gap-4 h-[45px] my-5">
                    <FacebookLogo className="bg-base-100 rounded-full p-2 text-black"/>
                    <GoogleLogo className="bg-base-100 rounded-full p-2"/>
                    <AppleLogo className="bg-base-100 rounded-full p-2"/>
                </div>
                <p className="font-['Whitney-Book'] text-[12px] text-center mt-10">Don't have an account? <span className="font-['Whitney-Semibold'] underline"><NavLink to='/register'>Sign up</NavLink></span></p>
            </div>
        </div>

    </div>
  )
}

export default LoginCard