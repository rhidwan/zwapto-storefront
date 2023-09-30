import Image from "next/image";
import React from "react";
import user from "@/public/user1.jpg";
import user2 from "@/public/profile.jpg";
import { BsDot } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import Link from "next/link";

const CommunityCard = ({ card }) => {
  return (
    <section className="  rounded-md bg-whiteColor border border-[#EFEFEF] p-2.5 hover:shadow-lg  cursor-pointer transition ease-in-out delay-150 duration-300">
      <div className="md:h-[210px] h-[130px] relative overflow-hidden rounded-tl-md  rounded-tr-md">
        <Image
          src={card.banner}
          alt="product banner"
          className="h-full w-full object-cover rounded-tl-md  rounded-tr-md hover:scale-110 transition ease-in-out delay-150 duration-300 "
        />
      </div>

      <div className="md:pt-3 pt-1  font-lexed ">
        <h6 className="md:text-lg text-base font-semibold text-primaryColor capitalize">
          {card.title}
        </h6>
      </div>

      <div className="flex items-center pt-1 text-secondColor">
        <span className="md:text-sm text-xs font-lexed ">2.8K members</span>
        <span className="md:text-sm text-xs font-lexed  flex items-center">
          <BsDot className="text-lg" /> 8 Post uploaded
        </span>
      </div>

      <div className="flex items-center pt-1 text-secondColor">
        <TiLocation className="text-bg text-activeColor pe-1" />{" "}
        <span className="text-sm">Fatehpur, Hathazari</span>
      </div>

      <div className="flex items-center space-x-1 md:py-4 py-2">
        <div class="avatars px-2 ">
          <Link href="#" class="avatars__item">
            <Image class="avatar" src={user} alt="" width={30} height={30} />
          </Link>
          <Link href="#" class="avatars__item">
            <Image class="avatar" src={user2} alt="" width={30} height={30} />
          </Link>
          <Link href="#" class="avatars__item">
            <Image class="avatar" src={user} alt="" width={30} height={30} />
          </Link>
        </div>
        <span className="text-sm text-secondColor">120+ Members</span>
      </div>

      <div className="border border-activeColor text-whiteColor bg-activeColor rounded-md py-1 text-center md:text-base  sm:text-sm text-xs hover:shadow-lg  cursor-pointer transition ease-in-out delay-150 duration-300">
        Join to Buy
      </div>
    </section>
  );
};

export default CommunityCard;
