import React from 'react'
import { Fgoverview } from '../transactions/Fgoverview'
import { Transactions } from './Transactionsfg'
import { FaBan } from "react-icons/fa"

export const Friendgdetails = ({ Currentfriend }) => {
  return (
    <div className='w-full max-w-4xl mx-auto h-auto lg:h-[740px] flex flex-col lg:grid lg:grid-cols-8 lg:grid-rows-6 gap-3 sm:gap-4 mt-2 lg:overflow-hidden'>
         <div className='Overview card-b rounded-xl lg:col-span-5 lg:row-span-1 shadow-sm w-full shrink-0'>
            <Fgoverview Currentfriend={Currentfriend} />
         </div>
         <div className='Member card-b rounded-xl lg:col-span-3 lg:row-span-1 p-3 sm:p-4 flex items-center justify-center shadow-sm w-full shrink-0'>
              <div className={`w-full flex items-center justify-start sm:justify-center gap-3 min-w-0 px-2`}>
                    <div className={`logo size-14 sm:size-16 rounded-full relative shrink-0 ${Currentfriend.isBanned ? "border-red-500" : "border-primary"} border-2 flex items-center justify-center`}>
                        <img src={Currentfriend.Image} className='size-full object-cover rounded-full' alt="Profile pic" />
                        
                        {Currentfriend.isBanned && (
                            <div className="absolute -bottom-1 -right-1 p-1 bg-red-500 rounded-full text-white shadow-md">
                                <FaBan className="size-2 sm:size-3" /> 
                            </div>
                        )}
                    </div>
                    <div className="info flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="title text-base sm:text-lg font-semibold truncate"> 
                            {Currentfriend.Name}
                        </h3>
                        <span className={`description text-xs sm:text-sm font-semibold truncate ${Currentfriend.isBanned ? "text-red-500" : "text-gray-500"}`}>
                            {Currentfriend.isBanned ? "(Banned)" : Currentfriend.status}
                        </span>
                    </div>

                </div>
         </div>

         <div className='card-b rounded-xl lg:col-span-8 lg:row-span-5 w-full flex-1 min-h-[400px] lg:min-h-0 shadow-sm overflow-hidden'>
          <Transactions Currentfriend={Currentfriend} />
         </div>
         
    </div>
  )
}