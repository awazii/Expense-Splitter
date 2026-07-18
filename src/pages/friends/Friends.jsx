import { useRef, useEffect, useState, forwardRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navf from "../../Components/friends/Common/Navf";

const Friendsnav = forwardRef(({ isStuck }, ref) => {
  return (
    <>
      <div className={`actions flex gap-3 sm:gap-4 justify-end items-center px-4 sm:px-10 h-full`} >
        <h2 className={`hidden md:block absolute left-0 ml-4 sm:ml-6 ${isStuck ? "text-[18px] lg:text-[23px] font-semibold" : "text-[15px] lg:text-[20px]"} font-medium p-3 lg:p-6 max-w-[55%] truncate`}>
          Everyone you've connected with.
        </h2>
        <Navf />
      </div>
    </>
  )
})

export const Friends = () => {
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
    <div className="Friends-main h-full overflow-auto scrollbar-hide relative pt-20 md:pt-0">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold m-4 sm:m-6 mb-2">Friends</h1>
      <div ref={sentinelRef} />
      <div className={`h-auto min-h-16 sm:min-h-20 sticky top-0 z-20 ${isStuck ? "border-0 rounded-t-lg card-b" : ""}`}>
        <Friendsnav isStuck={isStuck} />
      </div>
      <div className="context container mx-auto rounded-md px-2 sm:px-0">
        <Outlet />
      </div>
    </div>

  );
};