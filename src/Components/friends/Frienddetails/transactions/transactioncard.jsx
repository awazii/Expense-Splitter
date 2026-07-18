import React from 'react'
import { categories } from '../../../../pages/Expenses/Expenses'
import { useSelector } from 'react-redux'
import { selectGroupById } from '../../../../store/GroupSlice'
import { MdKeyboardArrowRight } from "react-icons/md";
import { CategoryExtrator } from '../../../../utils/CategoryExtractor';
import { indicators } from '../../../../pages/friends/Friendslist';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { selectAllExpenses } from '../../../../store/ExpenseSlice';
import { Memberdetails } from '../../../../utils/Memberdetails';
export const Transactioncard = ({ trans, Currentbalancewith, CurrentFriend ,setisdetailopen }) => {
    const group = useSelector(state => selectGroupById(state, trans.Groupid))
    const currentwith = Memberdetails(Currentbalancewith)
     const Icon = categories[trans.Category]?.icon;
    const Settlement = trans.Settlements.find(s =>
            (s.from === CurrentFriend.id && s.to === Currentbalancewith) ||
            (s.from === Currentbalancewith && s.to === CurrentFriend.id)
        )
     const textcolor = Settlement.to === Currentbalancewith  ? indicators.debtor.balancetextClass : indicators.creditor.balancetextClass 
     function SettlementTitle() {
        let title = Settlement.to === Currentbalancewith ?  trans.Name : `Payment from ${currentwith.Name}`
        return title
     }
    function AmountDetails() { 
        const descripion =  Settlement.to === Currentbalancewith ? ' You borrowed' : 'You lent '
        return (
            <div className='expense-right text-right shrink-0'>
                <h2 className={`text-sm sm:text-xl font-semibold ${textcolor}`}>{`Rs. ${Settlement.amount.toLocaleString()}`}</h2>
                <span className='text-[10px] sm:text-[12px] text-text-secondary'>{ descripion }</span> 
            </div>
        )
    }
    function Payment (){
        const payment = trans.totalAmount
         const descripion =  Settlement.to === Currentbalancewith ? "You sent" : "You Received"
        return (
             <div className='expense-right text-right shrink-0'>
                <h2 className={`text-sm sm:text-xl font-semibold ${textcolor}`}>{`Rs. ${payment.toLocaleString()}`}</h2>
                <span className='text-[10px] sm:text-[12px] text-text-secondary'>{descripion}</span>
            </div>
        )

    }
    return (
        <div className='expense relative bg-white shadow h-auto min-h-[128px] sm:h-32 rounded-lg'>      
            <div className="expense-info  w-[92%] h-auto sm:h-20 mx-auto mt-1  rounded-lg flex items-center gap-2 sm:gap-3 py-2 sm:py-0">
                {trans.Category !=="Settlement" ? <div className="expense-logo  size-10 sm:size-13 rounded-lg shrink-0 center-flex shadow-md" style={{ background: categories[trans.Category]?.gradient }}>
                    <Icon className="size-4 sm:size-5 text-white" />
                </div> :
                    <div className={`expense-logo  size-10 sm:size-13 rounded-lg shrink-0 center-flex shadow-md ${ Settlement.to === Currentbalancewith ? indicators.debtor.balancebgClass : indicators.creditor.balancebgClass  }`}>  
                     { Settlement.to === Currentbalancewith ? <GiPayMoney className="text-white size-5 sm:size-6"/> : <GiReceiveMoney className="text-white size-5 sm:size-6"/>  }
                    </div>
                }
                <div className='expense-details flex-1 min-w-0 h-auto sm:h-15 flex justify-between gap-1 items-center'>
                    <div className='expense-left min-w-0'>
                        <h2 className='font-semibold text-sm sm:text-base line-clamp-1 '>{ trans.Category==="Settlement" ? SettlementTitle() : trans.Name}</h2>
                        <div className="category-date flex items-center gap-1 flex-wrap">
                            <span className='text-xs sm:text-sm text-text-secondary'>{!trans.payment ? trans.Category : "Settlement"}</span>
                            <span className='text-xs sm:text-sm text-text-secondary'>•</span>
                            <span className='text-xs sm:text-sm text-text-secondary'>{trans.createdDate}</span>
                        </div>
                    </div>
                    {trans.Category ==="Settlement" ? <Payment  /> : <AmountDetails />}     
                </div>
            </div>
            <div className='h-auto sm:h-10 flex flex-wrap sm:flex-nowrap items-center justify-between mx-3 sm:mx-5 gap-2 py-2 sm:py-0'>
                {trans.Category !=="Settlement" && <div className="group-details flex items-center min-w-0">
                    <div className="group-logo size-8 sm:size-10 rounded-full border-b-light shadow-md border shrink-0 overflow-hidden">
                        <img src={CategoryExtrator(group).Img} alt="" className='Img-c w-full h-full object-cover' />
                    </div>
                    <div className="about ml-2 min-w-0">
                        <h4 className='text-xs sm:text-sm  line-clamp-1 text-text-secondary font-semibold'>{group.Name}</h4>
                    </div>
                </div>}
                {trans.Category ==="Settlement" &&
                    <div className={`payment-indicator w-fit flex items-center p-1 border-l`}>
                        <p className={`text-xs sm:text-sm font-semibold flex items-center ${textcolor}`}>
                            <span><TiTick className='size-4 sm:size-5' /></span> { Settlement.to === Currentbalancewith ? "sent" : "Received"}
                        </p>
                    </div>}
                {trans.Category !=="Settlement" && <button className="details-btn cursor-pointer text-text-secondary hover:text-primary center-flex hover:scale-105  trans border-l shrink-0" onClick={() => {
                    setisdetailopen({ open: true, trans });
                }}>
                    <MdKeyboardArrowRight className='size-6 sm:size-7' />
                </button>}
            </div>
        </div>
    )
}