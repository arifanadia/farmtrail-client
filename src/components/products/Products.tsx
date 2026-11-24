"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSortAndOrder,
  setCurrentPage,
  setLimit,
  setViewMode,
  resetFilters,
} from "../../lib/store/features/products/productsSlice";
import { FetchProductsParams } from "../../lib/store/features/products/productsApi";
import { addToCart } from "../../lib/store/features/cart/cartSlice";
import { RootState, AppDispatch } from "../../lib/store/store";
import RightSideProducts from "./RightSideProducts";
import RightSideMobile from "./RightSideMobile";
import ProductQuickView from "./ProductQuickView";
import { Product } from "@/types";
import { toast } from "sonner";

// Icons
import { FiHeart, FiEye, FiGrid, FiList, FiAlertCircle } from "react-icons/fi";
import { BsFillBasket2Fill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getFirstImage = (images: string | string[] | undefined): string => {
  if (Array.isArray(images) && images.length > 0) return images[0] || "/placeholder.jpg";
  if (typeof images === "string" && images.trim()) return images;
  return "/placeholder.jpg";
};

const Products = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    products,
    totalProducts,
    totalPages,
    currentPage,
    limit,
    loading,
    error,
    sort,
    order,
    searchQuery,
    selectedCategory,
    priceRange,
    inStockOnly,
    viewMode,
  } = useSelector((state: RootState) => state.products);

  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Wishlist in localStorage (loaded after mount to prevent SSR hydration mismatch)
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("farmtrail_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleWishlist = (product: Product) => {
    const id = product._id || product.productId;
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        toast.info(`Removed ${product.productName} from wishlist`);
      } else {
        updated = [...prev, id];
        toast.success(`Added ${product.productName} to wishlist! ❤️`);
      }
      try {
        localStorage.setItem("farmtrail_wishlist", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Fetch products whenever filters or pagination change
  useEffect(() => {
    const params: FetchProductsParams = {
      page: currentPage,
      limit: limit,
      sort: sort,
      order: order,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }
    if (selectedCategory && selectedCategory !== "All") {
      params.category = selectedCategory;
    }
    if (priceRange) {
      params.priceRange = `${priceRange[0]}-${priceRange[1]}`;
    }
    if (inStockOnly) {
      params.inStock = true;
    }

    dispatch(fetchProducts(params));
  }, [
    dispatch,
    currentPage,
    limit,
    sort,
    order,
    searchQuery,
    selectedCategory,
    priceRange,
    inStockOnly,
  ]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSort, newOrder] = e.target.value.split("-");
    dispatch(setSortAndOrder({ sort: newSort, order: newOrder }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        variant: product.gramToPrice?.[0]?.weight || "",
        price: product.gramToPrice?.[0]?.price ?? product.offerPrice,
      })
    );
    toast.success(`Added ${product.productName} to cart! 🛒`);
  };

  // Calculations for results display
  const startResult = totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endResult = Math.min(currentPage * limit, totalProducts);

  return (
    <section id="products-top" className="container mx-auto px-4 lg:px-8 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Main Products Area */}
        <div className="lg:col-span-3">
          {/* Top Control Bar */}
          <div className="bg-[#212121] border border-zinc-800 rounded-lg p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Results Counter & Search Tag */}
            <div>
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                Showing {startResult}&ndash;{endResult} of {totalProducts} results
              </span>
              {(selectedCategory !== "All" || searchQuery) && (
                <div className="text-xs text-light_green font-medium mt-1">
                  Filtered by:{" "}
                  {selectedCategory !== "All" ? `Category: ${selectedCategory}` : ""}
                  {selectedCategory !== "All" && searchQuery ? " | " : ""}
                  {searchQuery ? `Search: "${searchQuery}"` : ""}
                </div>
              )}
            </div>

            {/* Controls: Sort, Limit, View Mode, Mobile Filter */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  id="sort-select"
                  aria-label="Sort products by"
                  value={`${sort}-${order}`}
                  onChange={handleSortChange}
                  className="appearance-none bg-[#181818] border border-zinc-700 text-white text-xs lg:text-sm pl-3 pr-8 py-2 rounded focus:outline-none focus:border-light_green"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="offerPrice-asc">Price: Low to High</option>
                  <option value="offerPrice-desc">Price: High to Low</option>
                  <option value="productName-asc">Name: A to Z</option>
                  <option value="productName-desc">Name: Z to A</option>
                </select>
                <IoIosArrowDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-light_green pointer-events-none text-xs" />
              </div>

              {/* Items Per Page */}
              <div className="relative hidden sm:block">
                <select
                  id="limit-select"
                  aria-label="Items per page"
                  value={limit}
                  onChange={handleLimitChange}
                  className="appearance-none bg-[#181818] border border-zinc-700 text-white text-xs lg:text-sm pl-3 pr-7 py-2 rounded focus:outline-none focus:border-light_green"
                >
                  <option value={6}>6 per page</option>
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={18}>18 per page</option>
                </select>
                <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-light_green pointer-events-none text-xs" />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-zinc-700 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => dispatch(setViewMode("grid"))}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-light_green text-black"
                      : "bg-[#181818] text-zinc-400 hover:text-white"
                  }`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <FiGrid className="text-base" />
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(setViewMode("list"))}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-light_green text-black"
                      : "bg-[#181818] text-zinc-400 hover:text-white"
                  }`}
                  aria-label="List view"
                  title="List view"
                >
                  <FiList className="text-base" />
                </button>
              </div>

              {/* Mobile Filter Sheet Button */}
              <div className="lg:hidden">
                <RightSideMobile />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-200 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiAlertCircle className="text-xl shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(fetchProducts({ page: 1, limit }))}
                className="text-xs bg-rose-800 hover:bg-rose-700 text-white px-3 py-1.5 rounded"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {[...Array(limit)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#212121] border border-zinc-800 rounded-lg p-4 animate-pulse space-y-4"
                >
                  <div className="aspect-square bg-zinc-800 rounded-md w-full" />
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-1/2" />
                  <div className="h-10 bg-zinc-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div className="bg-[#212121] border border-zinc-800 rounded-xl p-12 text-center my-8">
              <div className="size-16 rounded-full bg-zinc-800/80 text-light_green mx-auto flex items-center justify-center mb-4">
                <FiAlertCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No products found
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                We couldn&apos;t find any products matching your selected search or
                filter criteria. Try adjusting your filters or resetting them.
              </p>
              <button
                type="button"
                onClick={() => dispatch(resetFilters())}
                className="bg-light_green text-black font-bold text-sm px-6 py-2.5 rounded hover:bg-emerald-400 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => {
                const prodId = product._id || product.productId;
                const isFav = wishlist.includes(prodId);
                const firstImage = getFirstImage(product.images);
                const discount =
                  product.mainPrice && product.mainPrice > product.offerPrice
                    ? Math.round(
                        ((product.mainPrice - product.offerPrice) /
                          product.mainPrice) *
                          100
                      )
                    : null;
                const inStock = (product.quantity ?? 10) > 0;

                return (
                  <div
                    key={prodId}
                    className="group flex flex-col justify-between bg-[#1e1e1e] border border-zinc-800 rounded-lg p-4 hover:border-light_green/60 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <div>
                      {/* Product Image & Badges */}
                      <div className="relative aspect-square w-full rounded-md overflow-hidden bg-[#262626]">
                        <Image
                          src={firstImage}
                          alt={product.productName}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Discount Badge */}
                        {discount && (
                          <span className="absolute top-2.5 left-2.5 bg-light_green text-black text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                            -{discount}%
                          </span>
                        )}

                        {/* Stock Tag */}
                        {!inStock && (
                          <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            Out of Stock
                          </span>
                        )}

                        {/* Quick Action Floating Bar */}
                        <div className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {/* Quick View Button */}
                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(product)}
                            className="size-9 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-light_green hover:scale-110 transition-all shadow"
                            title="Quick View"
                            aria-label="Quick View"
                          >
                            <FiEye className="text-base" />
                          </button>

                          {/* Wishlist Button */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            className={`size-9 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow hover:scale-110 ${
                              isFav
                                ? "text-rose-500"
                                : "text-white hover:text-rose-400"
                            }`}
                            title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
                            aria-label="Wishlist"
                          >
                            <FiHeart
                              className={`text-base ${isFav ? "fill-rose-500" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="mt-4">
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-zinc-400 uppercase tracking-wider font-semibold truncate max-w-[65%]">
                            {product.category || "Organic"}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <FaStar className="size-3" />
                            <span className="text-zinc-300 font-semibold text-[11px]">
                              {product.reviews && product.reviews.length > 0
                                ? (
                                    product.reviews.reduce(
                                      (acc, r) => acc + (r.rating || 0),
                                      0
                                    ) / product.reviews.length
                                  ).toFixed(1)
                                : "4.9"}
                            </span>
                          </div>
                        </div>

                        {/* Product Title */}
                        <h4
                          onClick={() => setQuickViewProduct(product)}
                          className="text-base font-bold text-white group-hover:text-light_green transition-colors cursor-pointer line-clamp-1"
                          title={product.productName}
                        >
                          {product.productName}
                        </h4>

                        {/* Weight info if present */}
                        {product.gramToPrice?.[0]?.weight && (
                          <p className="text-xs text-zinc-400 mt-1">
                            Unit: {product.gramToPrice[0].weight}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pricing & Add to Cart */}
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-light_green">
                            ${product.offerPrice.toFixed(2)}
                          </span>
                          {product.mainPrice &&
                            product.mainPrice > product.offerPrice && (
                              <span className="text-xs line-through text-zinc-500">
                                ${product.mainPrice.toFixed(2)}
                              </span>
                            )}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!inStock}
                        onClick={() => handleAddToCart(product)}
                        className={`size-10 rounded-md flex items-center justify-center transition-all ${
                          inStock
                            ? "border border-zinc-700 bg-zinc-800/80 text-light_green hover:bg-light_green hover:text-black hover:border-light_green"
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-transparent"
                        }`}
                        title="Add to cart"
                        aria-label="Add to cart"
                      >
                        <BsFillBasket2Fill className="text-lg" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {products.map((product) => {
                const prodId = product._id || product.productId;
                const isFav = wishlist.includes(prodId);
                const firstImage = getFirstImage(product.images);
                const inStock = (product.quantity ?? 10) > 0;

                return (
                  <div
                    key={prodId}
                    className="flex flex-col sm:flex-row gap-5 bg-[#1e1e1e] border border-zinc-800 rounded-lg p-5 hover:border-light_green/60 transition-all"
                  >
                    {/* Image */}
                    <div className="relative size-40 shrink-0 rounded-md overflow-hidden bg-zinc-800 self-center sm:self-start">
                      <Image
                        src={firstImage}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                          <span className="uppercase font-semibold text-light_green">
                            {product.category}
                          </span>
                          <span
                            className={
                              inStock ? "text-emerald-400 font-medium" : "text-rose-400"
                            }
                          >
                            {inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <h4
                          onClick={() => setQuickViewProduct(product)}
                          className="text-xl font-bold text-white hover:text-light_green cursor-pointer transition-colors"
                        >
                          {product.productName}
                        </h4>
                        <p className="text-sm text-zinc-400 line-clamp-2 mt-2">
                          {product.overview ||
                            product.aboutProduct ||
                            "Naturally farmed, rich in flavor and nutrients."}
                        </p>
                      </div>

                      {/* Pricing and Action row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-zinc-800">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-light_green">
                            ${product.offerPrice.toFixed(2)}
                          </span>
                          {product.mainPrice &&
                            product.mainPrice > product.offerPrice && (
                              <span className="text-sm line-through text-zinc-500">
                                ${product.mainPrice.toFixed(2)}
                              </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product)}
                            className={`p-2.5 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${
                              isFav ? "text-rose-500" : "text-zinc-400"
                            }`}
                            title="Wishlist"
                          >
                            <FiHeart
                              className={`text-lg ${isFav ? "fill-rose-500" : ""}`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(product)}
                            className="px-4 py-2 border border-zinc-700 hover:border-light_green text-zinc-300 hover:text-light_green rounded text-sm font-semibold transition-colors"
                          >
                            Quick View
                          </button>
                          <button
                            type="button"
                            disabled={!inStock}
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center gap-2 px-5 py-2 bg-light_green text-black font-bold rounded hover:bg-emerald-400 transition-colors text-sm disabled:opacity-50"
                          >
                            <BsFillBasket2Fill /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dynamic Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#products-top"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-40"
                          : "hover:border-light_green text-white"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#products-top"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          className={`size-10 flex items-center justify-center rounded font-bold transition-all ${
                            currentPage === pageNum
                              ? "bg-light_green text-black border-light_green"
                              : "bg-[#212121] border border-zinc-800 text-white hover:border-light_green hover:text-light_green"
                          }`}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#products-top"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-40"
                          : "hover:border-light_green text-white"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>

        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <RightSideProducts onQuickView={(p) => setQuickViewProduct(p)} />
        </div>
      </div>

      {/* Quick View Interactive Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={
          quickViewProduct
            ? wishlist.includes(quickViewProduct._id || quickViewProduct.productId)
            : false
        }
        onToggleWishlist={toggleWishlist}
      />
    </section>
  );
};

export default Products;
