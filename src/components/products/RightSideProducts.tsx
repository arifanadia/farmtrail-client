"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setInStockOnly,
  resetFilters,
  fetchCategories,
  fetchFeatured,
} from "@/lib/store/features/products/productsSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Timer from "@/components/ui/Timer";
import { IoSearchSharp, IoCloseCircleOutline } from "react-icons/io5";
import { FiX, FiEye } from "react-icons/fi";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Product } from "@/types";

const getFirstImage = (images: string | string[] | undefined): string => {
  if (Array.isArray(images) && images.length > 0) return images[0] || "/placeholder.jpg";
  if (typeof images === "string" && images.trim()) return images;
  return "/placeholder.jpg";
};

interface RightSideProductsProps {
  onQuickView?: (product: Product) => void;
}

const RightSideProducts: React.FC<RightSideProductsProps> = ({ onQuickView }) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    categories,
    categoryCounts,
    minPrice,
    maxPrice,
    searchQuery,
    selectedCategory,
    priceRange,
    inStockOnly,
    totalProducts,
    featuredProducts,
  } = useSelector((state: RootState) => state.products);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeatured(3));
  }, [dispatch]);

  // Sync with redux changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch.trim()));
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    dispatch(setSearchQuery(""));
  };

  const handleCategoryClick = (cat: string) => {
    dispatch(setSelectedCategory(cat));
  };

  const handleRangeChange = (newValues: [number, number]) => {
    setLocalRange(newValues);
  };

  const handleApplyPrice = () => {
    dispatch(setPriceRange(localRange));
  };

  const handleResetPrice = () => {
    const defaultRange: [number, number] = [minPrice, maxPrice];
    setLocalRange(defaultRange);
    dispatch(setPriceRange(defaultRange));
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (selectedCategory !== "All" && selectedCategory !== "") ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice ||
    inStockOnly;

  return (
    <aside className="space-y-8">
      {/* Search Input */}
      <div>
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#272727] text-white border-zinc-700 pr-10 focus:border-light_green h-12 text-sm"
          />
          {localSearch ? (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <IoCloseCircleOutline className="text-xl" />
            </button>
          ) : (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light_green"
            >
              <IoSearchSharp className="text-xl font-bold" />
            </button>
          )}
        </form>
      </div>

      {/* Active Filters Bar if any */}
      {hasActiveFilters && (
        <div className="p-4 bg-[#212121] border border-zinc-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-light_green">
              Active Filters
            </span>
            <button
              type="button"
              onClick={() => dispatch(resetFilters())}
              className="text-xs text-zinc-400 hover:text-rose-400 underline"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-200">
                &ldquo;{searchQuery}&rdquo;
                <FiX
                  className="cursor-pointer hover:text-white"
                  onClick={handleClearSearch}
                />
              </span>
            )}
            {selectedCategory && selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 bg-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-200">
                {selectedCategory}
                <FiX
                  className="cursor-pointer hover:text-white"
                  onClick={() => dispatch(setSelectedCategory("All"))}
                />
              </span>
            )}
            {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <span className="inline-flex items-center gap-1 bg-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-200">
                ${priceRange[0]} - ${priceRange[1]}
                <FiX
                  className="cursor-pointer hover:text-white"
                  onClick={handleResetPrice}
                />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 bg-zinc-800 text-xs px-2.5 py-1 rounded-full text-zinc-200">
                In Stock Only
                <FiX
                  className="cursor-pointer hover:text-white"
                  onClick={() => dispatch(setInStockOnly(false))}
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between p-3 bg-[#242424] border border-zinc-800 rounded">
        <label
          htmlFor="in-stock-toggle"
          className="text-sm font-semibold text-zinc-200 cursor-pointer"
        >
          In Stock Only
        </label>
        <button
          type="button"
          id="in-stock-toggle"
          onClick={() => dispatch(setInStockOnly(!inStockOnly))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            inStockOnly ? "bg-light_green" : "bg-zinc-700"
          }`}
        >
          <span
            className={`inline-block size-4 transform rounded-full bg-black transition-transform ${
              inStockOnly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Product Categories */}
      <div>
        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4 flex items-center justify-between">
          <span>Categories</span>
          <span className="text-xs text-zinc-500 font-normal">
            ({categories.length})
          </span>
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
          {/* All Categories Option */}
          <button
            type="button"
            onClick={() => handleCategoryClick("All")}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-all text-left ${
              selectedCategory === "All" || !selectedCategory
                ? "bg-light_green/20 text-light_green font-bold border-l-4 border-light_green"
                : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <span>All Products</span>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
              {Object.values(categoryCounts).reduce((sum, c) => sum + c, 0) || totalProducts}
            </span>
          </button>

          {/* Dynamic Categories */}
          {categories.map((category) => {
            const isSelected =
              selectedCategory.toLowerCase() === category.toLowerCase();
            const count = categoryCounts[category] || 0;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-all text-left ${
                  isSelected
                    ? "bg-light_green/20 text-light_green font-bold border-l-4 border-light_green"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <div
                    className={`size-2 rounded-full ${
                      isSelected ? "bg-light_green" : "bg-zinc-600"
                    }`}
                  />
                  <span className="truncate">{category}</span>
                </div>
                {count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected
                        ? "bg-light_green text-black font-bold"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold uppercase tracking-wider text-white">
            Filter Price
          </h3>
          {(localRange[0] > minPrice || localRange[1] < maxPrice) && (
            <button
              type="button"
              onClick={handleResetPrice}
              className="text-xs text-zinc-400 hover:text-light_green underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="w-full space-y-4">
          <RangeSlider
            id="range-slider-desktop"
            className="h-2.5 bg-zinc-700 rounded-lg cursor-pointer"
            min={minPrice}
            max={Math.max(maxPrice, minPrice + 10)}
            step={0.5}
            value={localRange}
            onInput={handleRangeChange}
          />

          <div className="flex items-center justify-between text-sm text-zinc-300 font-medium">
            <span className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">
              Min: ${localRange[0].toFixed(2)}
            </span>
            <span className="text-zinc-500">&mdash;</span>
            <span className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700">
              Max: ${localRange[1].toFixed(2)}
            </span>
          </div>

          <Button
            type="button"
            onClick={handleApplyPrice}
            className="w-full bg-light_green text-black font-bold hover:bg-emerald-400 transition-colors"
          >
            Apply Price Filter
          </Button>
        </div>
      </div>

      {/* Recommended Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-base font-bold uppercase tracking-wider text-white">
            Recommended Products
          </h3>
          <div className="space-y-3">
            {featuredProducts.map((prod) => (
              <div
                key={prod._id || prod.productId}
                className="group flex gap-3 items-center p-2 rounded-lg hover:bg-zinc-800/60 transition-all border border-transparent hover:border-zinc-700"
              >
                <div className="relative size-16 shrink-0 rounded overflow-hidden bg-zinc-800">
                  <Image
                    src={getFirstImage(prod.images)}
                    alt={prod.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-zinc-200 truncate group-hover:text-light_green transition-colors">
                    {prod.productName}
                  </h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-light_green">
                      ${prod.offerPrice.toFixed(2)}
                    </span>
                    {prod.mainPrice && prod.mainPrice > prod.offerPrice && (
                      <span className="text-xs line-through text-zinc-500">
                        ${prod.mainPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                {onQuickView && (
                  <button
                    type="button"
                    onClick={() => onQuickView(prod)}
                    className="p-2 text-zinc-500 hover:text-light_green opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Quick View"
                  >
                    <FiEye className="text-lg" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Offer Banner */}
      <div className="relative rounded-lg overflow-hidden border border-zinc-800">
        <Image
          src="/insta/story1.jpg"
          alt="Traditional veggie box"
          width={500}
          height={500}
          className="object-cover size-80 w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-between p-6">
          <span className="self-start text-xs font-black uppercase tracking-wider bg-light_green text-black px-2.5 py-1 rounded">
            -50% Special Deal
          </span>
          <div className="space-y-3">
            <h4 className="text-xl font-bold uppercase text-white leading-tight">
              Traditional Organic Box
            </h4>
            <div className="bg-black/80 backdrop-blur-sm p-3 rounded border border-zinc-800">
              <Timer duration={2 * 24 * 60 * 60 * 1000} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSideProducts;
