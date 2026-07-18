import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiFlipHorizontalLine } from "react-icons/ri";
import { RiFlipHorizontalFill } from "react-icons/ri";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Detailbtn from "./Common/detailbtn"
import dayjs from 'dayjs';
import { CategoryExtrator } from '../../utils/CategoryExtractor';
import { updateGroup } from '../../store/GroupSlice';
import { useDispatch } from 'react-redux';
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { FriendsGroupSpendings, GroupExpenses } from '../../store/ExpenseSlice'
import { Memberdetails } from '../../utils/Memberdetails';
import { categories } from '../../pages/Expenses/Expenses';
import { RiUserLine } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import {FaBan} from "react-icons/fa";
import { GroupActivities } from '../../store/ActivitySlice';
export const statuses = {
  Active: {
    label: "Active",
    textColor: "#16A34A", 
    bgColor: "#2FA85A"   
  },
 Freeze: {
  label: "Freeze",
textColor: "#0369A1",
  bgColor: "#0284C7",  
}

};

const Card = React.memo(({ group }) => {
  const [flip, setflip] = useState(false)
  const [pin, setpin] = useState(group.isPinned)
  const dispatch = useDispatch()
  const TopContributor = useSelector(state => FriendsGroupSpendings(state, group.id)).sort((a, b) => b.spent - a.spent)[0]
  const RecentExpense = useSelector(state => GroupExpenses(state, group.id).at(0))
  const Icon = categories[RecentExpense?.Category]?.icon;
  const RecentActivity = useSelector(state=>GroupActivities(state,group).slice(0,1))
  console.log(RecentActivity)
  useEffect(() => {
    setpin(group.isPinned);
  }, [group.isPinned])
  function handlePin() {
    setpin(!pin);
    dispatch(updateGroup({ id: group.id, changes: { isPinned: !pin } }))
  }
  return (
    <StyledWrapper>
      <div className="card">
        <div className={`content shadow-lg ${flip ? "rotate-y-180" : "rotate-y-0"}`}>
          <div className="front  bg-neutral-200 relative">
            <div className='absolute top-2 left-2 z-10 center-flex gap-1'>
              <button className={`cursor-pointer text-primary text-lg ${!pin ? '' : 'rotate-45'} peer`} onClick={handlePin}>
                {pin ? <TbPinnedFilled /> : <TbPinnedOff />}
              </button>
              <span className='text-sm border-l p-1 shadow peer-hover:opacity-100 opacity-0 rounded-md trans'>
                {pin ? "Unpin" : "Pin"}
              </span>
            </div>
            <div className="front-content bg-white">
              <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans absolute bottom-2 -translate-x-1/2 left-1/2 
                            " onClick={() => {
                  setflip(!flip)
                }}>
                <RiFlipHorizontalLine className='size-5' />
              </button>
              <div className="status p-1  flex items-center justify-center gap-2">
                <h4 className="text-xs sm:text-sm font-semibold">Status</h4>
                <div
                  className="flex items-center gap-1 text-xs sm:text-sm"
                  style={{ color: statuses[group.statusid].textColor }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statuses[group.statusid].bgColor }}
                  ></div>
                  <span>{statuses[group.statusid].label}</span>
                </div>
              </div>
              <div className="g-content gap-1 h-32 sm:h-43 my-1  mx-2  grid grid-cols-5 grid-row-2">
                <div className='g-info flex flex-col items-center col-span-2 p-1 gap-1 h-36 sm:h-48'>
                  <div className="g-img  size-16 sm:size-25 rounded-full ">
                    <img src={CategoryExtrator(group).Img} className='Img-c' alt="" />
                  </div>
                  <h2 className='text-xs sm:text-sm font-semibold line-clamp-2 w-[85%] text-center '>{group.Name}</h2>
                  <Detailbtn groupid={group.id} />
                </div>
                <div className=' col-span-3 flex flex-col gap-1 sm:gap-2 min-w-0'>
                  <div className='members border h-16 sm:h-20 border-b-light rounded-xl flex gap-1 sm:gap-2 items-center pr-1 sm:pr-2'>
                    <div className='members-info flex-1 min-w-0 h-full center-flex flex-col '>
                      <h2 className='text-xs sm:text-md font-semibold p-1 sm:p-2 pb-0 truncate'>Total Members</h2>
                      <h1 className='text-lg sm:text-2xl text-text-secondary'>{group.Members.length}</h1>
                    </div>
                    <div className='member-logo size-10 sm:size-14 rounded-full shrink-0 center-flex' style={{ background: "linear-gradient(135deg, #2196F3 0%, #3F51B5 50%, #1A237E 100%)" }}>
                      <FaUser className='size-4 sm:size-5 text-white' />
                    </div>
                  </div>
                  <div className='expenses border h-16 sm:h-20 border-b-light rounded-xl flex gap-1 sm:gap-2 items-center pr-1 sm:pr-2'>
                    <div className='members-info flex-1 min-w-0 h-full center-flex flex-col '>
                      <h2 className='text-xs sm:text-md font-semibold p-1 sm:p-2 pb-0 truncate'>Total Expenses</h2>
                      <h1 className='text-lg sm:text-2xl text-text-secondary truncate'>{Number(group.totalAmount).toLocaleString()}</h1>
                    </div>
                    <div className='member-logo size-10 sm:size-14 rounded-full shrink-0 center-flex' style={{ background: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)" }}>
                      <FaMoneyCheck className='size-4 sm:size-5 text-white' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="back bg-white">
            <div className="back-content ">
              <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans absolute bottom-2 -translate-x-1/2 left-1/2 " onClick={() => {
                setflip(!flip)
              }}>
                < RiFlipHorizontalFill className='size-5' />
              </button>
              <p className='text-xs sm:text-sm  p-1'>
                Created on <span className='font-semibold'>{dayjs(group.date).format("MM:DD:YYYY")}</span>
              </p>
              <div className='grid grid-cols-3 pb-3 pt-2 border-b-light border-b mx-1'>
                <div className='top-spender-container border-r-1 border-b-light h-24 sm:h-28'>
                  <h3 className='text-xs sm:text-sm font-semibold text-center'>Top Spender</h3>
                  <div className={`top-spender-info center-flex  mt-1 flex-col`}>
                    <div className={`"top-spender-img size-12 sm:size-16 relative  ${Memberdetails(TopContributor?.id)?.isBanned ? "border-red-500" : "border-primary"} ${
                      TopContributor ? "border" : " border-gray-400"
                    }  rounded-full center-flex `}>
                      {TopContributor ? <> <img src={Memberdetails(TopContributor.id)?.Image} className='Img-c' alt="" />
                      <div className={`absolute top-9/12 left-1 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${Memberdetails(TopContributor.id)?.isBanned ? "block" : "hidden"}`}>
                      <FaBan className="size-2" />
                    </div>
                    </>
                        :
                        <div className='border-l size-10 sm:size-14 shadow center-flex rounded-full'>
                          <RiUserLine className='text-primary size-4 sm:size-5' />
                        </div>
                      }
                    </div>
                    <div className="top-spender-info center-flex border w-auto min-w-16 sm:min-w-25 max-w-[100px] h-6 border-l
                    mt-1 rounded-lg gap-2 px-1">
                      {<h4 className='Top-spender-name font-semibold text-[11px] sm:text-[13px] text-text-secondary truncate'>{TopContributor ? Memberdetails(TopContributor.id)?.Name : " No data yet"}</h4>}
                    </div>
                  </div>
                </div>
                <div className='group-recent-expense h-24 sm:h-28 col-span-2 min-w-0'>
                  <h3 className='text-xs sm:text-sm font-semibold text-center'>Recent Expense</h3>
                  {RecentExpense ?
                    <div className="recent-expense-info border h-auto min-h-[70px] sm:h-22   ml-1  mr-1 border-l rounded-lg mt-1  center-flex gap-2 px-2">
                      <div className="expense-logo  size-8 sm:size-10 rounded-lg shrink-0 center-flex shadow-md" style={{ background: categories[RecentExpense.Category].gradient }}>
                       <Icon className="size-4 sm:size-5 text-white" />
                      </div>
                      <div className='expense-details flex-1 min-w-0  h-auto sm:h-15 flex justify-between gap-1 items-center'>
                        <div className='expense-left min-w-0'>
                          <div className="category-date flex items-center gap-1 flex-col">
                            <span className='text-[11px] sm:text-[12px] truncate max-w-[90px]'>{RecentExpense.Name}</span>
                            <span className='text-[9px] sm:text-[10px] text-text-secondary'>{RecentExpense.createdDate}</span>
                          </div>
                        </div>
                        <div className='expense-right text-right flex flex-col shrink-0'>
                          <h2 className='text-sm sm:text-md text-primary font-semibold '>Rs.{Number(RecentExpense.totalAmount).toLocaleString()}</h2>
                          <span className='text-[9px] sm:text-[10px] text-text-secondary'>Total Amount</span>
                        </div>
                      </div>
                    </div>
                    :
                    <div className='w-full sm:w-50  mx-auto p-1 center-flex flex-col gap-2 '>
                      <div className='border-l size-12 sm:size-15 shadow center-flex rounded-full '>
                        <RiFileList3Line className='text-primary size-5 sm:size-6' />
                      </div>
                      <p className='text-text-secondary text-xs sm:text-sm '>No Expense Available</p>
                    </div>

                  }
                </div>
              </div>
              <div className="group-recent-activiity px-3 sm:px-4 pt-2">
                <h4 className='text-text-primary font-bold text-sm sm:text-md'>Recent Activity</h4>
                <h5 className='text-text-secondary text-xs sm:text-sm '>
                  {RecentActivity.length > 0 ? RecentActivity[0]?.title :"No Receipt Available"}
                  </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
})

const StyledWrapper = styled.div`
  .card {
    position: relative;
    overflow: visible;
    width: 100%;
    height: 210px;
    margin: 0 auto;
  }

  @media (min-width: 480px) {
    .card {
      height: 235px;
    }
  }

  @media (min-width: 640px) {
    .card {
      height: 260px;
    }
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    border-radius: 10px;
  }

  .front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
  }

  .front {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .front::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 40%;
    height: 220%;
    background: linear-gradient(90deg, transparent, #ff6b35, #ff6b35, #ff6b35, #ff6b35, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .front-content {
    position: absolute;
    width: 98%;
    height: 97%;
    border-radius: 5px;
    color: black;
  }

  @keyframes rotation_481 {
    0% { transform: rotateZ(0deg); }
    0% { transform: rotateZ(360deg); }
  }

  .back {
    transform: rotateY(180deg);
    color: black;
    border: 1px solid #c4cad1;
  }

  .back-content {
    border-radius: 5px;
  }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0px); }
  }
`;

export default Card;