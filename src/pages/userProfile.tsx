
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function UserProfile() {
    const { data: session } = useSession()
    const router = useRouter()

    if (typeof window === "undefined") return null

    if (!session) {
        router.replace("/login")
    }
    else
        return (
            <p>
                <div>
                    This is not correct and should never be done because the p tag has been
                    abused
                </div>
            </p>
        );
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