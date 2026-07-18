import React from 'react'
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Addexpense } from '../Addexpense/AddExpense'

const New = () => {
    const Navigate = useNavigate()
    const { Groupid } = useParams();
    
    return (
        <div className='Add-expense-container flex flex-col  pt-20 md:pt-0'>
            
            <div className="header h-auto sm:h-25 flex px-4 sm:px-10 py-4 sm:py-0 items-center gap-2 sm:gap-3 w-fit">
                <button 
                    className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95 shrink-0" 
                    onClick={() => { Navigate(`/Groups/${Groupid}/Expenses`) }}
                >
                    <IoReturnUpBack className='size-5 sm:size-6 group-hover:text-primary' />
                </button>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold'>Add New Expense</h3>
            </div>
    
            <div className="add-expense  flex-1  px-2 sm:px-4  pt-2 sm:pt-4">
                <Addexpense />
            </div>
            
        </div>
    )
}

export default New;