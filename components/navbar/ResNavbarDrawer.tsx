"use client";
import React, {  useState } from "react";
import Image from "next/image";
import "./Navbar.scss";

import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setNavClose } from "@/app/redux/navSlice";
import Link from "next/link";
import { useListCategoriesQuery } from "@/apollograph/generated";
import { MdKeyboardArrowRight, MdArrowBackIos } from "react-icons/md";

import { FaRegBell, FaRegHeart, FaRegUser } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import "./resNavbar.css";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import NotificationContent from "../Notification/NotificationContent";
import ResNavbarCategoryPanel from "./ResNavbarCategoryPanel";
import NotificationBell from "./NotificationBell";

const ResNavbarDrawer = () => {
  const dispatch = useDispatch();
  const isNavOpen = useSelector((state: any) => state.nav.open);
  const { data, loading, error } = useListCategoriesQuery();

  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [openPanel, setOpenPanel] = useState<any>(null);
  // const [subCategories, setSubCategories] = useState<any>([]);

  return (
    <div
      className={`fixed top-0 z-[1000]  w-full lg:hidden resNav  transition delay-200 duration-700 ease-in-out ${
        isNavOpen ? "translate-x-0 block" : "-translate-x-full hidden"
      }`}
    >
      <div
        onClick={() => dispatch(setNavClose())}
        className="w-full h-full bg-[#2222226d] absolute left-0 top-0 z-100 "
      ></div>
      <div
        className={`lg:[35%] md:w-[45%] w-[76%] sm:w-[65%] bg-white resNav opacity-100   relative transition duration-700 ease-in-out delay-200 `}
      >
        <button
          className="absolute -right-12 top-0  p-3 bg-black rounded-sm text-white"
          onClick={() => dispatch(setNavClose())}
        >
          <AiOutlineClose className="text-2xl text-white" />
        </button>
        <div className="relative h-full">
          <div className="flex flex-wrap  border-b px-5 py-4 items-center justify-between font-semibold  gap-3">
           {currentCategory ?
           <div className="flex pt-3 items-center gap-3 w-full">
            <span
              onClick={() => setCurrentCategory(null)}
              className="absolute left-5 text-base text-primaryColor font-lexed font-medium cursor-pointer"
            >
              <MdArrowBackIos />
            </span>
            <span className="w-full text-center text-base text-primaryColor font-lexed font-medium">
              {currentCategory?.name}
            </span>
          </div>
          :<>
           <Image
              src="/assets/SWlogi.svg"
              alt="logo"
              width={100}
              height={100}
              className="h-4 w-8"
            />

            <Link
              href="/upload-product"
              onClick={() => dispatch(setNavClose())}
            >
              <button className="py-2 px-5 bg-activeColor text-white rounded-md text-base">
                List Item
              </button>
            </Link>
          </>}
          </div>

          <div className="h-[77dvh] custom-scroll overflow-y-auto pb-5 px-5">
            {data?.listCategories.items && <ResNavbarCategoryPanel 
            categories={data.listCategories.items}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}/>
            }
          </div>

          <footer className="absolute py-5 md:px-14 sm:px-10 px-3 bg-white bottom-0 left-0 w-full h-20 border-t flex justify-between items-center text-primaryColor">
            <Link href="/">
              <GrHomeRounded className="text-2xl" />
            </Link>
            <Link href="/profile/wishlists">
              <FaRegHeart className="text-2xl" />
            </Link>

            <NotificationBell
              border={""} 
              handleBellClick={() => setOpenPanel(true)}
            />

            <Link href="/profile?sidebar=hide" onClick={() => dispatch(setNavClose())}>
              <FaRegUser className="text-2xl" />
            </Link>
          </footer>
        </div>

        {/* <div
          className={`absolute h-full w-full bg-white right-0 top-0 transition  duration-100 ease-in-out ${
            openPanel !== null ? "translate-x-0   " : "-translate-x-full "
          }`}
        >
          <div className="flex border-b px-5 py-4 items-center gap-3 w-full">
            <span
              onClick={() => setOpenPanel(null)}
              className="absolute left-5 text-base text-primaryColor font-lexed font-medium cursor-pointer"
            >
              <MdArrowBackIos />
            </span>
            <span className="w-full text-center text-base text-primaryColor font-lexed font-medium">
              Notifications
            </span>
          </div>

          <div className="p-6 custom-scroll overflow-y-auto h-full">
            <NotificationContent />
          </div>
        </div> */}

      
      </div>
    </div>
  );
};

export default ResNavbarDrawer;
