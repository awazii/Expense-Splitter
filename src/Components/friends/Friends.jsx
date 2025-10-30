import { useRef, useEffect, useState, forwardRef } from "react";
import { Outlet, NavLink } from "react-router-dom";


const Friendsnav = forwardRef(({isStuck},ref) => {
  return (
    <>
      <div className={`actions flex gap-4  justify-end items-center px-10  h-full`} >
        <h2 className={`absolute left-0 ml-6  ${isStuck?"text-[23px] font-semibold":"text-[20px]"} font-medium p-6`}>
          Everyone you've connected with.
        </h2>
        <NavLink
          to="/friends"
          end
          className={({ isActive }) =>
            `${isActive ? "f-active" : "f-unactive"} rounded-lg `
          }
        >
          <button className="cursor-pointer ">
            My Friends
          </button>
        </NavLink>

        <NavLink
          to="/friends/Addfriend"
          className={({ isActive }) =>
            `${isActive ? "f-active" : "f-unactive"} rounded-lg cursor-pointer `
          }
        >
          <button className="cursor-pointer">
            Add Friend
          </button>
        </NavLink>
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
    <div className="Friends-main h-full overflow-auto scrollbar-hide relative">
      <h1 className="text-3xl font-semibold m-6 mb-2">Friends</h1>
      <div ref={sentinelRef} />
      <div className={`h-20 sticky top-0 z-20 ${isStuck?"border-0  bg-white/10 backdrop-blur-md ":""} `}>
        <Friendsnav isStuck={isStuck} />
      </div>
      <div className="context container mx-auto rounded-md ">
        <Outlet />
      </div>
    </div>

  );
};
