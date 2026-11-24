"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import { logoutUser } from "@/lib/store/features/authentication/authSlice";
import { getUserOrdersApi } from "@/lib/store/features/cart/ordersApi";
import { Order } from "@/types";
import Loader from "@/components/Loader";
import ProfileOrdersTab from "./ProfileOrdersTab";
import ProfileAddressesTab from "./ProfileAddressesTab";
import ProfileSettingsTab from "./ProfileSettingsTab";
import { toast } from "sonner";
import {
  FiUser,
  FiPackage,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiShoppingCart,
  FiCheckCircle,
  FiArrowRight,
  FiCamera,
} from "react-icons/fi";

type ProfileTab = "orders" | "addresses" | "settings";

const AVATAR_OPTIONS = ["/user.jpg", "/about.jpg", "/Raspberries.jpg"];

const ProfileClient = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const cartQuantity = useSelector(
    (state: RootState) => state.cart?.totalQuantity || 0
  );

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileTab>("orders");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  // Local profile extras (phone, bio, avatar)
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/user.jpg");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchOrders = useCallback(async (email: string) => {
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const data = await getUserOrdersApi(email);
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not load your orders.";
      setOrdersError(msg);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    fetchOrders(user.email);

    try {
      const raw = localStorage.getItem(
        `farmtrail_profile_${user.email.toLowerCase()}`
      );
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.bio) setBio(parsed.bio);
        if (parsed.avatarUrl) setAvatarUrl(parsed.avatarUrl);
      }
    } catch {
      // Ignore malformed localStorage data
    }
  }, [user?.email, fetchOrders]);

  const handleUpdateLocalDetails = (nextPhone: string, nextBio: string) => {
    setPhone(nextPhone);
    setBio(nextBio);
    if (!user?.email) return;
    localStorage.setItem(
      `farmtrail_profile_${user.email.toLowerCase()}`,
      JSON.stringify({ phone: nextPhone, bio: nextBio, avatarUrl })
    );
  };

  const handleSelectAvatar = (url: string) => {
    setAvatarUrl(url);
    setShowAvatarPicker(false);
    if (user?.email) {
      localStorage.setItem(
        `farmtrail_profile_${user.email.toLowerCase()}`,
        JSON.stringify({ phone, bio, avatarUrl: url })
      );
    }
    toast.success("Profile picture updated.");
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.info("Signed out of Farmtrail.");
    router.push("/");
  };

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const activeOrders = orders.filter(
      (o) => o.orderStatus !== "delivered" && o.orderStatus !== "cancelled"
    ).length;
    const totalSpent = orders
      .filter((o) => o.orderStatus !== "cancelled")
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    return { totalOrders, activeOrders, totalSpent };
  }, [orders]);

  if (!mounted) {
    return <Loader />;
  }

  // Unauthenticated state
  if (!user) {
    return (
      <main className="min-h-screen pt-28 pb-16 px-5 bg-[#161616] text-white flex items-center justify-center">
        <div className="max-w-lg w-full rounded-2xl border border-light-br bg-[#1f1f1f] p-8 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-light_green/10 border border-light_green/30 flex items-center justify-center text-light_green">
            <FiUser className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-dmSans font-bold text-white">
              Sign in to view your profile
            </h1>
            <p className="text-sm text-gray-400">
              Track your farm-to-door orders, manage saved delivery addresses,
              and customize your Farmtrail account.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition"
            >
              Sign In <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-light-br text-white font-medium text-sm hover:border-light_green hover:text-light_green transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayName =
    user.username?.trim() || user.email.split("@")[0] || "Farmtrail Client";

  const tabs: Array<{
    id: ProfileTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    {
      id: "orders",
      label: "Order History",
      icon: <FiPackage className="w-4 h-4" />,
      badge: orders.length > 0 ? orders.length : undefined,
    },
    {
      id: "addresses",
      label: "Saved Addresses",
      icon: <FiMapPin className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: <FiSettings className="w-4 h-4" />,
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#161616] text-white">
      <div className="max-w-6xl mx-auto px-5 space-y-8">
        {/* Profile Header Card */}
        <section className="rounded-2xl border border-light-br bg-gradient-to-br from-[#1f1f1f] via-[#1b221a] to-[#171f16] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-light_green/60 bg-black">
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker((prev) => !prev)}
                  aria-label="Change avatar"
                  className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-light_green text-black shadow-md hover:bg-light_green/90 transition"
                >
                  <FiCamera className="w-3.5 h-3.5" />
                </button>

                {showAvatarPicker && (
                  <div className="absolute left-0 top-28 z-20 p-2.5 rounded-xl bg-[#1f1f1f] border border-light-br shadow-xl flex items-center gap-2">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectAvatar(opt)}
                        className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition ${
                          avatarUrl === opt
                            ? "border-light_green"
                            : "border-transparent hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={opt}
                          alt="Avatar option"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-dmSans font-bold text-white">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-light_green/15 text-light_green border border-light_green/30">
                    <FiCheckCircle className="w-3 h-3" />
                    Client Account
                  </span>
                </div>
                <p className="text-sm text-gray-300">{user.email}</p>
                {(phone || bio) && (
                  <p className="text-xs text-gray-400">
                    {[phone, bio].filter(Boolean).join(" • ")}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition"
              >
                Shop Produce
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-light-br text-sm font-medium text-gray-200 hover:border-red-400/60 hover:text-red-400 transition"
              >
                <FiLogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-light-br/60">
            <div className="rounded-xl bg-black/30 border border-light-br/50 p-4">
              <p className="text-xs text-gray-400">Total Orders</p>
              <p className="text-2xl font-dmSans font-bold text-white mt-1">
                {stats.totalOrders}
              </p>
            </div>
            <div className="rounded-xl bg-black/30 border border-light-br/50 p-4">
              <p className="text-xs text-gray-400">Active Deliveries</p>
              <p className="text-2xl font-dmSans font-bold text-light_green mt-1">
                {stats.activeOrders}
              </p>
            </div>
            <div className="rounded-xl bg-black/30 border border-light-br/50 p-4">
              <p className="text-xs text-gray-400">Total Spent</p>
              <p className="text-2xl font-dmSans font-bold text-white mt-1">
                ${stats.totalSpent.toFixed(2)}
              </p>
            </div>
            <Link
              href="/cart"
              className="rounded-xl bg-black/30 border border-light-br/50 p-4 hover:border-light_green/60 transition group"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Basket Items</p>
                <FiShoppingCart className="w-4 h-4 text-gray-400 group-hover:text-light_green transition" />
              </div>
              <p className="text-2xl font-dmSans font-bold text-white mt-1">
                {cartQuantity}
              </p>
            </Link>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-light-br pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-light_green text-black font-semibold"
                    : "bg-[#1f1f1f] text-gray-300 border border-light-br hover:border-gray-400"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <section>
          {activeTab === "orders" && (
            <ProfileOrdersTab
              orders={orders}
              loading={ordersLoading}
              error={ordersError}
              onRetry={() => fetchOrders(user.email)}
            />
          )}
          {activeTab === "addresses" && (
            <ProfileAddressesTab
              userEmail={user.email}
              defaultName={displayName}
            />
          )}
          {activeTab === "settings" && (
            <ProfileSettingsTab
              user={user}
              phone={phone}
              bio={bio}
              onUpdateLocalDetails={handleUpdateLocalDetails}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfileClient;
