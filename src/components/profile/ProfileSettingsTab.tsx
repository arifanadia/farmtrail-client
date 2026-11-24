"use client";

import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import app from "@/lib/firebase/firebase.config";
import { setUser } from "@/lib/store/features/authentication/authSlice";
import { AppDispatch } from "@/lib/store/store";
import { toast } from "sonner";
import { FiUser, FiLock, FiBell, FiSave, FiMail } from "react-icons/fi";

interface ProfileSettingsTabProps {
  user: {
    email: string;
    username: string;
  };
  phone: string;
  bio: string;
  onUpdateLocalDetails: (phone: string, bio: string) => void;
}

interface NotificationPrefs {
  orderUpdates: boolean;
  harvestAlerts: boolean;
  promotions: boolean;
}

const DEFAULT_PREFS: NotificationPrefs = {
  orderUpdates: true,
  harvestAlerts: true,
  promotions: false,
};

const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  phone: initialPhone,
  bio: initialBio,
  onUpdateLocalDetails,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = getAuth(app);

  const [username, setUsername] = useState(user.username || "");
  const [phone, setPhone] = useState(initialPhone);
  const [bio, setBio] = useState(initialBio);
  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const prefsKey = `farmtrail_prefs_${user.email.toLowerCase()}`;
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    setUsername(user.username || "");
  }, [user.username]);

  useEffect(() => {
    setPhone(initialPhone);
    setBio(initialBio);
  }, [initialPhone, initialBio]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(prefsKey);
      if (raw) {
        setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(raw) });
      }
    } catch {
      // Ignore malformed localStorage data
    }
  }, [prefsKey]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = username.trim();
    if (trimmedName.length < 2) {
      toast.error("Display name must be at least 2 characters.");
      return;
    }

    setSaving(true);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: trimmedName });
      }
      dispatch(setUser({ email: user.email, username: trimmedName }));
      onUpdateLocalDetails(phone.trim(), bio.trim());
      toast.success("Profile details updated!");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to update profile.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    setSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Password reset email sent to ${user.email}`);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not send reset email.";
      toast.error(msg);
    } finally {
      setSendingReset(false);
    }
  };

  const togglePref = (key: keyof NotificationPrefs) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    localStorage.setItem(prefsKey, JSON.stringify(next));
    toast.success("Notification preference saved.");
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <form
        onSubmit={handleSaveProfile}
        className="rounded-xl border border-light-br bg-[#1f1f1f] p-6 space-y-5"
      >
        <div className="flex items-center gap-2.5 border-b border-light-br/60 pb-3">
          <FiUser className="w-5 h-5 text-light_green" />
          <div>
            <h3 className="text-base font-dmSans font-bold text-white">
              Personal Information
            </h3>
            <p className="text-xs text-gray-400">
              Update your name, contact phone, and delivery notes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#161616]/60 border border-light-br/60 text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Produce Preferences / Notes
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Organic berries, heirloom tomatoes"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition disabled:opacity-60"
          >
            <FiSave className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Security */}
      <div className="rounded-xl border border-light-br bg-[#1f1f1f] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <FiLock className="w-5 h-5 text-light_green mt-0.5 shrink-0" />
          <div>
            <h3 className="text-base font-dmSans font-bold text-white">
              Password & Security
            </h3>
            <p className="text-xs text-gray-400">
              Send a secure password reset link to{" "}
              <span className="text-gray-200">{user.email}</span>.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handlePasswordReset}
          disabled={sendingReset}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-br text-sm font-medium text-white hover:border-light_green hover:text-light_green transition shrink-0 disabled:opacity-60"
        >
          <FiMail className="w-4 h-4" />
          {sendingReset ? "Sending..." : "Reset Password"}
        </button>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-xl border border-light-br bg-[#1f1f1f] p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-light-br/60 pb-3">
          <FiBell className="w-5 h-5 text-light_green" />
          <div>
            <h3 className="text-base font-dmSans font-bold text-white">
              Notification Preferences
            </h3>
            <p className="text-xs text-gray-400">
              Choose what updates you want to receive from Farmtrail.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              key: "orderUpdates" as const,
              title: "Order & Delivery Updates",
              desc: "Status notifications when your harvest is packed and shipped.",
            },
            {
              key: "harvestAlerts" as const,
              title: "Seasonal Harvest Alerts",
              desc: "Early access when fresh seasonal produce is back in stock.",
            },
            {
              key: "promotions" as const,
              title: "Member Offers & Coupons",
              desc: "Occasional discounts and farm bundle deals.",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#161616] border border-light-br/50 cursor-pointer hover:border-light-br"
            >
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={prefs[item.key]}
                onChange={() => togglePref(item.key)}
                className="w-4 h-4 accent-[#B4E330] cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsTab;
