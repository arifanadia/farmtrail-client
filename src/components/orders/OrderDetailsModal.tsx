"use client";

import React from "react";
import Image from "next/image";
import { Order } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTruck,
  FiXCircle,
  FiMapPin,
  FiCreditCard,
  FiDollarSign,
  FiPrinter,
  FiRefreshCw,
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onReorder: (order: Order) => void;
}

const ORDER_STEPS: Array<{
  key: Order["orderStatus"];
  label: string;
  icon: React.ReactNode;
}> = [
  { key: "confirmed", label: "Confirmed", icon: <FiCheckCircle /> },
  { key: "processing", label: "Processing", icon: <FiPackage /> },
  { key: "shipped", label: "Shipped", icon: <FiTruck /> },
  { key: "delivered", label: "Delivered", icon: <FiCheckCircle /> },
];

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onReorder,
}) => {
  if (!order) return null;

  const isCancelled = order.orderStatus === "cancelled";
  const currentStepIdx = ORDER_STEPS.findIndex(
    (s) => s.key === order.orderStatus
  );

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#181818] border border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-wider text-white">
                Order{" "}
                <span className="text-light_green font-mono">
                  #{order.orderId}
                </span>
              </DialogTitle>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                <FiClock className="text-zinc-500" /> Placed on {formattedDate}
              </p>
            </div>

            <span
              className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${
                isCancelled
                  ? "bg-rose-950/70 text-rose-400 border-rose-800"
                  : order.orderStatus === "delivered"
                  ? "bg-emerald-950/70 text-emerald-400 border-emerald-800"
                  : "bg-amber-950/60 text-amber-300 border-amber-800/80"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Order Tracking Stepper */}
          {isCancelled ? (
            <div className="bg-rose-950/30 border border-rose-900/60 rounded-lg p-4 flex items-center gap-3 text-rose-300 text-sm">
              <FiXCircle className="text-xl shrink-0 text-rose-400" />
              <div>
                <p className="font-bold">This order was cancelled</p>
                <p className="text-xs text-rose-300/80">
                  If you were charged, any applicable refund will be processed to
                  your original payment method.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#202020] border border-zinc-800 rounded-lg p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-4">
                Order Progress
              </p>
              <div className="grid grid-cols-4 gap-2 relative">
                {ORDER_STEPS.map((step, idx) => {
                  const completed = idx <= currentStepIdx;
                  const active = idx === currentStepIdx;
                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center text-center relative z-10"
                    >
                      <div
                        className={`size-9 rounded-full flex items-center justify-center text-base border-2 transition-colors ${
                          completed
                            ? "bg-light_green text-black border-light_green"
                            : "bg-zinc-900 text-zinc-500 border-zinc-700"
                        } ${active ? "ring-4 ring-light_green/20" : ""}`}
                      >
                        {step.icon}
                      </div>
                      <span
                        className={`text-[11px] mt-2 font-semibold ${
                          completed ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#202020] border border-zinc-800 rounded-lg p-4 space-y-2 text-xs">
              <h4 className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <FiMapPin className="text-light_green" /> Shipping Address
              </h4>
              <p className="text-white font-semibold text-sm">
                {order.customer.fullName}
              </p>
              <p className="text-zinc-300 leading-relaxed">
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}
                {order.shippingAddress.state
                  ? `, ${order.shippingAddress.state}`
                  : ""}{" "}
                {order.shippingAddress.postalCode}
                {order.shippingAddress.country
                  ? `, ${order.shippingAddress.country}`
                  : ""}
              </p>
              {order.shippingAddress.notes && (
                <p className="text-zinc-400 italic pt-1 border-t border-zinc-800">
                  Note: &ldquo;{order.shippingAddress.notes}&rdquo;
                </p>
              )}
            </div>

            <div className="bg-[#202020] border border-zinc-800 rounded-lg p-4 space-y-2 text-xs">
              <h4 className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                {order.paymentMethod === "cash_on_delivery" ? (
                  <FiDollarSign className="text-light_green" />
                ) : (
                  <FiCreditCard className="text-light_green" />
                )}
                Payment & Contact
              </h4>
              <div className="space-y-1 text-zinc-300">
                <p className="flex items-center gap-2">
                  <FiUser className="text-zinc-500 shrink-0" />
                  <span>{order.customer.fullName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-zinc-500 shrink-0" />
                  <span className="truncate">{order.customer.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-zinc-500 shrink-0" />
                  <span>{order.customer.phone}</span>
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-zinc-400">Method:</span>
                <span className="font-semibold text-white uppercase">
                  {order.paymentMethod === "cash_on_delivery"
                    ? "Cash on Delivery"
                    : `${order.paymentMethod}${
                        order.paymentDetails?.last4
                          ? ` •••• ${order.paymentDetails.last4}`
                          : ""
                      }`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Payment:</span>
                <span
                  className={`font-bold uppercase text-[11px] px-2 py-0.5 rounded ${
                    order.paymentStatus === "paid"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : order.paymentStatus === "failed"
                      ? "bg-rose-950 text-rose-400 border border-rose-800"
                      : "bg-amber-950 text-amber-400 border border-amber-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentDetails?.transactionId && (
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Ref:</span>
                  <span className="font-mono text-[11px] text-zinc-300">
                    {order.paymentDetails.transactionId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Items */}
          <div className="bg-[#202020] border border-zinc-800 rounded-lg p-4">
            <h4 className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] mb-3">
              Items ({order.items.length})
            </h4>
            <div className="divide-y divide-zinc-800">
              {order.items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-12 rounded-md bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiPackage className="text-zinc-600 text-lg" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-zinc-400">
                        Qty: {item.quantity} &times; ${item.price.toFixed(2)}
                        {item.variant ? ` • ${item.variant}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="bg-[#202020] border border-zinc-800 rounded-lg p-4 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-zinc-200">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-zinc-200">
                {order.shippingFee === 0
                  ? "FREE"
                  : `$${order.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated Tax</span>
              <span className="text-zinc-200">${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-zinc-700 pt-2.5 mt-2 flex justify-between items-baseline">
              <span className="text-sm font-bold uppercase text-white">
                Total
              </span>
              <span className="text-xl font-black text-light_green">
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrint}
              className="border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center gap-2"
            >
              <FiPrinter /> Print Receipt
            </Button>
            <Button
              type="button"
              onClick={() => onReorder(order)}
              className="flex-1 bg-light_green text-black font-extrabold hover:bg-emerald-400 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FiRefreshCw /> Reorder Items
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
