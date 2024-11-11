import { useState, useEffect } from "react";
import { navLinks } from "../index.js";
import ToastContainer from "./ToastContainer"; // import the ToastContainer component
import logo from "../assets/logo-putih.png";
import style from "../style"; 
import menu from "../assets/menu.svg";

const Navbar = () => {
  const [active, setActive] = useState();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [toasts, setToasts] = useState([]); // add toast state

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLogin");
    setIsLogin(loginStatus === "true");
  }, []);

  const updatedNavLinks = isLogin
    ? navLinks.map((nav) =>
        nav.id === "login" ? { ...nav, title: "Log Out" } : nav
      )
    : navLinks.filter((nav) => nav.id !== "DataManagement");

  const addToast = (type, message) => {
    const id = new Date().getTime();
    setToasts([...toasts, { id, type, message }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.setItem("isLogin", "false");
    setIsLogin(false);
    addToast("success", "You have been logged out!");
    setTimeout(() => (window.location.href = "/"), 3000);
  };

  return (
    <>
      <div
        className={`${style.paddingX} w-full flex justify-center ${
          style.nempelAtas
        } transition-colors duration-300 z-50 ${
          scrolled ? "bg-navbar-gradient" : "bg-[#050505]"
        }`}
      >
        <div className={`${style.boxWidth}`}>
          <div className="w-full flex py-6 justify-between items-center navbar">
            <a href="/">
              <img
                src={logo}
                alt="Trash Tracker"
                className="w-[px] h-[50px]"
              />
            </a>
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {updatedNavLinks.map((nav, index) => (
                <li
                  id={nav.id}
                  className={`font-poppins cursor-pointer text-[20px] hover:font-bold
                  ${active === nav.id ? "text-white" : "text-gray-300"} 
                  ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  onClick={() => {
                    if (nav.id === "login" && isLogin) {
                      setActive(nav.id);
                      handleLogout();
                    }
                  }}
                >
                  <a href={`/${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />

              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default Navbar;