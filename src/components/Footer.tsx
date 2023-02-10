import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <div className=" bg-[#0063F1] text-white w-full h-full">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 justify-center m-auto container gap-6 px-5 py-12 text-white">
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
            <div className="text-lg">
              <Link href="#" className="hover:text-blue-300">
                <ul>Plumber</ul>
              </Link>
              <Link href="#">
                <ul className="hover:text-blue-300">Electrician</ul>
              </Link>
              <Link href="#">
                <ul className="hover:text-blue-300">Household</ul>
              </Link>
              <Link href="#">
                <ul className="hover:text-blue-300">Painter</ul>
              </Link>
            </div>
          </div>
          <div>
            <div className="font-bold">QUICKLINKS</div>
            <div className="text-lg">
              <Link href="/">
                <ul className="hover:text-blue-300">Home</ul>
              </Link>
              <Link href="/services">
                <ul className="hover:text-blue-300">Services</ul>
              </Link>
              <Link href="job-listing">
                <ul className="hover:text-blue-300">Job Listing</ul>
              </Link>
              <Link href="/location">
                <ul className="hover:text-blue-300">Location</ul>
              </Link>
              <Link href="/about">
                <ul className="hover:text-blue-300">About</ul>
              </Link>
              <Link href="/blog">
                <ul className="hover:text-blue-300">Blog</ul>
              </Link>
            </div>
          </div>
          <div>
            <div className="font-bold">LOCATION</div>
            <div className="text-lg">
              <Link href="#">
                <ul className="hover:text-blue-300">Map Of Location</ul>
              </Link>
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
