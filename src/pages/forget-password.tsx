import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function ForgetPassword() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <>
      <div className="flex justify-center items-center my-36">
        <div className="flex flex-col w-1/4 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
          <form>
            <div className=" flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <p className=" font-bold text-4xl text-center ">
                  {" "}
                  Reset Password
                </p>
                <p className=" text-gray-400 text-center text-md ">
                  Enter your email to reset your password
                </p>
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-9 py-4 bg-teal-900 hover:bg-oteal-900 rounded-lg text-white text-xl font-bold sm:w-full focus:outline-none focus:shadow-outline"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
