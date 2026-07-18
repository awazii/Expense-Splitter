import React, { useState } from 'react'
import { categories } from '../../../../pages/Expenses/Expenses';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactionlist } from './Transactionlistg';
import { Transactiondetailsfg } from './Transactiondetailsfg';

export const Transactions = ({ Currentfriend }) => {
   const [isdetailopen, setisdetailopen] = useState({ open: false, trans: null });
   
  return (
    <div className='w-full h-full flex flex-col px-2 sm:px-4 md:px-3 pt-4 sm:pt-5 pb-6'>
      
      {isdetailopen.open ? (
        <Transactiondetailsfg 
            setisdetailopen={setisdetailopen} 
            isdetailopen={isdetailopen} 
            Currentfriend={Currentfriend} 
        />
      ) : (
        <Transactionlist 
            setisdetailopen={setisdetailopen}
            Currentfriend={Currentfriend} 
        />
      )}
      
    </div>
  )
}