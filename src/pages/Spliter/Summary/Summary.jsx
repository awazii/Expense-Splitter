import React from 'react'
import { Overview } from '../../../Components/Expenses/Expensedetails/Overview'
import { Settlements } from '../../../Components/Expenses/Expensedetails/Settlements'
import { Insights } from '../../../Components/Expenses/Expensedetails/Insights'
import { Comparisongraph } from "../../../Components/Expenses/Expensedetails/Comparison_graph"
import { useSelector } from 'react-redux'
import { selectAllSplits } from '../../../store/SpliterSlice'

export const SummaryDashboard = () => {
    const Expense = useSelector(selectAllSplits)[0]
    
    if (!Expense) return null;

    return (
        <div className="w-full h-auto mt-2 mb-4 flex flex-col lg:grid lg:grid-cols-5 gap-4">
            <div className="Overview lg:col-span-3">
                <Overview Expense={Expense} />
            </div>

            <div className="insights lg:col-span-2">
                <Insights data={Expense.Members} />
            </div>
            <div className="Comparisan-graph bg-white shadow-md lg:col-span-3 rounded-lg p-3 h-[400px] md:h-[540px]">
                <Comparisongraph Expense={Expense} />
            </div>
            
            <div className="Settlements lg:col-span-2 min-h-[350px]">
                <Settlements Expense={Expense} />
            </div>
        </div>
    )
}