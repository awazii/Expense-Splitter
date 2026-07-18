import React from 'react'
import { motion } from "framer-motion";
import { FaMoneyCheck } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { CategoryExtrator } from '../../../utils/CategoryExtractor';
import { useSelector } from 'react-redux';
import { selectAllExpenses ,GroupExpenses } from '../../../store/ExpenseSlice';
import { cardVariants, cardContentVariants, pageContainerVariants } from "../../../utils/animation";

export const Overview = ({ CurrentGroup }) => {
  const AllExpenses = useSelector(selectAllExpenses);
  const GroupExpensesList = useSelector((state) => GroupExpenses(state, CurrentGroup.id));

  const overview = [
    {
      label: "Total Expense",
      value: `Rs.${Number(CurrentGroup.totalAmount).toLocaleString()}`,
      gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
      svg: <FaMoneyCheck className='size-5 sm:size-8 text-white ' />
    },
    {
      label: "Destination ",
      value: CategoryExtrator(CurrentGroup).variant,
      background: CategoryExtrator(CurrentGroup).Img
    },
    {
      label: "Total Participants",
      value: `${CurrentGroup.Members.length} Members`,
      gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
      svg: <HiMiniUserGroup className='size-4 sm:size-7 text-white' />
    }
  ];

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='bg-white shadow-md size-full rounded-lg flex flex-col sm:flex-row justify-between p-3 sm:p-4 gap-3 sm:gap-0'
    >
      {overview.map((card, index) => (
        <motion.div
          key={index}
          variants={cardContentVariants}
          className={`${card.label} ${index === 1 && "sm:border-l-1 sm:border-r-1"} pl-2 border-b-light flex-1 flex items-center justify-center w-full gap-2 min-w-0`}
        >
          <div
            className="flex gap-2 sm:gap-3 items-center min-w-0 w-full"
          >
            {card.background ? (
              <div className="logo size-10 sm:size-14 lg:size-17 rounded-full center-flex shrink-0 overflow-hidden">
                <img src={card.background} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="logo size-10 sm:size-14 lg:size-17 rounded-full center-flex shrink-0" style={{ background: card.gradient }}>
                {card.svg}
              </div>
            )}
            <div className="info flex-1 min-w-0 sm:w-40 sm:h-2/3 flex flex-col justify-center">
              <div className="title text-xs sm:text-base lg:text-lg font-semibold truncate" title={card.label}>{card.label}</div>
              <div className="description text-text-secondary text-[11px] sm:text-base truncate">{card.value}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};