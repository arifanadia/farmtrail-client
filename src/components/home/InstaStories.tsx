import Link from "next/link";
import React from "react";
import StorieSlider from "./StorieSlider";


const InstaStories = () => {
  return (
    <section className="my-36">
      <div className="text-center">
        <span className="subtle-semibold text-light_green uppercase">
        Our Instagram
        </span>
        <h2 className="h2-bold ">Get the Updates 
        and Stories</h2>
        <Link href="https://www.instagram.com/" className="text-sm text-light_green" >@FarmTrail_Company</Link>
      </div>
      <div>
        <StorieSlider />
      </div>
    </section>
  );
};

export default InstaStories;
