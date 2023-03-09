import { SHA256 } from "crypto-js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace(`/test/`);
    } else {
      const userId = session.user["id"];
      // console.log("userId: " + userId);
      setId(userId);
    }
  }, [session]);
  const [id, setId] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({});

  const verifyPassword = getValues("typeCurrentPassword");
  // const newPassword = getValues("newPassword");
  // const confirmPassword = getValues("confirmNewPassword");

  const [getCurrentPassword, setGetCurrentPassword] = useState("");
  let [postNewPassword, setPostNewPassword] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setGetCurrentPassword(data?.user?.password);
        setValue(postNewPassword, data?.user?.password);
      });
  }, []);

  async function onSubmit(data) {
    try {
      const typedPassword = SHA256(verifyPassword).toString();
      console.log(getCurrentPassword);
      if (getCurrentPassword === typedPassword) {
        if (newPassword === confirmNewPassword) {
          {
            setPostNewPassword(SHA256(confirmNewPassword).toString());
            await fetch(`/api/users/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({ ...data }),
            });
            console.log(
              "Password Verified sucessfully , please enter new password"
            );
          }
        } else {
          console.log("input password not match");
        }
      } else {
        console.log("Password is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[672px]"
      >
        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl text-center p-4">
            Change your password
          </p>
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>Current Password:</label>
          <input
            type="password"
            placeholder="Enter current Password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
            {...register("typeCurrentPassword")}
          />
          {errors.typeCurrentPassword && (
            <p className="text-red-500">Current password is required</p>
          )}
          {errors.typeCurrentPassword && (
            <p className="text-red-500">Password is incorrect</p>
          )}
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>New password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            // {...register("newPassword")}
            // placeholder="Type new password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
          />
          {/* {errors.newPassword && (
            <p className="text-red-500">New password is required</p>
          )} */}
        </div>

        <div className="flex flex-col gap-1 text-gray-500">
          <label>Confirm new password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            // {...register("confirmNewPassword")}
            placeholder="Confirm new password"
            className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
          />
        </div>
        <div className="flex gap-5 flex-col">
          <div className=" hover:cursor-text">
            <Link passHref href="/forget-password">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="px-5 py-4 border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-xl font-bold w-1/3 focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? <>Updating</> : <>Update</>}
          </button>
          {/* <Link passHref href="#">
            <Button value="Update"></Button>
          </Link> */}
        </div>
      </form>
    </div>
  );
}
