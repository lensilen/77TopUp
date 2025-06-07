import React from "react";
import { Navbar } from "../components/navigation-bar/navigation-container";
import { Footer } from "../components/Footer/footer";
import { Outlet, useLocation } from "react-router";
import Cookies from "js-cookie";
import Sidebar from "../components/admin/sidebar/Sidebar";

export const RootLayout = () => {
  const location = useLocation().pathname.split("/")[1];
  const role = Cookies.get("role");

  if (location !== "admin") {
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
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex flex-1 flex-row">
          <Sidebar />
          <div className="flex-1 py-28 px-20 overflow-y-auto bg-blue-50 ">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};
