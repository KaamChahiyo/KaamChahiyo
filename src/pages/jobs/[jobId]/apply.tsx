import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";

export default function apply() {
  const [userEmail, setUserEmail] = useState("");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setUserName(data.name);
      });
  }, []);

  // useEffect(() => {
  //   fetch("/api/userProfile", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserEmail(data.email);
  //       setUserName(data.name);
  //     });
  // }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-36 mb-20">
        <div className="flex flex-col w-1/3 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
          <form>
            <div className=" flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <p className=" font-bold text-4xl text-center ">
                  Apply For a Job
                </p>
                <p className=" text-gray-400 text-center text-md ">
                  Enter your Details here
                </p>
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Your Name
                  </label>
                  <input
                    type="text"
                    readOnly={true}
                    value={userName}
                    placeholder="userName"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Your Email
                  </label>
                  <input
                    type="text"
                    readOnly={true}
                    value={userEmail}
                    placeholder="userEmail"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Local Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Local Address"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <Link href="#" className="pt-2">
                  <Button value="Apply For Job" onClick={null}></Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
