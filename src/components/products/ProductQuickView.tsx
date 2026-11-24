"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FiHeart, FiCheck, FiStar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setSelectedWeight(null);
    setIsAdded(false);
  }, [product]);

  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/placeholder.jpg"];

  // Weight / variant options
  const variants = product.gramToPrice || [];
  const activeVariant = selectedWeight
    ? variants.find((v) => v.weight === selectedWeight)
    : variants[0];

  // Price calculations
  const displayPrice = activeVariant ? activeVariant.price : product.offerPrice;
  const originalPrice = product.mainPrice;
  const discountPercent =
    originalPrice && originalPrice > displayPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : null;

  const inStock = (product.quantity ?? 10) > 0;

  // Average rating
  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          product.reviews.length
        ).toFixed(1)
      : "4.9";

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        variant: activeVariant?.weight ?? "",
        price: displayPrice,
      })
    );
    setIsAdded(true);
    toast.success(`Added ${quantity}x ${product.productName} to your cart!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-6 md:p-8 bg-[#181818] border border-zinc-800 text-white rounded-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.productName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-zinc-800 bg-[#222]">
              <Image
                src={images[selectedImageIndex] || "/placeholder.jpg"}
                alt={product.productName}
                fill
                className="object-cover transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {discountPercent && (
                <span className="absolute top-3 left-3 bg-light_green text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative size-16 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-light_green scale-105"
                        : "border-zinc-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.productName} preview ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="flex flex-col space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-light_green mb-1 font-semibold">
                <span>{product.category || "Organic Farm Produce"}</span>
                {product.sku && (
                  <span className="text-zinc-400">SKU: {product.sku}</span>
                )}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                {product.productName}
              </h2>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`size-4 ${
                      i < Math.floor(Number(avgRating))
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-white">{avgRating}</span>
              <span className="text-zinc-500">
                ({product.reviews?.length || 12} reviews)
              </span>
              <span className="text-zinc-600">|</span>
              <span
                className={`font-medium ${
                  inStock ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {inStock ? `In Stock (${product.quantity ?? 15} left)` : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-2 border-y border-zinc-800">
              <span className="text-3xl font-extrabold text-light_green">
                ${displayPrice.toFixed(2)}
              </span>
              {originalPrice && originalPrice > displayPrice && (
                <span className="text-lg line-through text-zinc-500">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercent && (
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Save ${(originalPrice! - displayPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
              {product.overview ||
                product.aboutProduct ||
                (typeof product.description === "string"
                  ? product.description
                  : "Freshly harvested and naturally grown without chemical pesticides or artificial additives.")}
            </p>

            {/* Variant / Weight Selector if available */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Package Size / Weight:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedWeight(v.weight)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                        (selectedWeight === v.weight || (!selectedWeight && i === 0))
                          ? "border-light_green bg-light_green/20 text-light_green"
                          : "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      {v.weight} &mdash; ${v.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Cart Action */}
            <div className="flex items-center gap-4 pt-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-zinc-700 rounded-md bg-zinc-800/50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                disabled={!inStock}
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : inStock
                    ? "bg-light_green text-black hover:bg-emerald-400"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {isAdded ? (
                  <>
                    <FiCheck className="text-lg" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <BsFillBasket2Fill className="text-lg" /> Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-md border transition-all ${
                    isWishlisted
                      ? "border-rose-500 bg-rose-500/10 text-rose-500"
                      : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <FiHeart className={`text-xl ${isWishlisted ? "fill-rose-500" : ""}`} />
                </button>
              )}
            </div>

            {/* Tags / Badges */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                <span className="text-zinc-500 font-semibold">Tags:</span>
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[11px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
