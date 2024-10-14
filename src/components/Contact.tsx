"use client";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import ContactForm from "./ContactForm";

const Contact = () => {
  
  return (
    <section className="max-w-7xl mx-auto flex justify-between gap-8 items-center  my-24">
      <div>
        <span className="subtle-semibold text-light_green uppercase">
          Partner with us
        </span>
        <h2 className="h2-bold">We are Here to Help</h2>
        <p className="menu-regular text-light-2">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tellus
          elementum consequat eget conva.
        </p>
        <div className="space-y-8 mt-8">
          <div>
            <div className="flex items-center gap-4">
              <HiOutlinePhone className="text-5xl font-normal text-light_green" />
              <div>
                <span className="small-regular uppercase">phone</span>
                <p className="base-bold">(101) 222 123 456</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HiOutlineMail className="text-5xl font-normal text-light_green" />
            <div>
              <span className="small-regular uppercase">email</span>
              <p className="base-bold">company@farmtrail.com</p>
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
