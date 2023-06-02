import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { authOptions } from './api/auth/[...nextauth]';

const LoadBalance = () => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) {
            router.replace(`/login`);
        } else {
            const userId = session.user["id"];
            setUserId(userId);
        }
    }, [session, router]);

    const [userId, setUserId] = useState("");
    const [balance, setBalance] = useState("");
    const {
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            balance: "",
        },
    });

    useEffect(() => {
        fetch(`/api/users/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserId(data.id);
                setBalance(data.balance);
            });
    }, [setValue]);

    async function onSubmit(data, e) {
        try {
            await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({ ...data, balance: parseFloat(balance) + parseFloat(data.balance) }),
            });
        } catch (error) {
            console.log(error);
        }
        router.push("/user-profile");
    }


    return (
        <div className="flex justify-center items-center my-36">
            < div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] " >
                <form
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className=" flex flex-col gap-5 ">
                        <div className="flex flex-col gap-1 text-gray-500">
                            <label>Enter Amout to Load:</label>
                            <input
                                type="number"
                                {...register("balance")}
                                placeholder="Name"
                                className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-4 border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold w-full focus:outline-none focus:shadow-outline"
                        >
                            {isSubmitting ? <>Loading Balance</> : <>Load Balance</>}
                        </button>
                    </div>
                </form>
            </ div>
        </div>
    )
}

export default LoadBalance

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(context.req, context.res, authOptions),
        },
    };
}
