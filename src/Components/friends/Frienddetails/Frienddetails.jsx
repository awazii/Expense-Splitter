import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoReturnUpBack, IoSettingsOutline } from "react-icons/io5";
import Restrictbtn from "../Common/Restrictbtn"
import { Balancef } from './Balancef';
import { Recent } from '../../Recent';
import { Aboutf } from './Aboutf';
import { useSelector } from 'react-redux';
import { selectFriendById } from '../../../store/FriendsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Basemodel } from '../../basemodel';
import { Updatef } from './Updatef';
import { UserActionDialog } from './UserActionDialog'
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { pageContainerVariants, cardVariants } from "../../../utils/animation";
import { TbUserX } from "react-icons/tb";
import { FriendActivities } from '../../../store/ActivitySlice';
export const Frienddetails = () => {
  const Navigate = useNavigate()
  const { Friend } = useParams();
  const Activities = useSelector(state => FriendActivities(state, Friend))
  const [updatepopup, setupdatepopup] = useState(false)
  const [restrictpopup, setrestrictpopup] = useState(false)
  const CurrentFriend = useSelector((state) => selectFriendById(state, Friend));
  let isnew = CurrentFriend?.crews?.groupCount === 0 && CurrentFriend?.Relationship.length === 0
  return (
    <div className='friends-profile h-full scrollbar-hide overflow-auto pt-20 md:pt-0'>
      {CurrentFriend ? <> <div className="header h-auto sm:h-25 flex flex-col sm:flex-row px-4 sm:px-10 py-4 sm:py-0 items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="group-name flex items-center gap-2 sm:gap-3 min-w-0 ">
          <button
            className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95 shrink-0"
            onClick={() => { Navigate("/Friends") }}
          >
            <IoReturnUpBack className='size-5 sm:size-6 group-hover:text-primary' />
          </button>
          <h3 className={`text-lg sm:text-2xl lg:text-3xl truncate min-w-0`}>{`${CurrentFriend.Name}'s Profile`} <span className='text-[13px] sm:text-[18px] text-red-500 font-semibold'>{CurrentFriend.isBanned && "(Banned)"}</span></h3>
        </div>
        <div className="actions flex items-center gap-2 sm:gap-3 shrink-0 md:self-center self-end">
          {CurrentFriend.id !== "admin_01" && <Restrictbtn isnew={isnew} isbanned={CurrentFriend.isBanned} onClick={() => {
            setrestrictpopup(true)
          }} />}
          {
            (CurrentFriend.id !== "admin_01" && !CurrentFriend.isBanned) &&
            <button className="settingbtn card-b size-9 sm:size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95 cursor-pointer" onClick={() => setupdatepopup(true)}>
              <IoSettingsOutline className='size-4 sm:size-5 group-hover:text-primary' />
            </button>
          }

        </div>
      </div>
       <div className="friend-container grid container mx-auto grid-cols-1 2xl:grid-cols-3 xl:grid-cols-5 lg:grid-cols-2 h-auto lg:h-[85vh] gap-3 lg:grid-rows-6 mt-4 lg:mt-0 px-2 sm:px-4 lg:px-3">
  <div className="order-1 lg:order-2 col-span-1 2xl:col-span-1  xl:col-span-2 lg:row-span-3 sm:max-h-none  max-h-[330px] min-h-[200px] lg:min-h-0">
    <Aboutf CurrentFriend={CurrentFriend} />
  </div>
  <div className="order-2 xl:order-1 Balance col-span-1 2xl:col-span-2  xl:col-span-3 lg:row-span-6 border-l shadow  sm:min-h-[400px] ">
    <Balancef currentFriend={CurrentFriend} />
  </div>
  <div className="order-3 lg:order-3 Recent col-span-1 2xl:col-span-1  xl:col-span-2 lg:row-span-3 border-l shadow min-h-[350px] lg:min-h-0 h-[350px] lg:h-full">
    <Recent
      d={
        <>
          No recent activity for <span className="font-semibold text-gray-800">{CurrentFriend.Name}</span>.
          All their transactions, group updates, and settlements across the app will appear here.
        </>
      }
      activities={Activities}
      location="friendpage"
    />
  </div>
</div>
</> : (
        <motion.div variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className='h-full center-flex'>
          <motion.div variants={cardVariants}>
            <UniversalEmptyState
              title="This User has been removed or does not exist."
              textsize="text-sm"
              button={{
                type: "Friends",
                Link: "/Friends"
              }}
            >
              <div className="p-8 shadow-md border-l rounded-full">
                <TbUserX className="size-8 text-primary" />
              </div>
            </UniversalEmptyState>
          </motion.div>
        </motion.div>
      )}
      <Basemodel isOpen={updatepopup} Closemodel={() => setupdatepopup(false)} title="Update Friend Info">
        <Updatef friendId={CurrentFriend?.id} Closemodel={() => setupdatepopup(false)} />
      </Basemodel>
      <Basemodel isOpen={restrictpopup} Closemodel={() => setrestrictpopup(false)} title="">
        <UserActionDialog friendId={CurrentFriend?.id} isnew={isnew} isbanned={CurrentFriend?.isBanned} Closemodel={() => setrestrictpopup(false)} />
      </Basemodel>
    </div>
  )
}