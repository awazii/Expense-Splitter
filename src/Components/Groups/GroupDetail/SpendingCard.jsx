import React from 'react'
import { TbListDetails } from "react-icons/tb";
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FriendGroupSpendings } from '../../../store/ExpenseSlice';
import { FaBan } from "react-icons/fa"

export const SpendingCard = ({ friend, Openmodel, setCurrentfriend }) => {
    const { Groupid } = useParams()
    
    const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }]
    
    const overview = [
        {
            label: "Spent",
            gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
            svg: <FaCoins className='size-3 sm:size-4 text-white' />
        },
        {
            label: "Share",
            gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
            svg: <IoTicket className='size-4 sm:size-5 text-white' />
        }
    ]
    
    const MemberExpenses = useSelector(state => FriendGroupSpendings(state, Groupid, friend.id));
    
    return (
        <div className={`friend-balance border-l rounded-lg shadow-md h-fit p-3`}>
            
            <div className="about-f-cotainer flex items-center gap-2 w-full">
                <div className="about-f flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
                    
                    <div className={`logo size-12 sm:size-14 md:size-16 rounded-full relative shrink-0 ${friend.isBanned ? "border-red-500" : "border-primary"} border-2 flex items-center justify-center`}> 
                        <img src={friend.Image} className='Img-c border-none rounded-full object-cover size-full' alt="friend-img" />
                        
                        {friend.isBanned && (
                            <div className={`absolute -bottom-1 -right-1 sm:top-9/12 sm:right-0 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg`}>
                                <FaBan className="size-2" />
                            </div>
                        )}
                    </div>
                    
                    <div className="info min-w-0 flex-1">
                        <h3 className='font-semibold text-sm sm:text-base truncate '>{friend.Name}</h3>
                        <p className={`text-xs sm:text-[13px] truncate ${friend.isBanned ? 'text-red-500 font-semibold' : 'text-text-secondary'}`}>
                            {friend.isBanned ? '(Banned)' : friend.Bio}
                        </p>
                    </div>
                </div>
                
                <div className="extra w-fit center-flex shrink-0">
                    <div className="actions center-flex justify-end">
                        {actionbtns.map((button, index) => (
                            <button 
                                key={index} 
                                className={`group flex items-center h-8 sm:h-9 min-w-8 sm:min-w-9 px-1.5 sm:px-2 rounded-lg cursor-pointer ${button.bg}`} 
                                onClick={() => {
                                    index === 0 && Openmodel()
                                    setCurrentfriend(friend)
                                }}
                            >
                                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-1 trans whitespace-nowrap text-white text-xs sm:text-sm">
                                    {button.label}
                                </span>
                                <button.svg className='text-white size-4 sm:size-5 shrink-0' />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="spending-info mt-3 border-l py-1 flex items-center pl-2 sm:pl-3 gap-2 w-full">
                {overview.map((card, index) => (
                    <div key={index} className={`${card.label} border-b-light flex items-center flex-1 min-w-0 gap-1.5 sm:gap-2 ${index !== 0 ? 'border-l-1 pl-2' : ''}`}>
                        {card.gradient ? (
                            <div className="logo size-8 sm:size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ background: card.gradient }}>
                                {card.svg}
                            </div>
                        ) : (
                            <div className={`logo size-8 sm:size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${friend.balancebgClass}`}>
                                {card.svg}
                            </div>
                        )}
                        <div className="info flex-1 min-w-0 flex flex-col justify-center">
                            <div className={`description font-bold text-text-secondary text-xs sm:text-sm truncate `}>
                                Rs. {card.label === "Spent" 
                                    ? (MemberExpenses?.spent ?? 0).toLocaleString() 
                                    : (MemberExpenses?.share ?? 0).toLocaleString()}
                            </div>
                            <div className="title text-[10px] sm:text-[11px] font-semibold"> 
                                {card.label}
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
            
        </div>
    )
}