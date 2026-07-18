import React, { useState, useEffect } from 'react'
import { IoIosWallet } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Basemodel } from '../../basemodel';
import { Balancewith } from './transactions/Balancewith';
import { Memberdetails } from '../../../utils/Memberdetails';
import { indicators } from '../../../pages/friends/Friendslist';
import { useSelector } from 'react-redux';
import { selectFriendById } from '../../../store/FriendsSlice';
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { RiUserHeartLine } from "react-icons/ri";
import { headerVariants, cardVariants, pageContainerVariants } from "../../../utils/animation";
import { motion } from "framer-motion";
import { FaBan } from "react-icons/fa";
const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }]
const RelationshipCard = ({ friend, setCurrentbalancewith, Openmodel }) => {
  const Friend = useSelector(state => selectFriendById(state, friend.id));

  return (
    <motion.div
      variants={cardVariants} className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
      <div className="about-f-container flex flex-wrap sm:flex-nowrap items-center gap-2 ">
        <div className="about-f flex-1 min-w-0 flex items-center gap-2 sm:gap-3">
          <div className={`profile size-12 sm:size-18 rounded-full relative shrink-0 border-2 ${Friend.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
            <img className='Img-c w-full h-full object-cover rounded-full' src={Friend.Image} alt="" />
            <div className={`absolute top-9/12 left-1 p-1 sm:p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${Friend.isBanned ? "block" : "hidden"}`}>
              <FaBan className="size-2" />
            </div>
          </div>
          <div className="info flex-1 min-w-0">
            <h3 className='font-semibold text-sm sm:text-base truncate'>{Friend.Name} </h3>
            <p className={`text-[11px] sm:text-[12px] truncate ${Friend.isBanned ? "text-red-500 font-semibold" : "text-text-secondary"}`}>
              {Friend.isBanned ? "(Banned)" : Friend.Bio}
            </p>
          </div>
        </div>
        <div className="extra shrink-0 center-flex">
          <div className="actions w-auto center-flex flex-col items-end gap-2">
            {actionbtns.map((button, index) => (
              <button key={index} className={`group flex items-center h-7 sm:h-8 min-w-7 sm:min-w-8 px-1 sm:px-1.5 rounded-lg cursor-pointer ${button.bg}`} onClick={() => {
                index === 0 && Openmodel()
                setCurrentbalancewith(friend.id)
              }}>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-2 trans whitespace-nowrap text-white text-xs sm:text-sm hidden sm:inline">
                  {button.label}
                </span>
                <button.svg className='text-white size-4 sm:size-5' />
              </button>
            ))}
          </div>
        </div>

      </div>
      <div className="balance h-auto mt-2 border-l w-full sm:w-60 p-2 mx-auto center-flex flex-col ">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0"
        >
          <div className={`logo size-8 sm:size-10 rounded-full shrink-0 center-flex ${friend.netBalance < 0 ? indicators.debtor.balancebgClass : friend.netBalance > 0 ? indicators.creditor.balancebgClass : indicators.settled.balancebgClass}`}>
            <FaMoneyBillTransfer className='size-4 sm:size-5 text-white' />
          </div>
          <div className="amount min-w-0">
            <h3 className={`font-semibold text-sm sm:text-base truncate`}>
              Rs.{Math.abs(friend.netBalance).toLocaleString()}
            </h3>
            <p className="font-semibold text-[11px] sm:text-[13px]">Net Balance</p>
          </div>
        </div>
        <p className="note text-text-secondary font-semibold text-[10px] sm:text-[12px] ml-2 sm:ml-5 mt-1 truncate w-full">{friend.netBalance < 0 ? `(You owed ${Memberdetails(Friend.id)?.Name})` : friend.netBalance > 0 ? `(${Memberdetails(Friend.id)?.Name} owes you)` : "(All setteled)"}</p>
      </div>
    </motion.div>
  )
}
export const Balancef = ({ currentFriend }) => {
  const [popup, setpopup] = useState(false)
  const [Currentbalancewith, setCurrentbalancewith] = useState("")
  const Openmodel = () => {
    setpopup(true)
  }
  const Closemodel = () => [
    setpopup(false)
  ]
  return (
    <div className='p-3 sm:p-5 flex flex-col h-full overflow-auto'>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="header h-fit"
      >
        <div className="info">
          <div className="title center-flex w-fit gap-1">
            <h3 className='font-semibold text-lg sm:text-2xl'>Balances</h3>
            <IoIosWallet className='size-4 sm:size-5' />
          </div>
          <p className='text-xs sm:text-sm text-text-secondary'>
            Check your net balance with friends
          </p>
        </div>
      </motion.div>
      {currentFriend.Relationship.length > 0 ? (
        <motion.div
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className="friend-balances flex-1 h-fit mt-3 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 auto-rows-min "
        >
          {currentFriend.Relationship?.map((rel) => (
            <RelationshipCard
              key={rel.id}
              friend={rel}
              setCurrentbalancewith={setCurrentbalancewith}
              Openmodel={Openmodel}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div variants={cardVariants} className='flex-1' initial="hidden" animate="visible">
          <UniversalEmptyState
            title="No shared balances"
            description={`No shared balances for ${currentFriend.Name}. They haven't started sharing expenses with anyone yet.`}
            textsize=""
          >
            <div className="p-10 shadow-md bg-gray-50 rounded-full">
              <RiUserHeartLine className="size-10 text-primary" />
            </div>
          </UniversalEmptyState>
        </motion.div>
      )}
      <Basemodel
        isOpen={popup}
        Closemodel={Closemodel}
        title={`Balance with ${Memberdetails(Currentbalancewith)?.Name}`}
      >
        <Balancewith
          key={Currentbalancewith}
          Currentbalancewith={Currentbalancewith}
          currentFriend={currentFriend}
        />
      </Basemodel>
    </div>
  );
}