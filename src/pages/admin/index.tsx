import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';


export default function index() {
    const router = useRouter();
    const { data: session } = useSession();
    console.log(session);
    if (typeof window === "undefined") return null;

    if (session) {
        if (session.user["role"] = "admin") {
            router.replace("../admin/dashboard");
        }
        else {
            router.replace("/");
        }
    }
    else {
        router.replace("/login");
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