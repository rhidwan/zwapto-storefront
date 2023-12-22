import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MdKeyboardArrowUp } from "react-icons/md";
import React, { useState } from "react";
import { BiSelection } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useListCategoriesQuery } from "@/apollograph/generated";
import { getCategoryTree } from "@/lib/helpers/nestify";

const Category = () => {
  const [selectCategory, setSelectCategory] = useState<any>(null);
  const [selectSubCategory, setSelectSubCategory] = useState<any>(null);
  const {data:categoriesData, loading, error } = useListCategoriesQuery({variables: {
    limit: 1000
  }})
  const categories = categoriesData?.listCategories.items
  const [query, setQuery] = useState("")
  
  const categoryTree = categoriesData?.listCategories.items ? getCategoryTree(categoriesData?.listCategories.items, null) : [];
  const filteredCategories = !!query ? categories?.filter(ca => ca.name?.toLowerCase().includes(query.toLowerCase())) : categoryTree;
  

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value)
  }

  const [accordion, setAccordion] = useState<any>(true);
  return (
    <section className="md:space-y-4 space-y-2 pt-4">
      <h6 className="md:text-2xl text-lg text-primaryColor font-bold  leading-9">
        Category of your item? <span className="text-red-500">*</span>
      </h6>
      <p className="md:text-base text-sm text-secondColor font-medium leading-6">
        Select or search the category of your item
      </p>

      <div className="rounded-2xl border border-gray-200  ">
        <div className="relative w-full md:p-6 p-2.5">
          <div className="pointer-events-none absolute inset-y-0 md:left-8 left-5 flex items-center  ">
            <MagnifyingGlassIcon
              className="h-7 w-7  p-1.5  text-primaryColor mr-1 "
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            onChange={handleSearchChange}
            className="block w-full rounded-3xl  bg-gray-100 md:py-4 py-3 pr-3 pl-10 leading-5 placeholder-[#C0C0C0] focus:border-activeColor focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-activeColor sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
        <div className="py-3 md:px-6 px-2.5 border-y border-gray-200 flex items-center justify-between">
          <span className="md:text-base text-sm text-primaryColor font-lexed font-medium capitalize">
            {selectCategory
              ? selectCategory.name
              : "Select category from here"}
          </span>
          <span className="text-2xl text-primaryColor">
            {selectCategory ? (
              <MdOutlineClose
                className="cursor-pointer"
                onClick={() => setSelectCategory(null)}
              />
            ) : (
              <MdKeyboardArrowUp className="" />
            )}
          </span>
        </div>
        {}
        {(selectCategory === null || selectCategory.parentCategory != null) && (
          <div className="md:p-6 p-2.5 sm:grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 flex items-center  gap-4 overflow-x-auto">
            {filteredCategories?.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col items-center text-center  gap-2 p-4 border  rounded-md cursor-pointer md:space-y-3  ${
                  category?.id === selectCategory?.id
                    ? "border-activeColor"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>  setSelectCategory(category)}
              >
                <BiSelection className="text-lg" />

                <span className="text-base text-primaryColor font-lexed font-medium capitalize">
                  {category.name}
                </span>
                <span className="text-xs text-secondColor">
                {category.children && `${category.children.length} sub-category`}
                </span>
              </div>
            ))}
          </div>
        )}
        {selectCategory && categoryTree.find(cat => cat.id === selectCategory.id)?.children?.length > 0 &&  (
          <div className="md:p-6 p-2.5 sm:grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-5 flex items-center  gap-4 overflow-x-auto ">
            {categoryTree.find(cat => cat.id === selectCategory.id).children.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-col items-center gap-2 p-4 border  rounded-md cursor-pointer space-y-3 ${
                  item?.id === selectSubCategory?.id
                    ? " border-activeColor "
                    : "opacity-50 hover:border-gray-300 "
                }`}
                onClick={() => setSelectSubCategory(item)}
              >
                <BiSelection classNAme="text-primaryColor" />

                <span className="text-base text-primaryColor font-lexed font-medium capitalize">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}{" "}
      </div>
    </section>
  );
};

export default Category;
