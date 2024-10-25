"use client";
import { useGetListingQuery } from "@/apollograph/generated";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicSafetyTips = dynamic(() => import("../SafetyTips/SafetyTips"), {ssr: false});
const DynamicProductInfo = dynamic(() => import("./ProductInfo"), {ssr: false});
const DynamicProductInfoLoader = dynamic(() => import("../Loader/ProductInfoLoader"), {ssr: false});
const DynamicBreadCrumbsLoader = dynamic(() => import("../Loader/BreadCrumbsLoader"), {ssr: false});
const DynamicThumbnailLoader = dynamic(() => import("../Loader/ThumbnailLoader"), {ssr: false});
const DynamicProductThumbnailSlider = dynamic(() => import("./ProductThumbnailSlider"), {ssr: false});
const DynamicFavoriteProduct = dynamic(() => import("../Products/FavoriteProduct"), {ssr: false});

const ProductDetails = ({ productId }: { productId: number }) => {
  const { data, error, loading } = useGetListingQuery({
    variables: {
      id: productId,
    },
    skip: !productId,
  });
  const product = data?.getListing;

  console.log("pro", product);

  return (
    <section className="custom-container py-6 space-y-6 ">
      <div className="flex md:flex-row flex-col items-center justify-between gap-2">
        {loading ? (
          <DynamicBreadCrumbsLoader />
        ) : (
          <div className="flex flex-wrap items-center gap-2 justify-center text-base text-secondColor">
            <Link href="/">
              <h6 className="">Home</h6>
            </Link>
            <MdKeyboardArrowRight />
            {product?.category?.parentCategory && (
              <>
                <Link
                  href={`/categories/${product?.category?.parentCategory?.slug}`}
                >
                  <h6 className="text-activeColor font-medium">
                    {product.category.parentCategory.name}
                  </h6>
                </Link>
                <MdKeyboardArrowRight />
              </>
            )}

            <Link href={`/categories/${product?.category?.slug}`}>
              <h6 className="">{product?.category?.name}</h6>
            </Link>
            <MdKeyboardArrowRight />
            <h6 className="text-primaryColor capitalize">{product?.title}</h6>
          </div>
        )}

        {/* <div className="flex items-center space-x-3">
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
        </div> */}
      </div>

      {/* <div className="flex flex-col md:flex-row md:gap-8 gap-2  lg:h-[850px] md:h-[600px]  rounded-md  ">
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
            <div className="hidden md:block">
              <MeetSeller seller={product?.user} />
            </div>
          )}
        </div>
        <div className="lg:w-[42%] md:w-[50%] w-full h-full  md:overflow-auto scroll-hidden">
          {loading ? (
            <ProductInfoLoader />
          ) : (
            <>
              <ProductInfo product={product ?? null} />
              <div className="md:hidden">
                <MeetSeller seller={product?.user} />
              </div>
            </>
          )}
        </div>
      </div> */}

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h4 className="text-primaryColor text-2xl	font-bold ">
            {product?.title}
          </h4>
          <div className="flex items-center gap-3">
            {/* <button className="w-12	h-12 border border-[#F5F5F5] rounded-full flex justify-center items-center">
              <FiShare2 className="text-lg text-primaryColor" />
            </button> */}

            <button className="w-12	h-12 border border-[#F5F5F5] rounded-full flex justify-center items-center">
              <DynamicFavoriteProduct listing={product!} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-5 gap-2  ">
          <div className="xl:w-[64%] lg:w-[57%]  md:w-[50%] w-full h-full  space-y-6 ">
            {loading ? (
              <DynamicThumbnailLoader />
            ) : (
              <DynamicProductThumbnailSlider images={product?.media} />
            )}
          </div>
          <div className="xl:w-[36%] lg:w-[43%]  md:w-[50%] w-full   shadow-xl rounded-md">
            {loading ? (
              <DynamicProductInfoLoader />
            ) : (
              <div className=" w-full h-full">
                <DynamicProductInfo product={product ?? null} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="w-full  ">
        <Review />
      </div> */}

      <div className="flex lg:flex-row flex-col items-start gap-4">
        <div className="lg:w-[100%] w-full">
          <DynamicSafetyTips />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
