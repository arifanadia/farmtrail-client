"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import {
  getUserOrdersApi,
  getOrderByIdApi,
} from "@/lib/store/features/cart/ordersApi";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { Order, Product } from "@/types";
import OrderDetailsModal from "@/components/orders/OrderDetailsModal";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiPackage,
  FiSearch,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiEye,
  FiRefreshCw,
  FiArrowRight,
  FiShoppingBag,
  FiLogIn,
} from "react-icons/fi";
import { toast } from "sonner";

type StatusFilter =
  | "all"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const STATUS_TABS: Array<{ key: StatusFilter; label: string }> = [
  { key: "all", label: "All Orders" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const statusBadgeStyle = (status: Order["orderStatus"]) => {
  switch (status) {
    case "delivered":
      return "bg-emerald-950/80 text-emerald-400 border-emerald-800";
    case "shipped":
      return "bg-sky-950/80 text-sky-400 border-sky-800";
    case "processing":
      return "bg-amber-950/80 text-amber-300 border-amber-800";
    case "cancelled":
      return "bg-rose-950/80 text-rose-400 border-rose-800";
    case "confirmed":
    default:
      return "bg-lime-950/80 text-light_green border-lime-800";
  }
};

const statusIcon = (status: Order["orderStatus"]) => {
  switch (status) {
    case "delivered":
      return <FiCheckCircle className="text-emerald-400" />;
    case "shipped":
      return <FiTruck className="text-sky-400" />;
    case "processing":
      return <FiPackage className="text-amber-300" />;
    case "cancelled":
      return <FiXCircle className="text-rose-400" />;
    case "confirmed":
    default:
      return <FiClock className="text-light_green" />;
  }
};

const OrdersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Track by Order ID (works for both guests and logged-in users)
  const [trackIdInput, setTrackIdInput] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Selected order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchUserOrders = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserOrdersApi(email);
      if (data?.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Could not load your order history. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mounted && user?.email) {
      fetchUserOrders(user.email);
    }
  }, [mounted, user?.email, fetchUserOrders]);

  const handleTrackById = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackIdInput.trim().replace(/^#/, "");
    if (!cleanId) {
      toast.error("Please enter an Order ID (e.g. FT-202611-1234).");
      return;
    }
    setTrackingLoading(true);
    try {
      const data = await getOrderByIdApi(cleanId);
      if (data?.success && data.order) {
        setSelectedOrder(data.order);
        setIsDetailsOpen(true);
      } else {
        toast.error("Order not found. Please check your Order ID.");
      }
    } catch {
      toast.error("Order not found. Please double-check the Order ID.");
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const productLike: Product = {
        _id: item._id || item.productId,
        productId: item.productId,
        sku: item.productId,
        productName: item.productName,
        offerPrice: item.price,
        mainPrice: item.mainPrice || item.price,
        category: "Organic",
        images: item.image ? [item.image] : ["/placeholder.jpg"],
      };
      dispatch(
        addToCart({
          product: productLike,
          quantity: item.quantity,
          variant: item.variant || item.selectedVariant || "",
          price: item.price,
        })
      );
    });
    toast.success(
      `Added ${order.items.length} ${
        order.items.length === 1 ? "item" : "items"
      } from #${order.orderId} to your cart!`
    );
    setIsDetailsOpen(false);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesStatus;
      const matchesId = order.orderId.toLowerCase().includes(q);
      const matchesItem = order.items.some((it) =>
        it.productName.toLowerCase().includes(q)
      );
      return matchesStatus && (matchesId || matchesItem);
    });
  }, [orders, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = orders.length;
    const active = orders.filter((o) =>
      ["confirmed", "processing", "shipped"].includes(o.orderStatus)
    ).length;
    const delivered = orders.filter(
      (o) => o.orderStatus === "delivered"
    ).length;
    const totalSpent = orders
      .filter((o) => o.orderStatus !== "cancelled")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    return { total, active, delivered, totalSpent };
  }, [orders]);

  if (!mounted) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#161616] text-white">
      {/* Breadcrumb banner */}
      <div className="h-16 w-full pl-5 flex items-center gap-4 bg-[#212121] border-b border-zinc-800 py-4 lg:pl-[114px] text-sm">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-light_green font-semibold">My Orders</span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-10 space-y-8">
        {/* Header + Track by Order ID */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-white">
              Client Orders
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track your fresh farm deliveries, view receipts, and reorder
              favorites.
            </p>
          </div>

          <form
            onSubmit={handleTrackById}
            className="flex items-center gap-2 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                value={trackIdInput}
                onChange={(e) => setTrackIdInput(e.target.value)}
                placeholder="Track by Order ID (e.g. FT-...)"
                className="pl-9 bg-[#222222] border-zinc-700 text-white placeholder:text-zinc-500 focus:border-light_green"
              />
            </div>
            <Button
              type="submit"
              disabled={trackingLoading}
              className="bg-light_green text-black font-bold hover:bg-emerald-400 shrink-0"
            >
              {trackingLoading ? "Finding..." : "Track Order"}
            </Button>
          </form>
        </div>

        {/* Not logged in state */}
        {!user?.email ? (
          <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-10 text-center max-w-xl mx-auto my-8 shadow-xl">
            <div className="size-16 rounded-full bg-zinc-800 text-light_green mx-auto flex items-center justify-center mb-5">
              <FiLogIn className="text-3xl" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Sign in to view your order history
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Log in to see all orders linked to your account, or use the{" "}
              <span className="text-white font-semibold">Track Order</span>{" "}
              search box above with your Order ID.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/login">
                <Button className="bg-light_green text-black font-extrabold hover:bg-emerald-400 uppercase tracking-wider px-6">
                  Sign In
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-200 hover:text-white px-6"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-400 uppercase font-semibold">
                  Total Orders
                </p>
                <p className="text-2xl font-black text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-400 uppercase font-semibold">
                  In Progress
                </p>
                <p className="text-2xl font-black text-amber-300 mt-1">
                  {stats.active}
                </p>
              </div>
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-400 uppercase font-semibold">
                  Delivered
                </p>
                <p className="text-2xl font-black text-emerald-400 mt-1">
                  {stats.delivered}
                </p>
              </div>
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-400 uppercase font-semibold">
                  Total Spent
                </p>
                <p className="text-2xl font-black text-light_green mt-1">
                  ${stats.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1f1f1f] border border-zinc-800 rounded-xl p-4">
              <div className="flex flex-wrap gap-2">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      statusFilter === tab.key
                        ? "bg-light_green text-black"
                        : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by ID or item..."
                  className="pl-9 bg-zinc-900 border-zinc-700 text-white text-sm placeholder:text-zinc-500 focus:border-light_green"
                />
              </div>
            </div>

            {/* Orders List */}
            {loading ? (
              <div className="py-16">
                <Loader />
              </div>
            ) : error ? (
              <div className="bg-[#1f1f1f] border border-rose-900/60 rounded-xl p-8 text-center">
                <p className="text-rose-400 font-semibold mb-4">{error}</p>
                <Button
                  onClick={() => user?.email && fetchUserOrders(user.email)}
                  className="bg-light_green text-black font-bold hover:bg-emerald-400"
                >
                  Retry
                </Button>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-[#1f1f1f] border border-zinc-800 rounded-xl p-12 text-center">
                <div className="size-16 rounded-full bg-zinc-800 text-light_green mx-auto flex items-center justify-center mb-4">
                  <FiShoppingBag className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {orders.length === 0
                    ? "No orders yet"
                    : "No matching orders found"}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">
                  {orders.length === 0
                    ? "Looks like you haven't placed an order yet. Explore our fresh organic produce and farm goods!"
                    : "Try clearing your status filter or search query to see your orders."}
                </p>
                {orders.length === 0 ? (
                  <Link href="/products">
                    <Button className="bg-light_green text-black font-extrabold hover:bg-emerald-400 uppercase tracking-wider inline-flex items-center gap-2">
                      Shop Now <FiArrowRight />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatusFilter("all");
                      setSearchQuery("");
                    }}
                    className="border-zinc-700 text-zinc-200 hover:text-white"
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const placedDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Recent";

                  return (
                    <div
                      key={order._id || order.orderId}
                      className="bg-[#1f1f1f] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-colors"
                    >
                      {/* Top row */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                        <div className="flex flex-wrap items-center gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                              Order ID
                            </span>
                            <span className="text-base font-black text-light_green font-mono">
                              #{order.orderId}
                            </span>
                          </div>
                          <div className="hidden sm:block h-8 w-px bg-zinc-800" />
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                              Placed On
                            </span>
                            <span className="text-sm text-zinc-200 font-medium">
                              {placedDate}
                            </span>
                          </div>
                          <div className="hidden sm:block h-8 w-px bg-zinc-800" />
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                              Payment
                            </span>
                            <span className="text-xs font-semibold text-zinc-300 uppercase">
                              {order.paymentMethod === "cash_on_delivery"
                                ? "Cash on Delivery"
                                : order.paymentMethod}{" "}
                              ({order.paymentStatus})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1 rounded-full border ${statusBadgeStyle(
                              order.orderStatus
                            )}`}
                          >
                            {statusIcon(order.orderStatus)}
                            {order.orderStatus}
                          </span>
                          <span className="text-lg font-black text-white">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={`${item.productId}-${idx}`}
                              className="flex items-center gap-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2"
                            >
                              <div className="size-10 rounded bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.productName}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <FiPackage className="text-zinc-500" />
                                )}
                              </div>
                              <div className="text-xs">
                                <p className="font-semibold text-white max-w-[160px] truncate">
                                  {item.productName}
                                </p>
                                <p className="text-zinc-400">
                                  {item.quantity} &times; $
                                  {item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <span className="text-xs text-zinc-400 font-semibold px-2">
                              +{order.items.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleReorder(order)}
                            className="border-zinc-700 text-zinc-200 hover:text-white text-xs flex items-center gap-1.5"
                          >
                            <FiRefreshCw /> Reorder
                          </Button>
                          <Button
                            type="button"
                            onClick={() => openOrderDetails(order)}
                            className="bg-light_green text-black font-bold hover:bg-emerald-400 text-xs flex items-center gap-1.5"
                          >
                            <FiEye /> View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onReorder={handleReorder}
      />
    </main>
  );
};

export default OrdersPage;
