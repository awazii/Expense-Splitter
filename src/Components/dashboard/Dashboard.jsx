import React from 'react'
import { Overview } from './Overview';
import { Recent } from './Recent';
import { Insights } from './Insights';
import Addgroup from "./Newgroupbtn"

export const Dashboard = () => {
  return (
    <div className='dashboard-container w-full h-full overflow-auto p-6 pb-0 scrollbar-hide'>
        <h1 className='text-3xl font-semibold'>Dashboard</h1>
        <div className="dashboard grid grid-cols-6 gap-x-2 gap-y-3 grid-rows-12 mt-4 grid-flow-row-dense  ">
             <div className="header blurred col-span-6 h-15 flex items-center rounded-2xl justify-between p-2">
                <h2 className='text-2xl font-medium p-4'>Welcome back, Awazii!</h2>
               <Addgroup/>
             </div>
             <div className="overview col-span-4 row-span-3 rounded-xl ">
                   <Overview />
             </div>
                <div className="recent-activities card-b col-span-2 row-span-6 rounded-xl  h-105">
                    <Recent />
                </div>
                <div className="analytics card-b col-span-4 row-span-8 rounded-xl"></div>
                <div className="insights card-b col-span-2 row-span-5 rounded-xl ">
                    <Insights />
                </div>

        </div>
         <div className="footer col-span-6 h-20 center-flex ">
                    <p className='text-center text-2xl text-secondary'>© 2025 Splitly. Design & Developed by Awazii. All rights reserved.</p>
                </div>
    </div>
  )
}
