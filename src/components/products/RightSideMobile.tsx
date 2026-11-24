"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchSharp, IoCloseCircleOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setInStockOnly,
  resetFilters,
} from "@/lib/store/features/products/productsSlice";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const RightSideMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  } = useSelector((state: RootState) => state.products);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory && selectedCategory !== "All" ? 1 : 0) +
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const handleApply = () => {
    dispatch(setSearchQuery(localSearch.trim()));
    dispatch(setPriceRange(localRange));
    setIsOpen(false);
  };

  const handleReset = () => {
    setLocalSearch("");
    const defaultRange: [number, number] = [minPrice, maxPrice];
    setLocalRange(defaultRange);
    dispatch(resetFilters());
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          className="relative flex items-center gap-2 px-4 py-2 border border-zinc-700 bg-[#272727] text-white hover:border-light_green hover:text-light_green"
        >
          <FiFilter className="text-base" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="size-5 rounded-full bg-light_green text-black text-xs font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-sm p-6 bg-[#181818] text-white border-l border-zinc-800 overflow-y-auto"
      >
        <SheetHeader className="mb-6 flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold uppercase tracking-wider text-white">
            Filters
          </SheetTitle>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-rose-400 hover:underline"
            >
              Reset All
            </button>
          )}
        </SheetHeader>

        <div className="space-y-6">
          {/* Search Input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 block">
              Search
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-[#272727] text-white border-zinc-700 pr-10 focus:border-light_green text-sm"
              />
              {localSearch ? (
                <button
                  type="button"
                  onClick={() => setLocalSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <IoCloseCircleOutline className="text-lg" />
                </button>
              ) : (
                <IoSearchSharp className="absolute right-3 top-1/2 -translate-y-1/2 text-light_green text-lg pointer-events-none" />
              )}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#242424] border border-zinc-800 rounded">
            <span className="text-sm font-semibold text-zinc-200">
              In Stock Only
            </span>
            <button
              type="button"
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

          {/* Categories */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block">
              Product Categories
            </label>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => {
                  dispatch(setSelectedCategory("All"));
                }}
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

              {categories.map((category) => {
                const isSelected =
                  selectedCategory.toLowerCase() === category.toLowerCase();
                const count = categoryCounts[category] || 0;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      dispatch(setSelectedCategory(category));
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-all text-left ${
                      isSelected
                        ? "bg-light_green/20 text-light_green font-bold border-l-4 border-light_green"
                        : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className="truncate">{category}</span>
                    {count > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
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

          {/* Price Range */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block">
              Price Range
            </label>
            <RangeSlider
              id="range-slider-mobile"
              className="h-2 bg-zinc-700 rounded-lg cursor-pointer my-4"
              min={minPrice}
              max={Math.max(maxPrice, minPrice + 10)}
              step={0.5}
              value={localRange}
              onInput={setLocalRange}
            />
            <div className="flex items-center justify-between text-xs text-zinc-300 font-medium">
              <span>From: ${localRange[0].toFixed(2)}</span>
              <span>To: ${localRange[1].toFixed(2)}</span>
            </div>
          </div>

          {/* Apply & Reset Buttons */}
          <div className="pt-4 space-y-2">
            <Button
              type="button"
              onClick={handleApply}
              className="w-full bg-light_green text-black font-bold hover:bg-emerald-400"
            >
              Apply Filters
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="w-full border-zinc-700 text-zinc-300 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RightSideMobile;
