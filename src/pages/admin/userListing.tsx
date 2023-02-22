import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (selectedUserId) {
      setName(selectedUser.name);
      setDob(selectedUser.dob);
      setEmail(selectedUser.email);
      setBio(selectedUser.bio);
      setRole(selectedUser.role);
      setStatus(selectedUser.status);
    }
  }, [selectedUserId]);

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  // previousSeelectedUser !== selectedUserId ? setEditMode(false) : "";
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeRole = (e) => {
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
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSave = () => {
    // Save the changes to the backend or update the local state with the new values
    setEditMode(false);
  };
  return (
    <div className="flex justify-center gap-5">
      <div className="flex flex-col items-center ">
        <div className="font-semibold text-lg p-3 ">USERS LIST</div>
        <div className="flex flex-col overflow-auto gap-3 hover:cursor-pointer text-lg h-4/5">
          {users?.map((user) => {
            return (
              <div key={user.id}>
                {/* {JSON.stringify(user)} */}
                <div
                  className="flex flex-wrap gap-3 p-3 hover:bg-blue-500 text-gray-800 hover:text-white"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setEditMode(false);
                  }}
                >
                  <div className="h-12 w-12 relative rounded-full overflow-hidden">
                    <Image src={user.image} alt={user.name} fill />
                  </div>
                  {/* <div className="hidden">{user.id}</div> */}
                  <div className="">{user.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-semibold text-lg p-3 ">USER DETAILS</div>
        <div className="flex flex-col gap-1 text-lg ">
          {selectedUser ? (
            <div key={selectedUser.id}>
              <div className="flex flex-col gap-2 p-3 w-full">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image
                    src={selectedUser.image}
                    alt={selectedUser.name_}
                    fill
                  />
                </div>
                <div className="font-normal text-sm">{selectedUser.name_}</div>
                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="NAME: " />

                  <input
                    type="text"
                    value={name_}
                    onChange={changeName}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="STATUS: " />

                  <input
                    type="text"
                    value={status}
                    onChange={changeStatus}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="ROLE: " />

                  <input
                    type="text"
                    value={role}
                    onChange={changeRole}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="DATE OF BIRTH: " />

                  <input
                    type="text"
                    value={dob}
                    onChange={changeDob}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="E-MAIL: " />

                  <input
                    type="email"
                    value={email}
                    onChange={changeEmail}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="ADDRESS: " />

                  <input
                    type="address"
                    value={address}
                    onChange={changeAddress}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="PHONE: " />

                  <input
                    type="number"
                    value={phone}
                    onChange={changePhone}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96"
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <SubHeading subTitle="BIO: " />

                  <textarea
                    rows={7}
                    value={bio}
                    onChange={changeBio}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2 p-2 sm:w-96"
                        : "focus:outline-none text-gray-600 sm:w-96 "
                    }
                  />
                </div>

                <div className="flex gap-10">
                  <Button
                    value={editMode ? "Cancel" : "Edit"}
                    onClick={toggleEditMode}
                  ></Button>
                  {editMode ? (
                    <Button value="Update" onClick={handleSave}></Button>
                  ) : (
                    ""
                  )}
                </div>
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

const SubHeading = (props: any) => {
  return <div className="">{props.subTitle}</div>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
