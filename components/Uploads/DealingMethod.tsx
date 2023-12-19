import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MdKeyboardArrowUp } from "react-icons/md";
import React, { useState } from "react";
import { BiSelection } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { GrLocation } from "react-icons/gr";
import MeetUp from "./MeetUp";
import Courier from "./Courier";

const method = [
  { id: 188, title: "Meet-up" },
  { id: 14, title: "Courier Delivery" },
];

const DealingMethod = () => {
  const [selectMethod, setSelectMethod] = useState<any>(null);
  const [showSelectedMethod, setShowSelectedMethod] = useState<any>(null);
  return (
    <section className="space-y-4 pt-4">
      <h6 className="text-2xl text-primaryColor font-bold  leading-9">
        Dealing Method? <span className="text-red-500">*</span>
      </h6>
      <p className="text-base text-secondColor font-medium leading-6">
        Select the method, how you want to send the item
      </p>

      <div className="rounded-2xl border border-gray-200  ">
        <div className="py-3 px-6 border-b border-gray-200 flex items-center justify-between">
          <span className="text-base text-primaryColor font-lexed font-medium capitalize">
            {selectMethod ? selectMethod.title : "Chose a dealing method"}
          </span>
          <span className="text-2xl text-primaryColor">
            {selectMethod ? (
              <MdOutlineClose
                className="cursor-pointer"
                onClick={() => setSelectMethod(null)}
              />
            ) : (
              <MdKeyboardArrowUp className="" />
            )}
          </span>
        </div>
        {selectMethod === null && (
          <div className="px-6 py-6 grid grid-cols-2 gap-4 ">
            {method.map((item) => (
              <div
                key={item.id}
                className={`flex h-[98px] flex-col items-center gap-2 p-4 space-y-4 border  rounded-md cursor-pointer  ${
                  item?.id === selectMethod?.id
                    ? "border-activeColor"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectMethod(item)}
              >
                <BiSelection />

                <span className="text-base text-primaryColor font-lexed font-medium capitalize">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}
        {selectMethod && selectMethod?.title === "Meet-up" ? (
          <MeetUp />
        ) : (
          selectMethod?.title === "Courier Delivery" && <Courier />
        )}
      </div>
    </section>
  );
};

export default DealingMethod;
