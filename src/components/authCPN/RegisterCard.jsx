import { NavLink, useNavigate } from "react-router"
import { AppleLogo, FacebookLogo, GoogleLogo } from "../../icons"
import { registerSchema } from "../../validators/schema"
import { mainAPI, RegisterApi } from "../../api/mainAPI"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Bounce } from 'react-toastify';
import loginImg from '../../assets/loginimg.png'


function RegisterCard() {
    const {register, handleSubmit, formState, reset} = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onSubmit',
        defaultValues: {
            email:'', password: '', confirmPassword: ''
        }
    })
    const { errors, isSubmitting } = formState

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await new Promise( resolve => setTimeout(resolve, 1000))
            const res = await RegisterApi(data)
            // const res = await mainAPI.post('/auth/register',data)
            // console.log(res)
            toast.success(res.data.message, {transition: Bounce, autoClose: 2000})
            reset()

            setTimeout(()=>{navigate("/login")},1200)
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg, {transition : Bounce, autoClose: 2000})
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
                    <h1 className="font-['Whitney-Bold'] text-[32px] text-black">Create an account</h1>
                    <p className="font-['Whitney-Book'] text-[14px]">start your perfect trip with <span className="text-primary font-bold">Pich & Go</span></p>
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

                            <input type="password" placeholder="Confirm Password" {...register('confirmPassword')}  
                            className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]" />
                            <p className="text-sm text-error">{errors.confirmPassword?.message}</p>

                        </div>

                        <button className="bg-primary text-white rounded-[18px] p-2 w-[328px] mb-4" disabled={isSubmitting}>
                            Sign up {isSubmitting && <span className="loading loading-dots loading-md"></span>}
                        </button>
                    </fieldset>
                </form>

                <div className="divider mx-6 font-['Whitney-Light'] text-[12px]">OR</div>
        
                <div className="flex justify-center gap-4 h-[45px] my-5">
                    <FacebookLogo className="bg-base-100 rounded-full p-2 text-black"/>
                    <GoogleLogo className="bg-base-100 rounded-full p-2"/>
                    <AppleLogo className="bg-base-100 rounded-full p-2"/>
                </div>
  
                <p className="font-['Whitney-Book'] text-[12px] text-center mt-10">Already have account? <span className="font-['Whitney-Semibold'] underline"><NavLink to="/login">Login</NavLink></span></p>
            </div>
        </div>

    </div>
  )
}

export default RegisterCard