import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import sha256 from "crypto-js/sha256";

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

export default function Security() {
  const { data: session } = useSession();

  const {
    handleSubmit: handleSecurity,
    register: registerSecurity,
    setValue: setSecurity,
    setError: setSecurityError,
    getValues: getSecurity,
    clearErrors: clearSecurityErrors,
    formState: { isSubmitting: isSecuritySubmitting, errors: securityErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      typedCurrentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("HERE", data);
        setSecurity("currentPassword", data?.password);
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
      console.log(error);
    }
  }

  async function onSecuritySubmit(data, e) {
    console.log("SECURITY SUBMIT", data);
    try {
      console.log(data);
      await fetch(`/api/users/${session.user["id"]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ password: data?.newPassword }),
      });
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
  }, []);

  return (
    <div>
      <div className="p-10">
        <form onSubmit={handleSecurity(onSecuritySubmit)}>
          <div className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[672px]">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-4xl text-center p-4">
                Change your password
              </p>
            </div>

            <div className="flex flex-col gap-1 text-gray-500">
              <label>Current Password:</label>
              <h1>asd:{getSecurity("currentPassword")}</h1>
              <input
                type="password"
                placeholder="Enter current Password"
                {...registerSecurity("typedCurrentPassword", {
                  onChange: (e) => {
                    if (
                      hashPassword(e.target.value) !=
                      getSecurity("currentPassword")
                    ) {
                      setSecurityError("typedCurrentPassword", {
                        message: "CurrentPassord doesn't match",
                      });
                    } else clearSecurityErrors("typedCurrentPassword");
                  },
                })}
                className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
              />
              {/* TODO: Create a error Message component */}
              {securityErrors.typedCurrentPassword && (
                <h1>{securityErrors.typedCurrentPassword.message}</h1>
              )}
            </div>
            <div className="flex flex-col gap-1 text-gray-500">
              <label>New password:</label>
              <input
                type="password"
                placeholder="Type new password"
                {...registerSecurity("newPassword", {
                  onChange: (e) => {
                    if (e.target.value != getSecurity("confirmPassword")) {
                      setSecurityError("newPassword", {
                        message:
                          "New Password and Confirm Password didn't match",
                      });
                      setSecurityError("confirmPassword", {
                        message:
                          "New Password and Confirm Password didn't match",
                      });
                    } else {
                      clearSecurityErrors("newPassword");
                      clearSecurityErrors("confirmPassword");
                    }
                  },
                })}
                className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1 text-gray-500">
              <label>Retype new password:</label>
              <input
                type="password"
                {...registerSecurity("confirmPassword", {
                  onChange: (e) => {
                    if (e.target.value != getSecurity("newPassword")) {
                      setSecurityError("newPassword", {
                        message:
                          "New Password and Confirm Password didn't match",
                      });
                      setSecurityError("confirmPassword", {
                        message:
                          "New Password and Confirm Password didn't match",
                      });
                    } else {
                      clearSecurityErrors("newPassword");
                      clearSecurityErrors("confirmPassword");
                    }
                  },
                })}
                placeholder="Re-type password"
                className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
              />
            </div>

            {/* TODO: Create a error Message component */}
            {securityErrors.newPassword && (
              <h1>{securityErrors.newPassword.message}</h1>
            )}

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
    </div>
  );
}
