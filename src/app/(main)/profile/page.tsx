import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";

const Profile = () => {
  return (
    <main className="max-w-7xl mx-5 lg:mx-auto  min-h-screen pt-20">
      <div className="border-2 border-light-br max-w-3xl h-[500px] mx-auto my-24">
        <div className="-mt-20 relative">
            <Image src="/user.jpg" width={150} height={150} alt="" className="size-50 mx-auto rounded-lg" />
           <span className="text-2xl text-red-800 bg-black bg-opacity-20 absolute p-3 left-[54%] bottom-0"><MdEdit /></span>
        </div>
      </div>
    </main>
  );
};

export default Profile;
