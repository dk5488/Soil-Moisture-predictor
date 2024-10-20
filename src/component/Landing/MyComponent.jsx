import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import ContactSection from "./ContactSection";

const MyComponent = () => {
  return (
    <main className="flex flex-col pt-16 bg-zinc-100 min-h-screen w-full">
      <Header />
      <Hero />
      <ContactSection />
    </main>
  );
};

export default MyComponent;
