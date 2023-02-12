import Image from "next/image";
import React from "react";

export default function userListing() {
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const selectedUser = Users.find((user) => user.id === selectedUserId);

  return (
    <div className="flex gap-5 justify-center p-5">
      <div className="w-1/3 flex flex-col items-center">
        <div>Users List</div>
        <div className="flex flex-col gap-1 hover:cursor-pointer">
          {Users.map((user) => {
            return (
              <div key={user.id}>
                <Userlist
                  avatarURL={user.avatarURL}
                  id={user.id}
                  name={user.name}
                  handleClick={() => setSelectedUserId(user.id)}
                />
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
              <UserDetails
                avatarURL={selectedUser.avatarURL}
                name={selectedUser.name}
                dob={selectedUser.dob}
                address={selectedUser.address}
                email={selectedUser.email}
                phoneNo={selectedUser.phoneNo}
                bloodGroup={selectedUser.bloodGroup}
              />
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

const Userlist = (props) => {
  return (
    <div className="flex gap-3 bg-lime-200 p-4" onClick={props.handleClick}>
      <div className="h-12 w-12 relative">
        <Image src={props.avatarURL} alt={props.name} fill />
      </div>
      <div className="hidden">{props.id}</div>
      <div>{props.name}</div>
    </div>
  );
};

const UserDetails = (props) => {
  return (
    <div className="flex flex-col gap-2 bg-amber-200 text-xl font-medium p-7">
      <div className="relative h-20 w-20">
        <Image src={props.avatarURL} alt={props.name} fill />
      </div>
      <div className="flex gap-1">
        <p>Name: </p>
        {props.name}
      </div>
      <div className="flex gap-1">
        <p>Date of Birth:</p>
        {props.dob}
      </div>
      <div className="flex gap-1">
        <p>Address: </p>
        {props.address}
      </div>
      <div className="flex gap-1">
        <p>Email: </p>
        {props.email}
      </div>
      <div className="flex gap-1">
        <p>Phone: </p>
        {props.phoneNo}
      </div>
      <div className="flex gap-1">
        <p>Blood Group: </p>
        {props.bloodGroup}
      </div>
    </div>
  );
};

const Users = [
  {
    id: "1",
    avatarURL: "/assets/img/profile-image.png",
    name: "Ram Binaya Bupta",
    dob: "2045/05/15",
    address: "Bharatpur",
    email: "ram@ram.com",
    phoneNo: "9876553210",
    bloodGroup: "O+ve",
  },
  {
    id: "2",
    avatarURL: "/assets/img/profile-image.png",
    name: "Samrat Pandey",
    dob: "2045/05/15",
    address: "Bhaktapur",
    email: "sam@sam.com",
    phoneNo: "9876443210",
    bloodGroup: "A+ve",
  },
  {
    id: "3",
    avatarURL: "/assets/img/profile-image.png",
    name: "Era Maharjan",
    dob: "2045/05/15",
    address: "Gaidakot",
    email: "era@era.com",
    phoneNo: "9876643210",
    bloodGroup: "B+ve",
  },
  {
    id: "4",
    avatarURL: "/assets/img/profile-image.png",
    name: "Laxman Mahato",
    dob: "2045/05/15",
    address: "Lalitpur",
    email: "lax@lax.com",
    phoneNo: "9876533210",
    bloodGroup: "AB+ve",
  },
];
