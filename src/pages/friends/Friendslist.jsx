import React, { useRef, useEffect, useState, memo, useMemo } from 'react'
import Input from '../../Components/Common/Input'
import { TbPinnedFilled } from "react-icons/tb";
import { FaChevronDown, FaUserFriends } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import FriendCard from "../../Components/friends/FriendCard"
import { useSelector, useDispatch } from 'react-redux';
import { updateFriend, selectAllFriends, selectPinnedFriends } from '../../store/FriendsSlice';
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import { FilterHeader } from '../../Components/filter';
import { Basemodel } from "../../Components/basemodel";
import { FaBan } from "react-icons/fa";
import { SortIcons, FilterIcons } from "../../utils/SortFiltersvgs";
import { FilterSortPanel } from '../../Components/FilterSortPanel';
import { FilterHandlers } from '../../utils/FilterHandler';
import { IoSearchOutline, } from "react-icons/io5";
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import dayjs from 'dayjs';
export const friendsSorts = [
  {
    label: "New to Old",
    icon: SortIcons["New to Old"],
  },
  {
    label: "Old to New",
    icon: SortIcons["Old to New"],
  },
];

export const friendsFilters = [
  {
    label: "All Settled",
    icon: FilterIcons["All Settled"],
  },
  {
    label: "Positive Balance",
    icon: FilterIcons["Positive Balance"],
  },
  {
    label: "Negative Balance",
    icon: FilterIcons["Negative Balance"],
  },
];
export const indicators = {
  settled: {
    balancetextClass: "text-text-secondary",
    balancebgClass: "bg-text-secondary",
  },
  debtor: {
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
  },
  creditor: {
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
  }
}
export const Friendslist = memo(() => {
  const Friends = useSelector(selectAllFriends);
  const pinnedFriends = useSelector(selectPinnedFriends);
  const dispatch = useDispatch();
  const Friendsrefs = useRef({});
  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)
  const [popup, setpopup] = useState(false)
  const [queryOptions, setqueryOptions] = useState({
    Search: {
      value: "",
    },
    Filter: {
      active: false,
      type: "",
      details: null
    }
    ,
    Sort: {
      type: "Old to New",
    }
  })
  const renderedData = useMemo(() => {
    let result = [...Friends];
    switch (queryOptions.Sort.type) {
      case "New to Old":
        result.sort((a, b) => {
          return dayjs(b.joinedDate).valueOf() - dayjs(a.joinedDate).valueOf();
        });
        break;

      case "Old to New":
        result.sort((a, b) => {
          return dayjs(a.joinedDate).valueOf() - dayjs(b.joinedDate).valueOf();
        });
        break;

      default:
        break;
    }
    if (queryOptions.Filter.active) {
      const value = queryOptions.Filter.details?.value ?? null;
      result = FilterHandlers[queryOptions.Filter.type](result, value);
    }
    if (queryOptions.Search.value.trim() !== '') {
      const search = queryOptions.Search.value.toLowerCase().trim();

      result = result.filter((card) =>
        card.Name?.toLowerCase().includes(search)
      );
    }

    return result;
  }, [
    queryOptions, Friends
  ]);
  const emptyStates = {
    noSearchResults: {
      title: "No results found",
      description: "Try using different keywords or adjust your search.",
      icon: <IoSearchOutline className="size-10 text-primary" />,
    },

    noFilterResults: {
      title: "No matches found",
      description:
        "Try changing or clearing your filters to see results.",
      icon: <CiFilter className="size-10 text-primary" />,
    },
  };
  function Setref(el, i) {
    Friendsrefs.current[i] = el;
  }

  const hightlightFriend = (id) => {
    const el = Friendsrefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow");
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  };
  function UnPin(friend) {
    dispatch(updateFriend({ id: friend.id, changes: { isPinned: false } }));
  }
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Friends px-6 sm:px-2 md:px-2 lg:px-4'
    >
      <motion.div variants={itemVariants} className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3'>
        <div className="search flex gap-4 py-2 items-center w-full md:w-80 lg:w-96">
          <Input variant={"Friend"} queryOptions={queryOptions} setqueryOptions={setqueryOptions} />
        </div>
        <div className='flex flex-wrap items-center gap-3 sm:gap-5'>
          {!(queryOptions.Filter.type === "" && queryOptions.Sort.type === "Old to New") &&
            <button
              className='cursor-pointer text-primary font-semibold underline text-sm sm:text-base'
              onClick={() => {
                setqueryOptions(prev => (
                  {
                    ...prev,
                    Filter: {
                      active: false,
                      type: "",
                      details: null
                    }
                    ,
                    Sort: {
                      type: "Old to New",
                    }
                  }
                ))
              }}
            >Clear all</button>}
          <button className="filter bg-white shadow-md  p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={Openmodel} title='sort & filters'>
            <CiFilter className='size-5 ' />
          </button>
        </div>

      </motion.div>
      {(!queryOptions.Filter.active && queryOptions.Search.value === '') && <motion.div variants={itemVariants} className="pinned-friends mt-2 p-2">
        <h2 className='text-lg sm:text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Pinned <span><TbPinnedFilled className='rotate-45' /></span>
        </h2>
        {pinnedFriends.length > 0 && (<motion.div variants={pageContainerVariants} className="pinned-friends grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 border-b border-b-light pb-5">
          {pinnedFriends.map((friend, index) => (
            <motion.div key={friend.id} variants={cardVariants} className='pinned-friend bg-white shadow-md w-full px-2 sm:px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
              <div className="about flex items-center gap-3 w-full min-w-0">
                <div className={`profile size-14 sm:size-20 rounded-full relative border-2 shrink-0 ${friend.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
                  <img className='Img-c w-full h-full object-cover rounded-full' src={friend.Image} alt="" />
                  <div className={`absolute top-9/12 left-1 p-1 sm:p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${friend.isBanned ? "block" : "hidden"}`}>
                    <FaBan className="size-2" />
                  </div>
                </div>
                <div className="info flex-1 min-w-0 pr-4">
                  <h3 className="name text-text-primary text-sm sm:text-md font-semibold truncate">
                    {friend.Name} <span className='text-[11px] sm:text-[12px]'>{friend.id === "admin_01" ? "(Admin)" : ""}</span>
                  </h3>
                  <h4 className={`bio ${friend.isBanned ? "text-red-500 font-semibold" : "text-text-secondary"} text-xs sm:text-sm truncate`}>
                    {friend.isBanned ? " (banned)" : friend.Bio}
                  </h4>
                </div>
                {friend.id !== "admin_01" && (
                  <div className='absolute right-0 top-0'>
                    <button
                      className='unpin-btn m-1 cursor-pointer text-lg text-primary font-bold rotate-45'
                      onClick={() => UnPin(friend)}
                    >
                      <TbPinnedFilled />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {friend.Name}</span>
                  </div>
                )}
              </div>
              <button
                className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary'
                onClick={() => hightlightFriend(friend.id)}
              >
                <FaChevronDown />
              </button>
            </motion.div>
          ))}
        </motion.div>)}
      </motion.div>}
      <motion.div variants={itemVariants} className="friendslist-container min-h-60 border-b-light p-2">
        <h2 className='text-lg sm:text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Friends <span><FaUserFriends /></span>
        </h2>
        <FilterSortPanel queryOptions={queryOptions} type="friend" />
        {queryOptions.Search.value !== '' && <h2 className='text-text-secondary my-2 text-sm sm:text-base break-words'>Showing : <span className='font-semibold'> {`${renderedData.length} 
        ${renderedData.length > 1 ? "Results" : "Result"}
        for ${queryOptions.Search.value}`} </span></h2>}
        {renderedData.length > 0 && <motion.div variants={pageContainerVariants} className="friendslist grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 sm:gap-x-3 gap-y-2 sm:gap-y-3 mb-5">
          {renderedData.map((friend) => (
            <motion.div key={friend.id} variants={cardVariants} ref={(el) => Setref(el, friend.id)}>
              <FriendCard friend={friend} />
            </motion.div>
          ))}
        </motion.div>}
        {renderedData.length === 0 && <UniversalEmptyState
          title={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.title : queryOptions.Filter.active ? emptyStates.noFilterResults.title : ''}
          description={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.description : queryOptions.Filter.active ? emptyStates.noFilterResults.description : ''}
          textsize=""
        >
          <div className="p-10 shadow-md bg-gray-50 rounded-full">
            {queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.icon : queryOptions.Filter.active ? emptyStates.noFilterResults.icon : ''}
          </div>
        </UniversalEmptyState>
        }
      </motion.div>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Friend Filters">
        <FilterHeader Sorts={friendsSorts} Filters={friendsFilters} defaultSort={"Old to New"} type="friend" queryOptions={queryOptions} setqueryOptions={setqueryOptions} />
      </Basemodel>
    </motion.div>
  )
})