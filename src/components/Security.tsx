import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
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
    formState: { errors: securityErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      typedCurrentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${session.user["id"]}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("HERE", !data?.password);
        !data?.password
          ? setIsDisabled(true)
          : setSecurity("currentPassword", data?.password);
      });
  }, []);

  async function onSecuritySubmit(data, e) {
    // console.log("Button Clicked");
    try {
      //   console.log("SECURITY SUBMIT", data);
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
              <h1>111: {getSecurity("currentPassword")}</h1>
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
                        message: "Current Passord doesn't match",
                      });
                      setIsDisabled(true);
                    } else {
                      clearSecurityErrors("typedCurrentPassword"),
                        setIsDisabled(false);
                    }
                  },
                })}
                className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
              />
              {/* TODO: Create a error Message component */}
              {securityErrors.typedCurrentPassword && (
                <div className="flex bg-red-100 px-4 py-2 text-red-500 rounded">
                  {securityErrors.typedCurrentPassword.message}
                </div>
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
                      setIsDisabled(true);
                    } else {
                      clearSecurityErrors("newPassword");
                      clearSecurityErrors("confirmPassword");
                      setIsDisabled(false);
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
                      setIsDisabled(true);
                    } else {
                      clearSecurityErrors("newPassword");
                      clearSecurityErrors("confirmPassword");
                      setIsDisabled(false);
                    }
                  },
                })}
                placeholder="Re-type password"
                className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
              />
            </div>

            {/* TODO: Create a error Message component */}
            {securityErrors.newPassword && (
              <div className="flex bg-red-100 px-4 py-2 text-red-500 rounded">
                {securityErrors.newPassword.message}
              </div>
            )}

            <div className="flex gap-5 flex-col">
              <div className=" hover:cursor-text">
                <Link passHref href="/forget-password">
                  Forgot Password?
                </Link>
              </div>
              {/*TODO:  Disable button in case of error :: extend component to accept disabled prop  */}

              <Button value="Update" disabled={isDisabled}></Button>
            </div>
          </div>
        </form >
      </div >
    </div >
  );
}
