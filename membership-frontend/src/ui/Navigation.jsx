import { React } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";

const Navigation = () => {
  const menuItems = [
    { item: "Register", route: "/register" },
    { item: "Log In", route: "/login" },
  ];
  return (
    <>
      <nav>
        <div className="flex justify-between w-[90%] items-center lg:w-[80%] mx-auto mt-[2rem] font-primaryFont">
          <div>
            <a className="flex-shrink-0" href="#">
              <img
                className="block lg:hidden h-12 w-12"
                src="https://cdn.pixabay.com/photo/2017/06/26/17/06/symbol-2444430_960_720.png"
                alt="Logo"
              ></img>
              <img
                className="hidden lg:block h-12 w-auto"
                src="https://cdn.pixabay.com/photo/2017/06/26/17/06/symbol-2444430_960_720.png"
                alt="Logo"
              ></img>
            </a>
          </div>
          <div>
            <div className="hidden lg:block lg:ml-2">
              <div className="flex">
                <Link to={"/login"}>
                  <span className="nav-link" aria-label="Log In">
                    {" "}
                    Log In{" "}
                  </span>
                </Link>
                <Link to={"/register"}>
                  <span className="nav-link" aria-label="Register">
                    {" "}
                    Register{" "}
                  </span>
                </Link>
              </div>
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

export default Navigation;
