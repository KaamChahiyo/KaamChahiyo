import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

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
      temporaryAddress: "",
      permananetAddress: "",
      phoneNumber: "",
      bio: "",
    },
  });

  useEffect(() => {
<<<<<<< HEAD
    fetch(`/api/users/${session.user["id"]}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setValue("email", data.email);
        setValue("name", data.name);
        setValue("dob", data?.dob?.substring(0, 10));
        setValue("permananetAddress", data.permananetAddress);
        setValue("temporaryAddress", data.temporaryAddress);
        setValue("phoneNumber", data.phoneNumber);
        setValue("bio", data.bio);
        setUserId(data.id);
        setUserRole(data.role);
        setUserImage(data.image);
        setUserName(data.name);
      });
  }, [session.user, setValue]);
=======
    try {
      fetch(`/api/users/${session.user["id"]}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setValue("email", data.email);
          setValue("name", data.name);
          setValue("dob", data?.dob?.substring(0, 10));
          setValue("permananetAddress", data.permananetAddress);
          setValue("temporaryAddress", data.temporaryAddress);
          setValue("phoneNumber", data.phoneNumber);
          setValue("bio", data.bio);
          setUserId(data.id);
          setUserRole(data.role);
          setUserImage(data.image);
          setUserName(data.name);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
>>>>>>> deepak-main

  async function onSubmit(data, e) {
    try {
      await fetch(`/api/users/${session.user["id"]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ ...data, dob: new Date(data.dob) }),
      });
    } catch (error) {
      console.log(error);
    }
    router.reload();
  }

  const onClickBtn = async (id: string, role: string) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ role: role }),
      });
    } catch (error) {
      null;
    }
  };

  return (
    <div>
      <div className="p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl"
        >
          <div className="flex flex-col gap-3">
            <p className="font-bold text-4xl text-center p-4">
              Update your profile
            </p>
          </div>
          <div className="flex justify-between ">
            {userImage && (
              <div className="w-20 h-20">
                <Image
                  src={userImage}
                  alt={userName}
                  width={100}
                  height={100}
                  quality={100}
                />
              </div>
            )}
            <div className="flex flex-col gap-5">
              <div className="flex rounded-full bg-blue-200 text-blue-600 text-normal text-center justify-center uppercase font-bold py-1 px-3">
                Role: {userRole}
              </div>
              {userRole == "employee" ? (
                <button
                  className="flex rounded-full bg-blue-600 text-white text-md font-medium px-3 py-1 sm:w-full border-2 border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer"
                  onClick={() => onClickBtn(userId, "employer")}
                >
                  Switch to Employer
                </button>
              ) : userRole == "employer" ? (
                <button
                  className="flex rounded-full bg-blue-600 text-white text-md font-medium px-3 py-1 sm:w-full border-2 border-blue-600 hover:bg-white hover:text-blue-600 cursor-pointer"
                  onClick={() => onClickBtn(userId, "employee")}
                >
                  Switch to Employee
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Name:</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Email:</label>
            <input
              type="text"
              {...register("email")}
              placeholder="Email"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Phone:</label>
            <input
              type="number"
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>DOB:</label>
            <input
              type="date"
              {...register("dob")}
              placeholder="e.g. 1999-01-01"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Permanent Address:</label>
            <input
              type="text"
              {...register("permananetAddress")}
              placeholder="Permanent Address"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Temporary Address:</label>
            <input
              type="text"
              {...register("temporaryAddress")}
              placeholder="Temporary Address"
              className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1 text-gray-500">
            <label>Bio:</label>
            <textarea
              {...register("bio")}
              placeholder="Bio"
              rows={3}
              className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
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
  );
}
