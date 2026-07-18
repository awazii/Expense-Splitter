import React, { useState, useMemo } from 'react'
import Input from '../../Components/Common/Input'
import { GiExpense } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { LuUtensils } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { MdSmokeFree } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import { IoTicketSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import Linechart from './Linechartgraph';
import { Basemodel } from '../../Components/basemodel';
import { Expensedetails } from '../../Components/Expenses/Expensedetails/Expensedetails';
import { useSelector } from 'react-redux';
import { selectAllExpenses, TotalExpenses } from '../../store/ExpenseSlice';
import { selectFriendById } from "../../store/FriendsSlice";
import { selectGroupById } from '../../store/GroupSlice';
import { ExpenseCard } from '../../Components/Expenses/ExpenseCard';
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { RiFileList3Line } from "react-icons/ri";
import dayjs from 'dayjs';
import { motion } from "framer-motion";
import { cardContainerVariants, cardVariants, itemVariants, headerVariants, pageContainerVariants } from "../../utils/animation";
import { FilterHeader } from '../../Components/filter';
import { MdSort } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { SortIcons, FilterIcons } from '../../utils/SortFiltersvgs';
import { FilterSortPanel } from '../../Components/FilterSortPanel';
import { FilterHandlers } from '../../utils/FilterHandler';
import {
  IoSearchOutline,
} from "react-icons/io5";

export const expenseSorts = [
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

export const expenseFilters = [
  {
    label: "By Group",
    icon: FilterIcons["By Group"],
  },
  {
    label: "By Category",
    icon: FilterIcons["By Category"],
  },
];

export const categories = {
  "Food & Snacks": {
    name: "Food & Snacks",
    gradient: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%)",
    icon: LuUtensils
  },
  "Drinks & Beverages": {
    name: "Drinks & Beverages",
    gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    icon: RiDrinks2Line
  },
  "Vapes & Smoking": {
    name: "Vapes & Smoking",
    gradient: "linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)",
    icon: MdSmokeFree
  },
  "Transport": {
    name: "Transport",
    gradient: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)",
    icon: FaCar
  },
  "Hotel & Stay": {
    name: "Hotel & Stay",
    gradient: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
    icon: MdHotel
  },
  "Movie & Events": {
    name: "Movie & Events",
    gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
    icon: IoTicketSharp
  },
  "Others": {
    name: "Others",
    gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 50%, #DD2476 100%)",
    icon: IoSparklesSharp
  }
}
const getSevenDayChartData = (expenses) => {
  return Array.from({ length: 7 }, (_, i) => {
    const dateStr = dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD');
    const dayExpenses = expenses.filter(e => e.createdDate === dateStr);

    return {
      date: dayjs(dateStr).format('MMM DD'),
      amount: dayExpenses.reduce((sum, e) => sum + Number(e.totalAmount), 0),
      count: dayExpenses.length || 0
    };
  });
};
const getDailyComparison = (expenses, type) => {
  const todayStr = dayjs().format('YYYY-MM-DD');
  const yesterdayStr = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const todayTotalraw = expenses
    .filter(e => e.createdDate === todayStr)
  const todayTotal = type === "count" ? todayTotalraw.length : todayTotalraw.reduce((sum, e) => sum + Number(e.totalAmount), 0);

  const yesterdayTotalraw = expenses
    .filter(e => e.createdDate === yesterdayStr)
  const yesterdayTotal = type === "count" ? yesterdayTotalraw.length :
    yesterdayTotalraw.reduce((sum, e) => sum + Number(e.totalAmount), 0);

  const diff = todayTotal - yesterdayTotal;
  let percentage = 0;
  if (yesterdayTotal !== 0) {
    percentage = (diff / yesterdayTotal) * 100;
  } else {
    percentage = todayTotal > 0 ? 100 : 0;
  }

  return {
    percentage: Math.round(Math.abs(percentage)),
    isIncreasing: diff >= 0
  };
};

