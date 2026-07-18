import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaHistory } from "react-icons/fa";
import { GroupExpenses } from "../../../../store/ExpenseSlice"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { categories } from '../../../../pages/Expenses/Expenses';
import { indicators } from '../../../../pages/friends/Friendslist';
import { UniversalEmptyState } from '../../../UniversalEmptyState';
import { RiFileList3Line } from "react-icons/ri";

export const Transactionlist = ({ setisdetailopen, Currentfriend }) => {
  const { Groupid } = useParams()
  const transactions = useSelector(state => GroupExpenses(state, Groupid)).filter(t => t.Members.some(m => m.id === Currentfriend.id))
  
  function Payment({ expense }) {
    const member = expense.Members.find(m => m.id === Currentfriend.id)
    if (!member) return null 
    
    const netBalance = Number(member.spent || 0) - Number(member.share || 0)
    const textcolor = netBalance < 0 ? indicators.debtor.balancetextClass : netBalance > 0 ? indicators.creditor.balancetextClass : indicators.settled.balancetextClass
    const displayAmount = netBalance === 0 ? Math.abs(member.spent) : Math.abs(netBalance);
    
    return (
      <div className='text-right shrink-0'>
        <h2 className={`text-base sm:text-lg lg:text-xl font-bold ${textcolor}`}>
            {`Rs. ${displayAmount.toLocaleString()}`}
        </h2>
        <span className='text-[10px] sm:text-xs font-medium text-text-secondary uppercase tracking-wide'>
            {netBalance > 0 ? 'You lent' : netBalance === 0 ? 'You paid' : 'You borrowed'}
        </span>
      </div>
    )
  }

  const Geticon = ({ Category }) => {
     const Icon = categories[Category]?.icon;
    return (
      <Icon className="size-5 sm:size-6 text-white shrink-0" />
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="shrink-0 flex items-center gap-2 text-gray-800 mb-3 px-1">
        <FaHistory className='size-5 sm:size-6' />
        <h3 className='text-base sm:text-lg font-semibold'>Transaction History</h3>
      </div>
      
      {transactions.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 sm:pr-2">
          {transactions.map((trans, index) => {
            return (
              <div key={index} className='bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl p-3 sm:p-4 flex flex-col w-full border border-gray-50'>
                
                <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
                  <div 
                    className="size-10 sm:size-12 rounded-xl flex items-center justify-center shadow-sm shrink-0" 
                    style={{ background: categories[trans.Category]?.gradient }}
                  >
                     <Geticon Category={trans.Category}/>
                  </div>
                  
                  <div className='flex-1 flex items-center justify-between gap-2 min-w-0'>
                    
                    <div className='flex flex-col min-w-0 pr-2'>
                      <h2 className='font-semibold text-sm sm:text-base text-gray-800 truncate'>
                        {trans.Name}
                      </h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className='text-xs sm:text-sm text-gray-500 '>{trans.Category}</span>
                        <span className='text-xs sm:text-sm text-gray-400'>•</span>
                        <span className='text-xs sm:text-sm text-gray-500 shrink-0'>{trans.createdDate}</span>
                      </div>
                    </div>
                    
                    <Payment expense={trans} />
                    
                  </div>
                </div>

                <div className={`mt-3 pt-2 border-t border-gray-100 flex items-center justify-end w-full`}>
                  <button 
                    className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-500 hover:text-primary transition-colors cursor-pointer group" 
                    onClick={() => {
                      setisdetailopen({ open: true, trans });
                    }}
                  >
                    View Details
                    <MdKeyboardArrowRight className='size-5 sm:size-6 group-hover:translate-x-1 transition-transform' />
                  </button>
                </div>
              </div>
            )
          })}
        </div> 
      ) : (
        <UniversalEmptyState
          title="No transactions found"
          textsize="text-sm"
          description={<>No transactions found for <span className="font-semibold text-gray-800">{Currentfriend.Name}</span> in this group.</>}
        >
          <div className="p-6 sm:p-8 shadow-sm border border-gray-100 bg-gray-50 rounded-full">
            <RiFileList3Line className="size-8 sm:size-10 text-primary" />
          </div>
        </UniversalEmptyState>
      )}
    </div>
  )
}