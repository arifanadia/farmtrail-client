"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Order } from "@/types";
import {
  FiPackage,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiCreditCard,
  FiDollarSign,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";

interface ProfileOrdersTabProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const STATUS_STYLES: Record<Order["orderStatus"], string> = {
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  processing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const PAYMENT_STATUS_STYLES: Record<Order["paymentStatus"], string> = {
  paid: "text-emerald-400",
  pending: "text-amber-400",
  failed: "text-red-400",
};

const STATUS_FILTERS: Array<{ value: "all" | Order["orderStatus"]; label: string }> = [
  { value: "all", label: "All Orders" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatPaymentMethod = (method: Order["paymentMethod"]) => {
  if (method === "visa") return "Visa";
  if (method === "mastercard") return "Mastercard";
  return "Cash on Delivery";
};

const ProfileOrdersTab: React.FC<ProfileOrdersTabProps> = ({
  orders,
  loading,
  error,
  onRetry,
}) => {
  const [statusFilter, setStatusFilter] = useState<"all" | Order["orderStatus"]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;
      const matchesQuery =
        !query ||
        order.orderId.toLowerCase().includes(query) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(query)
        );
      return matchesStatus && matchesQuery;
    });
  }, [orders, statusFilter, searchQuery]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-light-br bg-[#1f1f1f] p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-5 w-36 bg-white/10 rounded" />
              <div className="h-6 w-24 bg-white/10 rounded-full" />
            </div>
            <div className="h-4 w-56 bg-white/10 rounded mb-3" />
            <div className="h-14 w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light_green text-black font-semibold hover:bg-light_green/90 transition"
        >
          <FiRefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                statusFilter === filter.value
                  ? "bg-light_green text-black border-light_green"
                  : "bg-[#1f1f1f] text-gray-300 border-light-br hover:border-gray-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID or item..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[#1f1f1f] border border-light-br text-white placeholder:text-gray-400 focus:outline-none focus:border-light_green"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-light-br bg-[#1f1f1f] p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-light_green/10 border border-light_green/30 flex items-center justify-center text-light_green">
            <FiShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {orders.length === 0 ? "No orders yet" : "No matching orders"}
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            {orders.length === 0
              ? "Explore our fresh, organic farm produce and place your first order."
              : "Try clearing your search or selecting a different order status."}
          </p>
          {orders.length === 0 && (
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition"
            >
              Browse Products
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.orderId;
            return (
              <div
                key={order._id || order.orderId}
                className="rounded-xl border border-light-br bg-[#1f1f1f] overflow-hidden transition hover:border-gray-500"
              >
                {/* Order Summary Row */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 font-dmSans font-bold text-white">
                        <FiPackage className="w-4 h-4 text-light_green" />
                        {order.orderId}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${
                          STATUS_STYLES[order.orderStatus] ||
                          "bg-white/10 text-gray-300 border-white/20"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Placed on {formatDate(order.createdAt)} • {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <div className="text-left sm:text-right">
                      <p className="text-base font-bold text-light_green">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatPaymentMethod(order.paymentMethod)} •{" "}
                        <span
                          className={`capitalize font-medium ${
                            PAYMENT_STATUS_STYLES[order.paymentStatus]
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedOrderId(isExpanded ? null : order.orderId)
                      }
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-br text-xs font-medium text-gray-200 hover:border-light_green hover:text-light_green transition"
                    >
                      {isExpanded ? (
                        <>
                          Hide <FiChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Details <FiChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Order Details */}
                {isExpanded && (
                  <div className="border-t border-light-br bg-[#171717] p-5 space-y-5">
                    {/* Items List */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                        Items Ordered
                      </h4>
                      <div className="divide-y divide-light-br/60 rounded-lg border border-light-br/60 bg-[#1f1f1f]">
                        {order.items.map((item, idx) => (
                          <div
                            key={`${item.productId}-${idx}`}
                            className="p-3 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-black/40 shrink-0 border border-light-br/50">
                                <Image
                                  src={item.image || "/placeholder.jpg"}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {item.productName}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Qty: {item.quantity}
                                  {item.variant || item.selectedVariant
                                    ? ` • ${item.variant || item.selectedVariant}`
                                    : ""}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-semibold text-white shrink-0">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Price Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border border-light-br/60 bg-[#1f1f1f] p-4 space-y-2">
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                          <FiMapPin className="w-3.5 h-3.5 text-light_green" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-white font-medium">
                          {order.customer.fullName}
                        </p>
                        <p className="text-xs text-gray-300 leading-relaxed">
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
                        <p className="text-xs text-gray-400">
                          Phone: {order.customer.phone}
                        </p>
                      </div>

                      <div className="rounded-lg border border-light-br/60 bg-[#1f1f1f] p-4 space-y-2">
                        <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                          {order.paymentMethod === "cash_on_delivery" ? (
                            <FiDollarSign className="w-3.5 h-3.5 text-light_green" />
                          ) : (
                            <FiCreditCard className="w-3.5 h-3.5 text-light_green" />
                          )}
                          Payment Summary
                        </h4>
                        <div className="space-y-1 text-xs text-gray-300">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>
                              {order.shippingFee === 0
                                ? "Free"
                                : `$${order.shippingFee.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-light_green">
                              <span>Discount</span>
                              <span>-${order.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t border-light-br/60 pt-1.5 mt-1.5 flex justify-between text-sm font-bold text-white">
                            <span>Total</span>
                            <span className="text-light_green">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        {order.paymentDetails?.transactionId && (
                          <p className="text-[11px] text-gray-500 pt-1">
                            Ref: {order.paymentDetails.transactionId}
                            {order.paymentDetails.last4
                              ? ` • •••• ${order.paymentDetails.last4}`
                              : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileOrdersTab;
