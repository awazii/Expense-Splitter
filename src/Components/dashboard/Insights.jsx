import React from 'react'
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
export const Insights = () => {
    const insightsData = [
        { id: 1, title: "Group that spent the most", description: "trip to murree" ,value: "Rs 800" ,icon: <HiMiniUserGroup className='size-5 text-[#ef5c50]' />},
        { id: 2, title: "Friend who paid the most", description: "Awazii", value: "Rs 500" ,icon: <IoPerson className='size-5 text-[#4fb1eb]' />},
        { id: 3, title: "Friend who owes the most", description: "Arshman", value: "Rs 300" ,icon: <IoPerson className='size-5 text-[#4fb1eb]' />},
        { id: 4, title: "Average spending",  description: "Past 7 days", value: "Rs 200" },
    ];

  return (
    <div className='insight-container w-full h-full overflow-auto '>
        <div className='flex justify-between items-center mx-2'>
        <h2 className='text-2xl font-semibold p-4'>Insights</h2>
        <button className='text-primary text-sm font-bold px-2 py-1 rounded-md cursor-pointer'>View Analytics</button>

        </div>
        <div className='insight-cards flex flex-wrap gap-2 p-4 pt-0 justify-center'>
          {insightsData.map(insight => (
              <div key={insight.id} className='insight-card border-b-light p-4 border w-58  rounded-lg center-flex flex-col gap-2 bg-background'>
                  <h3 className='text-sm font-bold'>{insight.title}</h3>
                  <div className='flex items-center gap-2'>
                        {insight.icon}
                  <p className='text-sm text-text-secondary'>{insight.description}</p>
                  </div>
                  <p className='text-xl  text-primary font-bold  rounded-2xl '>{insight.value}</p>
              </div>
          ))}
        </div>
    </div>
  )
}
