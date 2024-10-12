import Hero from "@/components/Hero";
import Provide from "@/components/Provide";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full  bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
    <div className="container w-full mx-auto xl:px-20">  
      <Hero />
      <Services />
      <Provide />
    </div>
  </main>
  );
}
