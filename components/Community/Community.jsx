import React from "react";

import img2 from "@/public/assets/comm2.png";
import img3 from "@/public/assets/comm3.png";
import img4 from "@/public/assets/comm4.png";
import CommunityCard from "@/components/Community/CommunityCard";
import Link from "next/link";
import { useListCommunitiesQuery } from "@/apollograph/generated";
import ProductLoader from "../Loader/ProductLoader";

// const card = [
//   {
//     id: 134,
//     banner: img1,
//     title: "Chittagong University",
//     joined: "Join to Buy",
//   },
//   {
//     id: 143,
//     banner: img2,
//     title: "Chittagong University",
//     joined: "Join to Buy",
//   },
//   {
//     id: 123,
//     banner: img3,
//     title: "Chittagong University",
//     joined: "Join to Buy",
//   },
//   {
//     id: 1227,
//     banner: img4,
//     title: "Chittagong University",
//     joined: "Already Joined",
//   },
//   {
//     id: 1225,
//     banner: img4,
//     title: "Chittagong University",
//     joined: "Join to Buy",
//   },
//   {
//     id: 1224,
//     banner: img4,
//     title: "Chittagong University",
//     joined: "Join to Buy",
//   },
//   {
//     id: 12275,
//     banner: img4,
//     title: "Chittagong University",
//     joined: "Already Joined",
//   },
// ];

const Community = () => {
  const {data, loading, error } = useListCommunitiesQuery();
  const communities = data?.listCommunities.items;

  return (
    <section className="my-20 custom-container">
      <div className="flex md:flex-row flex-col justify-between items-center space-y-2 md:space-x-0">
        <h2 className="lg:text-4xl text-2xl font-lexed text-primaryColor font-semiBold">
          Explore Communities
        </h2>
        <Link
          href="/communities"
          className="border border-activeColor md:py-2 md:px-3 py-1 px-2 rounded  text-activeColor lg:text-base text-sm font-lexed hover:shadow-lg hover:-translate-y-1 transition ease-in-out delay-150 duration-300 "
        >
          See All Community
        </Link>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 pt-10">
        {communities && communities?.map((community) => (
          <CommunityCard key={community.id} card={community} />
        ))}
        {loading && <ProductLoader />}
      </div>
    </section>
  );
};

export default Community;
