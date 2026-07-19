import React, { useState, memo, useMemo } from 'react'
import Addexpensebtn from "./Common/Addexpensebtn"
import { IoReturnUpBack } from "react-icons/io5";
import { useParams, useNavigate } from 'react-router-dom'
import { CiFilter } from "react-icons/ci";
import Input from '../Common/Input'
import { GiExpense } from "react-icons/gi";
import { Basemodel } from '../basemodel';
import { Expensedetails } from './Expensedetails/Expensedetails';
import { useSelector } from 'react-redux';
import { GroupExpenses ,FriendsGroupSpendings } from '../../store/ExpenseSlice';
import { ExpenseCard } from './ExpenseCard';
import { RiHandCoinLine } from "react-icons/ri";
import { UniversalEmptyState } from '../UniversalEmptyState';
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import { selectGroupById } from '../../store/GroupSlice';
import { FilterHeader } from '../filter';
import { FilterSortPanel } from '../FilterSortPanel';
import { SortIcons, FilterIcons } from "../../utils/SortFiltersvgs";
import { FilterHandlers } from '../../utils/FilterHandler';
import { GroupActionDialog } from '../Groups/GroupDetail/GroupActionDialog'
import Actionbtn from "../Groups/Common/Actionbtn"
import {
  IoSearchOutline,
} from "react-icons/io5";
import dayjs from 'dayjs';
export const expenseGroupSorts = [
  {
    label: "New to Old",
    icon: SortIcons["New to Old"],
  },
  {
    label: "Old to New",
    icon: SortIcons["Old to New"],
  },
  {
    label: "Most Expenses",
    icon: SortIcons["Most Expenses"],
  },
];

export const expenseGroupFilters = [
  {
    label: "By Category",
    icon: FilterIcons["By Category"],
  },
];

