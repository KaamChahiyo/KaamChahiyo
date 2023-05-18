import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const ManagePayment = () => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.replace("/login");
        }
    }, [session, router]);

    return (
        <div className="flex justify-center items-center">
            < div className="flex flex-col w-1/3 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] " >

                <div className=" flex flex-col gap-5 ">
                    <div className="flex flex-col gap-1 text-gray-500 bg-black rounded-xl w-full h-72 p-8">
                        <div className="container flex flex-col gap-10">
                            <header className='relative'>
                                <span className="logo relative gap-5">
                                    <div className='relative h-16 w-16'>
                                        <Image src="/assets/img/logo.png"
                                            alt=""
                                            fill className="object-contain" />
                                    </div>
                                    <h5 className='font-medium'>Master Card</h5>
                                </span>
                                <div className='relative h-16 w-16'>
                                    <Image src="/assets/img/chip.png" alt="" fill className="chip object-contain" />
                                </div>
                            </header>
                            <div className="card-details">
                                <div className="name-number">
                                    <h6>Card Number</h6>
                                    <h5 className="number">80** **** **** **20</h5>
                                    <h5 className="name font-medium">John Doe</h5>
                                </div>
                                <div className="valid-date">
                                    <h6>Valid Thru</h6>
                                    <h5>05/28</h5>
                                </div>
                            </div>
                        </div>


                    </div>
                </ div>
                <Link href="#">
                    <button
                        type="submit"
                        className="px-5 py-4 border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold w-full focus:outline-none focus:shadow-outline"
                    >
                        Manage Payment Methods
                    </button>
                </Link>
            </div >
        </ div>
    )
}

export default ManagePayment

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(context.req, context.res, authOptions),
        },
    };
}
