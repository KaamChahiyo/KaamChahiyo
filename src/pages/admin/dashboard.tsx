import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='flex flex-col lg:flex-row justify-center gap-20 lg:h-24 items-center p-32'>
            <Link href='/admin/jobs'>
                <div className='p-8 rounded-lg text-white font-semibold cursor-pointer bg-blue-600 w-64 items-center justify-center flex' >View/ Manager all Jobs</div>
            </Link>
            <Link href='/admin/users'>
                <div className='p-8 rounded-lg text-white font-semibold cursor-pointer bg-blue-600 w-64 items-center justify-center flex' >View/ Manager all Users</div>
            </Link>
            <Link href='#'>
                <div className='p-8 rounded-lg text-white font-semibold cursor-pointer bg-blue-600 w-64 items-center justify-center flex' >Manage Payouts</div>
            </Link>
        </div>
    )
}
