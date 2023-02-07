import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { GiRamProfile, GiReceiveMoney } from "react-icons/gi";
import { HiRectangleGroup } from "react-icons/hi2";
import { TbCash } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <ul className="mt-5 flex flex-col gap-3">
      <Link to="/admin">
        <li
          className={`${
            pathname === "/admin" && "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <FiHome />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/admin/expert-profiles">
        <li
          className={`${
            pathname.includes("/admin/expert-profiles") &&
            "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <GiRamProfile />
          <span>Profiles</span>
        </li>
      </Link>
      <Link to="/admin/users">
        <li
          className={`${
            pathname.includes("/admin/users") && "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <CgProfile />
          <span>Users</span>
        </li>
      </Link>
      <Link to="/admin/deposits">
        <li
          className={`${
            pathname.includes("/admin/deposits") && "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <GiReceiveMoney />
          <span>Deposit</span>
        </li>
      </Link>
      <Link to="/admin/widthraw-requests">
        <li
          className={`${
            pathname.includes("/admin/widthraw-requests") &&
            "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <TbCash />
          <span>Widthraw Req</span>
        </li>
      </Link>
      <Link to="/admin/hire-requests">
        <li
          className={`${
            pathname.includes("/admin/hire-requests") && "bg-primary text-white"
          } flex items-center gap-3 text-lg font-semibold py-2 px-6 transition-all hover:bg-primary hover:text-white rounded-full`}
        >
          <HiRectangleGroup />
          <span>Hire Req</span>
        </li>
      </Link>
    </ul>
  );
};

export default Sidebar;
