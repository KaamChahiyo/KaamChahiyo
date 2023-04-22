import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const [searchDomain] = useState("category");

  return (
    <div className=" bg-[#0063F1] text-white w-full h-full mt-10">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-4 flex-wrap justify-center m-auto container gap-6 px-5 py-12 text-white">
          <div className="flex flex-col gap-5">
            <div className="w-72 h-8 relative">
              <Image
                src="/assets/img/logo-white.png"
                alt="KaamChahiyo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-lg ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem ut at molestias provident sapiente, blanditiis
                porro
              </p>
            </div>
          </div>
          <div>
            <div className="font-bold">CATEGORIES</div>
            <div className="text-lg w-fit">
              <Link passHref href={`/jobs/?${searchDomain}=${"plumber"}`}>
                <ul className="hover:text-blue-300">Plumber</ul>
              </Link>
              <Link passHref href={`/jobs/?${searchDomain}=${"electrician"}`}>
                <ul className="hover:text-blue-300">Electrician</ul>
              </Link>
              <Link passHref href={`/jobs/?${searchDomain}=${"household"}`}>
                <ul className="hover:text-blue-300">Household</ul>
              </Link>
              <Link passHref href={`/jobs/?${searchDomain}=${"painter"}`}>
                <ul className="hover:text-blue-300">Painter</ul>
              </Link>
            </div>
          </div>
          <div>
            <div className="font-bold">QUICKLINKS</div>
            <div className="text-lg w-fit">
              <Link passHref href="/">
                <ul className="hover:text-blue-300">Home</ul>
              </Link>
              <Link passHref href="/services">
                <ul className="hover:text-blue-300">Services</ul>
              </Link>
              <Link passHref href="/jobs">
                <ul className="hover:text-blue-300">Job Listing</ul>
              </Link>
              <Link passHref href="/location">
                <ul className="hover:text-blue-300">Location</ul>
              </Link>
              <Link passHref href="/about">
                <ul className="hover:text-blue-300">About</ul>
              </Link>
              <Link passHref href="/blog">
                <ul className="hover:text-blue-300">Blog</ul>
              </Link>
            </div>
          </div>
          <div>
            <div className="font-bold">LOCATION</div>
            <div className="flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3533.630908875153!2d84.42117241549484!3d27.66688888280882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQwJzAwLjgiTiA4NMKwMjUnMjQuMSJF!5e0!3m2!1sen!2snp!4v1678363405943!5m2!1sen!2snp"
                width="450"
                height="250"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div
        className="  grid grid-cols-1 sm:grid-cols-2 gap-5 
      text-center pt-2 text-white text-sm pb-8"
      >
        <span>Copyright &#169; 2023 Apply. All rights reserved.</span>
        <SocialIcons />
      </div>
    </div>
  );
}
