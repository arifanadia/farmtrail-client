"use client";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Login = () => {
  const logoRef = useRef(null);
  const loginContainerRef = useRef(null); 

  useEffect(() => {
    gsap.fromTo(
      loginContainerRef.current,
      { x: 200, opacity: 0 }, 
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
        className="flex-between items-center max-w-4xl mx-auto my-36 dark:bg-black border-2 border-light-br shadow-lg p-12 shadow-light-br"
      >
        <section className="max-w-lg my-auto">
          <div>
            <Link href={"/"}>
              <Image
                ref={logoRef} 
                src="/png/Farmtrail-logo-light.png"
                height={400}
                width={400}
                className="w-fit lg:mb-14 mb-8 opacity-0 relative" 
                alt="farmtrail"
              />
            </Link>
            <h3 className="lg:h3-medium base-medium mb-6">
              Welcome Back <span className="text-light_green">!</span>{" "}
              Let&apos;s Continue <br /> Your Journey to Fresh, Organic Living
            </h3>
            <LoginForm />
          </div>
        </section>
        <Image
          src="/png/login2.png"
          width={500}
          height={400}
          alt="Login Illustration"
          className="w-[300px] h-[400px] hidden lg:block"
        />
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

export default Login;