export const Expenses = () => {
  const Navigate = useNavigate()
  const { Groupid } = useParams();
  const Group = useSelector(state => selectGroupById(state, Groupid))
  const [restrictpopup, setrestrictpopup] = useState(false)
  const [popup, setpopup] = useState(false)
  const Expenses = useSelector(state => GroupExpenses(state, Groupid));
  const MembersSpendings = useSelector(state => FriendsGroupSpendings(state, Groupid))
  const isnew = Expenses.length === 0 && MembersSpendings.length === 0
  const [CurrentExpenseid, setCurrentExpenseid] = useState("")
  const [isFilteropen, setisFilteropen] = useState(false)
  const [queryOptions, setqueryOptions] = useState({
    Search: {
      value: "",
    },
    Filter: {
      active: false,
      type: "",
      details: {
        label: "",
        value: "",
      }
    }
    ,
    Sort: {
      type: "New to Old",
    }
  })
  
  const renderedData = useMemo(() => {
    let result = [...Expenses];
    switch (queryOptions.Sort.type) {
      case "New to Old":
        result.sort((a, b) => {
          const aDateTime = dayjs(`${a.createdDate} ${a.Time}`, "YYYY-MM-DD HH:mm:ss");
          const bDateTime = dayjs(`${b.createdDate} ${b.Time}`, "YYYY-MM-DD HH:mm:ss");
          return bDateTime.valueOf() - aDateTime.valueOf();
        });
        break;

      case "Old to New":
        result.sort((a, b) => {
          const aDateTime = dayjs(`${a.createdDate} ${a.Time}`, "YYYY-MM-DD HH:mm:ss");
          const bDateTime = dayjs(`${b.createdDate} ${b.Time}`, "YYYY-MM-DD HH:mm:ss");
          return aDateTime.valueOf() - bDateTime.valueOf();
        });
        break;

      case "Most Expenses":
        result.sort((a, b) => {
          return b.totalAmount - a.totalAmount
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
    queryOptions
  ]);
  
  const emptyStates = {
    noData: {
      title: "No expenses in this group",
      description: "Keep track of shared costs. Add your first expense to this group.",
      icon: <RiHandCoinLine className="size-10 text-primary" />,
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
  
  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Expense-container h-full overflow-auto scrollbar-hide relative pt-20 md:pt-0 pb-10'
    >
      <motion.div variants={itemVariants} className="header min-h-[5rem] flex px-4 md:px-10 items-center justify-between flex-wrap gap-4">
        <div className="group-name center-flex gap-3">
          <button
            className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95"
            onClick={() => Navigate(`/Groups/${Groupid}`)}
          >
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className='text-2xl md:text-3xl font-semibold'>Expenses</h3>
        </div>
          <div className="actions center-flex gap-3">
            {
             Group?.statusid !== "Freeze" &&  <Actionbtn isnew={isnew} onClick={() => setrestrictpopup(true)} />
            }
          </div>  
      </motion.div>
      <motion.div variants={itemVariants} className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 mx-auto container px-4 md:px-6 gap-4'>
        <div className="search flex gap-4 py-2 items-center w-full md:w-80 lg:w-96">
          <Input variant={"Expense"} queryOptions={queryOptions} setqueryOptions={setqueryOptions} />
        </div>
        <div className='center-flex gap-5 w-full sm:w-auto justify-end'>
          {!(queryOptions.Filter.type === "" && queryOptions.Sort.type === "New to Old") &&
            <button
              className='cursor-pointer text-primary font-semibold underline text-sm md:text-base'
              onClick={() => {
                setqueryOptions(prev => (
                  {
                    ...prev,
                    Filter: {
                      active: false,
                      type: "",
                      details: {
                        label: "",
                        value: "",
                      }
                    }
                    ,
                    Sort: {
                      type: "New to Old",
                    }
                  }
                ))
              }}
            >Clear all</button>}
          <button className="filter bg-white shadow-md p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={() => setisFilteropen(true)} title='sort & filters'>
            <CiFilter className='size-5 md:size-6' />
          </button>
        </div>
      </motion.div>
      <motion.div variants={cardVariants} className="Expense-container mx-auto container mt-4 px-4 md:px-6">
        <h2 className='text-lg md:text-xl font-semibold mb-2 center-flex gap-1 w-fit'>
          Expenses <span><GiExpense /></span>
        </h2>
        <FilterSortPanel queryOptions={queryOptions} type="expense" />
        
        {queryOptions.Search.value !== '' && <h2 className='text-text-secondary text-sm md:text-base my-2'>Showing : <span className='font-semibold'> {`${renderedData.length} 
        ${renderedData.length > 1 ? "Results" : "Result"}
        for ${queryOptions.Search.value}`} </span></h2>}
        
        {renderedData.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="expenses grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5">
            {renderedData.map((expense, index) => (
              <motion.div key={index} variants={cardVariants} >
                <ExpenseCard
                  expense={expense}
                  Openmodel={() => {
                    setCurrentExpenseid(expense.id)
                    Openmodel()
                  }}
                  ForGroup={true}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.title : queryOptions.Filter.active ? emptyStates.noFilterResults.title : emptyStates.noData.title}
            description={queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.description : queryOptions.Filter.active ? emptyStates.noFilterResults.description : emptyStates.noData.description}
            textsize=""
          >
            <div className="p-8 md:p-10 shadow-md bg-gray-50 rounded-full">
              {queryOptions.Search.value.trim() !== '' ? emptyStates.noSearchResults.icon : queryOptions.Filter.active ? emptyStates.noFilterResults.icon : emptyStates.noData.icon}
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <Basemodel isOpen={restrictpopup} Closemodel={() => setrestrictpopup(false)}>
              <GroupActionDialog groupId={Groupid} isnew={isnew} Closemodel={() => setrestrictpopup(false)} />
            </Basemodel>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Expense Details">
        <Expensedetails expenseid={CurrentExpenseid} />
      </Basemodel>
      <Basemodel isOpen={isFilteropen} Closemodel={() => setisFilteropen(false)} title="Expense Filters">
        <FilterHeader Sorts={expenseGroupSorts} Filters={expenseGroupFilters} defaultSort={"New to Old"} type="expense" queryOptions={queryOptions} setqueryOptions={setqueryOptions} />
      </Basemodel>
    </motion.div>
  )
}