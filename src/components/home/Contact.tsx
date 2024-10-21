"use client";
import ContactForm from "@/components/ContactForm";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";


const Contact = () => {
  
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8 items-center  my-24">
      <div className="text-center lg:text-left">
        <span className="subtle-semibold text-light_green uppercase">
          Partner with us
        </span>
        <h2 className="h3-bold lg:h2-bold">We are Here to Help</h2>
        <p className="subtle-regular lg:menu-regular text-light-2 mt-3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tellus
          elementum consequat eget conva.
        </p>
        <div className="text-left flex flex-row md:flex-col gap-4 lg:space-y-8 mt-8">
       
            <div className="flex items-center gap-2 lg:gap-4">
              <HiOutlinePhone className="text-2xl lg:text-5xl font-normal text-light_green" />
              <div>
                <span className="small-regular uppercase hidden lg:block">phone</span>
                <p className="small-bold lg:base-bold">(101) 222 123 456</p>
              </div>
            </div>
   
          <div className="flex items-center gap-2 lg:gap-4">
            <HiOutlineMail className="text-2xl lg:text-5xl font-normal text-light_green" />
            <div>
              <span className="small-regular hidden lg:block uppercase">email</span>
              <p className="small-bold lg:base-bold">company@farmtrail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
