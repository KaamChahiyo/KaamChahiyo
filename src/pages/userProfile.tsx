
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function UserProfile() {
    const { data: session } = useSession()
    const router = useRouter()
    if (!session) {
        router.replace("/login")
    }
    else {
        const [userEmail, setUserEmail] = useState(session.user.email);
        const emailChange = (e) => { setUserEmail(e.target.value) };

        const [userName, setUserName] = useState(session.user.name);
        const nameChange = (e) => { setUserName(e.target.value) };

        const [userBio, setUserBio] = useState(session.user.bio);
        const bioChange = (e) => { setUserBio(e.target.value) };

        // const [userPassword, setUserPassword] = useState(session.user.password);
        // const passwordChange = (e) => { setUserPassword(e.target.value) };
        return (
            <div className='flex justify-center items-center my-5 gap-5'>

                <div className='flex flex-col bg-white shadow-md rounded-3xl gap-3 p-5 w-1/3'>
                    <div>
                        <Link href="#">
                            <div className='flex flex-col text-lg items-center hover:scale-110'>Profile</div>
                        </Link>
                    </div>
                    <div>
                        <Link href="#">
                            <div className='flex flex-col text-lg items-center hover:scale-110'>Security</div>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 p-10 bg-white w-1/3 shadow-md rounded-3xl'>
                    <div className="flex flex-col gap-3">
                        <p className="font-bold text-4xl text-center p-4">Update your profile</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className=''>
                            <Image src={session?.user?.image} alt={session?.user?.name} width={100} height={100} quality={100} />
                        </div>
                        <div>{session.user.name}</div>
                    </div>
                    <div className='flex flex-col gap-1 text-gray-500'>
                        <label className='text-grey'>Name:</label>
                        <input type="text" placeholder="Name" value={userName} onChange={nameChange}
                            className='border-2 focus:outline-none focus:shadow-outline border-gray-300 p-3 rounded-md'
                        />

                    </div>
                    <div className='flex flex-col gap-1 text-gray-500'>
                        <label>Email:</label>
                        <input type="text" placeholder="email" value={userEmail} onChange={emailChange}
                            className='border-2 focus:outline-none focus:shadow-outline border-gray-300 p-3 rounded-md'
                        />
                    </div>
                    <div className='flex flex-col gap-1 text-gray-500'>
                        <label>Bio:</label>
                        <textarea rows={3} value={userBio} onChange={bioChange}
                            className='border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md'
                        />
                    </div>
                    {/* <div className='flex flex-col gap-1 text-gray-500'>
                        <label>Password:</label>
                        <input type="password" placeholder="password" value={userPassword} onChange={passwordChange}
                            className='border-2 focus:outline-none border-gray-300 p-3 rounded-md'
                        />
                    </div> */}
                    <Link href="">
                        <div>
                            <button className="px-5 py-4 bg-teal-900 hover:bg-teal-700 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline">Update</button>
                        </div>
                    </Link>
                </div>
            </div >
        );
    }
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