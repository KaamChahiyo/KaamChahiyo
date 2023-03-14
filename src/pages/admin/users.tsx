import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Users() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
    if (session && session.user["role"] != "admin") {
      router.replace("/user-profile");
    }
  }, [session]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.users);
        setUsers(data.users);
      });
  }, []);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      bio: "",
      temporaryAddress: "",
      permananetAddress: "",
      phoneNumber: "",
    },
  });

  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || null);

  const [selectedUser, setSelectedUser] = useState(null);

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selectedUserId) {
      const selected_user = users.find((user) => user.id === selectedUserId);
      setValue("name", selected_user.name);
      setValue("bio", selected_user.bio);
      setValue("dob", selected_user.dob.substring(0, 10));
      setValue("email", selected_user.email);
      setValue("temporaryAddress", selected_user.temporaryAddress);
      setValue("permananetAddress", selected_user.permananetAddress);
      setValue("phoneNumber", selected_user.phoneNumber);
      setSelectedUser(selected_user);
      setRole(selected_user.role);
      setStatus(selected_user.status);
    }
  }, [selectedUserId,users]);

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  async function onSubmit(data, e) {
    try {
      // console.log(data);
      await fetch(`/api/users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ ...data, dob: new Date(data?.dob || "") }),
      });
    } catch (error) {
      null;
    }
  }

  return (
    <div className="flex  gap-5 justify-center pb-5">
      <div className="flex flex-wrap flex-col items-center">
        <div className="font-semibold text-2xl p-3 ">USERS LIST</div>
        <div className="flex flex-col overflow-auto gap-3 hover:cursor-pointer text-lg h-4/5">
          {users?.map((user) => {
            return (
              <div key={user.id}>
                <div
                  className="flex flex-wrap gap-3 p-3 bg-gray-50 hover:bg-blue-200 text-gray-800 hover:text-black"
                  onClick={() => {
                    setSelectedUserId(user.id);
                  }}
                >
                  <div className="h-12 w-12  relative rounded-full overflow-hidden">
                    <Image src={user.image} alt={user.name} fill />
                  </div>
                  <div className="">{user.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center sm:w-1/2 rounded-xl shadow-xl">
        <div className="font-semibold text-3xl p-3 ">USER DETAILS</div>
        <div className="flex flex-col gap-1 text-lg sm:w-9/12">
          {selectedUser && (
            <div key={selectedUser.id}>
              <div className="flex flex-col gap-2 p-3 w-full">
                <div className="flex gap-8">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden">
                    <Image
                      src={selectedUser.image}
                      alt={selectedUser.name_}
                      fill
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-blue-50 rounded-full px-3 w-fit">
                      {status}
                    </div>
                    <div className="bg-blue-50 rounded-full px-3">{role}</div>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="NAME: " />

                    <input
                      type="text"
                      {...register("name")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="DATE OF BIRTH: " />

                    <input
                      type="date"
                      {...register("dob")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="E-MAIL: " />
                    <input
                      type="email"
                      {...register("email")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="Permanent Address: " />

                    <input
                      type="address"
                      {...register("permananetAddress")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="Temporary Address: " />

                    <input
                      type="address"
                      {...register("temporaryAddress")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="PHONE: " />

                    <input
                      type="number"
                      {...register("phoneNumber")}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="BIO: " />

                    <textarea
                      {...register("bio")}
                      rows={5}
                      className={
                        "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-4 border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-xl font-bold w-1/3 focus:outline-none focus:shadow-outline"
                  >
                    {isSubmitting ? <>Updating</> : <>Update</>}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SubHeading = ({ subTitle }) => {
  return <div className="font-semibold">{subTitle}</div>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
