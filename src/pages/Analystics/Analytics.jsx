import React from 'react';
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FriendsByGroupChart } from "./Fchart1";
import { TotalOwedChart } from "./Fchart2";
import { MultiPaidVsOwes } from './Fchart3';
import GroupExpensesChart from './Fchart5';
import GroupSizeChart from './Fchart4';
import AnimateOnSightWrapper from '../../utils/intersection';

export const Analytics = () => {
  return (
    <div className="Analytics h-full overflow-auto scrollbar-hide relative pb-10 pt-20 md:pt-0">
      
      
      <h1 className="text-2xl md:text-3xl font-semibold m-4 md:m-6 mb-1 ">
        Analytics
      </h1>

      <p className="text-text-secondary text-sm lg:text-base md:text-md mx-4 md:mx-6">
        All graphs below update based on real stored data.
      </p>
      
      <div className="friends-analytics my-5 container mx-auto px-4 md:px-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 center-flex gap-1 w-fit">
          Friends Analytics <span><FaUserFriends /></span>
        </h2>
        <div className="f-graphs-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-3">
          
          <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 h-fit p-3 md:p-2">
            <h3 className="font-semibold mt-2 md:mt-4 text-base md:text-xl text-center">
              Friend Group Memberships
            </h3>
            <p className="text-text-secondary mt-1 text-xs md:text-md text-center mb-4">
              Showing the number of groups each friend is in
            </p>
            <AnimateOnSightWrapper>
              <FriendsByGroupChart />
            </AnimateOnSightWrapper>
          </div>

          <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 h-fit p-3 md:p-2">
            <h3 className="font-semibold mt-2 md:mt-4 text-base md:text-xl text-center">
              Amounts Owed by Friends
            </h3>
            <p className="text-text-secondary mt-1 text-xs md:text-md text-center mb-4">
              A list of what each friend currently owes
            </p>
            <AnimateOnSightWrapper>
              <TotalOwedChart />
            </AnimateOnSightWrapper>
          </div>

          <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 xl:col-span-4 h-fit p-3 md:p-2 ">
            <h3 className="font-semibold mt-2 md:mt-4 text-base md:text-xl text-center">
              Friend Balances
            </h3>
            <p className="text-text-secondary mt-1 text-xs md:text-md text-center mb-4">
              Summary of Contributions and Allocations
            </p>
            <AnimateOnSightWrapper>         
                 <MultiPaidVsOwes />
            </AnimateOnSightWrapper>
          </div>
        </div>
      </div>

      <div className="group-analytics my-5 container mx-auto px-4 md:px-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3 center-flex gap-1 w-fit">
          Groups Analytics <span><HiMiniUserGroup /></span>
        </h2>

        <div className="g-graphs-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-3">
          
          <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 h-fit p-3 md:p-2">
            <h3 className="font-semibold mt-2 md:mt-4 text-base md:text-xl text-center">
              Group Member Counts
            </h3>
            <p className="text-text-secondary mt-1 text-xs md:text-md text-center mb-4">
              Showing the total number of members in each group
            </p>
            <AnimateOnSightWrapper>
              <GroupSizeChart />
            </AnimateOnSightWrapper>
          </div>

          <div className="bg-white shadow-md rounded-lg col-span-1 md:col-span-2 lg:col-span-1 h-fit p-3 md:p-2">
            <h3 className="font-semibold mt-2 md:mt-4 text-base md:text-xl text-center">
              Highest Spending Groups
            </h3>
            <p className="text-text-secondary mt-1 text-xs md:text-md text-center mb-4">
              Top 5 groups by total spend
            </p>
            <AnimateOnSightWrapper>
              <GroupExpensesChart />
            </AnimateOnSightWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};