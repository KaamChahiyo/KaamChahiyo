import Link from "next/link";
import React from "react";

const TService = ({ services, link }: { services: string; link: string }) => {
  return (
    <Link href={link}>
      <div className="flex items-center justify-center rounded-md hover:opacity-50 bg-blue-300 text-emerald-700 w-20 h-16 ">
        <div className=" h-24 w-24">{services}</div>
      </div>
    </Link>
  );
};

export default function TopServices() {
  return (
    <div className="flex p-5   h-40 w-full">
      <div className="p-2 text-center align-center font-bold w-1/3">
        Top Services
      </div>
      <div className="flex w-2/3 gap-20">
        <TService services={"plumber"} link="#" />
        <TService services={"plumber"} link="#" />
        <TService services={"plumber"} link="#" />
        <TService services={"plumber"} link="#" />
        <TService services={"plumber"} link="#" />
      </div>
    </div>
  );
}
