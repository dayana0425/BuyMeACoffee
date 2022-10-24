import Header from "./Header";
import React from "react";
import Hero from "./components/Hero";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Hero />
      <Filter />
      <Footer />
    </>
  );
}
