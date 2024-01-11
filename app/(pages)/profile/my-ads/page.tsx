"use client";
import { useListListingsQuery } from "@/apollograph/generated";
import { useSelector } from "react-redux";
import ProductCard from "@/components/Products/ProductCard";
import ProductLoader from "@/components/Loader/ProductLoader";

const ProductLists = () => {
  const authState = useSelector((state: any) => state.auth);
  const { data, error, loading } = useListListingsQuery({
    variables: {
      filters: {
        userIds: [authState.user?.id],
      },
    },
    skip: !authState.user.id,
  });
  const myProducts = data?.listListings.items;

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pt-5">
      {loading && <ProductLoader />}
      {myProducts &&
        myProducts?.map((product) => (
          <ProductCard card={product} key={product.id} />
        ))}
    </div>
  );
};

export default ProductLists;
