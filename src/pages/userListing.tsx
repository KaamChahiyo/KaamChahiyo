import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/Button";

export default function userListing() {
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const selectedUser = Users.find((user) => user.id === selectedUserId);
  console.log("id: ", selectedUserId);
  console.log("user: ", selectedUser);

  const [name_, setName] = useState("");
  const changeName = (e) => {
    setName(e.target.value);
  };
  const [dob, setDob] = useState("");
  const changeDob = (e) => {
    setDob(e.target.value);
  };
  const [address, setAddress] = useState("");
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const [email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const [phoneNo, setPhoneNo] = useState("");
  const changePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };
  const [bloodGroup, setBloodGroup] = useState("");
  const changeBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setName(selectedUser.name_);
    setDob(selectedUser.dob);
    setAddress(selectedUser.address);
    setEmail(selectedUser.email);
    setPhoneNo(selectedUser.phoneNo);
    setBloodGroup(selectedUser.bloodGroup);
  };
  const handleSave = () => {
    // Save the changes to the backend or update the local state with the new values
    setEditMode(false);
  };
  return (
    <div className="flex">
      <div className="w-1/3 flex flex-col items-center">
        <div>Users List</div>
        <div className="flex flex-col gap-1 hover:cursor-pointer">
          {Users.map((user) => {
            return (
              <div key={user.id}>
                <div
                  className="flex gap-3 bg-lime-200 p-4"
                  onClick={() => setSelectedUserId(user.id)}
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
      <div className="w-2/3 flex flex-col items-center">
        <div>User Details</div>
        <div className="flex flex-col gap-1">
          {selectedUser ? (
            <div key={selectedUser.id}>
              <div className="flex flex-col gap-2 text-xl font-medium p-7">
                <div className="relative h-20 w-20">
                  <Image
                    src={selectedUser.avatarURL}
                    alt={selectedUser.name_}
                    fill
                  />
                </div>
                <div className="font-normal text-sm">{selectedUser.name_}</div>
                <div className="flex gap-1">
                  <p>Name: </p>

                  <input type="text" value={name_} onChange={changeName} />
                </div>
                <div className="flex gap-1">
                  <p>Date of Birth:</p>

                  <input type="text" value={dob} onChange={changeDob} />
                </div>
                <div className="flex gap-1">
                  <p>Address: </p>

                  <input type="text" value={address} onChange={changeAddress} />
                </div>
                <div className="flex gap-1">
                  <p>Email: </p>

                  <input type="email" value={email} onChange={changeEmail} />
                </div>
                <div className="flex gap-1">
                  <p>Phone: </p>

                  <input type="tel" value={phoneNo} onChange={changePhoneNo} />
                </div>
                <div className="flex gap-1">
                  <p>Blood Group: </p>

                  <input
                    type="bloodGrp"
                    value={bloodGroup}
                    onChange={changeBloodGroup}
                  />
                </div>
                <Button
                  value={editMode ? "Cancel" : "Edit"}
                  onClick={toggleEditMode}
                ></Button>
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
