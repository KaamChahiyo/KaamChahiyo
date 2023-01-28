import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div>
      <div className="flex justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 gap-12 p-5">
        <div className="text-left w-80 ">
          <div className="font-bold text-4xl gap-5 py-10">KAAMCHAHIYO</div>
          <div className="font-semibold text-xl py-5 gap-2">
            KaamChahiyo focuses on creating Employment Opportunities,
            Consulting, Training, as well as to provide Professionals of several
            fields to various users around the Nation through a Digital
            Platform.
          </div>
        </div>
        <div>
          <Image
            src="/assets/img/about-banner.png"
            alt="About Image"
            height={600}
            width={600}
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-12 pt-5 pb-3">
        <div>
          <Image
            src="/assets/img/job-vacancy.png"
            alt=" Job Oppoturnity"
            height={600}
            width={500}
          />
        </div>
        <div className="text-left w-96 ">
          <div className="font-bold text-3xl pt-5 pb-3">
            Creating Job Oppoturnity for Everyone
          </div>
          <div className="font-semibold text-xl py-2 ">
            It's very difficult to find the professionals for small but
            important household jobs. We come with the solution of this problem
            by creating a easy job portal which is available to everyone.
          </div>
        </div>
      </div>

      <div className="pb-5 mx-80 my-5 bg-slate-100 rounded-xl shadow-xl">
        <div className="flex justify-center text-3xl font-bold  py-6 ">
          Our Team
        </div>
        <div className="flex gap-10 justify-center">
          <Team
            avatarURL="/assets/img/profile-image.png"
            teamName="Ananta Raj Mishra"
            Experience="Frontend Designer"
            teamDescription="Hello I am Ananta Raj Mishra. I am currently working at Astranix Technologies."
            teamTag="Software Engineer"
          />
          <Team
            avatarURL="/assets/img/profile-image.png"
            teamName="Deepak Acharya"
            Experience=""
            teamDescription="Hello I am Deepak Acharya. I am contributing as frontend developer in this Job-Portal 'KaamChahiyo'."
            teamTag="Software Engineer"
          />
          <Team
            avatarURL="/assets/img/profile-image.png"
            teamName="Suman Chalise"
            Experience=""
            teamDescription="Hello I am Suman Chalise. I am contributing as frontend developer in this Job-Portal 'KaamChahiyo'."
            teamTag="Software Engineer"
          />
        </div>
      </div>
    </div>
  );
}
const Team = ({
  avatarURL,
  teamName,
  teamDescription,
  teamTag,
  Experience,
}: {
  avatarURL: string;
  teamName: string;
  teamDescription: string;
  teamTag: string;
  Experience: string;
}) => {
  return (
    <>
      <div className="flex flex-col border container  shadow-md w-80 gap-4 p-10  rounded-lg">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="h-20 w-20 relative rounded-full overflow-hidden ">
            <Image src={avatarURL} alt="Profile Image" fill />
          </div>
          <div className="text-lg text-center font-bold">{teamName}</div>
          <div className="text-lg text-center font-medium">{Experience}</div>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <div className="text-lg">{teamDescription}</div>
          <div className="flex">
            <div key="" className="rounded-2xl bg-slate-100 p-2 text-sm">
              {teamTag}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
