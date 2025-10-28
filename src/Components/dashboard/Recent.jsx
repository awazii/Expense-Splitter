import React from 'react'
export const Recent = () => {
    const recentActivities = [
        { id: 1, description: "You paid $50 to John", date: "2024-10-01" ,time: "2:30 PM"},
        { id: 2, description: "Alice added a new expense", date: "2024-10-02" ,time: "3:00 PM"},
        { id: 3, description: "Group 'Trip to Bali' created", date: "2024-10-03" ,time: "4:15 PM"},
        { id: 4, description: "You settled up with Mike", date: "2024-10-04" ,time: "5:45 PM"},
        { id: 5, description: "You settled up with Mike", date: "2024-10-04" ,time: "5:45 PM"},
        { id: 6, description: "You settled up with Mike", date: "2024-10-04" ,time: "5:45 PM"},
        { id: 7, description: "You settled up with Mike", date: "2024-10-04" ,time: "5:45 PM"},
    ];
  return (
    <div className='recent-container w-full h-full '> 
        <div className="recent-header flex justify-between items-center p-2 ">
            <h2 className='text-2xl font-semibold p-4 pb-0'>Recent Activities</h2>
            <button className='text-primary text-sm font-bold px-2 py-1 rounded-md cursor-pointer'>View All</button>
        </div>
        <div className="recent-list p-2">
            <div className={`headings sticky top-0 border-b border-b-light m-4 my-0 flex justify-between items-center pb-2 px-3`}>
                <span className='text-md text-text-primary font-semibold  w-40'>Activity Log</span>
                <span className='text-md text-text-primary font-semibold   w-20 text-center'>Date</span>
                <span className='text-md text-text-primary font-semibold w-18 text-center'>Time</span>
            </div>
            <ul className='flex flex-col gap-4  p-4 pt-2 overflow-auto h-70'>
                {recentActivities.map(activity => (
                    <li key={activity.id} className='recent-item flex justify-between items-center p-2   cursor-pointer border-b border-b-light pt-2 pb-2 text-text-secondary '>
                        <span className='line-clamp-3 w-40  text-ellipsis'>{activity.description}</span>
                        <span className='text-sm text-text-secondary '>{activity.date}</span>
                        <span className='text-sm text-text-secondary'>{activity.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
