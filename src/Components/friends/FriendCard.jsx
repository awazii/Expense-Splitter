import React, { useState ,useEffect } from 'react';
import styled from 'styled-components';
import { RiFlipHorizontalLine } from "react-icons/ri";
import { RiFlipHorizontalFill } from "react-icons/ri";
import { MdGroup } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { indicators } from '../../pages/friends/Friendslist';
import { useSelector, useDispatch } from 'react-redux';
import { updateFriend } from '../../store/FriendsSlice';
import { FriendActivities } from '../../store/ActivitySlice';
import {FaBan} from "react-icons/fa";
const Card = React.memo(({ friend }) => {
  const Navigation = useNavigate()
  const dispatch = useDispatch()
  const [flip, setflip] = useState(false)
  const [pin, setpin] = useState(friend.isPinned)
   const RecentActivity = useSelector(state=>FriendActivities(state,friend.id).slice(0,1))
  useEffect(() => {
    setpin(friend.isPinned);
  }, [friend.isPinned])
  
  function actions() {
    const actions = friend.id !== "admin_01" ? [{ svg: TbListDetails, bg: "bg-green-600", label: "Details" }, { svg: !pin ? TbPinnedOff : TbPinnedFilled, bg: "bg-primary", label: pin ? "Unpin" : "Pin" },] : [{ svg: TbListDetails, bg: "bg-green-600", label: "Details" },]
    return actions
  }
function handlePin() {
  setpin(!pin);
  dispatch(updateFriend({id:friend.id, changes:{isPinned:!pin}}))
}
  return (
    <StyledWrapper>
      <div className="card ">
        <div className={`content shadow-lg ${flip ? "rotate-y-180" : "rotate-y-0"}`}>
          <div className="front bg-neutral-200 ">
            <div className="front-content  flex justify-center gap-2 bg-white relative">
              <div className="h-42 center-flex w-full  flex-col pt-5">
                <div className="flex items-center py-3 w-full">
                  <div className='about-f center-flex w-80 gap-3 px-5 '>
                    <div className={`profile size-20 rounded-full relative border-2 ${friend.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
                      <img className='Img-c' src={friend.Image} alt="" />
                       <div className={`absolute top-9/12 left-1 p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${friend.isBanned ? "block" : "hidden"}`}>
                                                    <FaBan className="size-2" />
                                                </div>
                    </div>
                    <div className="info h-10 flex items-start justify-center flex-col flex-1">
                      <h3 className="name text-text-primary font-bold line-clamp-1 ">{friend.Name} <span className='text-[12px]'>{`${friend.id === "admin_01" ? "(Admin)" : ""}`}</span></h3>
                      <h4 className={`bio ${friend.isBanned ? "text-red-500 font-semibold" : "text-text-secondary"} text-sm`}>{friend.isBanned ? " (banned)" : friend.Bio}</h4>
                    </div>
                  </div>
                  <div className="actions  w-25 center-flex flex-col items-end gap-2 p-2 flex-1">
                    {actions().map((action, index) => {
                      return <button key={index} className={`group flex items-center  h-8 min-w-8 px-1.5 rounded-lg cursor-pointer ${action.bg}`} onClick={(() => {
                        index === 1 ? handlePin() : Navigation("/Friends/" + friend.id)
                      })}>
                        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-2 trans whitespace-nowrap text-white text-sm">
                          {action.label}
                        </span>
                        <action.svg className={`text-white size-5 ${index === 1 && pin ? "rotate-45" : ""}`} />
                      </button>
                    })}
                  </div>
                </div>
                <div className="net-balance center-flex  w-fit center-flex flex-col gap-2">
                  <div className="center-flex gap-3 w-50 border-l  p-2 "
                  >
                    <div className={`logo size-10 rounded-full center-flex ${indicators[friend.netBalance.indicatorid].balancebgClass}`}>
                      <FaMoneyBillTransfer className='size-5 text-white' />
                    </div>
                    <div className="amount">
                      <h3 className={`${indicators[friend.netBalance.indicatorid].balancetextClass} font-semibold`}>
                        Rs.{Math.abs(friend.netBalance.total).toLocaleString()}
                      </h3>
                      <p className="font-semibold text-[13px]">{friend.netBalance.total === 0 ? "Settled" : "Net Balance"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="flip absolute bottom-3 border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans" onClick={() => {
                setflip(!flip)
              }}>
                <RiFlipHorizontalLine className='size-5' />
              </button>
            </div>
          </div>
          <div className="back bg-white">
            <div className="back-content flex flex-col items-center ">
              <div className='grid  h-50 w-full p-2 grid-rows-3 grid-cols-2 gap-1'>
                <div className=' row-span-2 place-items-center self-center'>
                  <div className=' size-15 rounded-full center-flex ' style={{ background: "  linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)" }}><MdGroup className='size-6 text-white' /></div>
                  <h4 className='text-sm mt-2 font-bold'>Groups Involved</h4>
                  <h4 className='text-sm'>{`${friend.crews.groupCount} ${friend.crews.groupCount <= 1 ? "Group" : "Groups"}`}</h4>
                </div>
                <div className='row-span-2 place-items-center self-center border-l-1 border-b-light'>
                  <div className='size-15 rounded-full center-flex ' style={{ background: " linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)" }}><FaMoneyCheck className='size-6 text-white' /></div>
                  <h4 className='text-sm mt-2 font-bold'>Money Spent</h4>
                  <h4 className='text-sm'>Rs.{friend.spendings.toLocaleString()}</h4>

                </div>
                <div className=' col-span-2 p-2 border-t-1 border-b-light'>
                  <h4 className='text-text-primary font-bold'>Recent Activity</h4>
                  <h5 className='text-text-secondary text-sm'>{RecentActivity.length > 0 ? RecentActivity[0]?.title :"No Receipt Available"}</h5>

                </div>
              </div>
              <button className="flip  absolute bottom-3  border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans" onClick={() => {
                setflip(!flip)
              }}>
                < RiFlipHorizontalFill className='size-5' />
              </button>       
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
})

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    height: 240px;
  }

  .content {
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
    height: 250%;
    background: linear-gradient(90deg, transparent, #ff6b35, #ff6b35, #ff6b35, #ff6b35, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .front-content {
    position: absolute;
    width: 98%;
    height: 98%;
    border-radius: 5px;
    color: black;
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    0% {
      transform: rotateZ(360deg);
    }
  }

  .back {
    transform: rotateY(180deg);
    color: black;
    border: 1px solid #c4cad1;
  }
    .back-content{
    border-radius: 5px;
    }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }`;

export default Card;