export const Expense = React.memo(() => {
  const Raw = useSelector(selectAllExpenses);
  const Expenses = Raw.filter(r => r.Category !== "Settlement")
  const Totalexpensesamount = useSelector(TotalExpenses)
  const { SevenDayExpenseAmount, SevenDayExpensecount } = useMemo(() => {
    const baseData = getSevenDayChartData(Expenses);

    return {
      SevenDayExpenseAmount: baseData.map(e => ({ date: e.date, amount: e.amount })),
      SevenDayExpensecount: baseData.map(e => ({ date: e.date, count: e.count }))
    };
  }, [Expenses]);
  
  const dailyamountComparison = useMemo(() => {
    return getDailyComparison(Expenses, "amount");
  }, [Expenses]);

  const dailycountComparison = useMemo(() => {
    return getDailyComparison(Expenses, "count");
  }, [Expenses]);
  
  const [popup, setpopup] = useState(false)
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
      title: "No expenses found",
      description: "Your global expense history is empty. Add a new expense to get started.",
      icon: <RiFileList3Line className="size-10 text-primary" />,
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
  
  const Openmodel = () => {
    setpopup(true)
  }
  const Closemodel = () => [
    setpopup(false)
  ]
  
  const expenseoverview = [
    {
      label: "Total Expenses",
      dailyreport: {
        percentage: dailyamountComparison.percentage,
        isIncrease: dailyamountComparison.isIncreasing,
      },
      amount: Totalexpensesamount.toLocaleString(),
      icon: <FaMoneyCheck className='text-white size-10' />,
      gradient: 'linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)',
    },
    {
      label: "Expense Count",
      amount: Expenses.length,
      dailyreport: {
        percentage: dailycountComparison.percentage,
        isIncrease: dailycountComparison.isIncreasing,
      },
      icon: <GiExpense className='text-white size-10' />,
      gradient: 'linear-gradient(135deg, #3F51B5 0%, #2196F3 50%, #00BCD4 100%)',
    }
  ];

  return (
    <div className="Expense-main h-full overflow-auto scrollbar-hide relative pt-20 md:pt-0 pb-10">
      <h1 className="text-2xl md:text-3xl font-semibold m-4 md:m-6 mb-1">Expenses</h1>
      <p className="text-text-secondary text-sm lg:text-base md:text-md mx-4 md:mx-6 mb-4">
        This section displays all expenses from different groups with live data updates.
      </p>
      
      <div className="expense-overview flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto gap-4 md:gap-5 px-4 md:px-6">
        {expenseoverview.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="expense-card bg-white shadow-md rounded-lg p-4 center-flex flex-col w-full md:w-1/2 max-w-xs"
          >
            <div
              className="icon mb-2 center-flex size-20 md:size-28 rounded-full"
              style={{ background: item.gradient }}
            >
              {item.icon}
            </div>
            <div className="info center-flex flex-col mt-1">
              <div className="label font-semibold text-lg md:text-xl">{item.label}</div>
              <div className="amount text-xl md:text-2xl mt-1">
                {`${index === 0 ? "Rs." : ""}${item.amount.toLocaleString()}`}
              </div>
              <p
                className={`weekly-report ${item.dailyreport.isIncrease ? "text-green-500" : "text-red-500"
                  } center-flex gap-1 text-sm md:text-base`}
              >
                {item.dailyreport.isIncrease ? (
                  <FaArrowUp className="size-3 md:size-4" />
                ) : (
                  <FaArrowDown className="size-3 md:size-4" />
                )}
                {`${item.dailyreport.percentage}% from Yesterday`}
              </p>
              <div className="w-full mt-2">
                <Linechart
                  data={index === 0 ? SevenDayExpenseAmount : SevenDayExpensecount}
                  type={item.label === "Total Expenses" ? "expenses" : "count"}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        initial="hidden"
        animate="visible" 
        variants={itemVariants} 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 px-4 md:px-6 container mx-auto gap-4"
      >
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
          <button className="filter bg-white shadow-md p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={() => setisFilteropen(true)} title='Sort & Filters'>
            <CiFilter className="size-5 md:size-6" />
          </button>
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={itemVariants} className="Expense-container mx-auto container mt-4 px-4 md:px-6">
        <h2 className="text-lg md:text-xl font-semibold mb-2 center-flex gap-1 w-fit">
          Expenses <span><GiExpense /></span>
        </h2>
        <FilterSortPanel queryOptions={queryOptions} type="expense" />
        
        {queryOptions.Search.value !== '' && <h2 className='text-text-secondary text-sm md:text-base my-2'>Showing : <span className='font-semibold'> {`${renderedData.length} 
        ${renderedData.length > 1 ? "Results" : "Result"}
        for ${queryOptions.Search.value}`} </span></h2>}
        
        {renderedData.length > 0 ? (
          <motion.div
            variants={cardContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-5"
          >
            {renderedData.map((expense, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ExpenseCard
                  expense={expense}
                  Openmodel={() => {
                    setCurrentExpenseid(expense.id);
                    Openmodel();
                  }}
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

      <Basemodel isOpen={isFilteropen} Closemodel={() => setisFilteropen(false)} title="Expense Filters">
        <FilterHeader Sorts={expenseSorts} Filters={expenseFilters} queryOptions={queryOptions} setqueryOptions={setqueryOptions} defaultSort="New to Old" type="expense" />
      </Basemodel>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Expense Details">
        <Expensedetails expenseid={CurrentExpenseid} />
      </Basemodel>
    </div>
  )
})