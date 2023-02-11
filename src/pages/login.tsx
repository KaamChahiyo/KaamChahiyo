import { getServerSession } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { authOptions } from './api/auth/[...nextauth]';

export default function Login() {
    const router = useRouter();
    const { data: session } = useSession();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm();

    let defaultBody = {
        grant_type: "",
        username: "",
        password: "",
        scope: "",
        client_id: "",
        client_secret: "",
    };
    const { enqueueSnackbar } = useSnackbar();

    async function onSubmit(values) {
        try {
            const body = { ...defaultBody, ...values };
            await signIn("credentials", {
                ...body,
                callbackUrl: router.query.callbackUrl,
            });
        }
        catch (error) {
            enqueueSnackbar('Login failed', {
                variant: 'error'
            })
        }
    }

    useEffect(() => {
        if (session) {
            router.replace("/")
        }
    }, [session])

    return (
        <>
            <div className="flex justify-center items-center my-36">
                <div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className=" flex flex-col gap-5 ">
                            <div className='flex flex-col gap-3'>
                                <p className=" font-bold text-4xl text-center "> Login</p>
                                <p className=" text-gray-400 text-center text-md ">Enter your detail to login to your account</p>
                            </div>
                            <div className='flex flex-col gap-3 '>
                                <div className='flex flex-col gap-1.5'>
                                    <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">Email</label>
                                    <input {...register("email")} type="email" placeholder="Email" className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md" />
                                </div>
                                <div className='flex flex-col gap-1.5'>
                                    <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">Password</label>
                                    <input {...register("password")} type="password" placeholder="Password" className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md" />
                                </div>
                                <button type='submit' onClick={() => signIn("credentials")} className="px-9 py-4 bg-teal-900 hover:bg-oteal-900 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline">
                                    {isSubmitting ? <>Signing In</> : <>Sign In</>}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <p className="font-medium text-sm text-[#9A9A9A] text-center ">
                            --- Or login with ---
                        </p>

                        <div className='flex gap-6 flex-col w-full'>
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
                            <div>
                                <p className="text-center ">Don't have account ?
                                </p>

                                <p className="text-teal-900 font-bold text-sm text-center">
                                    <Link passHref href="/signup">Signup</Link>
                                </p>
                            </div>
                        </div>
                        {/* <div className="flex p-5 justify-center gap-5 flex-col ">
                            <Link passHref href="#">
                                <div className="bg-teal-100 flex justify-center p-3 rounded-full" >
                                    <Image alt="" src="/assets/img/FacebookIcon.svg" width={20} height={20} />
                                </div>
                            </Link>

                            <button className="bg-teal-100 flex justify-center p-3 rounded-full gap-5 items-center" onClick={() => signIn("google")} >
                                <Image alt="" src="/assets/img/GoogleIcon.svg" width={20} height={20} />
                                <div>Signin with Google</div>
                            </button>
                            <div>
                                <p className="text-center ">Don't have account ?
                                </p>

                                <p className="text-teal-900 font-bold text-sm text-center">
                                    <Link passHref href="/signup">Signup</Link>
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div >
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(
                context.req,
                context.res,
                authOptions
            ),
        },
    }
}