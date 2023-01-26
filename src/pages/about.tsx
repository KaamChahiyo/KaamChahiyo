import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div>
      <div className="flex justify-center h-96 gap-20">
        <div className="text-left w-96  ">
          <div className="font-bold text-3xl gap-5 py-6">KaamChahiyo</div>
          <div className="font-semibold text-lg ">
            KaamChahiyo focuses on creating Employment Opportunities,
            Consulting, Training, as well as to provide Professionals of several
            fields to various users around the Nation through a Digital
            Platform.
          </div>
        </div>
        <div>
          <Image
            src="/assets/img/profile-image.png"
            alt="About Image"
            height={250}
            width={300}
          />
        </div>
      </div>
      <div className="text-center font-bold text-3xl ">
        Creating Job Oppoturnity for Everyone
      </div>
    </div>
  );
}
