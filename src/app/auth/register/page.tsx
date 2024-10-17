"use client";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  const logoRef = useRef(null);
  const loginContainerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      loginContainerRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          gsap.fromTo(
            logoRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            }
          );
        },
      }
    );
  }, []);

  return (
    <div className="relative max-h-screen h-screen overflow-hidden">
      <div
        ref={loginContainerRef}
        className="flex-between items-center max-w-4xl mx-auto my-12 dark:bg-black border-2 border-light-br shadow-lg p-12 shadow-light-br"
      >
        <Image
          src="/png/reg.png"
          width={500}
          height={400}
          alt="Login Illustration"
          className="w-[300px] h-[400px] hidden lg:block"
        />
        <section className="max-w-lg my-auto ">
          <div>
            <Link href={"/"}>
              <Image
                ref={logoRef}
                src="/png/Farmtrail-logo-light.png"
                height={400}
                width={400}
                className="w-fit mb-8 lg:mb-14 opacity-0 relative"
                alt="farmtrail"
              />
            </Link>
            <h3 className="lg:h3-medium body-medium mb-6">
            Join Us <span className="text-light_green">!</span>  Start Your Journey <br />
            to Fresh, Organic Living Today
            </h3>
            <RegisterForm />
          </div>
        </section>
      </div>
      <Image
        src="/png/login3.png"
        width={500}
        height={400}
        alt="Login Illustration"
        className="w-[600px] h-[600px] absolute top-8 -z-10"
      />
    </div>
  );
};

export default Register;
