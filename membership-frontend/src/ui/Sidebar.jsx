import React from "react";
import { User, Logout  } from "@carbon/icons-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col w-[16rem] bg-slate-100 min-h-full fixed hidden lg:block  top-0 left-0 border-solid border-[1px] border-right border-primary overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl text-secondary">Dashboard</h1>
        </div>
        <ul className="flex flex-col py-4 pl-3">
          <li>
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <User size={20}/>
              </span>
              <span className="text-lg font-bold">Members</span>
            </a>
          </li>
          <li>
            <Link
              to={"/"}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <Logout size={20}/>
              </span>
              <span className="text-lg font-bold">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
