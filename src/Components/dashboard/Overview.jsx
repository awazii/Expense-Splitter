import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaRupeeSign } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
export const Overview = () => {
    const data = [
        { icon: <FaRupeeSign className='size-6 text-[#4acb6f]' />, label: "Total Expenses", value: 1500, icon_bg: '#dbf3e6' },
        { icon: <FaUserFriends className='size-6 text-[#4fb1eb]' />, label: "Total Friends", value: 17, icon_bg: '#e0eff5' },
        { icon: <HiMiniUserGroup className='size-6 text-[#ef5c50]' />, label: "Total Groups", value: 5, icon_bg: '#ffece9' },
        { icon: <MdInsights className='size-6 text-[#702fd1]' />, label: "Top Group", detail: "Trip to Murree", icon_bg: '#f4ecfa' }
    ];
    function formatValue(value) {
        return value < 10 ? `0${value}` : value;
    }
  return (
    <>
        <div className="overview-cards flex justify-between gap-2  h-full">
            {data.map((item, index) => (
                <div key={index} className="overview-card p-4 card-b rounded-lg flex-1 flex flex-col justify-center items-center">
                    <div className="icon mb-2 bg-primary size-15  center-flex rounded-full" style={{ backgroundColor: item.icon_bg }}>
                        {item.icon}
                    </div>
                    <h3 className='text-xl font-semibold text-text-primary'>{item.label}</h3>
                    <p className='text-lg text-text-secondary mt-1'>{item.detail || formatValue(item.value)}</p>
                     <button className=' text-primary underline px-2 py-1 rounded-md  text-sm cursor-pointer font-semibold'>View Details</button>
                </div>
                
            ))}
        </div>
   </>
  )
}
