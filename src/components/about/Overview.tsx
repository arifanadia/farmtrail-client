import Image from "next/image";
import React from "react";

const Overview = () => {
  return (
    <section className="my-24">
      <div className="w-full">
        <span className="small-regular text-light_green uppercase">
          About company
        </span>
        <h2 className="h2-bold w-[50%]">
          We have the technical expertise to develop your next innovation
        </h2>
      </div>
      <div className="flex  gap-4 items-center">
        <div>
          <h2 className="text-light_green h3-bold">
            {" "}
            since <span className="h2-bold">1980</span> s
          </h2>
          <p className="base-regular text-light-2">
            Cras sed felis eget velit aliquet sagittis. <br />
            Varius quam quisque vel quam.{" "}
          </p>
          <Image
            src={"/about/overview1.jpg"}
            width={600}
            height={600}
            alt="about"
            className="object-cover w-[400px] h-[600px] mt-8"
          />
        </div>
        <div>
          <div className="flex-between">
            <div>
              <h2 className="text-light_green h2-bold"> 99%</h2>
              <p className="base-regular text-light-2">
                Years of Experience velit aliquet sagittis
              </p>
            </div>
            <p className="base-regular text-light-2 w-[40%]">
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
            className="object-cover w-full h-[600px] mt-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
