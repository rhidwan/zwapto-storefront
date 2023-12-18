import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MdKeyboardArrowUp } from "react-icons/md";
import React, { useState } from "react";
import { BiSelection } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

const brands = [
  { id: 188, title: "Apple" },
  { id: 14, title: "Apple2" },
  { id: 15, title: "Apple3" },
  { id: 18, title: "Apple4" },
  { id: 157, title: "Apple5" },
  { id: 144, title: "Apple7" },
  { id: 17, title: "Apple" },
  { id: 177, title: "Apple9" },
];

const Brand = () => {
  const [selectBrand, setSelectBrand] = useState<any>(null);
  return (
    <section className="space-y-4 pt-4">
      <h6 className="text-2xl text-primaryColor font-lexed font-medium">
        Brand?
      </h6>
      <p className="text-base text-secondColor ">
        Choose a brand from the list
      </p>

      <div className="rounded-2xl border border-gray-200  ">
        <div className="relative w-full p-6">
          <div className="pointer-events-none absolute inset-y-0 left-7 flex items-center  ">
            <MagnifyingGlassIcon
              className="h-7 w-7  p-1.5  text-primaryColor mr-1 "
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-2xl border border-gray-300 bg-gray-100 py-2 pr-3 pl-9 leading-5 placeholder-[#C0C0C0] focus:border-activeColor focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-activeColor sm:text-sm"
            placeholder="Search brand  e.g. Apple"
            type="search"
          />
        </div>
        <div className="py-3 px-6 border-y border-gray-200 flex items-center justify-between">
          <span className="text-lg text-primaryColor font-lexed font-medium capitalize">
            {selectBrand ? selectBrand.title : "Select category from here"}
          </span>
          <span className="text-2xl text-primaryColor">
            <MdKeyboardArrowUp className="" />
          </span>
        </div>

        <div className="px-6 py-6 grid grid-cols-8 gap-4 ">
          {brands.map((item: any) => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-2 py-5 px-2 border  rounded-md cursor-pointer space-y-3 hover:border-gray-300 ${
                item?.id === selectBrand?.id
                  ? " border-activeColor "
                  : "opacity-50"
              }`}
              onClick={() => setSelectBrand(item)}
            >
              <BiSelection classNAme="text-primaryColor" />

              <span className="text-base text-primaryColor font-lexed font-medium capitalize">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 ">
        <span className="text-2xl text-primaryColor font-lexed font-medium block ">
          Need to add more details?
        </span>

        <p className="text-base text-secondColor ">
          Adding additional details help your customers know more about the
          product results less query for you
        </p>

        <input
          id="text"
          name="name"
          className="block w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 pr-3 px-5 leading-5 placeholder-[#C0C0C0] focus:border-activeColor focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-activeColor sm:text-sm"
          placeholder="e.g. This smartphone comes with some cool feature.."
          type="text"
        />
      </div>
    </section>
  );
};

export default Brand;
