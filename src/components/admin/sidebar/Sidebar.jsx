import { BiSolidDashboard } from "react-icons/bi";
import { IoGameController, IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { RiFilePaper2Fill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation().pathname.split("/")[2];
  const iconSize = 28;

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <BiSolidDashboard size={iconSize} />,
      link: "/admin/dashboard",
      active: location === "dashboard",
    },
    {
      label: "Games",
      icon: <IoGameController size={iconSize} />,
      link: "/admin/games",
      active: location === "games",
    },
    {
      label: "Orders",
      icon: <RiFilePaper2Fill size={iconSize} />,
      link: "/admin/orders",
      active: location === "orders",
    },
    {
      label: "Reviews",
      icon: <MdReviews size={iconSize} />,
      link: "/admin/reviews",
      active: location === "reviews",
    },
    {
      label: "Settings",
      icon: <IoSettingsSharp size={iconSize} />,
      link: "/admin/settings",
      active: location === "settings",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white flex flex-col items-center pt-8 drop-shadow-md">
      {/* Logo */}
      <Link to="/admin/dashboard">
        <img
          alt="77TopUp Logo"
          src="/77topup_logo_1b.png"
          className="min-w-52 w-52 hover:drop-shadow-sm active:translate-y-[0.5px] mb-6"
        />
      </Link>

      {/* Items */}
      <div className="flex flex-col items-center w-64 h-screen bg-white">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg w-11/12 mb-2 cursor-pointer ${
              item.active
                ? "bg-yellow-400 text-white font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
