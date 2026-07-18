import React from 'react'
import Closebtn from '../../Common/Closebtn';
import  Indicator from '../../../friends/Common/Inditcator';
import { Memberdetails } from '../../../../utils/Memberdetails';
export const Paymentsuccesful = ({Currentbalancewith,setispaymentsuccessful ,ispaymentsuccessful}) => {
  return (
    <div className='flex items-center gap-1 flex-col px-3'>
      <div className="pay-succesindicator">
        <Indicator />
      </div>
        <div className="pay-details flex items-center flex-col text-center p-2">
            <h2 className='text-green-600 text-lg sm:text-2xl font-semibold'>Payment Successful!</h2>
            <p className='text-xs sm:text-sm text-text-secondary break-words'>You paid <span className='font-bold'>{`Rs. ${ispaymentsuccessful.amount.toLocaleString()}`}</span>{` to ${Memberdetails(Currentbalancewith)?.Name}.`}</p>
        </div>
        <div className="action">
            <Closebtn setispaymentsuccessful={setispaymentsuccessful} />
        </div>
    </div>
  )
}