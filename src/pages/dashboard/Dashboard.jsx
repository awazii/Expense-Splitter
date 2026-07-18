import { motion } from "framer-motion";
import {
  headerVariants,
  sectionVariants,
} from "../../utils/animation";
import { Overview } from './Overview';
import { Recent } from '../../Components/Recent';
import { Insights } from './Insights';
import { Analystic } from './Analystic';
import Addgroup from "./Newgroupbtn"
import { selectAllExpenses } from '../../store/ExpenseSlice';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { selectFriendById } from "../../store/FriendsSlice";
import {selectAllActivities} from "../../store/ActivitySlice"
export const Dashboard = () => {
  const allexpense = useSelector(selectAllExpenses);
  const allactivities = useSelector(selectAllActivities);
  const renderActivities = allactivities.slice(0,20)
  const admin = useSelector(state => selectFriendById(state, "admin_01"));

  return (
    <div className="dashboard-container w-full h-full overflow-auto p-3 sm:p-6 pb-0 scrollbar-hide pt-20  md:pt-5">
      <motion.h1
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl lg:text-3xl font-semibold"
      >
        Dashboard
      </motion.h1>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="header col-span-6 h-auto sm:h-15 flex flex-col sm:flex-row items-end sm:items-center rounded-2xl justify-between p-2 gap-2 sm:gap-0"
      >
        <h2 className="text-base sm:text-xl lg:text-2xl font-medium p-2 sm:p-4 self-start">
          Welcome aboard, {admin?.Name}!
        </h2>
        <Addgroup />
      </motion.div>

      <div className="dashboard grid grid-cols-1  lg:grid-cols-4 lg:grid-rows-12 2xl:grid-cols-6 2xl:grid-rows-9 2xl:h-[80%] lg:h-[120%]  gap-x-2 gap-y-3  mt-4 lg:grid-flow-row-dense ">
        <div
          className="overview col-span-1 lg:col-span-2 lg:row-span-5  2xl:row-span-3 2xl:col-span-4 rounded-xl h-auto min-h-[180px] sm:min-h-[200px] "
        >
          <Overview />
        </div>

        <div
          className="recent-activities bg-white shadow-md col-span-1 lg:col-span-2 lg:row-span-6  2xl:col-span-2 2xl:row-span-5 rounded-xl"
        >
          <Recent
            d="Start using Splitly to see your activity. All group, friend, and expense updates are logged here."
            activities={renderActivities}
            location="dashboard"
          />
        </div>

        <div
          className="analytics bg-white shadow-md col-span-1 2xl:col-span-4 lg:col-span-2 lg:row-span-7  2xl:row-span-6  rounded-xl min-h-[200px]"
        >
          <Analystic />
        </div>

        <div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="insights bg-white shadow-md col-span-1  lg:col-span-2   2xl:row-span-4 lg:row-span-6  rounded-xl "
        >
          <Insights />
        </div>
      </div>

      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="footer col-span-6 h-auto py-4 sm:h-20 center-flex"
      >
        <p className="text-center text-xs sm:text-base lg:text-xl text-secondary px-2">
          © {dayjs().year()} Splitly. Design & Developed by Awazii. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};