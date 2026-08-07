import React from 'react';
import { motion } from "framer-motion";
import { IoTicket } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { pageContainerVariants, cardContentVariants } from "../../../utils/animation";

export const Overview = ({ Expense }) => {
  const overview = [
    {
      label: "Total Expense",
      value: `Rs. ${Number(Expense?.totalAmount).toLocaleString()}`,
      gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
      svg: <FaMoneyCheck className='size-6 sm:size-8 text-white' />
    },
    {
      label: "Total Participants",
      value: `${Expense?.Members.length} People`,
      gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
      svg: <HiMiniUserGroup className='size-6 sm:size-6 md:size-7 lg:size-8 text-white' />
    },
    {
      label: "Split Method",
      value: `${Expense?.splitMethod}`,
      gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
      svg: <IoTicket className='size-6 sm:size-6 md:size-7 lg:size-8 text-white' />
    }
  ];

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='bg-white shadow-md w-full h-full rounded-lg flex flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center sm:justify-between p-3 sm:p-4 gap-4'
    >
      {overview.map((card, index) => (
        <motion.div
          key={index}
          variants={cardContentVariants}
          className={`flex flex-row  items-center sm:justify-center flex-1 w-full gap-3 sm:gap-2 
                     ${index === 1 ? "sm:border-l sm:border-r  border-gray-100" : ""}`}
        >
          <div
           className="logo size-12 sm:size-14 md:size-16 lg:size-20 shrink-0 rounded-full flex items-center justify-center"
            style={{ background: card.gradient }}
          >
            {card.svg}
          </div>
          
          <div className="info flex-1 flex flex-col items-start sm:items-center">
            <div className="title text-sm sm:text-base md:text-sm lg:text-base font-semibold whitespace-nowrap">{card.label}</div>
            <div className="description text-xs sm:text-sm md:text-base lg:text-lg text-text-secondary truncate w-full sm:text-center">{card.value}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};