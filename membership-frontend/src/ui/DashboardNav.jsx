import React from "react";
import MobileMenu from "../components/MobileMenu";

const DashboardNav = () => {
  const menuItems = [
    { item: "Members", route: "/dashboard" },
    { item: "Log out", route: "/" },
  ];
  
  const username = sessionStorage.getItem("username");
  return (
    <>
      <nav>
        <div className="flex justify-between items-center bg-slate-100 border-gray-200 ml-0 lg:ml-[16rem] h-20 px-4 lg:px-6 py-2.5">
          <div>
            <div className="lg:block lg:ml-2">
              <p className="text-[1rem]">Welcome,</p>
              <span className="text-secondary text-[1rem] font-semibold">
                {username}
              </span>
            </div>
          </div>
          <div className="flex lg:hidden">
            <MobileMenu menuItems={menuItems} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNav;
