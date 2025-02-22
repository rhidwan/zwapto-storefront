'use client'
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GenerateSellersSitemapDocument, useGetUserByIdOrUsernameQuery } from "@/apollograph/generated";
import SellerProfileCard from "@/components/Seller/SellerProfileCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SellerCardLoader from "@/components/Loader/SellerCardLoader";
import SellerContentLoader from "@/components/Loader/SellerContentLoader";
import NotFound from "@/components/NotMatched/NotFound";


const SellerProfile = ({
  params,
  children,
}: {
  children: any;
  params: { sellerId: string };
}) => {
  const { data, error, loading } = useGetUserByIdOrUsernameQuery({
    variables: {
      usernameOrId: params.sellerId,
    },
    skip: !params.sellerId,
  });
  const seller = data?.getUserByIdOrUsername;

  const tabData = [
    { id: 1, tab: "listing", url: `/seller/${seller?.username ?? seller?.id }` },
    { id: 2, tab: "reviews", url: `/seller/${seller?.username ?? seller?.id}/reviews` },
    { id: 3, tab: "followers", url: `/seller/${seller?.username ?? seller?.id}/followers` },
  ];

  const pathname = usePathname();
  if (!loading && !seller){
    return <NotFound 
    title="Oops! We can’t seem to find that page" 
    subtitle="It might have been moved, or maybe the link is broken."
    cta={{
      text: "Explore Products",
      link: "/explore"
    }}
    />  }
  return (
    <section className="custom-container py-10">
      {loading && (
        <div className="flex lg:flex-row flex-col gap-3 ">
          <div className="lg:w-[30%] w-[100%]  pb-10">
            <div className="flex items-center justify-between gap-3 flex-wrap ">
              <div className="flex items-center space-x-1  text-sm text-secondColor ">
                <h6 className="">Home</h6>
                <MdKeyboardArrowRight />
                <h6 className="">Seller</h6>
                <MdKeyboardArrowRight />
                {loading && (
                  <h6 className="h-2 w-14 rounded-md bg-gray-300 animate-pulse"></h6>
                )}
              </div>
              {/* <div className="flex items-center space-x-3 lg:hidden ">
                <div className="flex items-center space-x-1">
                  <Image src={ShareIcon} alt="share icon" />
                  <span className="text-sm text-primaryColor relative  leading-0 cursor">
                    share
                    <span className="absolute left-0 bottom-0.5 h-0.5 w-full bg-primaryColor"></span>
                  </span>
                </div>
              </div> */}
            </div>
            <SellerCardLoader />
          </div>
          <div className="lg:w-[70%] w-[100%] ">
            <SellerContentLoader />
          </div>
        </div>
      )}
      {seller && (
        <div className="flex lg:flex-row flex-col gap-3 ">
          <div className="lg:w-[30%] w-[100%]  pb-10">
            <div className="flex items-center justify-between gap-3 flex-wrap ">
              <div className="flex items-center space-x-1  text-sm text-secondColor ">
                <h6 className="">Home</h6>
                <MdKeyboardArrowRight />
                <h6 className="">Seller</h6>
                <MdKeyboardArrowRight />
                {loading && (
                  <h6 className="h-2 w-14 rounded-md bg-gray-300 animate-pulse"></h6>
                )}
                <h6 className="">{seller?.username ?? seller?.email}</h6>
              </div>
              {/* <div className="flex items-center space-x-3 lg:hidden ">
                <div className="flex items-center space-x-1">
                  <Image src={ShareIcon} alt="share icon" />
                  <span className="text-sm text-primaryColor relative  leading-0 cursor">
                    share
                    <span className="absolute left-0 bottom-0.5 h-0.5 w-full bg-primaryColor"></span>
                  </span>
                </div>
              </div> */}
            </div>

            <SellerProfileCard seller={seller} />
          </div>
          <div className="lg:w-[70%] w-[100%] ">
            <div className=" flex justify-between items-center pb-10 lg:px-2">
              <div
                className={`flex flex-row items-center gap-5 text-base capitalize`}
              >
                {tabData.map((item) => (
                  <Link
                    href={item.url}
                    key={item.id}
                    className={` cursor-pointer ${
                      pathname === item.url
                        ? "border-b border-activeColor text-primaryColor font-semibold"
                        : "border-b border-transparent hover:border-gray-200 text-secondColor font-semibold"
                    }`}
                  >
                    {item.tab}{" "}
                    {/* {selectedTab === item.tab && (
                  <span className="text-gray-400 text-sm">(45)</span>
                )} */}
                  </Link>
                ))}
              </div>
              {/* <div className="lg:flex items-center space-x-3 hidden ">
                <div className="flex items-center space-x-1">
                  <Image src={ShareIcon} alt="share icon" />
                  <span className="text-sm text-primaryColor relative  leading-0 cursor">
                    share
                    <span className="absolute left-0 bottom-0.5 h-0.5 w-full bg-primaryColor"></span>
                  </span>
                </div>
              </div> */}
            </div>
            {children}
          </div>
        </div>
      )}
    </section>
  );
};

export default SellerProfile;
