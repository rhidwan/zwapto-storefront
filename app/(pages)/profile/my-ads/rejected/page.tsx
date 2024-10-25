"use client";
import { useListListingsQuery } from "@/apollograph/generated";
import ProductCard from "@/components/Products/ProductCard";
import ProductLoader from "@/components/Loader/ProductLoader";
import NotMatched from "@/components/NotMatched/NotMatched";
import { useSession } from "next-auth/react";

const ProductLists = () => {
  const {data: session} = useSession();
  const { data, error, loading } = useListListingsQuery({
    variables: {
      filters: {
        userIds: [session?.user?.id!],
        status: "rejected",
      },
    },
    skip: !session?.user?.id,
  });
  const myProducts = data?.listListings.items;

  return (
    <>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4 px-5 pt-10">
      {loading && <ProductLoader />}
      {myProducts &&
        myProducts?.map((product) => (
          <ProductCard card={product} key={product.id} />
        ))}
    </div>
     
     {!loading && (!myProducts || myProducts.length <= 0) && (
      <div className=" pt-16">
        <NotMatched 
        title={"Great news! You don’t have any rejected products."}
        cta={{
          text: "list new product", 
          link : "/upload-product"
        }}
         />
      </div>
    )}
</>
  );
};

export default ProductLists;
