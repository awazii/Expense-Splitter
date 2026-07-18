import React from 'react'
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FriendGroupSpendings } from '../../../../store/ExpenseSlice'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Fgoverview = ({ Currentfriend }) => {
    const { Groupid } = useParams()
    const Currentfriendspending = useSelector(state => FriendGroupSpendings(state, Groupid, Currentfriend.id))
    
    const overview = [
        {
            label: "Total Spendings",
            value: (Currentfriendspending?.spent ?? 0),
            gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
            svg: <FaCoins className='size-5 sm:size-6 lg:size-7 text-white shrink-0' />
        },
        {
            label: "Total Share",
            value: (Currentfriendspending?.share ?? 0),
            gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
            svg: <IoTicket className='size-5 sm:size-6 lg:size-8 text-white shrink-0' />
        }
    ]
    
    return (
        <div className='w-full h-full flex flex-col sm:flex-row p-3 sm:p-4 gap-3 sm:gap-0 justify-center'>
            {overview.map((card, index) => (
                <div 
                    key={index} 
                    className={`flex-1 flex items-center min-w-0 gap-3 sm:gap-4 justify-start sm:justify-center
                    ${index !== 0 ? 'border-t border-gray-100 sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4 lg:pl-6' : 'sm:pr-4 lg:pr-6'}`}
                >
                    <div 
                        className="size-12 sm:size-14 lg:size-16 rounded-full flex items-center justify-center shrink-0 shadow-sm" 
                        style={{ background: card.gradient }}
                    >
                        {card.svg}
                    </div>
                    <div className="flex flex-col justify-center min-w-0 w-30">
                        <div className="text-xs sm:text-sm font-semibold text-text-secondary"> 
                            {card.label}
                        </div>
                        <p className="font-bold text-base sm:text-lg lg:text-xl text-gray-800 truncate">
                            {`Rs. ${card.value.toLocaleString()}`}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}