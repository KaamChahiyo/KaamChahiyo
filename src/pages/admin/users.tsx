import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function userListing() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      if (session.user["role"] != "superAdmin") {
        router.replace("/login");
      }
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

  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const [name_, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [permAddress, setPermAddress] = useState("");
  const [tempAddress, setTempAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedUserId) {
      setName(selectedUser.name);
      setDob(selectedUser.dob.substring(0, 10));
      setEmail(selectedUser.email);
      setBio(selectedUser.bio);
      setRole(selectedUser.role);
      setStatus(selectedUser.status);
      setPermAddress(selectedUser.permananetAddress);
      setTempAddress(selectedUser.temporaryAddress);
      setPhone(selectedUser.phoneNumber);
    }
  }, [selectedUserId]);

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeDob = (e) => {
    setDob(e.target.value);
  };
  const changeBio = (e) => {
    setBio(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePermAddress = (e) => {
    setPermAddress(e.target.value);
  };
  const changeTempAddress = (e) => {
    setTempAddress(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };


  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm();


  async function onSubmit(values) {
    try {
      const body = { ...values };
      await fetch("/api/users/${userid}"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: Object.entries(body)
          .map((e) => e.join("="))
          .join("&"),
      }
    }
    catch (error) {
      null
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
                    setEditMode(false);
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
          {selectedUser ? (
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" >
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="NAME: " />

                    <input
                      type="text"
                      {...register("name")}
                      value={name_}
                      onChange={changeName}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 p-2 border-gray-200 text-gray-600"
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="DATE OF BIRTH: " />

                    <input
                      type="text"
                      {...register("dob")}
                      value={dob}
                      onChange={changeDob}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2"
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="E-MAIL: " />

                    <input
                      type="email"
                      {...register("email")}
                      value={email}
                      onChange={changeEmail}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="Permanent Address: " />

                    <input
                      type="address"
                      {...register("permananetAddress")}
                      value={permAddress}
                      onChange={changePermAddress}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="Temporary Address: " />

                    <input
                      type="address"
                      {...register("temporaryAddress")}
                      value={tempAddress}
                      onChange={changeTempAddress}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="PHONE: " />

                    <input
                      type="number"
                      {...register("phoneNumber")}
                      value={phone}
                      onChange={changePhone}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600 "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <SubHeading subTitle="BIO: " />

                    <textarea
                      {...register("bio")}
                      rows={5}
                      value={bio}
                      onChange={changeBio}

                      className={
                        editMode
                          ? "focus:outline-none focus:border-orange-600 border-2 p-2 "
                          : "focus:outline-none border-2 border-gray-200 p-2 text-gray-600  "
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
          ) : (
            <div className="text-center ">
              Click the user to show their details
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
