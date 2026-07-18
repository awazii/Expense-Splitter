import React from 'react';
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import { TotalExpenses, selectAllExpenses } from "../../store/ExpenseSlice"
import { useSelector } from 'react-redux';
import { TopGroup } from '../../store/GroupSlice';
import { selectAllFriends } from '../../store/FriendsSlice';
import { useNavigate } from 'react-router-dom';
import { RiBarChart2Line } from "react-icons/ri";
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { headerVariants, sectionVariants, itemVariants ,pageContainerVariants } from "../../utils/animation";
import { motion } from "framer-motion";
const InsightCard = ({ icon, title, description, value }) => (
  <motion.div
    variants={sectionVariants}
    className="flex flex-col justify-between p-3 sm:p-4 rounded-xl shadow-md w-full border-l min-w-0"
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-2 min-w-0">
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{title}</p>
        {description && <p className="text-[11px] sm:text-xs text-gray-500 truncate">{description}</p>}
      </div>
    </div>
    <p className="text-sm sm:text-md font-bold text-gray-900 truncate">{value}</p>
  </motion.div>
);
export const Insights = () => {
  const Navigate = useNavigate()
  const Expenses = useSelector(selectAllExpenses)
  const Totalamount = useSelector(TotalExpenses)
  const topGroup = useSelector(TopGroup)
  const AllFriends = useSelector(selectAllFriends)
  const HighesContributor = [...AllFriends].sort((a, b) => b.spendings - a.spendings)[0]
  const HighestDebtor = [...AllFriends].sort((a, b) => a.netBalance.total - b.netBalance.total)[0] 
  const debtornetbalance = Math.abs(HighestDebtor?.netBalance.total)
  const insightsData = [
    {
      id: 1,
      title: "Top Spending Group",
      description: `${topGroup?.Name}`,
      value: `Rs. ${topGroup?.totalAmount.toLocaleString()}`,
      icon: <HiMiniUserGroup className="text-[#f68340] text-lg sm:text-xl" />,
    },
    {
      id: 2,
      title: "Highest Contributor",
      description: `${HighesContributor?.Name}`,
      value: `Rs. ${HighesContributor?.spendings.toLocaleString()}`,
      icon: <IoPerson className="text-[#2196f3] text-lg sm:text-xl" />,
    },
    {
      id: 3,
      title: "Highest Debtor",
      description: debtornetbalance > 0 ? `${HighestDebtor?.Name}`: 'No data yet',
      value:  debtornetbalance > 0 ? `Rs. ${debtornetbalance.toLocaleString()}` : 'All settled',
      icon: <IoPerson className="text-[#e53935] text-lg sm:text-xl" />,
    },
    {
      id: 4,
      title: "Total Expenses",
      description: `${Expenses.length} expenses recorded`,
      value: `Rs. ${Totalamount.toLocaleString()}`,
      icon: <GiExpense className="text-[#4caf50] text-lg sm:text-xl" />
    }
  ];

  return (
    <div className="w-full 2xl:max-w-xl mx-auto p-3 sm:p-4 overflow-auto h-full">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mb-4 gap-2"
      >
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Insights</h2>
        <button
          className="text-primary text-xs sm:text-sm font-semibold hover:underline cursor-pointer whitespace-nowrap"
          onClick={() => { Navigate("/Analytics") }}
        >
          View Analytics
        </button>
      </motion.div>
      {Expenses.length > 0 ? (
        <motion.div
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 2xl:grid-cols-2 gap-3 sm:gap-4 lg:h-auto h-50"
        >
          {insightsData.map(item => (
            <InsightCard key={item.id} {...item} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <UniversalEmptyState
            title="No expenses to visualize"
            description="Not enough data for a breakdown. Start adding expenses to see your spending across categories."
            textsize="text-sm"
          >
            <div className="p-8 shadow-md border-l rounded-full">
              <RiBarChart2Line className="size-8 text-primary" />
            </div>
          </UniversalEmptyState>
        </motion.div>
      )}
    </div>
  );
};