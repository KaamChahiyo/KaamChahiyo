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
  console.log(session);
  useEffect(() => {
    if (!session) {
      if (session.user["role"] != "superAdmin") {
        router.replace("/login");
      }
    }
  }, [session]);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const selectedUser = Users.find((user) => user.id === selectedUserId);

  const [name_, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  useEffect(() => {
    if (selectedUserId) {
      setName(selectedUser.name_);
      setDob(selectedUser.dob);
      setAddress(selectedUser.address);
      setEmail(selectedUser.email);
      setPhoneNo(selectedUser.phoneNo);
      setBloodGroup(selectedUser.bloodGroup);
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
  const changeDob = (e) => {
    setDob(e.target.value);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };
  const changeBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleSave = () => {
    // Save the changes to the backend or update the local state with the new values
    setEditMode(false);
  };
  return (
    <div className="flex justify-center gap-10">
      <div className="flex flex-col items-center ">
        <div className="font-semibold text-lg p-3 ">Users List</div>
        <div className="flex flex-col gap-1 hover:cursor-pointer text-lg p-3">
          {Users.map((user) => {
            return (
              <div key={user.id}>
                <div
                  className="flex gap-3 p-4"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setEditMode(false);
                  }}
                >
                  <div className="h-12 w-12 relative">
                    <Image src={user.avatarURL} alt={user.name_} fill />
                  </div>
                  <div className="hidden">{user.id}</div>
                  <div>{user.name_}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="font-semibold text-lg p-3 ">User Details</div>
        <div className="flex flex-col gap-1 text-lg ">
          {selectedUser ? (
            <div key={selectedUser.id}>
              <div className="flex flex-col gap-2 p-7">
                <div className="relative h-20 w-20">
                  <Image
                    src={selectedUser.avatarURL}
                    alt={selectedUser.name_}
                    fill
                  />
                </div>
                <div className="font-normal text-sm">{selectedUser.name_}</div>
                <div className="flex gap-1">
                  <p className="">Name: </p>

                  <input
                    type="text"
                    value={name_}
                    onChange={changeName}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <p>Date of Birth:</p>

                  <input
                    type="text"
                    value={dob}
                    onChange={changeDob}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <p>Address: </p>

                  <input
                    type="text"
                    value={address}
                    onChange={changeAddress}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <p>Email: </p>

                  <input
                    type="email"
                    value={email}
                    onChange={changeEmail}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <p>Phone: </p>

                  <input
                    type="tel"
                    value={phoneNo}
                    onChange={changePhoneNo}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
                    }
                  />
                </div>
                <div className="flex gap-1">
                  <p>Blood Group: </p>

                  <input
                    type="bloodGrp"
                    value={bloodGroup}
                    onChange={changeBloodGroup}
                    readOnly={editMode ? false : true}
                    className={
                      editMode
                        ? "focus:outline-none focus:border-orange-600 border-2"
                        : "focus:outline-none"
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
            <div className="text-center">
              Click the user to show their details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}

const Users = [
  {
    id: "1",
    avatarURL: "/assets/img/profile-image.png",
    name_: "Ram Binaya Bupta",
    dob: "2045/05/15",
    address: "Bharatpur",
    email: "ram@ram.com",
    phoneNo: "9876553210",
    bloodGroup: "O+ve",
  },
  {
    id: "2",
    avatarURL: "/assets/img/profile-image.png",
    name_: "Samrat Pandey",
    dob: "2045/05/15",
    address: "Bhaktapur",
    email: "sam@sam.com",
    phoneNo: "9876443210",
    bloodGroup: "A+ve",
  },
  {
    id: "3",
    avatarURL: "/assets/img/profile-image.png",
    name_: "Era Maharjan",
    dob: "2045/05/15",
    address: "Gaidakot",
    email: "era@era.com",
    phoneNo: "9876643210",
    bloodGroup: "B+ve",
  },
  {
    id: "4",
    avatarURL: "/assets/img/profile-image.png",
    name_: "Laxman Mahato",
    dob: "2045/05/15",
    address: "Lalitpur",
    email: "lax@lax.com",
    phoneNo: "9876533210",
    bloodGroup: "AB+ve",
  },
];
