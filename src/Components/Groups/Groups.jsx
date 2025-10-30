import { useRef, useEffect, useState} from 'react'
import { Outlet, NavLink } from "react-router-dom";

const Groupsnav = ({isStuck},ref) => {
  return (
    <>
      <div className={`actions flex gap-3 justify-end items-center px-10 h-full`} >
    <h2 className={`absolute left-0 ml-6  ${isStuck?"text-[23px] font-semibold ":"text-[20px]"} font-medium p-6`}>
         Every group you've built, every memory you've made.
        </h2>
        <NavLink
          to="/Groups"
          end
          className={({ isActive }) =>
            `${isActive ? "g-active" : "g-unactive"} rounded-lg `
          }
        >
          <button className="cursor-pointer ">
            Your Groups
          </button>
        </NavLink>

        <NavLink
          to="/Groups/Addgroup"
          className={({ isActive }) =>
            `${isActive ? "g-active" : "g-unactive"} rounded-lg cursor-pointer `
          }
        >
          <button className="cursor-pointer">
            Add Group
          </button>
        </NavLink>
      </div>
    </>
  )
}
export const Groups = () => {
  const sentinelRef = useRef(null);
   const [isStuck, setIsStuck] = useState(false);
 
   useEffect(() => {
     const observer = new IntersectionObserver(
       ([entry]) => setIsStuck(!entry.isIntersecting),
       { threshold: 0 }
     );
 
     if (sentinelRef.current) observer.observe(sentinelRef.current);
     return () => observer.disconnect();
   }, []);
 
   return (
     <div className="Friends-main h-full overflow-auto scrollbar-hide relative">
       <h1 className="text-3xl font-semibold m-6 mb-2">Groups</h1>
       <div ref={sentinelRef} />
       <div className={`h-20 sticky top-0 z-20   ${isStuck?" bg-white/10 backdrop-blur-md rounded-t-lg ":""}`}>
         <Groupsnav isStuck={isStuck} />
       </div>
       <div className="context container mx-auto rounded-md ">
         <Outlet />
       </div>
     </div>
     )
}
