import React, { useState } from 'react'
import { GrTransaction } from "react-icons/gr";
import { categories } from '../../../../pages/Expenses/Expenses.jsx';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactions } from './Transactionshistory.jsx';
import { Transationdetail } from './transationdetail.jsx';
import { Settle } from '../settlements/Settle.jsx';
import { Paymentsuccesful } from '../settlements/payment.jsx';
import { Memberdetails } from '../../../../utils/Memberdetails.js';
import {FaBan} from "react-icons/fa";
export const Balancewith = ({ Currentbalancewith, currentFriend }) => {
  const [isdetailopen, setisdetailopen] = useState({
    open: false, trans: null
  });
  const [issettlementopen, setissettlementopen] = useState(false);
  const [ispaymentsuccessful, setispaymentsuccessful] = useState({ is: false, amount: 0 });
  return (
    <div className='w-full sm:w-[90vw] md:w-130 max-w-[90vw] h-fit'>
      <div className="profiles w-full flex items-center justify-center gap-3 sm:gap-5 mt-2 mb-4">
          <div className={`profile size-14 sm:size-22 rounded-full relative shrink-0 border-2 ${currentFriend.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
                    <img className='Img-c w-full h-full object-cover rounded-full' src={currentFriend.Image} alt="Current-friend-img" />
                    <div className={`absolute top-9/12 left-1 p-1 sm:p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${currentFriend.isBanned ? "block" : "hidden"}`}>
                      <FaBan className="size-2 sm:size-3" />
                    </div>
                  </div>
        <GrTransaction className='size-5 sm:size-8 text-text-secondary shrink-0' />
        <div className={`profile size-14 sm:size-22 rounded-full relative shrink-0 border-2 ${Memberdetails(Currentbalancewith)?.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
                    <img className='Img-c w-full h-full object-cover rounded-full' src={Memberdetails(Currentbalancewith)?.Image} alt="Current-balance-with-img" />
                    <div className={`absolute top-9/12 left-1 p-1 sm:p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${Memberdetails(Currentbalancewith)?.isBanned ? "block" : "hidden"}`}>
                      <FaBan className="size-2 sm:size-3" />
                    </div>
                  </div>
      </div>
      {(!isdetailopen.open && !issettlementopen && !ispaymentsuccessful.is) && (
        <Transactions
          key="transactions-view"
          CurrentFriend={currentFriend}
          Currentbalancewith={Currentbalancewith}
          setisdetailopen={setisdetailopen}
          setissettlementopen={setissettlementopen}
        />
      )}
      {isdetailopen.open && (
        <Transationdetail
          key="detail-view"
          setisdetailopen={setisdetailopen}
          isdetailopen={isdetailopen}
          Currentbalancewith={Currentbalancewith}
          CurrentFriend={currentFriend}
        />
      )}
      {issettlementopen && (
        <Settle
          key="settle-form"
          CurrentFriend={currentFriend}
          Currentbalancewith={Currentbalancewith}
          setissettlementopen={setissettlementopen}
          setispaymentsuccessful={setispaymentsuccessful}
        />
      )}
      {ispaymentsuccessful.is && (
        <Paymentsuccesful
          key="success-view"
          Currentbalancewith={Currentbalancewith}
          setispaymentsuccessful={setispaymentsuccessful}
          ispaymentsuccessful={ispaymentsuccessful}
        />
      )}
    </div>
  )
}