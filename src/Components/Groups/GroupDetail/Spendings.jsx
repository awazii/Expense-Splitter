import React, { useState } from 'react'
import { motion } from "framer-motion";
import { IoIosWallet } from "react-icons/io";
import Addbtn from "../Common/Addfbtn"
import { Basemodel } from '../../basemodel';
import { Friendgdetails } from './transactions/Friendgdetails';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { SpendingCard } from './SpendingCard';
import { headerVariants, cardVariants, pageContainerVariants } from "../../../utils/animation";
import {Addmember} from './Addmember'
export const Balance = ({ CurrentGroup }) => {
  const [popup, setpopup] = useState(false)
  const [Currentfriend, setCurrentfriend] = useState(null)
  const [addpopup, setaddpopup] = useState(false)
  const Members = useSelector(selectAllFriends).filter(friend => CurrentGroup.Members.includes(friend.id))

  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)

  return (
    <div className='p-3 sm:p-5 flex flex-col h-full overflow-auto'>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="header flex flex-col sm:flex-row items-start sm:items-center justify-between h-fit gap-2 sm:gap-0"
      >
        <div className="info min-w-0">
          <div className="title flex items-center w-fit gap-1">
            <h3 className='font-semibold text-lg sm:text-2xl'>Spendings</h3>
            <IoIosWallet className='size-4 sm:size-5' />
          </div>
          <p className='text-xs sm:text-sm text-text-secondary'>
            Track individual contributions across your group
          </p>
        </div>
      {CurrentGroup.statusid !== "Freeze"  && <div className="add-friend sm:mr-3 shrink-0 self-end">
          <Addbtn onClick={() => setaddpopup(true)} />
        </div>}
      </motion.div>
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className="friend-balances flex-1 min-h-0 overflow-auto mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-3  gap-3 auto-rows-min"
      >
        {Members.map((friend, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
          >
            <SpendingCard
              friend={friend}
              Openmodel={Openmodel}
              setCurrentfriend={setCurrentfriend}
            />
          </motion.div>
        ))}
      </motion.div>
      <Basemodel
        isOpen={popup}
        Closemodel={Closemodel}
        title={`Member Group Activity`}
      >
        <Friendgdetails Currentfriend={Currentfriend} />
      </Basemodel>
      <Basemodel
        isOpen={addpopup}
        Closemodel={() => setaddpopup(false)}
        title={`Add Members to ${CurrentGroup.Name}`}
      >
        <Addmember CurrentGroup={CurrentGroup} Closemodel={() => setaddpopup(false)} />
      </Basemodel>
    </div>
  )
}