import React from "react";
import type { Metadata } from "next";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
  title: "My Profile | Farmtrail",
  description:
    "Manage your Farmtrail client profile, view order history, saved delivery addresses, and account preferences.",
};

const ProfilePage = () => {
  return <ProfileClient />;
};

export default ProfilePage;
