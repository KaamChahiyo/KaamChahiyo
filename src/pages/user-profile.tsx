import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { TabSelector } from "../components/TabSelector";
import {
  AppliedJobIcon,
  PasswordIcon,
  PostedJobIcon,
  ProfileIcon,
} from "../icons";

import sha256 from "crypto-js/sha256";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};


export default function Profile() {
  const { data: session } = useSession();

  // const router = useRouter();
  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/login");
  //   }
  // }, [session]);

  const [selectedTab, setSelectedTab] = useTabs([
    "profile-tab",
    "security-tab",
    "posted-job",
    "applied-job",
  ]);

  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const passwordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
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

  const {
    handleSubmit: handleSecurity,
    register: registerSecurity,
    setValue: setSecurity,
    setError:setSecurityError,
    getValues:getSecurity,
    clearErrors:clearSecurityErrors,
    formState: { isSubmitting: isSecuritySubmitting, errors: securityErrors },
  } = useForm({
    defaultValues: {
      currentPassword:'',
      typedCurrentPassword:'',
      newPassword:'',
      confirmPassword:''
    },
  });


  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("HERE",data)
        setSecurity("currentPassword", data?.password);
        setValue("email", data.email);
        setValue("name", data.name);
        setValue("dob", data?.dob?.substring(0, 10));
        setValue("permananetAddress", data.permananetAddress);
        setValue("temporaryAddress", data.temporaryAddress);
        setValue("phoneNumber", data.phoneNumber);
        setValue("bio", data.bio);
        setUserImage(data.image);
        setUserName(data.name);
      });
  }, []);

  // useEffect(() => {
  //   const newUserId = session.user["id"];
  //   setValue("name", newUser.name);
  //   setValue("bio", selected_user.bio);
  //   setValue("dob", selected_user.dob.substring(0, 10));
  //   setValue("email", selected_user.email);
  //   setValue("temporaryAddress", selected_user.temporaryAddress);
  //   setValue("permananetAddress", selected_user.permananetAddress);
  //   setValue("phoneNumber", selected_user.phoneNumber);
  //   setSelectedUser(selected_user);
  //   setRole(selected_user.role);
  //   setStatus(selected_user.status);
  // }, []);

  async function onSubmit(data, e) {
    try {
      console.log(data);
      await fetch(`/api/users/${session.user["id"]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ ...data, dob: new Date(data.dob) }),
      });
    } catch (error) {
      null;
    }
  }

  async function onSecuritySubmit(data, e) {

    console.log("SECURITY SUBMIT",data)
    try {
      console.log(data);
      await fetch(`/api/users/${session.user["id"]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body:JSON.stringify({"password":data?.newPassword})});
    } catch (error) {
      null;
    }
  }


  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.jobs);
        setJobs(data.jobs);
        // data.jobs.postedBy.id;
      });
  },[]);


  return (
    <div className="container mt-20 flex flex-col gap-12 z-10">
      <div className="container flex lg:flex-row flex-col-reverse">
        <div className="flex flex-row lg:flex-col w-1/4 gap-3 m-10">
          <TabSelector
            isActive={selectedTab === "profile-tab"}
            onClick={() => setSelectedTab("profile-tab")}
          >
            <div className="hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14 text-red rounded-full">
              <div className=" w-6 text-white">{ProfileIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Profile
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "security-tab"}
            onClick={() => setSelectedTab("security-tab")}
          >
            <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
              <div className=" w-6 text-white">{PasswordIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Security
            </div>
          </TabSelector>
          {/* applied job for both employer and employee */}
          <TabSelector
            isActive={selectedTab === "applied-job"}
            onClick={() => setSelectedTab("applied-job")}
          >
            <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
              <div className=" w-6 text-white">{AppliedJobIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Applied Job
            </div>
          </TabSelector>
          {/* posted Job only for employer */}
          {session?.user?.["role"] === "employer" && (
            <TabSelector
              isActive={selectedTab === "posted-job"}
              onClick={() => setSelectedTab("posted-job")}
            >
              <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
                <div className=" w-6 text-white">{PostedJobIcon}</div>
              </div>
              <div className="font-medium text-lg lg:text-2xl flex items-center">
                Posted Job
              </div>
            </TabSelector>
          )}
        </div>
        <div className="w-3/4 ">
          <TabPanel hidden={selectedTab !== "profile-tab"}>
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
                <div className="flex flex-col">
                  {userImage && <div className="w-20 h-20">
                    <Image
                      src={userImage}
                      alt={userName}
                      width={100}
                      height={100}
                      quality={100}
                    />
                  </div>}
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
                    placeholder="981234567"
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>DOB:</label>
                  <input
                    type="dob"
                    {...register("dob")}
                    placeholder="e.g. 1999-01-01"
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Permanent Address:</label>
                  <input
                    type="address"
                    {...register("permananetAddress")}
                    placeholder="Buddha-Chowk, Bharatpur-7"
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Temporary Address:</label>
                  <input
                    type="address"
                    {...register("temporaryAddress")}
                    placeholder="Buddha-Chowk, Bharatpur-7"
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Bio:</label>
                  <textarea
                    {...register("bio")}
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
          </TabPanel>
          <TabPanel hidden={selectedTab !== "security-tab"}>
            <div className="p-10">
            <form
                onSubmit={handleSecurity(onSecuritySubmit)}
                className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl"
              >
              <div className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[672px]">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-4xl text-center p-4">
                    Change your password
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Current Password:</label>
                  <h1>asd:{getSecurity('currentPassword')}</h1>
                  <input
                    type="password"
                    placeholder="Enter current Password"
                    {...registerSecurity('typedCurrentPassword',{
                      onChange:(e)=>{
                         if(hashPassword(e.target.value)!=getSecurity('currentPassword'))
                      {setSecurityError("typedCurrentPassword",{message:"CurrentPassord doesn't match"})}
                      else
                      clearSecurityErrors('typedCurrentPassword')
                      }})}
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                  {/* TODO: Create a error Message component */}
                  {securityErrors.typedCurrentPassword && <h1>{securityErrors.typedCurrentPassword.message}</h1>}
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>New password:</label>
                  <input
                    type="password"
                    placeholder="Type new password"
                    {...registerSecurity('newPassword',{
                      onChange:(e)=>{
                        if(e.target.value!=getSecurity('confirmPassword'))
                        {
                          setSecurityError("newPassword",{message:"New Password and Confirm Password didn't match"})
                          setSecurityError("confirmPassword",{message:"New Password and Confirm Password didn't match"})
                        }
                        else
                        {
                          clearSecurityErrors('newPassword')
                          clearSecurityErrors('confirmPassword')
                        }

                      }
                    })}
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Retype new password:</label>
                  <input
                    type="password"
                    {...registerSecurity('confirmPassword',{
                      onChange:(e)=>{
                        if(e.target.value!=getSecurity('newPassword'))
                        {
                          setSecurityError("newPassword",{message:"New Password and Confirm Password didn't match"})
                          setSecurityError("confirmPassword",{message:"New Password and Confirm Password didn't match"})
                        }
                        else
                        {
                          clearSecurityErrors('newPassword')
                          clearSecurityErrors('confirmPassword')
                        }

                      }
                    })}
                    placeholder="Re-type password"
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                </div>

                    {/* TODO: Create a error Message component */}
                    {securityErrors.newPassword && <h1>{securityErrors.newPassword.message}</h1>}


                <div className="flex gap-5 flex-col">
                  <div className=" hover:cursor-text">
                    <Link passHref href="/forget-password">
                      Forgot Password?
                    </Link>
                  </div>
                  {/*TODO:  Disable button in case of error :: extend component to accept disabled prop  */}
    
                    <Button value="Update"></Button>
                        </div>
              </div>
              </form>
            </div>
          </TabPanel>

          <TabPanel hidden={selectedTab !== "applied-job"}>
            <div className="text-4xl font-bold text-center m-20">
              Jobs you Applied
            </div>
            {jobs
              ?.filter((job) => job.assignedTo?.id === session.user?.["id"])
              .map((job) => (
                <div key={job?.id} className="p-1">
                  {/* {JSON.stringify(job)} */}
                  <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                    <div className="font-bold text-xl p-2">{job?.title}</div>
                    <div className="flex gap-4 italic p-3 m-auto items-center">
                      {job?.postedBy?.image && <div>
                        {/* {user?.["id"]} */}
                        <Image
                          src={job?.postedBy?.image}
                          alt={job?.postedBy?.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>}
                      <div>{job?.postedBy?.name}</div>
                      <div className="bg-blue-50 rounded-full px-3 ">
                        {formatDistance(new Date(job.postedOn), new Date(), {
                          addSuffix: true,
                        })}
                      </div>
                      <div className="bg-blue-50 rounded-full px-3 ">
                        {job.Category.displayName}
                      </div>
                    </div>
                    <div className="jobDetail text-lg px-3 w-full">
                      {job.description}
                    </div>
                    <div className="flex flex-col gap-3 pt-5">
                      <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                        {job.Location.displayName}
                      </div>
                      <Button value="Cancel" onClick={null} />
                    </div>
                  </div>
                </div>
              ))}
          </TabPanel>

          {session?.user?.["role"] === "employer" && (
            <TabPanel hidden={selectedTab !== "posted-job"}>
              <div className="text-4xl font-bold text-center m-20">
                Jobs you Posted
              </div>
              {jobs
                ?.filter((job) => job.postedBy?.id === session.user?.["id"])
                .map((job) => (
                  <div className="flex justify-center items-center">
                    <div key={job.id} className="w-full p-1">
                      {JSON.stringify(job)}
                      <div className=" shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                        <div className="font-bold text-xl p-2">{job.title}</div>
                        <div className="flex gap-4 italic p-3 m-auto items-center">
                          {job?.postedBy?.image && <div>
                            <Image
                              src={job?.postedBy?.image}
                              alt={job?.postedBy?.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          </div>
}
                          <div>{job.postedBy.name}</div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}{" "}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.status}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pl-3">
                          <div className="flex pt-5">
                            <span className="font-semibold">Price:</span> &#160;
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          <Button value="Delete" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  );
}
