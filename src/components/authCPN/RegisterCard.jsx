import { NavLink, useNavigate } from "react-router"
import { AppleLogo, EyeIcon, EyeSlashIcon, FacebookLogo, GoogleLogo } from "../../icons"
import { registerSchema } from "../../validators/schema"
import { mainAPI, RegisterApi } from "../../api/mainAPI"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, Bounce } from 'react-toastify';
import loginImg from '../../assets/loginimg.png'
import { useState } from "react"
import { auth, googleProvider } from "../../utils/firebase"
import { signInWithPopup } from "firebase/auth"
import useUserStore from "../../stores/userStore"


function RegisterCard() {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onSubmit',
        defaultValues: {
            email: '', password: '', confirmPassword: ''
        }
    })
    const { errors, isSubmitting } = formState

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleRegister = async () => {
        try {
            googleProvider.setCustomParameters({ prompt: 'select_account' })
            const res = await signInWithPopup(auth, googleProvider)
            const idToken = await res.user.getIdToken()

            await useUserStore.getState().registerorLoginWithGoogle(idToken)
            toast.success('Register Success')

            setTimeout(() => { navigate("/") }, 600)
        } catch (error) {
            console.error("Google register Error", error)
            toast.error("Google register failed. Please try again")
        }
    };

    const onSubmit = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const res = await RegisterApi(data)
            // const res = await mainAPI.post('/auth/register',data)
            // console.log(res)
            toast.success(res.data.message, { transition: Bounce, autoClose: 2000 })
            reset()

            setTimeout(() => { navigate("/login") }, 1200)
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg, { transition: Bounce, autoClose: 2000 })
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
                                    className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]" />
                                <p className="text-sm text-error">{errors.email?.message}</p>

                                <div className="relative pb-2">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" {...register('password')}
                                        className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]" />
                                    <p className="text-sm text-error">{errors.password?.message}</p>
                                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" {...register('confirmPassword')}
                                        className="bg-base-100 rounded-[18px] px-5 py-2 w-[328px]" />
                                    <p className="text-sm text-error">{errors.confirmPassword?.message}</p>
                                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                                    </button>
                                </div>

                            </div>

                            <button className="bg-primary hover:bg-[#b5390e] text-white rounded-[18px] p-2 w-[328px] mb-4" disabled={isSubmitting}>
                                Sign up {isSubmitting && <span className="loading loading-dots loading-md"></span>}
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider mx-6 font-['Whitney-Light'] text-[12px]">OR</div>

                    <div className="flex justify-center gap-4 h-[40px] w-[328px]">
                        <button onClick={handleGoogleRegister} className="w-full flex gap-3 items-center justify-center transition-transform active:scale-95 bg-base-100 rounded-full p-2 shadow-sm hover:bg-gray-200">
                            <GoogleLogo className="w-8 h-5" /> Continue with Google
                        </button>
                    </div>

                    {/* <div className="flex justify-center gap-4 h-[45px] my-5">
                        <FacebookLogo className="bg-base-100 rounded-full p-2 text-black"/>
                        <GoogleLogo className="bg-base-100 rounded-full p-2"/>
                        <AppleLogo className="bg-base-100 rounded-full p-2"/>
                    </div> */}

                    <p className="font-['Whitney-Book'] text-[12px] text-center mt-10">Already have account? <span className="font-['Whitney-Semibold'] underline"><NavLink to="/login">Login</NavLink></span></p>
                </div>
            </div>

        </div>
    )
}

export default RegisterCard