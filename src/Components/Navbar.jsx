import React, { useState } from "react";
import Logo from "../../public/splitly.png";
import Logofull from "../assets/splitly.png";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiExpense } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { navbarVariants, navitemVariants, headerVariants  } from "../utils/animation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Updatef } from "./friends/Frienddetails/Updatef";
import { Basemodel } from "./basemodel";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";

export const Navbar = () => {
  const Openmodel = () => setpopup(true);
  const Closemodel = () => setpopup(false);
  const [popup, setpopup] = useState(false);
  const [iscollapsed, setiscollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [navlist] = useState([
    { icon: <MdSpaceDashboard />, label: "Dashboard", link: "/" },
    { icon: <FaUserFriends />, label: "Friends", link: "/Friends" },
    { icon: <HiMiniUserGroup />, label: "Groups", link: "/Groups" },
    { icon: <GiExpense />, label: "Expenses", link: "/Expenses" },
    { icon: <MdAnalytics />, label: "Analytics", link: "/Analytics" },
    { icon: <FaCalculator />, label: "Spliter", link: "/Spliter" },
  ]);

  return (
    <>
      <div
        className="md:hidden fixed top-4 left-4 right-4 z-50">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="Navbar bg-nav flex items-center justify-between text-white rounded-full px-6 py-3 shadow-lg trans">
          <img src={Logo} alt="Logo" className="h-8 object-contain" />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full nav-item text-white trans"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </motion.div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 Navbar bg-nav rounded-2xl p-4 shadow-xl flex flex-col gap-2 text-white trans"
            >
              {navlist.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} flex gap-4 p-3 items-center rounded-xl nav-item trans`
                  }
                >
                  <span className="icon text-2xl">{item.icon}</span>
                  <span className="label text-md font-medium">{item.label}</span>
                </NavLink>
              ))}

              <hr className="border-white/10 my-2" />

              <button
                onClick={() => {
                  Openmodel();
                  setIsMobileMenuOpen(false);
                }}
                className="flex gap-4 p-3 items-center rounded-xl nav-item trans w-full"
              >
                <IoSettingsSharp className="icon text-2xl" />
                <span className="label text-md font-medium">Settings</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="relative group hidden md:block"
      >
        <nav className={`Navbar ${iscollapsed ? "w-20" : "w-[20vw] min-w-[180px] max-w-[260px]"} text-white trans`}>
          <div className={`logo-contaniner transition-all duration-300 ${iscollapsed ? "w-16 my-6" : "w-36 lg:w-55 my-8"} mx-3 center-flex`}>
            <div className={`logo w-full ${iscollapsed ? "h-9" : "h-10 lg:h-15"} relative `}>
              {iscollapsed ? (
                <img src={Logo} alt="Logo" className="logo object-contain size-full" />
              ) : (
                <>
                  <img src={Logo} alt="Logo" className="logo object-contain size-full block lg:hidden" />
                  <img src={Logofull} alt="Logo" className="logo object-cover size-full hidden lg:block" />
                </>
              )}
            </div>
            {!iscollapsed && (
              <button
                title="Collapse sidebar"
                className="cursor-pointer w-8 p-1 trans rounded translate-x-2 opacity-0 absolute top-20 right-1 group-hover:opacity-100 group-hover:translate-x-0 bg-white/10 backdrop-blur-2xl text-2xl"
                onClick={() => setiscollapsed(true)}
              >
                <TbLayoutSidebarLeftCollapseFilled />
              </button>)}
          </div>

          <motion.ul
            className={`nav-list flex flex-col gap-4 mx-6 ${iscollapsed ? "my-8" : "my-4"}`}
            variants={navbarVariants}
          >
            {iscollapsed && (
              <button
                title="Expand sidebar"
                className="cursor-pointer w-10 center-flex p-2 trans rounded nav-item text-2xl"
                onClick={() => setiscollapsed(false)}
              >
                <TbLayoutSidebarLeftExpandFilled />
              </button>)}
            {navlist.map((item, index) => (
              <motion.li key={index} variants={navitemVariants}>
                <NavLink
                  title={item.label}
                  className={({ isActive }) =>
                    `${isActive ? "active" : ""} flex p-2 ${iscollapsed ? "justify-center w-10" : "justify-start gap-3 lg:gap-5 w-full"} items-center rounded nav-item`
                  }
                  to={item.link}
                >
                  <span className="icon text-xl lg:text-2xl">{item.icon}</span>
                  {!iscollapsed && <span className="label text-sm lg:text-md font-medium">{item.label}</span>}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>

          <div className="settings absolute bottom-8 left-6">
            <button className="setting-icon size-10 blurred center-flex rounded-2xl cursor-pointer" onClick={Openmodel}>
              <IoSettingsSharp className="size-6 rounded-md p-1" />
            </button>
          </div>
        </nav>
      </motion.nav>

      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Update Admin Info">
        <Updatef friendId={"admin_01"} Closemodel={Closemodel} />
      </Basemodel>
    </>
  );
};