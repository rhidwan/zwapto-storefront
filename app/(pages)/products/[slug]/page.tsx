"use client";
import Image from "next/image";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import shareIcon from "@/public/assets/share.png";
import saveIcon from "@/public/assets/heartIcon.png";
import ProductDetailsImage from "@/components/ProductDetails/ProductDetailsImage";
import ProductInfo from "@/components/ProductDetails/ProductInfo";
import SellerBox from "@/components/ProductDetails/SellerBox";
import SafetyTips from "@/components/SafetyTips/SafetyTips";
import Link from "next/link";
import ProductImageSlider from "@/components/ProductDetails/ProductImageSlider";
import { useGetListingQuery } from "@/apollograph/generated";
import ProductThumbnailSlider from "@/components/ProductDetails/ProductThumbnailSlider";
import MeetSeller from "@/components/Seller/MeetSeller";
import "@/components/Seller/Seller.css";
import Review from "@/components/Review/Review";
import ThumbnailLoader from "@/components/Loader/ThumbnailLoader";
import MeetTheSellerLoader from "@/components/Loader/MeetTheSellerLoader";
import ProductInfoLoader from "@/components/Loader/ProductInfoLoader";
import BreadCrumbsLoader from "@/components/Loader/BreadCrumbsLoader";

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const productId = parseInt(params.slug, 10);
  const { data, error, loading } = useGetListingQuery({
    variables: {
      id: productId,
    },
    skip: !productId,
  });
  const product = data?.getListing;

  return (
    <section className="custom-container py-6 space-y-5">
      <div className="flex md:flex-row flex-col items-center justify-between gap-2">
        {loading ? (
          <BreadCrumbsLoader />
        ) : (
          <div className="flex items-center space-x-1 justify-center text-sm text-secondColor">
            <h6 className="">Home</h6>
            <MdKeyboardArrowRight />
            {product?.category?.parentCategory && (
              <>
                <h6 className="">Categories</h6>
                <MdKeyboardArrowRight />
              </>
            )}

            <h6 className="">{product?.category?.name}</h6>
            <MdKeyboardArrowRight />
            <h6 className="text-primaryColor capitalize">{product?.title}</h6>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Image src={shareIcon} alt="share icon" />
            <span className="text-sm text-primaryColor relative  leading-0 cursor">
              share
              <span className="absolute left-0 bottom-0.5 h-0.5 w-full bg-secondColor"></span>
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <Image src={saveIcon} alt="share icon" />
            <span className="text-sm text-primaryColor relative  leading-0 cursor">
              save
              <span className="absolute left-0 bottom-0.5 h-0.5 w-full bg-secondColor"></span>
            </span>
          </div>
        </div>
      </div>

      {/* <div className="hidden md:block">
        <ProductDetailsImage images={product?.media} />
      </div> */}

      {/* <div className="block md:hidden md:h-[350px] sm:h-[300px] h-[280px]">
        <ProductImageSlider images={product?.media} />
      </div> */}

      <div className="flex flex-col md:flex-row md:gap-8 gap-2  lg:h-[850px] md:h-[600px]     rounded-md  ">
        <div className="lg:w-[58%] md:w-[50%] w-full h-full  space-y-6  ">
          {loading ? (
            <ThumbnailLoader />
          ) : (
            <ProductThumbnailSlider images={product?.media} />
          )}
          <div className="border-b "></div>
          {loading ? (
            <MeetTheSellerLoader />
          ) : (
            <MeetSeller seller={product?.user} />
          )}
        </div>
        <div className="lg:w-[42%] md:w-[50%] w-full h-full lg:ps-14 md:ps-2 pe-0 md:overflow-auto scroll-hidden">
          {loading ? (
            <ProductInfoLoader />
          ) : (
            <ProductInfo product={product ?? null} />
          )}

          {/* <SellerBox seller={product?.user} /> */}
        </div>
      </div>

      <div className="w-full  ">
        <Review />
      </div>

      <div className="flex lg:flex-row flex-col items-start gap-4">
        <div className="lg:w-[100%] w-full">
          <SafetyTips />
        </div>
        <div className="lg:w-[30%] md:w-[50%] w-full pt-5 lg:pt-0"></div>
      </div>
    </section>
  );
};

export default ProductDetails;
