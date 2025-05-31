import React from "react";
import { Navbar } from "../components/navigation-bar/navigation-container";
import { Footer } from "../components/Footer/footer";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
