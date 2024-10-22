import Image from "next/image";
import React from "react";

const Overview = () => {
  return (
    <section className="my-12 lg:my-24">
      <div className="w-full text-center lg:text-left">
        <span className="subtle-regular lg:small-regular text-light_green uppercase">
          About company
        </span>
        <h2 className="h3-bold xl:h2-bold lg:w-[50%]">
          We have the technical expertise to develop your next innovation
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-12">
        <div className="col-span-1 text-center lg:text-left">
          <h2 className="text-light_green base-bold lg:h3-bold">
            since <span className="h3-bold lg:h2-bold">1980</span> s
          </h2>
          <p className="small-regular lg:base-regular text-light-2">
            Cras sed felis eget velit aliquet sagittis. <br />
            Varius quam quisque vel quam.{" "}
          </p>
          <Image
            src={"/about/overview1.jpg"}
            width={600}
            height={600}
            alt="about"
            className="object-cover w-full h-[250px] lg:w-[400px] lg:h-[500px] mt-8"
          />
        </div>
        <div className="col-span-2 mt-6 lg:mt-0">
          <div className="flex-between">
            <div>
              <h2 className="text-light_green h3-bold lg:h2-bold"> 99%</h2>
              <p className="small-regular lg:base-regular text-light-2">
                Years of Experience <br /> velit aliquet sagittis
              </p>
            </div>
            <p className="small-regular lg:base-regular text-light-2 w-[60%]">
              At consectetur lorem donec massa sapien faucibus. Bibendum at
              varius vel pharetra vel turpis nunc eget lorem. Placerat
              vestibulum lectus mauris ultrices. Felis bibendum ut tristique et
              egestas quis ipsum. Faucibus nisl tincidunt eget nullam non nisi
              est
            </p>
          </div>
          <Image
            src={"/about/overview2.jpg"}
            width={1000}
            height={600}
            alt="about"
            className="object-cover w-full h-[250px] lg:h-[500px] mt-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
