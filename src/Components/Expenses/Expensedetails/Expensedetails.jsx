import React from 'react'
import { Overview } from './Overview'
import { Settlements } from './Settlements'
import { Insights } from './Insights'
import { Comparisongraph } from "./Comparison_graph"
import { useSelector } from 'react-redux'
import { selectExpenseById } from '../../../store/ExpenseSlice'

export const Expensedetails = ({ expenseid }) => {
    const Expense = useSelector(state => selectExpenseById(state, expenseid))
    
    if (!Expense) return null;

    return (
        <div className='container mx-auto h-auto mt-2 flex flex-col lg:grid lg:grid-cols-5 gap-4'>
            
            <div className="Overview lg:col-span-2 2xl:col-span-3">
                <Overview Expense={Expense} />
            </div>
            
            <div className="insights lg:col-span-3 2xl:col-span-2">
                <Insights data={Expense.Members} />
            </div>
            <div className="Comparisan-graph bg-white shadow-md lg:col-span-3 rounded-lg p-2 h-[350px] md:h-[540px]">
                <Comparisongraph Expense={Expense} />
            </div>
            
            <div className="Settlements lg:col-span-2 min-h-[300px] max-h-[540px]">
                <Settlements Expense={Expense} />
            </div>
        </div>
    )
}