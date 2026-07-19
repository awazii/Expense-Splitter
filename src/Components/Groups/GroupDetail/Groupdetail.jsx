import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Insights } from '../../Expenses/Expensedetails/Insights'
import { Recent } from '../../Recent'
import { Overview } from './Overview'
import { Balance } from './Spendings'
import { IoReturnUpBack, IoSettingsOutline } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
import { statuses } from '../GroupCard'
import { useSelector } from 'react-redux'
import { selectGroupById } from '../../../store/GroupSlice'
import { GroupExpenses, FriendsGroupSpendings } from "../../../store/ExpenseSlice"
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { cardVariants, cardContentVariants, pageContainerVariants } from "../../../utils/animation";
import { motion } from 'framer-motion'
import { Basemodel } from '../../basemodel';
import { MdGroupOff } from "react-icons/md";
import { Updateg } from './Updateg'
import { GroupActivities } from '../../../store/ActivitySlice'
import Addexpensebtn from '../../Expenses/Common/Addexpensebtn'
export const Groupdetail = () => {
  const Navigate = useNavigate()
  const { Groupid } = useParams();
  const [updatepopup, setupdatepopup] = useState(false)
  const CurrentGroup = useSelector((state) => selectGroupById(state, Groupid));
  const activities = useSelector(state => GroupActivities(state, CurrentGroup))
  const GExpenses = useSelector((state) => GroupExpenses(state, Groupid));
  const MembersSpendings = useSelector(state => FriendsGroupSpendings(state, Groupid))
  const isnew = GExpenses.length === 0 && MembersSpendings.length === 0
  const extra = [
    {
      value: statuses[CurrentGroup?.statusid]?.label,
      gradient: statuses[CurrentGroup?.statusid]?.bgColor,
      color: statuses[CurrentGroup?.statusid]?.textColor,
      label: "Status"
    },
    {
      value: CurrentGroup?.joinedDate,
      icon: <MdOutlineDateRange className='text-white size-5' />,
      gradient: 'linear-gradient(135deg, #ffcc70, #f9a825, #ff6f61, #d84315)',
      label: "Created on"
    },
    {
      value: GExpenses?.length,
      icon: <GiExpense className='text-white size-5' />,
      gradient: 'linear-gradient(135deg, #a0d8ef, #00aaff, #0055aa)',
      label: "Expense Count"
    },
  ]

  return (
    <div className='Indiviual-group h-full scrollbar-hide overflow-auto md:pt-0 pt-20 '>
      {CurrentGroup ? (
        <> 
        <div className="header h-auto sm:h-25 flex flex-col sm:flex-row px-4 sm:px-10 py-4 sm:py-0 items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="group-name flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95 shrink-0"
              onClick={() => { Navigate("/Groups") }}
            >
              <IoReturnUpBack className='size-5 sm:size-6 group-hover:text-primary' />
            </button>
            <h3 className='text-lg sm:text-2xl lg:text-3xl truncate min-w-0'>{CurrentGroup.Name}</h3>
          </div>
          {CurrentGroup.statusid !== "Freeze" && <div className="actions flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-center">
            {CurrentGroup.statusid !== "Freeze" && (
              <div className="actions center-flex gap-3">
                <Addexpensebtn />
              </div>
            )}

            <button className="settingbtn card-b size-9 sm:size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95 cursor-pointer" onClick={() => setupdatepopup(true)}>
              <IoSettingsOutline className='size-4 sm:size-5 group-hover:text-primary' />
            </button>
          </div>}
        </div>
          <div className='grid container mx-auto grid-cols-1 lg:grid-cols-12 lg:grid-rows-6 gap-3 mt-4 lg:mt-0 px-2 sm:px-4 lg:px-4 lg:h-[85vh]'>
            <div className="overview col-span-1 2xl:col-span-7 lg:col-span-12 lg:row-span-1">
              <Overview CurrentGroup={CurrentGroup} />
            </div>

            <div className="insights col-span-1 2xl:col-span-5  lg:col-span-12 lg:row-span-1">
              <Insights data={MembersSpendings} />
            </div>

            <div className="Friends-balance col-span-1 2xl:col-span-8  xl:col-span-7 lg:col-span-6 2xl:row-span-5 lg:row-span-4 bg-white shadow-md rounded-lg lg:h-auto h-[400px]">
              <Balance CurrentGroup={CurrentGroup} />
            </div>

            <div className="Recent-&-Status col-span-1 2xl:col-span-4 xl:col-span-5 lg:col-span-6 2xl:row-span-5 lg:row-span-4 min-h-[450px] h-[450px] lg:h-full flex flex-col gap-3">
              <motion.div
                variants={pageContainerVariants}
                initial="hidden"
                animate="visible"
                className="Extra bg-white h-auto sm:h-20 shadow-md rounded-lg grid grid-cols-5 p-2 gap-y-1">
                {extra.map((ex, i) => (
                  <motion.div variants={cardContentVariants}
                    key={i}
                    className={`flex items-center gap-2 sm:gap-3 min-w-0 ${i === 0 || i === 1 ? "border-r border-b-light pr-2 pl-2" : "pl-2"} ${ex.label === "Status" ? "col-span-1" : "col-span-2"}`}
                  >
                    {ex.label !== "Status" ? (
                      <div className="logo size-8 sm:size-11 rounded-full center-flex shrink-0" style={{ background: ex.gradient }}>
                        {ex.icon}
                      </div>
                    ) : ""}
                    <div className="info min-w-0">
                      <h3 className="font-semibold text-xs sm:text-base truncate">
                        {ex.label === "Status" ? ex.label : ex.value}
                      </h3>
                      <p className={`font-semibold text-[10px] sm:text-[13px] flex items-center gap-1 truncate`}
                        style={{
                          color: ex.label === "Status" ? ex.color : ''
                        }}
                      >
                        {ex.label === "Status" ? <span className='size-3 rounded-full shrink-0' style={{ background: ex.gradient }}></span> : ""}
                        {ex.label !== "Status" ? ex.label : ex.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="Recent-container rounded-lg flex-1  bg-white shadow-md flex flex-col min-h-0 ">
                <div className="recent flex-1 min-h-0 border-l m-2">
                  <Recent d={
                    <>No recent activity in <span className="font-semibold text-gray-800">{CurrentGroup.Name}</span>. All expenses, settlements, and updates for this group will appear here.</>
                  }
                    activities={activities}
                    location={"Group"}
                  />
                </div>
                <div className='btn-container w-full center-flex flex-col gap-3 mt-2 shrink-0 pb-2'>
                  <button
                    className="allexpenses text-primary underline cursor-pointer font-semibold text-sm sm:text-base"
                    onClick={() => { Navigate("./Expenses") }}
                  >
                    See all Expenses
                  </button>
                </div>
              </div>
            </div>
          </div> </>) : (
        <motion.div variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className='h-full center-flex'>
          <motion.div variants={cardVariants}>
            <UniversalEmptyState
              title="This Group has been removed or does not exist."
              textsize="text-sm"
              button={{
                type: "Groups",
                Link: "/Groups"
              }}
            >
              <div className="p-8 shadow-md border-l rounded-full">
                <MdGroupOff className="size-8 text-primary" />
              </div>
            </UniversalEmptyState>
          </motion.div>
        </motion.div>
      )}
      <Basemodel isOpen={updatepopup} Closemodel={() => setupdatepopup(false)} title="Update Group Info">
        <Updateg groupId={CurrentGroup?.id} />
      </Basemodel>
    </div>
  )
}