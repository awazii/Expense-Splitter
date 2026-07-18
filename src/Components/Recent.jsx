import React, { useState } from 'react'
import { UniversalEmptyState } from './UniversalEmptyState';
import { RiHistoryLine } from "react-icons/ri";
import { pageContainerVariants, cardVariants, headerVariants } from "../utils/animation";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoPersonAddSharp, IoPersonRemoveSharp } from "react-icons/io5";
import { FaImages, FaBan, FaMoneyBillWave, FaSnowflake } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { HiMiniLanguage } from "react-icons/hi2";
import { TbFeather, TbEdit, TbUserCheck } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdGroupAdd, MdGroupRemove } from "react-icons/md";
import { motion } from "framer-motion";
import { CategoryExtrator } from '../utils/CategoryExtractor';
import { useSelector } from 'react-redux';
import { selectGroupById } from "../store/GroupSlice"
import { selectFriendById } from '../store/FriendsSlice';
import { HiChevronDown } from "react-icons/hi2";
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

export const Recent = ({d, activities, location }) => {
  const { Friend } = useParams();
  const [expandedId, setExpandedId] = useState(null);
  const CurrentFriendDetails = useSelector(state => selectFriendById(state, Friend));
  
  const DescIconConfig = {
    add: <IoPersonAddSharp className="text-[#4caf50] size-4 sm:size-5" />,
    image: <FaImages className="text-[#f68340] size-4 sm:size-5" />,
    remove: <IoPersonRemoveSharp className="text-[#e53935] size-4 sm:size-5" />,
    name: <HiMiniLanguage className="text-[#2196f3] size-4 sm:size-5" />,
    bio: <TbFeather className="text-[#9c27b0] size-4 sm:size-5" />,
    edit: <TbEdit className="text-[#607d8b] size-4 sm:size-5" />,
    ban: <FaBan className="text-[#dd131d] size-4 sm:size-5" />,
    unban: <TbUserCheck className="text-[#059669] size-4 sm:size-5" />,
    transaction: <GrTransaction className="text-[#795548] size-4 sm:size-5" />
  };
  
  const IconConfig = {
    transaction: {
      label: "Transaction",
      svg: <BsFillCreditCardFill className="text-white size-5 sm:size-7" />,
      backgroundColor: "#f68340"
    },
    expense: {
      label: "Expense",
      svg: <FaMoneyBillWave className="text-white size-5 sm:size-7" />,
      backgroundColor: "#4caf50"
    },
    settled: {
      label: "Settled",
      svg: <FaHandshakeSimple className="text-white size-5 sm:size-7" />,
      backgroundColor: "#2196f3"
    },
    memberJoined: {
      label: "Member Joined",
      svg: <IoPersonAddSharp className="text-white size-5 sm:size-7" />,
      backgroundColor: "#4caf50"
    },
    groupAdd: {
      label: "Group Added",
      svg: <MdGroupAdd className="text-white size-5 sm:size-7" />,
      backgroundColor: "#4caf50"
    },
    groupRemoved: {
      label: "Group Removed",
      svg: <MdGroupRemove className="text-white size-5 sm:size-7" />,
      backgroundColor: "#e53935"
    },
    frozen: {
      label: "Group Frozen",
      svg: <FaSnowflake className="text-white size-5 sm:size-7" />,
      backgroundColor: "#00bcd4"
    },
    groupUpdate: {
      label: "Group Updated",
      svg: <TbEdit className="text-white size-5 sm:size-7" />,
      backgroundColor: "#2196f3"
    }
  };

  return (
    <div className='recent-container w-full h-full flex flex-col overflow-hidden '>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="recent-header px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-row-reverse"
      >
        <div className="logo w-fit rounded-lg p-2 shrink-0">
          <TbActivityHeartbeat className='text-primary size-7 sm:size-9' />
        </div>
        <div className="headings flex-1 min-w-0 pr-2 text-left">
          <h2 className='text-xl sm:text-2xl font-semibold truncate'>Recent Activities</h2>
          <p className='text-text-secondary text-xs sm:text-sm truncate'>
            {activities?.length > 0 ? `Last ${location === "dashboard" ? 20 : 10} Activities` : "No Recent Activity"}
          </p>
        </div>
      </motion.div>
      
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className={`activities flex flex-col items-center space-y-3 px-2 sm:px-4 pb-4  overflow-y-auto lg:flex-1 lg:min-h-0 h-70`}
      >
        {activities?.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="activity w-full max-w-4xl h-fit rounded-lg flex flex-row-reverse gap-1 sm:gap-2 p-2 sm:p-3 bg-white border-l shadow-sm"
            >
              <div className="logo-container sm:m-1 shrink-0 center-flex justify-start">
                {activity.category !== "friend" ? (
                  <div
                    className="logo rounded-xl size-10 sm:size-14 center-flex shadow-md"
                    style={{ backgroundColor: (activity.selfTitle && location === "friendpage") ? IconConfig["memberJoined"]?.backgroundColor : IconConfig[activity.icon]?.backgroundColor }}
                  >
                    {(activity.selfTitle && location === "friendpage") ? IconConfig["memberJoined"]?.svg : IconConfig[activity.icon]?.svg}
                  </div>
                ) : (
                  <div className='logo rounded-xl size-10 sm:size-14 center-flex shadow-md border-l'>
                    <img className='rounded-xl Img-c' src={activity.friendImages?.[activity.friends[0]]} alt="friend-img" />
                  </div>
                )}
              </div>
              <div className="Date-time-container shrink-0 w-16 sm:w-22 flex flex-col items-center justify-center">
                <h2 className='font-semibold text-xs sm:text-sm text-center'>
                    {dayjs(`${activity.Date} ${activity.Time}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A")}
                </h2>
                <p className='text-[10px] sm:text-xs text-text-secondary text-center'>{activity.Date}</p>
              </div>
              <div className="content flex-1 min-w-0 p-1 sm:p-2 text-left">
                <h3 className='font-semibold text-sm sm:text-base line-clamp-2 break-words'>
                  {(activity.selfTitle && location === "friendpage") ? `${CurrentFriendDetails?.Name} joined the group` : activity.title}
                </h3>
                
                {activity.category === "group" ? (
                  <div className="group mt-1 flex items-center justify-start w-full gap-1">
                    <div className="logo size-6 sm:size-8 shrink-0 rounded-full">
                      <img src={CategoryExtrator(activity.groupinfo)?.Img} className='Img-c rounded-full' alt="" />
                    </div>
                    <div className="info min-w-0">
                      <p className='text-xs sm:text-sm text-text-secondary truncate'>{activity.groupinfo.name}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='about-expense mt-1 flex items-center justify-start w-full gap-1'>
                      <div className="logo size-6 sm:size-8 shrink-0 rounded-full center-flex">
                        {DescIconConfig[activity.description.desIcon] || <TbActivityHeartbeat className="text-[#607d8b] size-4 sm:size-5" />}
                      </div>
                      <div className="info min-w-0">
                        <p className='text-xs sm:text-sm truncate'>{activity.description.title}</p>
                      </div>
                      
                      {activity.description.details && (
                        <button 
                            className='cursor-pointer p-1 shrink-0' 
                            onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}
                        >
                          <HiChevronDown className={`transition-transform duration-300 ${expandedId === activity.id ? "rotate-180" : "rotate-0"}`} />
                        </button>
                      )}
                    </div>
                    {expandedId === activity.id && (
                        <div className='mt-2 pt-2 border-t border-b-light w-full flex flex-col items-end gap-2'>          
                            {activity.description.details.map((des, index) => (
                                <div key={index} className='flex items-center justify-end gap-2 w-full'>
                                    <div className="logo size-6 sm:size-8 shrink-0 rounded-full center-flex bg-gray-50">
                                        {DescIconConfig[des.desIcon] || <TbActivityHeartbeat className="text-[#607d8b] size-4 sm:size-5" />}
                                    </div>
                                    <div className="info min-w-0">
                                        <p className='text-xs sm:text-sm truncate text-text-secondary'>{des.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={cardVariants} className="w-full h-full flex items-center justify-center">
            <UniversalEmptyState
              title="No Activity to Display"
              description={d}
              textsize="text-sm"
            >
              <div className="p-6 sm:p-8 shadow-md border-l rounded-full">
                <RiHistoryLine className="size-8 text-primary" />
              </div>
            </UniversalEmptyState>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}