"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { placeOrderApi } from "@/lib/store/features/cart/ordersApi";
import { Order } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FiCheckCircle,
  FiLock,
  FiTruck,
  FiCreditCard,
  FiDollarSign,
  FiShield,
  FiPrinter,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliedCoupon?: string;
  discountAmount?: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  appliedCoupon = "",
  discountAmount = 0,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);

  // Steps: 'details' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Customer & Shipping state
  const [customer, setCustomer] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    notes: "",
  });

  // Payment state: 'visa' | 'mastercard' | 'cash_on_delivery'
  const [paymentMethod, setPaymentMethod] = useState<
    "visa" | "mastercard" | "cash_on_delivery"
  >("visa");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: user?.username || "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        fullName: prev.fullName || user.username || "",
        email: prev.email || user.email || "",
      }));
      setCardDetails((prev) => ({
        ...prev,
        cardholderName: prev.cardholderName || user.username || "",
      }));
    }
  }, [user]);

  // Financial calculations
  const shippingFee = totalAmount >= 50 || totalAmount === 0 ? 0 : 5.99;
  const tax = parseFloat((totalAmount * 0.05).toFixed(2));
  const finalTotal = parseFloat(
    Math.max(0, totalAmount + shippingFee + tax - discountAmount).toFixed(2)
  );

  // Format Card Number input with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    // Auto-detect brand based on first digit
    if (value.startsWith("4")) {
      setPaymentMethod("visa");
    } else if (
      value.startsWith("51") ||
      value.startsWith("52") ||
      value.startsWith("53") ||
      value.startsWith("54") ||
      value.startsWith("55") ||
      value.startsWith("22")
    ) {
      setPaymentMethod("mastercard");
    }
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardDetails((prev) => ({ ...prev, expiry: value }));
  };

  // Proceed from Details to Payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim()) {
      toast.error("Please fill in your contact information (Name, Email, Phone).");
      return;
    }
    if (!shippingAddress.street.trim() || !shippingAddress.city.trim() || !shippingAddress.postalCode.trim()) {
      toast.error("Please fill in your delivery address (Street, City, Postal Code).");
      return;
    }
    setStep("payment");
  };

  // Complete Order
  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "visa" || paymentMethod === "mastercard") {
      const cleanCard = cardDetails.cardNumber.replace(/\s+/g, "");
      if (cleanCard.length < 15) {
        toast.error("Please enter a valid 16-digit card number.");
        return;
      }
      if (!cardDetails.cardholderName.trim()) {
        toast.error("Please enter the cardholder's full name.");
        return;
      }
      if (cardDetails.expiry.length < 5) {
        toast.error("Please enter a valid expiration date (MM/YY).");
        return;
      }
      if (cardDetails.cvv.length < 3) {
        toast.error("Please enter a valid 3 or 4 digit security code (CVV).");
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const payload = {
        customer,
        shippingAddress,
        items: items.map((it) => ({
          productId: it.productId,
          productName: it.productName,
          image: it.image,
          price: it.price,
          quantity: it.quantity,
          variant: it.selectedVariant,
        })),
        paymentMethod,
        cardDetails:
          paymentMethod !== "cash_on_delivery"
            ? {
                cardNumber: cardDetails.cardNumber,
                cardholderName: cardDetails.cardholderName,
                expiry: cardDetails.expiry,
                cvv: cardDetails.cvv,
              }
            : undefined,
        couponCode: appliedCoupon,
      };

      const result = await placeOrderApi(payload);

      if (result.success && result.order) {
        setConfirmedOrder(result.order);
        setStep("confirmed");
        dispatch(clearCart());
        toast.success(result.message || "Order placed successfully!");
      } else {
        toast.error(result.message || "Could not process order.");
      }
    } catch (err: unknown) {
      const errorMsg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Payment or checkout failed. Please verify your details.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetAndClose = () => {
    setStep("details");
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="max-w-2xl bg-[#181818] border border-zinc-800 text-white p-6 sm:p-8 rounded-xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
            {step === "confirmed" ? (
              <span className="text-light_green flex items-center gap-2">
                <FiCheckCircle /> Order Confirmation
              </span>
            ) : (
              <span>FarmTrail Secure Checkout</span>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Tracker */}
        {step !== "confirmed" && (
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 my-2 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setStep("details")}
              className={`flex items-center gap-2 ${
                step === "details" ? "text-light_green" : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="size-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Delivery Details</span>
            </button>
            <div className="h-0.5 w-12 bg-zinc-800" />
            <div
              className={`flex items-center gap-2 ${
                step === "payment" ? "text-light_green" : "text-zinc-500"
              }`}
            >
              <span className="size-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Step 1: Customer & Delivery Details */}
        {step === "details" && (
          <form onSubmit={handleProceedToPayment} className="space-y-5 mt-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                <FiTruck className="text-light_green" /> Contact & Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="Jane Doe"
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({ ...customer, fullName: e.target.value })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Email Address *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="jane@example.com"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Phone Number * (for delivery SMS updates)
                  </label>
                  <Input
                    required
                    placeholder="+1 (555) 000-0000"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Street Address *
                  </label>
                  <Input
                    required
                    placeholder="123 Farm Meadow Lane, Apt 4B"
                    value={shippingAddress.street}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        street: e.target.value,
                      })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    City *
                  </label>
                  <Input
                    required
                    placeholder="Portland"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    State / Province
                  </label>
                  <Input
                    placeholder="Oregon"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Postal / Zip Code *
                  </label>
                  <Input
                    required
                    placeholder="97201"
                    value={shippingAddress.postalCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Country
                  </label>
                  <Input
                    disabled
                    value={shippingAddress.country}
                    className="bg-[#1f1f1f] border-zinc-800 text-zinc-400"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <Input
                    placeholder="Leave on front porch, gate code #1234, etc."
                    value={shippingAddress.notes}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        notes: e.target.value,
                      })
                    }
                    className="bg-[#242424] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>
              </div>
            </div>

            {/* Order Brief Summary */}
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex justify-between items-center text-sm">
              <span className="text-zinc-400">Order Subtotal ({items.length} items):</span>
              <span className="font-extrabold text-light_green">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-light_green text-black font-extrabold hover:bg-emerald-400 py-3 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Continue to Payment <FiArrowRight />
            </Button>
          </form>
        )}

        {/* Step 2: Payment Selection & Execution */}
        {step === "payment" && (
          <form onSubmit={handleCompleteOrder} className="space-y-6 mt-2">
            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Visa Button */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("visa")}
                  className={`p-3.5 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === "visa"
                      ? "border-light_green bg-light_green/15 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-black text-xl tracking-tighter text-blue-400">
                    <FiCreditCard className="text-lg" />
                    <span>VISA</span>
                  </div>
                  <span className="text-[11px] font-semibold">Visa Credit / Debit</span>
                </button>

                {/* Mastercard Button */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mastercard")}
                  className={`p-3.5 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === "mastercard"
                      ? "border-light_green bg-light_green/15 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="size-4 rounded-full bg-red-500 inline-block -mr-1.5 opacity-90" />
                    <span className="size-4 rounded-full bg-amber-500 inline-block opacity-90" />
                    <span className="font-bold text-sm tracking-tight text-white ml-1">
                      Mastercard
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold">Mastercard</span>
                </button>

                {/* Cash on Delivery Button */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                  className={`p-3.5 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === "cash_on_delivery"
                      ? "border-light_green bg-light_green/15 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-base">
                    <FiDollarSign className="text-xl" />
                    <span>COD</span>
                  </div>
                  <span className="text-[11px] font-semibold">Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Visa / Mastercard Card Form */}
            {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
              <div className="space-y-4 p-5 bg-[#202020] border border-zinc-800 rounded-lg">
                <div className="flex items-center justify-between border-b border-zinc-700/60 pb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-light_green flex items-center gap-2">
                    <FiCreditCard />
                    {paymentMethod === "visa" ? "Visa Card Details" : "Mastercard Details"}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <FiLock className="text-emerald-400" /> 256-Bit SSL Encrypted
                  </span>
                </div>

                {/* Card Number Input */}
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Card Number *
                  </label>
                  <Input
                    required
                    placeholder={
                      paymentMethod === "visa"
                        ? "4242 •••• •••• 4242"
                        : "5555 •••• •••• 4444"
                    }
                    value={cardDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="bg-[#272727] border-zinc-700 text-white font-mono tracking-wider focus:border-light_green text-base"
                  />
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1">
                    Cardholder Name *
                  </label>
                  <Input
                    required
                    placeholder="Full name as printed on card"
                    value={cardDetails.cardholderName}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardholderName: e.target.value,
                      })
                    }
                    className="bg-[#272727] border-zinc-700 text-white focus:border-light_green"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1">
                      Expiry Date (MM/YY) *
                    </label>
                    <Input
                      required
                      placeholder="12/28"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="bg-[#272727] border-zinc-700 text-white font-mono focus:border-light_green"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-semibold block mb-1">
                      Security Code (CVV / CVC) *
                    </label>
                    <Input
                      required
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })
                      }
                      maxLength={4}
                      className="bg-[#272727] border-zinc-700 text-white font-mono focus:border-light_green"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-1">
                  <FiShield className="text-emerald-400 text-sm shrink-0" />
                  <span>
                    Your card details are verified securely. For testing, standard test
                    numbers (e.g. 4242 4242 4242 4242) are accepted.
                  </span>
                </div>
              </div>
            )}

            {/* Cash on Delivery Notice */}
            {paymentMethod === "cash_on_delivery" && (
              <div className="p-5 bg-emerald-950/30 border border-emerald-800/60 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FiDollarSign className="text-xl" /> Cash on Delivery Confirmed
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  No online payment is required today. Our local farm courier will bring
                  your fresh items to your address. You can pay with exact cash or debit card
                  directly at your doorstep upon receiving your harvest.
                </p>
                <div className="text-[11px] text-emerald-300 font-semibold pt-1">
                  ✓ Freshness check on delivery guaranteed
                </div>
              </div>
            )}

            {/* Order Cost Breakdown */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Items Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Shipping:</span>
                <span>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Tax (5%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-light_green font-bold">
                  <span>Coupon Discount ({appliedCoupon}):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-base font-black text-white">
                <span>Total Due:</span>
                <span className="text-light_green">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("details")}
                className="border-zinc-700 text-zinc-300 hover:text-white px-4"
              >
                <FiArrowLeft className="mr-1" /> Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-light_green text-black font-extrabold hover:bg-emerald-400 py-3 uppercase tracking-wider disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing Order..."
                  : paymentMethod === "cash_on_delivery"
                  ? `Confirm Order & Pay on Delivery ($${finalTotal.toFixed(2)})`
                  : `Pay $${finalTotal.toFixed(2)} via ${
                      paymentMethod === "visa" ? "Visa" : "Mastercard"
                    }`}
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmed View */}
        {step === "confirmed" && confirmedOrder && (
          <div className="space-y-6 text-center py-4">
            <div className="size-20 rounded-full bg-emerald-950/80 border-2 border-light_green text-light_green mx-auto flex items-center justify-center">
              <FiCheckCircle className="text-4xl" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                Order Received!
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Thank you,{" "}
                <span className="text-white font-bold">
                  {confirmedOrder.customer.fullName}
                </span>
                ! We are preparing your fresh farm order.
              </p>
            </div>

            {/* Order Card Receipt */}
            <div className="bg-[#202020] border border-zinc-800 rounded-lg p-5 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-zinc-700/60 pb-3">
                <div>
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                    Order Number
                  </span>
                  <span className="text-base font-black text-light_green font-mono">
                    #{confirmedOrder.orderId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">
                    Payment Status
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                      confirmedOrder.paymentStatus === "paid"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {confirmedOrder.paymentStatus === "paid"
                      ? "Paid via " + confirmedOrder.paymentMethod.toUpperCase()
                      : "Pay on Delivery"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-1">
                <div>
                  <span className="text-zinc-500 font-semibold block">
                    Deliver To:
                  </span>
                  <p className="text-zinc-200 mt-0.5 font-medium">
                    {confirmedOrder.shippingAddress.street},{" "}
                    {confirmedOrder.shippingAddress.city},{" "}
                    {confirmedOrder.shippingAddress.postalCode}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold block">
                    Estimated Delivery:
                  </span>
                  <p className="text-emerald-400 mt-0.5 font-medium">
                    Tomorrow (10:00 AM &ndash; 2:00 PM)
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="border-t border-zinc-800 pt-2 space-y-1.5">
                <span className="text-zinc-500 font-semibold block">
                  Items Ordered ({confirmedOrder.items.length}):
                </span>
                {confirmedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-zinc-300 font-medium"
                  >
                    <span>
                      {item.quantity}x {item.productName}{" "}
                      {item.variant ? `(${item.variant})` : ""}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-3 flex justify-between items-baseline font-bold text-sm">
                <span className="text-white uppercase">Total Paid / Due:</span>
                <span className="text-xl font-black text-light_green">
                  ${confirmedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrint}
                className="border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center gap-2"
              >
                <FiPrinter /> Print Receipt
              </Button>
              <Link href="/orders" onClick={resetAndClose} className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-light_green/60 text-light_green hover:bg-light_green/10 font-bold uppercase tracking-wider"
                >
                  View My Orders
                </Button>
              </Link>
              <Button
                type="button"
                onClick={resetAndClose}
                className="flex-1 bg-light_green text-black font-extrabold hover:bg-emerald-400 uppercase tracking-wider"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
