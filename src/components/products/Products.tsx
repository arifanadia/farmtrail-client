"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBasket2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/store/features/products/productsSlice";
import { RootState, AppDispatch } from "../../lib/store/store";
import Loader from "@/components/Loader";
import RightSideProducts from "./RightSideProducts";
import RightSideMobile from "./RightSideMobile";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Local state for sorting and pagination
  const [sort, setSort] = useState("offerPrice");
  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9; // Set limit of products per page

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: limit,
      sort: sort,
      order: order,
      search: "",
      priceRange: "",
      category: "",
    };
    dispatch(fetchProducts(params));
  }, [dispatch, sort, order, currentPage]); // Add currentPage to the dependency array

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSort, newOrder] = e.target.value.split("-");
    setSort(newSort);
    setOrder(newOrder);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Failed to load products: {error}</p>;
  }

  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products); // Log for debugging
    return <p>No products available.</p>;
  }

  return (
    <section className="grid grid-cols-4 gap-12 container mx-auto my-24">
      <div className="col-span-4 lg:col-span-3">
        <span className="uppercase small-medium ">
          Showing {Math.min((currentPage - 1) * limit + 1, products.length)}-
          {Math.min(currentPage * limit, products.length)} of {products.length}{" "}
          results
        </span>
        <div className="flex justify-between items-center my-6">
          <div className="relative inline-block">
            <select
              className="appearance-none pl-4 pr-8 lg:px-6 py-1 lg:py-3 border border-light-2 rounded-none focus:outline-none focus:border-light_green w-full lg:w-[270px] bg-[#272727] text-white small-medium md:base-medium"
              id="sort"
              onChange={handleSortChange} // Handle sort change
              value={`${sort}-${order}`} // Set current sort and order
            >
              <option value="createdAt-asc">Newest First</option>
              <option value="offerPrice-asc">Price: Low to High</option>
              <option value="offerPrice-desc">Price: High to Low</option>
            </select>
            <IoIosArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light_green pointer-events-none" />
          </div>
          <div className="block lg:hidden">
            <RightSideMobile />
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products?.slice(0, 9).map((product) => (
            <div
              key={product.id}
              className="w-full p-4 lg:p-10 border-2 border-light-br"
            >
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.productName}
                  width={500}
                  height={500}
                  className="object-cover size-40 md:w-60 md:h-52"
                />
                <div className="absolute bg-white bg-opacity-70 bottom-0 right-2 size-8 p-2 lg:size-12 lg:p-3 flex justify-end">
                  <FiHeart className="text-green text-xl lg:text-3xl" />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="body-medium lg:h3-medium mt-4">
                  {product.productName}
                </h3>

                <div className="flex justify-between mt-3 items-center">
                  <div>
                    <div className="flex gap-4 items-center">
                      {product.mainPrice && (
                        <h5 className="base-bold lg:body-bold text-[#798076] line-through">
                          ${product.mainPrice.toFixed(2)}
                        </h5>
                      )}

                      <h5 className="base-bold lg:body-bold text-light_green">
                        ${product.offerPrice.toFixed(2)}
                      </h5>
                    </div>
                    <p className="small-medium text-[#798076] mt-1">
                      {product.gramToPrice[0].weight} /$
                      {product.gramToPrice[0].price.toFixed(2)}
                    </p>
                  </div>
                  <button className="border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out p-2 hidden md:block">
                    <BsFillBasket2Fill className="text-green hover:text-white text-xl" />
                  </button>
                </div>
                <button className="w-full mt-3 border-2 border-light-br bg-transparent hover:bg-green hover:border-transparent transition-all ease-out px-2 sm:px-12 py-2 flex items-center gap-2 text-green hover:text-white base-bold md:hidden small-bold sm:body-bold">
                  Add to cart
                  <BsFillBasket2Fill className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                />
              </PaginationItem>
              {Array.from(
                { length: Math.ceil(products.length / limit) },
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(
                      currentPage < Math.ceil(products.length / limit)
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div>
        <div className="hidden lg:block">
          <RightSideProducts />
        </div>
      </div>
    </section>
  );
};

export default Products;
