import React, { useRef, useEffect, useState, useMemo } from 'react'
import Input from '../../Components/Common/Input'
import { HiMiniUserGroup } from "react-icons/hi2";
import GroupCard from '../../Components/Groups/GroupCard';
import { TbPinnedFilled } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllGroups, selectPinnedGroups, updateGroup } from '../../store/GroupSlice';
import { CategoryExtrator } from '../../utils/CategoryExtractor';
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { RiGroupLine, RiPushpinLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import { Basemodel } from '../../Components/basemodel';
import { FilterHeader } from '../../Components/filter';
import mountain from "../../assets/Groups/mountain.jpg";
import beach from "../../assets/Groups/Sea.jpg";
import concert from "../../assets/Groups/concert.jpg";
import Restaurant from "../../assets/Groups/Restaurant.jpg";
import Other from "../../assets/Groups/default.jpg";
import { SortIcons, FilterIcons } from "../../utils/SortFiltersvgs";
import { FilterSortPanel } from '../../Components/FilterSortPanel';
import { FilterHandlers } from '../../utils/FilterHandler';
import {
  IoSearchOutline,
} from "react-icons/io5";
import dayjs from 'dayjs';
export const groupSorts = [
  {
    label: "New to Old",
    icon: SortIcons["New to Old"],
  },
  {
    label: "Old to New",
    icon: SortIcons["Old to New"],
  },
  {
    label: "Most Members",
    icon: SortIcons["Most Members"],
  },
  {
    label: "Most Expenses",
    icon: SortIcons["Most Expenses"],
  },
];

export const groupFilters = [
  {
    label: "Active",
    icon: FilterIcons["Active"],
  },
  {
    label: "Freeze",
    icon: FilterIcons["Freeze"],
  },
];


export const Groupcategories = [
  { id: "grp-001", variant: "Mountains", Img: mountain },
  { id: "grp-002", variant: "Beach", Img: beach },
  { id: "grp-003", variant: "Restaurant", Img: Restaurant },
  { id: "grp-004", variant: "Other", Img: Other },
  { id: "grp-005", variant: "Concert", Img: concert }
]
export const Grouplist = () => {
  const Groups = useSelector(selectAllGroups);
  const PinnedGroups = useSelector(selectPinnedGroups);
  const Groupsrefs = useRef({});
  const dispatch = useDispatch();
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
      type: "New to Old",
    }
  })
  const renderedData = useMemo(() => {
    let result = [...Groups];
    switch (queryOptions.Sort.type) {
       case "New to Old":
             result.sort((a, b) => {
               const aDateTime = dayjs(`${a.joinedDate} ${a.Time}`, "YYYY-MM-DD HH:mm:ss");
               const bDateTime = dayjs(`${b.joinedDate} ${b.Time}`, "YYYY-MM-DD HH:mm:ss");
               return bDateTime.valueOf() - aDateTime.valueOf();
             });
             break;
     
           case "Old to New":
             result.sort((a, b) => {
               const aDateTime = dayjs(`${a.joinedDate} ${a.Time}`, "YYYY-MM-DD HH:mm:ss");
               const bDateTime = dayjs(`${b.joinedDate} ${b.Time}`, "YYYY-MM-DD HH:mm:ss");
               return aDateTime.valueOf() - bDateTime.valueOf();
             });
             break;
      case "Most Expenses":
        result.sort((a, b) => {
          return b.totalAmount - a.totalAmount
        });
        break;

      case "Most Members":
        result.sort((a, b) => {
           return b.Members.length - a.Members.length
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
    queryOptions ,Groups
  ]);
  const emptyStates = {
    noData: {
      title: "No groups yet",
      description: "Create a group to start sharing expenses with your friends and family.",
      icon: <RiGroupLine className="size-10 text-primary" />,
    },

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
    Groupsrefs.current[i] = el;
  }

  const hightlightGroup = (id) => {
    const el = Groupsrefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow");
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  };

  function UnPin(group) {
    dispatch(updateGroup({ id: group.id, changes: { isPinned: false } }));
  }
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Groups px-6 sm:px-2 md:px-2 lg:px-4 '
    >
      <motion.div variants={itemVariants} className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3'>
       <div className="search flex gap-4 py-2 items-center w-full md:w-80 lg:w-96">
          <Input variant={"Group"} queryOptions={queryOptions} setqueryOptions={setqueryOptions} />
        </div>
        <div className='flex flex-wrap items-center gap-3 sm:gap-5 justify-end'>
          {!(queryOptions.Filter.type === "" && queryOptions.Sort.type === "New to Old") &&
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
                      type: "New to Old",
                    }
                  }
                ))
              }}
            >Clear all</button>}
          <button className={"filter bg-white shadow-md  p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex "} onClick={Openmodel} title='sort & filters'>
            <CiFilter className='size-5' />
          </button>
        </div>
      </motion.div>
      {(!queryOptions.Filter.active && queryOptions.Search.value === '') && <motion.div variants={itemVariants} className="pinned-groups-container mt-2 p-2">
        <h2 className='text-lg sm:text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Pinned <span><TbPinnedFilled className='rotate-45' /></span>
        </h2>
        {PinnedGroups.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="pinned-groups grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 border-b border-b-light pb-5">
            {PinnedGroups.map((group, index) => (
              <motion.div key={group.id} variants={cardVariants} className='pinned-friend bg-white shadow-md px-2 sm:px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                <div className="about flex items-center gap-3 w-full min-w-0">
                  <div className="profile border size-14 sm:size-19 rounded-full border-b-light shrink-0">
                    <img className='Img-c' src={CategoryExtrator(group).Img} alt="" />
                  </div>
                  <div className="info flex-1 min-w-0 pr-4">
                    <h3 className="name text-text-primary text-sm sm:text-md font-semibold line-clamp-1 w-full">{group.Name}</h3>
                    <p className='text-text-secondary text-xs sm:text-sm'><span className='font-semibold'>{group.Members.length}</span> Members</p>
                    <p className='text-text-secondary text-xs sm:text-sm truncate'><span className='font-semibold'>{Number(group.totalAmount).toLocaleString()}</span> Total Expense</p>
                  </div>
                  <div className='absolute right-0 top-0'>
                    <button
                      className='unpin-btn m-1 cursor-pointer text-lg text-primary font-bold rotate-45'
                      onClick={() => UnPin(group)}
                    >
                      <TbPinnedFilled />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {group.Name}</span>
                  </div>
                </div>
                <button
                  className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary'
                  onClick={() => hightlightGroup(group.id)}
                >
                  <FaChevronDown />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title="No pinned groups"
            description="Pin your favorite groups to keep them at the top of your list."
            textsize="text-sm"
          >
            <div className="p-8 shadow-md bg-gray-50 rounded-full">
              <RiPushpinLine className="size-8 text-primary" />
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>}
      <motion.div variants={itemVariants} className="friendslist-container min-h-60 border-b-light p-2">
        <h2 className='text-lg sm:text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Groups <span><HiMiniUserGroup /></span>
        </h2>
        <FilterSortPanel queryOptions={queryOptions} type="group" />
        {queryOptions.Search.value !== '' && <h2 className='text-text-secondary my-2 text-sm sm:text-base break-words'>Showing : <span className='font-semibold'> {`${renderedData.length} 
        ${renderedData.length > 1 ? "Results" : "Result"}
        for ${queryOptions.Search.value}`} </span></h2>}
        {renderedData.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="Groupslist grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-3 mb-5">
            {renderedData.map((group) => (
              <motion.div key={group.id} variants={cardVariants} ref={(el) => Setref(el, group.id)}>
                <GroupCard group={group} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
             title={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.title : queryOptions.Filter.active ? emptyStates.noFilterResults.title : emptyStates.noData.title}
            description={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.description : queryOptions.Filter.active ? emptyStates.noFilterResults.description : emptyStates.noData.description}
            textsize=""
          >
            <div className="p-10 shadow-md bg-gray-50 rounded-full">
              {queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.icon : queryOptions.Filter.active ? emptyStates.noFilterResults.icon : emptyStates.noData.icon}
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Group Filters">
        <FilterHeader Sorts={groupSorts} Filters={groupFilters} defaultSort={"New to Old"}
          queryOptions={queryOptions} setqueryOptions={setqueryOptions}
          type="group" />
      </Basemodel>
    </motion.div>
  )
}