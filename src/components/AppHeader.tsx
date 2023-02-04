// import { MenuIcon } from "../icons";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MenuIcon } from "../icons";
import { useSession } from "next-auth/react";

export default function AppHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const route = useRouter();
  const { data: userData } = useSession();
  const user = userData?.user

  const menu = [
    {
      menuLabel: "Main Menu",
      menuItems: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About Us",
          link: "/about",
        },
        {
          label: "Services",
          link: "/services",
        },
        {
          label: "Blog",
          link: "/blog",
        },
        {
          label: "Contact Us",
          link: "/contact",
        },
      ],
    },
  ];
  return (
    <div className="mb-24">
      <nav
        className={classNames(
          "z-50 flex w-full fixed justify-between bg-white lg:py-4 gap-20  items-center h-24 overflow-visible",
          {
            " mb-0 lg:-mb-24  top-0 lg:relative z-50": route.pathname == "/",
            "top-0": route.pathname != "/",
          }
        )}
      >
        <div className="flex justify-between w-full items-center container mx-auto">
          <div className="cursor-pointer ">
            <Link href="/">
              <Image
                src="/assets/img/logo-no-background.png"
                width={203}
                height={88}
                className="object-cover"
                alt="KaamChahiyo"
              />
            </Link>
          </div>

          <div
            className="relative flex lg:hidden justify-end"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div className="w-6 text-primary-0">{MenuIcon}</div>
          </div>

          <div className="gap-12 justify-center font-semibold leading-7 hidden lg:flex">
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/",
              })}
            >
              <Link href="/">Home</Link>
            </span>
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/services",
              })}
            >
              <Link href="/services">Services</Link>
            </span>
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/job-listing",
              })}
            >
              <Link href="/job-listing">Job Listing</Link>
            </span>
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/location",
              })}
            >
              <Link href="/location">Location</Link>
            </span>
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/about",
              })}
            >
              <Link href="/about">About</Link>
            </span>
            <span
              className={classNames({
                "border-b-2 border-[#319516] text-[#319516] hover:text-[#319516] border-primary-0 active:outline-offset-3":
                  route.pathname === "/blog",
              })}
            >
              <Link href="/blog">Blog</Link>
            </span>

          </div>
          <div className="flex gap-8">
            {user ?
              <><div>Session exists {user?.name}</div>
                <div className="flex bg-[#2D9515] border-2 border-[#2D9515] text-white font-semibold px-6 py-3 rounded hover:text-[#2D9515] hover:bg-white hover:border-2 hover:border-[#2D9515] ">
                  <Link href="/logout">Logout</Link>
                </div>
              </> :
              <><div className="flex bg-teal-900 border-2 border-teal-900 text-white font-semibold px-6 py-3 rounded hover:text-teal-900 hover:bg-white hover:border-2 hover:border-teal-900 ">
                <Link href="/login">Login</Link>
              </div>
                <div className="flex bg-[#2D9515] border-2 border-[#2D9515] text-white font-semibold px-6 py-3 rounded hover:text-[#2D9515] hover:bg-white hover:border-2 hover:border-[#2D9515] ">
                  <Link href="/signup">Signup</Link>
                </div>
              </>

            }
          </div>
        </div>

        <section
          className={classNames(
            "fixed w-full top-0 left-0 flex z-50 transition ease-in-out duration-700  ",
            {
              "-translate-x-full": !isNavOpen,
              "translate-x-0": isNavOpen,
            }
          )}
        >
          <div
            className="flex w-full min-h-screen bg-gray-600 bg-opacity-30 "
            onClick={() => setIsNavOpen(false)}
          >
            <div className="bg-white  min-h-screen w-8/12 flex flex-col align-top overflow-hidden justify-start p-6">
              <div className="relative flex justify-start">
                <Link href="/">
                  <Image
                    src="/assets/img/logo-no-background.png"
                    width={203}
                    height={88}
                    className="object-cover"
                    alt="KaamChahiyo"
                  />

                </Link>
              </div>
              {menu.map((menuName) => (
                <div
                  className="text-gray-400 font-medium text-xs mt-2"
                  key={menuName.menuLabel}
                >
                  <div className="flex flex-col mb-4 ">
                    {menuName.menuItems.map((item) => (
                      <Link href={item.link} key={item.label}>
                        <div className="flex flex-row gap-6 py-2 items-center cursor-pointer">
                          <span className="text-base">{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
