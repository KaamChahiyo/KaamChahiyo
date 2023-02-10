import Image from "next/image";
import React from "react";

export default function userListing() {
  return (
    <div className="flex gap-5 justify-center p-5">
      <div>
        <div>Users List</div>
        <div className="flex flex-col gap-1">
          <Userlist
            avatarURL="/assets/img/profile-image.png"
            UserName="Suman"
          />
          <Userlist
            avatarURL="/assets/img/profile-image.png"
            UserName="Deepak"
          />
          <Userlist
            avatarURL="/assets/img/profile-image.png"
            UserName="Ananta"
          />
        </div>
      </div>

      <div>
        <div>User Details</div>
        <div>
          <UserDetails
            avatarURL="/assets/img/profile-image.png"
            UserName="Suman"
          />
        </div>
      </div>
    </div>
  );
}

const Userlist = ({ avatarURL, UserName }) => {
  return (
    <div className="flex gap-3 bg-lime-200 p-3">
      <div className="h-12 w-12 relative">
        <Image src={avatarURL} alt="Profile Image" fill />
      </div>
      <div>{UserName}</div>
    </div>
  );
};

const UserDetails = ({ avatarURL, UserName }) => {
  return (
    <div>
      <div className="relative h-20 w-20">
        <Image src={avatarURL} alt="Profile Image" fill />
      </div>
      <div>{UserName}</div>
    </div>
  );
};
