import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
// import { useSnackbar } from 'notistack';

export default function Signup() {
    const {
        handleSubmit,
        register,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    const router = useRouter();

    let defaultBody = {
        name: "",
        email: "",
        password: "",
    };
    // const { enqueueSnackbar } = useSnackbar();
    async function onSubmit(values) {
        try {
            const body = { ...defaultBody, ...values };
            await fetch(
                `/api/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        accept: "application/json",
                    },
                    body: Object.entries(body)
                        .map((e) => e.join("="))
                        .join("&"),
                },
            )
                .then(async (res) => {
                    if (!res.ok) {
                        const errorResp = await res.json()
                        throw Error(errorResp.message)
                    }
                    res.json()
                    // enqueueSnackbar('User Registered Successfully.', {
                    //     variant: 'success'
                    // })
                    router.replace("/login")
                })
                .catch((err) => {
                    // enqueueSnackbar('Failed to register a user.', {
                    //     variant: 'error'
                    // })
                    setError('submit', {
                        type: "server",
                        message: err.message,
                    });
                    return null;
                });
        }
        catch (error) {
            setError('submit', {
                type: "server",
                message: 'Unable to connect to the server properly!!',
            });
        }
    }
    return (
        <>
            <div className="flex justify-center items-center my-36">
                <div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
                    <form >
                        <div className=" flex flex-col gap-5 ">
                            <div className='flex flex-col gap-3'>
                                <p className=" font-bold text-4xl text-center "> Signup</p>
                                <p className=" text-gray-400 text-center text-md ">Enter your detail to sign up to your account</p>
                            </div>
                            <div className='flex flex-col gap-3 '>
                                <div className='flex flex-col gap-1.5'>
                                    <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">Name</label>
                                    <input type="text" placeholder="Full Name" className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md" />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">Email</label>
                                    <input type="email" placeholder="Email" className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md" />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">Password</label>
                                    <input type="password" placeholder="Password" className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md" />
                                </div>
                                <button type='submit' className="px-9 py-4 bg-teal-900 hover:bg-oteal-900 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline">
                                    Signup
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <p className="font-medium text-sm text-[#9A9A9A] text-center ">
                            --- Or singup with ---
                        </p>
                        <div className="flex p-5 justify-center gap-5 flex-col">
                            <button onClick={() => signIn("facebook")} className='border border-gray-200 rounded-md flex gap-6 px-6 py-3 w-full items-center'>
                                <div className='w-6 relative'>
                                    <Image alt="" src="/assets/img/FacebookIcon.svg" width={20} height={20} />
                                </div>
                                <div className='flex flex-1 items-center justify-center'>Continue with Facebook</div>
                            </button>
                            <button onClick={() => signIn("google")} className='border border-gray-200 rounded-md flex gap-6 px-6 py-3 w-full items-center'>
                                <div className='w-6 relative'>
                                    <Image alt="" src="/assets/img/GoogleIcon.svg" width={20} height={20} />
                                </div>
                                <div className='flex flex-1 items-center justify-center'>Continue with Google</div>
                            </button>
                        </div>
                        <div>
                            <p className="text-center ">Already have account ?
                            </p>

                            <p className="text-teal-900 font-bold text-sm text-center">
                                <Link href="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}