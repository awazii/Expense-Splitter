import React from 'react';
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Memberdetails } from '../../../utils/Memberdetails';
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { RiHandCoinLine } from "react-icons/ri";
import { pageContainerVariants, cardVariants, headerVariants } from "../../../utils/animation";
import { FaBan } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
export const Settlements = ({ Expense }) => {
  const Settlements = [];
  Expense.Settlements.forEach(settlement => {
    const existing = Settlements.find(s => s.from === settlement.from);
    if (existing) {
      existing.to.push({ id: settlement.to, amount: settlement.amount });
      existing.totalAmount += settlement.amount;
    } else {
      Settlements.push({
        from: settlement.from,
        to: [{ id: settlement.to, amount: settlement.amount }],
        totalAmount: settlement.amount
      });
    }
  });

  function GetTemp(id) {
    const temp = Expense.temporary?.find(t => t.id === id);
    return temp;
  }

  function GetPerson(id) {
    const permanent = Memberdetails(id);
    console.log(permanent)
    if (permanent) return { ...permanent, type: permanent.type || "permanent" };
    const temp = GetTemp(id);
    if (temp) return { ...temp, type: "temporary" };
    return null;
  }

 return (
    <div className='w-full h-full bg-white shadow-md rounded-lg p-4'>
      <h3 className='font-semibold text-lg flex items-center gap-2 mb-4'>
        Final Settlements <span><FaMoneyBillTransfer className='size-6' /></span>
      </h3>

      {Settlements.length > 0 ? (
        <motion.div
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className='space-y-6 overflow-y-auto max-h-[500px]'
        >
          {Settlements.map((settlement, index) => {
            const debtor = GetPerson(settlement.from);
            return (
            <div key={index} className="debt w-full flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center p-2 border-b border-gray-100 last:border-0">
  
              <motion.div variants={cardVariants} className="flex-1 w-full  rounded-lg p-3 flex items-center gap-3 border border-b-light lg:p-2">
                <div className={`relative size-12  border-2 rounded-full shrink-0 ${debtor.isBanned ? " border-red-500" : "border-primary"}`}>
                  {debtor?.type === "temporary" ? (
                    <div className={`size-12 bg-neutral-300 rounded-full center-flex`}>
                      <IoPerson className='size-6 text-neutral-500' />
                    </div>
                  ) : (
                    <img src={debtor?.Image} className='Img-c rounded-full' alt="debtor" />
                  )}
                  {debtor?.isBanned && (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 text-white"><FaBan className="size-2" /></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{debtor?.Name}</h4>
                  <p className="text-[11px] text-text-secondary truncate">
                    {debtor?.type === "temporary" ? "Temporary Friend" : debtor?.Bio}
                  </p>
                  <p className="text-xs text-red-600 font-bold">Rs. {settlement.totalAmount.toLocaleString()}</p>
                </div>
                <GiPayMoney className="text-red-600 size-5 shrink-0 transform scale-x-[-1]" />
              </motion.div>
              <div className="p-2">
                <FaArrowRightLong className='hidden sm:block lg:hidden xl:block  text-primary size-6' />
                <FaArrowDownLong className='sm:hidden lg:block xl:hidden text-primary size-6' />
              </div>
              <motion.div variants={cardVariants} className="flex-1 w-full space-y-2">
                {settlement.to.map((to, idx) => {
                  const creditor = GetPerson(to.id);
                  return (
                  <div key={idx} className=" rounded-lg p-3 lg:p-2 flex items-center gap-3 border border-b-light">
                   <div className={`relative size-12  border-2 rounded-full shrink-0 ${creditor.isBanned ? " border-red-500" : "border-primary"}`}>
                      {creditor?.type === "temporary" ? (
                        <div className="size-12 bg-neutral-300 rounded-full center-flex">
                          <IoPerson className='size-6 text-neutral-500' />
                        </div>
                      ) : (
                        <img src={creditor?.Image} className='Img-c rounded-full' alt="creditor" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{creditor?.Name}</h4>
                      <p className="text-[11px] text-text-secondary truncate">
                        {creditor?.type === "temporary" ? "Temporary Friend" : creditor?.Bio}
                      </p>
                      <p className="text-xs text-green-600 font-bold">Rs. {to.amount.toLocaleString()}</p>
                    </div>
                    <GiReceiveMoney className='text-green-600 size-5 shrink-0' />
                  </div>
                  )
                })}
              </motion.div>
            </div>
            )
          })}
        </motion.div>
      ) : (
        <UniversalEmptyState title="No settlements" textsize="text-sm" description="No payments made yet.">
          <div className="p-8 shadow-md border-l rounded-full">
            <RiHandCoinLine className="size-8 text-primary" />
          </div>
        </UniversalEmptyState>
      )}
    </div>
  );
};