import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-w-full min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute min-w-full min-h-full -z-50 opacity-90 object-cover"
      >
        <source src="./videos/network.mp4" type="video/mp4" />
      </video>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
