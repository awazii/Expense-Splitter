import React from 'react'
import Expensedetailbtn from '../Common/Details';
import { CategoryExtrator } from '../../utils/CategoryExtractor';
import { categories } from '../../pages/Expenses/Expenses';
import { useSelector } from 'react-redux';
import { selectGroupById } from '../../store/GroupSlice';
import { selectFriendById } from '../../store/FriendsSlice';
import { FaBan } from "react-icons/fa"

const MemberAvatars = React.memo(({ id }) => {
    const friend = useSelector(state => selectFriendById(state, id));
    return (
        <div className={`member size-6 md:size-7 rounded-lg shadow-sm ${friend?.isBanned ? "border-red-500" : "border-primary"} border relative`}>
            <img src={friend?.Image || ""} alt="" className='Img-c rounded-lg' />
            {friend?.isBanned && (
                <div className="absolute -bottom-1 -right-1 p-[2px] bg-red-500 rounded-full text-white shadow-md z-10">
                    <FaBan className="size-2" />
                </div>
            )}
        </div>
    )
})

export const ExpenseCard = React.memo(({ expense, Openmodel, ForGroup }) => {
    const group = useSelector(state => selectGroupById(state, expense.Groupid));
    const Icon = categories[expense.Category].icon;
    
    return (
        <div className='relative bg-white shadow-md rounded-lg p-3 md:p-4 flex flex-col gap-3 h-full justify-between'>
            <div className="flex items-start gap-3">
                <div className="size-12 md:size-14 shrink-0 rounded-lg center-flex shadow-sm mt-1" style={{ background: categories[expense.Category].gradient }}>
                    <Icon className="size-5 md:size-6 text-white" />
                </div>
                
                <div className='flex-1 min-w-0 flex justify-between items-start gap-2'>
                    <div className='flex-1 min-w-0'>
                        <h2 className='text-base md:text-lg font-semibold truncate'>{expense.Name}</h2>
                        <div className="flex items-center gap-1 flex-wrap mt-0.5">
                            <span className='text-xs text-text-secondary truncate'>{categories[expense.Category].name}</span>
                            <span className='text-xs text-text-secondary'>•</span>
                            <span className='text-xs text-text-secondary whitespace-nowrap'>{expense.createdDate}</span>
                        </div>
                    </div>
                    
                    <div className='text-right shrink-0'>
                        <h2 className='text-base md:text-lg text-primary font-semibold'>Rs.{Number(expense.totalAmount).toLocaleString()}</h2>
                        <span className='text-[10px] md:text-xs text-text-secondary block'>Total Amount</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between gap-2 border-t border-gray-100 pt-3 mt-1'>
                <div className='flex items-center gap-2 flex-1 min-w-0'>
                    {!ForGroup && (
                        <div className="size-8 md:size-10 shrink-0 rounded-lg">
                            <img src={CategoryExtrator(group)?.Img || ""} alt="" className='Img-c rounded-lg' />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h4 className='text-xs md:text-sm font-semibold truncate'>
                            {ForGroup ? "Participants" : group?.Name || ""} 
                        </h4>
                        <div className="flex gap-1 mt-1 flex-wrap">
                            {expense.Members.slice(0, 3).map((members, index) => (
                                <MemberAvatars key={index} id={members.id} />
                            ))}
                            {expense.Members.length > 3 && (
                                <div className="size-6 md:size-7 bg-highlight border shadow-sm rounded-lg center-flex">
                                    <span className='text-[10px]'>+{expense.Members.length - 3}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="shrink-0 self-end mb-1">
                    <Expensedetailbtn Openmodel={Openmodel} />
                </div>
            </div>
            
        </div>
    )
})