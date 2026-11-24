"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/lib/store/features/cart/cartSlice";
import CheckoutModal from "@/components/cart/CheckoutModal";
import Loader from "@/components/Loader";
import { BsFillBasket2Fill, BsTrash } from "react-icons/bs";
import {
  FiArrowLeft,
  FiTag,
  FiShield,
  FiTruck,
  FiCheck,
  FiX,
  FiCreditCard,
  FiDollarSign,
} from "react-icons/fi";
import { toast } from "sonner";

const CartPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const { items, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Discount, Shipping & Tax
  const discountAmount = isCouponApplied
    ? parseFloat((totalAmount * 0.1).toFixed(2))
    : 0;
  const freeShippingThreshold = 50;
  const shipping = totalAmount >= freeShippingThreshold || totalAmount === 0 ? 0 : 5.99;
  const tax = parseFloat((totalAmount * 0.05).toFixed(2));
  const finalTotal = parseFloat(
    Math.max(0, totalAmount + shipping + tax - discountAmount).toFixed(2)
  );

  const shippingProgress = Math.min(
    100,
    Math.round((totalAmount / freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === "FARMTRAIL10" || clean === "ORGANIC10") {
      const discount = parseFloat((totalAmount * 0.1).toFixed(2));
      setAppliedCoupon(clean);
      setIsCouponApplied(true);
      toast.success(`Coupon "${clean}" applied! 10% discount ($${discount})`);
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code. Try using 'FARMTRAIL10' for 10% off!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    setIsCouponApplied(false);
    toast.info("Coupon removed");
  };

  if (!mounted) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#161616] text-white">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center gap-4 bg-[#212121] border-b border-zinc-800 py-4 lg:pl-[114px] text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <Link
          href="/products"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          Shop
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-light_green font-semibold">Shopping Cart</span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-white">
              Shopping Cart
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              You have <span className="text-light_green font-bold">{totalQuantity}</span>{" "}
              {totalQuantity === 1 ? "item" : "items"} in your basket
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-4">
              <Link
                href="/products"
                className="text-xs text-zinc-400 hover:text-white underline flex items-center gap-1"
              >
                <FiArrowLeft /> Continue Shopping
              </Link>
              <button
                type="button"
                onClick={() => {
                  dispatch(clearCart());
                  setAppliedCoupon("");
                  setIsCouponApplied(false);
                  toast.info("Your shopping cart has been cleared");
                }}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-12 text-center max-w-xl mx-auto my-12 shadow-xl">
            <div className="size-20 rounded-full bg-zinc-800/90 text-light_green mx-auto flex items-center justify-center mb-6">
              <BsFillBasket2Fill className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
              You haven&apos;t added any organic farm produce yet. Explore our fresh
              harvest including fruits, dairy, cold-pressed juices, and bundles.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-light_green text-black font-extrabold px-8 py-3.5 rounded hover:bg-emerald-400 transition-colors uppercase tracking-wider text-sm shadow-lg"
            >
              <FiArrowLeft /> Browse Organic Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 bg-[#1f1f1f] border border-zinc-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <FiTruck className="text-light_green text-base" />
                    {shipping === 0 ? (
                      <span className="text-emerald-400 font-bold">
                        🎉 Congratulations! You have unlocked Free Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <strong className="text-light_green">
                          ${(freeShippingThreshold - totalAmount).toFixed(2)}
                        </strong>{" "}
                        more to qualify for FREE Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-zinc-400">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-light_green h-full rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-lg overflow-hidden shadow-lg">
                <div className="divide-y divide-zinc-800">
                  {items.map((item) => (
                    <div
                      key={`${item._id}_${item.selectedVariant || ""}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Product Image & Info */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative size-20 sm:size-24 shrink-0 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.productName}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-base sm:text-lg truncate">
                            {item.productName}
                          </h3>
                          {item.selectedVariant && (
                            <span className="inline-block mt-1 text-xs bg-zinc-800 text-light_green px-2.5 py-0.5 rounded border border-zinc-700">
                              Unit: {item.selectedVariant}
                            </span>
                          )}
                          <div className="text-sm text-light_green font-bold mt-1.5 sm:hidden">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Controls and Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                        <span className="hidden sm:inline font-bold text-light_green text-base">
                          ${item.price.toFixed(2)}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-zinc-700 rounded bg-zinc-800">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  variant: item.selectedVariant,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="px-3 py-1.5 text-zinc-400 hover:text-white text-sm"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  variant: item.selectedVariant,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="px-3 py-1.5 text-zinc-400 hover:text-white text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line Subtotal */}
                        <span className="font-bold text-white text-base sm:text-lg w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(
                              removeFromCart({
                                id: item._id,
                                variant: item.selectedVariant,
                              })
                            );
                            toast.info(`Removed ${item.productName} from cart`);
                          }}
                          className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <BsTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon / Promo Box */}
              <div className="p-5 bg-[#1f1f1f] border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white mb-3">
                  <FiTag className="text-light_green" /> Have a Promo Code?
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400 text-lg" />
                      <span className="text-sm font-bold text-white">
                        {appliedCoupon} &mdash; 10% Discount Applied (-${discountAmount.toFixed(2)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-zinc-400 hover:text-rose-400 p-1"
                      title="Remove coupon"
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'FARMTRAIL10' for 10% off"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-[#272727] border border-zinc-700 px-4 py-2.5 rounded text-sm text-white focus:outline-none focus:border-light_green"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-6 space-y-6 sticky top-28 shadow-xl">
                <h2 className="text-lg font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-light_green font-normal">
                    {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                  </span>
                </h2>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-zinc-300">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-white">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-300">
                    <span>Estimated Shipping</span>
                    <span className="font-bold">
                      {shipping === 0 ? (
                        <span className="text-light_green font-semibold">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-300">
                    <span>Estimated Tax (5%)</span>
                    <span className="font-bold text-white">${tax.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-light_green font-bold">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-white uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-2xl font-black text-light_green">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-4 bg-light_green text-black font-black uppercase tracking-wider rounded-lg text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
                >
                  <FiCreditCard className="text-lg" /> Proceed to Checkout
                </button>

                {/* Payment Methods Badges */}
                <div className="pt-2 border-t border-zinc-800/80 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold block text-center">
                    Accepted Payment Methods
                  </span>
                  <div className="flex items-center justify-center gap-3 text-xs font-semibold">
                    <span className="px-2.5 py-1 bg-zinc-800 rounded border border-zinc-700 text-blue-400 font-bold flex items-center gap-1">
                      <FiCreditCard /> VISA
                    </span>
                    <span className="px-2.5 py-1 bg-zinc-800 rounded border border-zinc-700 text-amber-400 font-bold flex items-center gap-1">
                      <FiCreditCard /> Mastercard
                    </span>
                    <span className="px-2.5 py-1 bg-zinc-800 rounded border border-zinc-700 text-emerald-400 font-bold flex items-center gap-1">
                      <FiDollarSign /> Cash on Delivery
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-1 space-y-2 text-xs text-zinc-400 border-t border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-light_green text-base shrink-0" />
                    <span>256-bit SSL encrypted secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-light_green text-base shrink-0" />
                    <span>Next-day doorstep farm delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        appliedCoupon={appliedCoupon}
        discountAmount={discountAmount}
      />
    </main>
  );
};

export default CartPage;
