import Link from 'next/link'
import React from 'react'

export default function EmoployeeEarning() {
    return (
        <div className='py-16'>
            <h1 className='text-3xl font-semibold pb-8'>Employee Earning</h1>
            <div className='flex flex-col lg:flex-row gap-20 h-full'>
                <div className='flex flex-col gap-3 w-full'>
                    <h3 className='text-xl font-semibold'>Available Funds</h3>
                    <div className='flex flex-col border border-blue-600 rounded-lg p-5 gap-5'>
                        <div>
                            <h5 className='text-lg'>Balance available for use:</h5>
                            <p className='text-5xl font-bold text-blue-600'>NPR {"400.00"}</p>
                            <p>Withdrawn till the date: <span className='font-semibold'>NPR {"348.00"}</span></p>
                        </div>
                        <div>
                            <button onClick={null} className='bg-blue-600 w-48 rounded-lg text-white p-4'>Withdraw Balance</button>
                            <Link href="#">
                                <p className='text-lg underline'>Manage payout methods</p>
                            </Link>
                        </div>

                    </div>

                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <h3 className='text-xl font-semibold'>Future payments</h3>
                    <div className='flex flex-col border border-blue-600 rounded-lg p-5 gap-5'>
                        <div>
                            <h5 className='text-lg'>Payments being cleared:</h5>
                            <p className='text-5xl font-bold text-blue-600'>NPR {"500.00"}</p>
                            <p>1 payment</p>
                        </div>
                        <hr className='bg-gray-300 h-0.5' />
                        <div>
                            <h5 className='text-lg'>Payments being cleared:</h5>
                            <p className='text-2xl font-bold text-blue-600'>NPR {"500.00"}</p>
                        </div>
                    </div>

                </div>

            </div>
            <h1 className='text-xl font-semibold py-10'>Earning History</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-md text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Activity
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-4">
                                From
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Order
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white hover:bg-blue-50">
                            <th className="px-6 py-4">
                                5/5/2023
                            </th>
                            <td className="px-6 py-4">
                                Clearing
                            </td>
                            <td className="px-6 py-4">
                                Order will clear in 12 days
                            </td>
                            <td className="px-6 py-4">
                                anantamishra
                            </td>
                            <td className="px-6 py-4">
                                FO510B850D1C1
                            </td>
                            <td className="px-6 py-4">
                                NPR. {"500.00"}
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50">
                            <th className="px-6 py-4">
                                5/5/2023
                            </th>
                            <td className="px-6 py-4">
                                Clearing
                            </td>
                            <td className="px-6 py-4">
                                Order will clear in 12 days
                            </td>
                            <td className="px-6 py-4">
                                anantamishra
                            </td>
                            <td className="px-6 py-4">
                                FO510B850D1C1
                            </td>
                            <td className="px-6 py-4">
                                NPR. {"500.00"}
                            </td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-50">
                            <th className="px-6 py-4">
                                5/5/2023
                            </th>
                            <td className="px-6 py-4">
                                Clearing
                            </td>
                            <td className="px-6 py-4">
                                Order will clear in 12 days
                            </td>
                            <td className="px-6 py-4">
                                anantamishra
                            </td>
                            <td className="px-6 py-4">
                                FO510B850D1C1
                            </td>
                            <td className="px-6 py-4">
                                NPR. {"500.00"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div >
    )
}
