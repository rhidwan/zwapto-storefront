"use client";
import useIsMobile from "@/lib/hooks/useIsMobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";

const ProductLists = ({ children }: { children: any }) => {
  const tabData = [
    { id: 4, tab: "all", url: "/my-ads" },
    { id: 2, tab: "approved", url: `/my-ads/approved` },
    { id: 1, tab: "pending", url: `/my-ads/pending` },
    { id: 3, tab: "rejected", url: `/my-ads/rejected` },
  ];
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <section>
      <div className=" flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div className="flex items-center gap-3">
          {isMobile && (
            <div
              className=" p-2 border border-secondColor  rounded-md  cursor-pointer "
              // onClick={handleLeftArrowIconClick}
            >
              <HiArrowLeft className="text-primaryColor" />
            </div>
          )}{" "}
          <h6 className="text-primaryColor lg:text-2xl md:text-lg text-base font-lexed font-medium ">
            My Product Lists
          </h6>
        </div>{" "}
        <div
          className={`flex flex-wrap items-center  gap-x-5 gap-y-3 text-base capitalize`}
        >
          {tabData.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              className={` cursor-pointer ${
                pathname === item.url
                  ? "border-b border-activeColor text-primaryColor font-semibold"
                  : "border-b border-transparent hover:border-gray-200 text-secondColor font-medium"
              }`}
            >
              {item.tab}{" "}
              {/* {selectedTab === item.tab && (
                  <span className="text-gray-400 text-sm">(45)</span>
                )} */}
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-4">
        <div className=" flex justify-end items-center "></div>
        {children}
      </div>
    </section>
  );
};

export default ProductLists;
