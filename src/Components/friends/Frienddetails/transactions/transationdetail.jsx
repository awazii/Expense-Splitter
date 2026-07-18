import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { categories } from '../../../../pages/Expenses/Expenses';
import { Memberdetails } from '../../../../utils/Memberdetails';
import { indicators } from '../../../../pages/friends/Friendslist';
import { FaBan } from "react-icons/fa";
export const Transationdetail = ({ Currentbalancewith, setisdetailopen, isdetailopen, CurrentFriend }) => {
    const trans = isdetailopen.trans
    const Paidby = trans.Members.filter(m => (m.id === Currentbalancewith || m.id === CurrentFriend.id) && m.spent !== "")
    const Sharedby = trans.Members.filter(m => (m.id === Currentbalancewith || m.id === CurrentFriend.id))
    const Settlement = trans.Settlements.find(s =>
        (s.from === CurrentFriend.id && s.to === Currentbalancewith) ||
        (s.from === Currentbalancewith && s.to === CurrentFriend.id)
    )
    const textcolor = Settlement.to === Currentbalancewith ? indicators.debtor.balancetextClass : indicators.creditor.balancetextClass
    const Icon = categories[trans.Category]?.icon;
    const bgcolor = Settlement.to === Currentbalancewith ? indicators.debtor.balancebgClass : indicators.creditor.balancebgClass

    const descripion = Settlement.to === Currentbalancewith ? ' You borrowed' : 'You lent '
    return (
        <div className='transaction-details'>
            <div className="header flex items-center w-fit gap-1 text-gray-800">
                <button className="backbtn rounded-lg cursor-pointer group trans hover:scale-102 active:scale-95 " onClick={() => { setisdetailopen({ open: false, trans: null }) }}>
                    <GoArrowLeft className='size-5 sm:size-6 group-hover:text-primary' />
                </button>
                <h3 className='font-semibold text-base sm:text-xl '>Transcation Details</h3>
            </div>
            <div className="transaction-info w-full sm:w-[80%] md:w-[60%] mx-auto mt-2 py-3 sm:py-4 bg-white rounded-xl h-fit shadow-md flex items-center flex-col px-2">
                <div className="expense-info flex items-center gap-2 flex-col text-center">
                    <div className="expense-logo size-11 sm:size-15 rounded-full  center-flex shadow-md" style={{ background: categories[trans.Category]?.gradient }}>
                        <Icon className="size-4 sm:size-5 text-white" />
                    </div>
                    <p className='expense-name text-sm sm:text-base truncate max-w-full'>{trans.Name}</p>
                </div>
                <div className="expense-amount">
                    <h2 className={`text-xl sm:text-3xl font-semibold flex items-center flex-wrap justify-center gap-1 `}>Rs.{Number(trans.totalAmount).toLocaleString()} <span className='text-[11px] sm:text-[13px]'>{`(Total Expense)`}</span></h2>
                </div>
                <div className="expense-date text-text-secondary text-xs sm:text-sm">
                    <p>{trans.createdDate} <span>•</span> <span>{trans.Time}</span></p>
                </div>
            </div>
            <div className="payment-details mt-2">
                <div className="heading w-fit flex items-center gap-1 text-gray-800 mx-2">
                    <h3 className='text-base sm:text-xl font-semibold'>Paid by</h3>
                    <MdPayments className='size-4 sm:size-5' />
                </div>
                <div className="paidby-list mt-2 space-y-2 px-2 sm:px-3 h-fit bg-white rounded-xl shadow-md w-full sm:w-[90%] md:w-[80%] mx-auto overflow-y-auto  py-2">
                    {Paidby.map((person, index) => {
                        const member = Memberdetails(person.id);
                        return (
                            <div key={index} className="paidby-item flex justify-between items-center gap-2 border-b border-b-light  pb-2 ">
                                <div className="about flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div className={`logo size-8 sm:size-10 rounded-full shrink-0 ${member?.isBanned ? "border-red-500" : "border-primary"} shadow-md border center-flex relative`}>
                                        <img src={member?.Image} alt="person-logo" className='Img-c border-none w-full h-full object-cover rounded-full' />
                                        <div className={`absolute top-9/12 left-1 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${member?.isBanned ? "block" : "hidden"}`}>
                                            <FaBan className="size-1" />
                                        </div>
                                    </div>
                                    <p className='text-sm sm:text-base truncate'>{member?.Name}</p>
                                </div>
                                <div className="amount text-sm sm:text-lg font-semibold text-text-primary shrink-0">
                                    Rs.{Number(person.spent).toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex justify-between items-center gap-2'>
                        <div className="about flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className={`logo size-8 sm:size-9 center-flex shrink-0 ${bgcolor} rounded-full`}>
                                <FaMoneyBillTransfer className='size-4 sm:size-5 text-white' />
                            </div>
                            <h4 className='text-sm sm:text-base truncate'>
                                {descripion} </h4>
                        </div>
                        <div className={`amount text-sm sm:text-xl font-semibold ${textcolor} shrink-0`}>
                            Rs.{Math.abs(Settlement.amount).toLocaleString()}
                        </div>
                    </div>

                </div>
            </div>
            <div className="splitdetails">
                <div className="heading w-fit flex items-center gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-base sm:text-xl font-semibold'>Split Details</h3>
                    <IoTicket className='size-4 sm:size-5' />
                </div>
                <div className="split-list mt-2 space-y-2  h-[40vh] sm:h-45  w-full sm:w-[90%] md:w-[80%] mx-auto overflow-y-auto px-2 sm:px-0">
                    <div className="split-method">
                        <h4 className='text-sm sm:text-md font-semibold text-text-secondary flex items-center gap-1'>Split Method: <span className='text-primary'>{trans.splitMethod}</span></h4>
                    </div>
                    {Sharedby.map((person, index) => {
                        const member = Memberdetails(person.id); 

                        return (
                            <div
                                key={index}
                                className="split-item bg-white p-2 rounded-lg shadow-md flex justify-between items-center gap-2"
                            >
                                <div className="about flex items-center gap-2 sm:gap-3 min-w-0">
                                    <div
                                        className={`logo size-8 sm:size-10 rounded-full shrink-0 ${member?.isBanned ? "border-red-500" : "border-primary"
                                            } shadow-md border center-flex relative`}
                                    >
                                        <img
                                            src={member?.Image}
                                            alt="person-logo"
                                            className="Img-c border-none w-full h-full object-cover rounded-full"
                                        />
                                        <div
                                            className={`absolute top-9/12 left-1 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${member?.isBanned ? "block" : "hidden"
                                                }`}
                                        >
                                            <FaBan className="size-1" />
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base truncate">{member?.Name}</p>
                                </div>
                                <div className="amount text-sm sm:text-lg font-semibold text-text-primary shrink-0">
                                    Rs.{person.share.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}