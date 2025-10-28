import React, { useState } from 'react'
import Logo from '../assets/splitly.png'
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiExpense } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const [navlist, setnavlist] = useState([
        { icon: <MdSpaceDashboard />, label: "Dashboard",link:'/' },
        { icon: <FaUserFriends />, label: "Friends",link:'/friends' },
        { icon: <HiMiniUserGroup />, label: "Groups",link:'/groups' },
        { icon: <GiExpense />, label: "Expenses",link:'/expenses' },
        { icon: <MdAnalytics />, label: "Analytics",link:'/analytics' },
        { icon: <FaCalculator />, label: "Expense Calculator",link:'/calculator' }
    ])
    return (
        <nav className="Navbar  w-70 relative text-white ">
            <div className="logo-contaniner  m-6 flex justify-center items-start">
                <div className="logo w-60  h-15  ">
                    <img src={Logo} alt="Logo" className="logo object-cover  w-full h-full" />
                </div>
            </div>
            <ul className="nav-list flex flex-col gap-4 m-6">
                {navlist.map((item, index) => (
                    <li key={index}>
                        <NavLink className={({isActive})=>`${ isActive ? "active":''} flex p-2 w-full gap-5 items-center rounded nav-item`} to={item.link}>
                            <span className="icon text-2xl">{item.icon}</span>
                            <span className="label text-md font-medium">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="settings absolute bottom-5 w-25 flex flex-col items-center justify-center ">
                <div className="setting-icon size-10 blurred m-3 center-flex   rounded-2xl">
                    <IoSettingsSharp className='size-6  hover:cursor-pointer   rounded-md p-1' />
                </div>
                <div className="themes  blurred w-10 h-25 rounded-2xl center-flex flex-col gap-4 p-2">
                     <button className="dark center-flex size-7 "><FaMoon className='size-4 hover:cursor-pointer ' />
                    </button>
                    <button className="light center-flex size-7 theme-active"><IoIosSunny className='size-5 hover:cursor-pointer ' /></button>
                </div>
            </div>
        </nav>
    )
}
