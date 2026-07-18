import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { categories } from '../../../../pages/Expenses/Expenses';
import { Memberdetails } from '../../../../utils/Memberdetails';
import { FaBan } from "react-icons/fa";

export const Transactiondetailsfg = ({ isdetailopen, setisdetailopen, Currentfriend }) => {
    const currentTransaction = isdetailopen.trans
    const Friend = currentTransaction.Members.find(f => f.id === Currentfriend.id)
    const netbalance = Number(Friend.spent || 0) - Number(Friend.share || 0)
    const Icon = categories[currentTransaction.Category]?.icon;

    return (
        <div className='w-full h-full flex flex-col overflow-y-auto pb-6'>
        
            <div className="flex items-center gap-2 text-gray-800 mb-4 shrink-0">
                <button className="rounded-lg cursor-pointer hover:bg-gray-100 p-1 transition-all" onClick={() => { setisdetailopen({ open: false, id: null }) }}>
                    <GoArrowLeft className='size-6' />
                </button>
                <h3 className='font-semibold text-xl'>Transaction Details</h3>
            </div>

            <div className="w-full sm:max-w-md mx-auto py-6 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-1">
                <div className="size-16 rounded-full flex items-center justify-center shadow-md" style={{ background: categories[currentTransaction.Category]?.gradient }}>
                    {Icon && <Icon className="size-6 text-white" />}
                </div>
                <p className='font-semibold text-lg text-gray-800'>{currentTransaction.Name}</p>
                
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <IoMdPerson className='size-4' />
                    <span>{currentTransaction.Members.length} Participants</span>
                </div>
                
                <div className="text-center mt-2">
                    <h2 className='text-3xl font-bold text-gray-900'>Rs. {Math.abs(currentTransaction.totalAmount).toLocaleString()}</h2>
                    <p className='text-xs font-medium'>Total Expense</p>
                </div>
                
                <p className='text-text-secondary text-sm'>{currentTransaction.createdDate}</p>
            </div>

            <div className="mt-6 space-y-6">
                

                <div className="px-2">
                    <div className="flex items-center gap-2 text-gray-800 mb-3">
                        <h3 className='text-lg font-semibold'>Paid by</h3>
                        <MdPayments className='size-5 text-gray-600' />
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-3">
                        {currentTransaction.Members.map((member, index) => {
                            if (member.spent == 0) return null;
                            const memberDetails = Memberdetails(member.id);
                            return (
                                <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`size-9 rounded-full relative shrink-0 border ${memberDetails?.isBanned ? "border-red-500" : "border-primary"}`}>
                                            <img src={memberDetails?.Image} alt="user" className='size-full object-cover rounded-full' />
                                        </div>
                                        <p className='truncate font-medium text-gray-700'>{memberDetails?.Name}</p>
                                    </div>
                                    <span className="font-semibold text-gray-800">Rs. {Number(member.spent).toLocaleString()}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex items-center gap-2 text-gray-800 mb-3">
                        <h3 className='text-lg font-semibold'>Split Details</h3>
                        <IoTicket className='size-5 text-gray-600' />
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
                        <h4 className='text-sm font-semibold text-gray-500 mb-3'>Method: <span className='text-primary'>{currentTransaction.splitMethod}</span></h4>
                        <div className="space-y-3">
                            {currentTransaction.Members.map((member, index) => {
                                if (member.share == 0) return null;
                                const memberDetails = Memberdetails(member.id);
                                return (
                                    <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`size-8 rounded-full shrink-0 border ${memberDetails?.isBanned ? "border-red-500" : "border-primary"}`}>
                                                <img src={memberDetails?.Image} alt="user" className='size-full object-cover rounded-full' />
                                            </div>
                                            <p className='truncate text-sm font-medium'>{memberDetails?.Name}</p>
                                        </div>
                                        <span className="font-semibold text-gray-800">Rs. {Number(member.share).toLocaleString()}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="px-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-800 mb-3">
                        <h3 className='text-lg font-semibold'>Settlements</h3>
                        <FaMoneyBillTransfer className='size-5 text-gray-600' />
                    </div>
                    <div className="space-y-2">
                        {(currentTransaction.Settlements.length !== 0 && netbalance !== 0) ? (
                            currentTransaction.Settlements.map((settlement, index) => {
                                const fromMember = Memberdetails(settlement.from);
                                const toMember = Memberdetails(settlement.to);
                                return (
                                    <div key={index} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                        <p className='text-sm text-text-secondary truncate font-medium'>
                                            {fromMember?.Name} <span className='text-red-500'>owes</span> {toMember?.Name}
                                        </p>
                                        <span className={`font-semibold ${settlement.to === Currentfriend.id ? "text-green-600" : "text-red-600"}`}>
                                            Rs. {settlement.amount.toLocaleString()}
                                        </span>
                                    </div>
                                )
                            })
                        ) : (
                            <p className='text-center text-gray-400 text-sm py-4'>No settlements needed</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}