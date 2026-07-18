import React from 'react';
import { motion } from "framer-motion";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { TotalExpenses } from '../../store/ExpenseSlice';
import { selectAllFriends } from '../../store/FriendsSlice';
import { selectAllGroups, TopGroup } from '../../store/GroupSlice';
import { useNavigate } from 'react-router-dom';
import { pageContainerVariants, cardContentVariants } from "../../utils/animation";

export const Overview = () => {
  const TotalExpensesamount = useSelector(TotalExpenses);
  const topGroup = useSelector(TopGroup);
  const TotalFriends = useSelector(selectAllFriends);
  const TotalGroups = useSelector(selectAllGroups);
  const Navigation = useNavigate();

  const data = [
    {
      icon: <FaMoneyCheck className='size-5 sm:size-6 text-white' />,
      label: "Total Expenses",
      value: TotalExpensesamount.toLocaleString(),
      gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
      link: "/Expenses"
    },
    {
      icon: <FaUserFriends className='size-5 sm:size-6 text-white' />,
      label: "Total Friends",
      value: TotalFriends.length,
      gradient: "linear-gradient(135deg, #2196F3 0%, #3F51B5 50%, #1A237E 100%)",
      link: "/Friends"
    },
    {
      icon: <HiMiniUserGroup className='size-5 sm:size-6 text-white' />,
      label: "Total Groups",
      value: TotalGroups.length,
      gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
      link: "/Groups"
    },
    {
      icon: <MdInsights className='size-5 sm:size-6 text-white' />,
      label: "Top Group",
      detail: `${topGroup?.Name || "No groups available"}`,
      gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 50%, #00C9FF 100%)",
      link: `/Groups/${topGroup?.id}`
    }
  ];

  function formatValue(value) {
    return (value < 10 && value > 0) ? `0${value}` : value;
  }

  return (
   <motion.div
  variants={pageContainerVariants}
  initial="hidden"
  animate="visible"
  className="overview-cards grid grid-cols-2  2xl:flex lg:justify-between gap-y-1 gap-x-2 h-full"
>
  {data.map((item, index) => (
    <div
      key={index}
      className="overview-card p-2 sm:p-4 bg-white shadow-md rounded-lg lg:flex-1 flex flex-col justify-center items-center min-w-0"
    >
      <motion.div
        variants={cardContentVariants}
        className="flex flex-col items-center min-w-0 w-full"
      >
        <div
          className="icon mb-2 size-12 sm:size-14 lg:size-18 center-flex rounded-full shrink-0"
          style={{ background: item.gradient }}
        >
          {item.icon}
        </div>
        <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-text-primary text-center truncate w-full">
          {item.label}
        </h3>
        <p className="text-[11px] sm:text-sm lg:text-md font-semibold text-text-secondary text-center truncate w-full">
          {`${index === 0 ? "Rs." : ""}${item.detail ?? formatValue(item.value)}`}
        </p>
        {item.detail !== "No groups available" && (
          <button
            className="text-primary px-1 sm:px-2 py-1 rounded-md text-[10px] sm:text-sm cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => Navigation(item.link)}
          >
            View Details <FaArrowRight className="inline-block" />
          </button>
        )}
      </motion.div>
    </div>
  ))}
</motion.div>

  );
};