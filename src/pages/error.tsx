import Link from 'next/link'

export default function ErrorPage() {
    return (


        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">Error!</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something went wrong</p>
                    <p className="mb-4 text-lg font-light text-gray-500">Error detected while browsing the Application.</p>
                    <Link href="/" className="inline-flex text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-4 text-center my-4">Back to Homepage</Link>
                </div>
            </div>
        </section>
        // <>
        //     <div className="flex justify-center items-center my-36">
        //         <div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
        //             <form >
        //                 <div className=" flex flex-col gap-5 ">
        //                     <div className='flex flex-col gap-3'>
        //                         <p className=" font-bold text-4xl text-center "> Error!</p>
        //                         <p className=" text-gray-400 text-center text-md ">Error detected while browsing the Application.</p>
        //                     </div>
        //                     <div>
        //                         <p className="text-teal-900 font-bold text-sm text-center">
        //                             <Link passHref href="/">Return Back to Home</Link>
        //                         </p>
        //                     </div>
        //                 </div>
        //             </form>

        //         </div>
        //     </div >
        // </>
    )
}
