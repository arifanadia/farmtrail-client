"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  FiMapPin,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
} from "react-icons/fi";

export interface SavedAddress {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface ProfileAddressesTabProps {
  userEmail: string;
  defaultName?: string;
}

const EMPTY_FORM: Omit<SavedAddress, "id" | "isDefault"> = {
  label: "Home",
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

const ProfileAddressesTab: React.FC<ProfileAddressesTabProps> = ({
  userEmail,
  defaultName = "",
}) => {
  const storageKey = `farmtrail_addresses_${userEmail.toLowerCase()}`;
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setAddresses(JSON.parse(raw));
      }
    } catch {
      // Ignore malformed localStorage data
    }
  }, [storageKey]);

  const persist = (next: SavedAddress[]) => {
    setAddresses(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, fullName: defaultName });
    setIsFormOpen(true);
  };

  const openEditForm = (addr: SavedAddress) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName.trim() ||
      !form.street.trim() ||
      !form.city.trim() ||
      !form.postalCode.trim()
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    if (editingId) {
      const updated = addresses.map((a) =>
        a.id === editingId ? { ...a, ...form } : a
      );
      persist(updated);
      toast.success("Address updated.");
    } else {
      const newAddr: SavedAddress = {
        ...form,
        id: `addr_${Date.now()}`,
        isDefault: addresses.length === 0,
      };
      persist([...addresses, newAddr]);
      toast.success("Address saved.");
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const remaining = addresses.filter((a) => a.id !== id);
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    persist(remaining);
    toast.info("Address removed.");
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    persist(updated);
    toast.success("Default delivery address updated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-dmSans font-bold text-white">
            Saved Delivery Addresses
          </h3>
          <p className="text-xs text-gray-400">
            Manage your shipping addresses for faster farm-to-door checkout.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition shrink-0"
          >
            <FiPlus className="w-4 h-4" />
            Add Address
          </button>
        )}
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-light_green/50 bg-[#1f1f1f] p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white">
              {editingId ? "Edit Address" : "New Delivery Address"}
            </h4>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close form"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Label (e.g., Home, Farm, Office)
              </label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                placeholder="Home"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Recipient Full Name *
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                placeholder="123 Orchard Lane"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">City *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                placeholder="Portland"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                  placeholder="OR"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) =>
                    setForm({ ...form, postalCode: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#161616] border border-light-br text-white focus:outline-none focus:border-light_green"
                  placeholder="97201"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-lg border border-light-br text-sm text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-light_green text-black font-semibold text-sm hover:bg-light_green/90 transition"
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !isFormOpen ? (
        <div className="rounded-xl border border-light-br bg-[#1f1f1f] p-10 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-light_green/10 border border-light_green/30 flex items-center justify-center text-light_green">
            <FiMapPin className="w-5 h-5" />
          </div>
          <h4 className="text-base font-semibold text-white mb-1">
            No saved addresses
          </h4>
          <p className="text-xs text-gray-400">
            Add a home, farm, or office address to keep your delivery details handy.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-xl border p-5 bg-[#1f1f1f] flex flex-col justify-between gap-4 transition ${
                addr.isDefault ? "border-light_green/70" : "border-light-br"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white">
                    <FiMapPin className="w-4 h-4 text-light_green" />
                    {addr.label || "Address"}
                  </span>
                  {addr.isDefault && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-light_green/15 text-light_green border border-light_green/30">
                      <FiCheck className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-200 font-medium">
                  {addr.fullName}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {addr.street}
                  <br />
                  {addr.city}
                  {addr.state ? `, ${addr.state}` : ""} {addr.postalCode}
                  {addr.country ? `, ${addr.country}` : ""}
                </p>
                {addr.phone && (
                  <p className="text-xs text-gray-400">Phone: {addr.phone}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-light-br/60">
                {!addr.isDefault ? (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs font-medium text-light_green hover:underline"
                  >
                    Set as default
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">Primary delivery</span>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditForm(addr)}
                    className="p-1.5 rounded-md border border-light-br text-gray-300 hover:text-white hover:border-gray-400 transition"
                    aria-label="Edit address"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 rounded-md border border-light-br text-gray-300 hover:text-red-400 hover:border-red-400/50 transition"
                    aria-label="Delete address"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAddressesTab;
