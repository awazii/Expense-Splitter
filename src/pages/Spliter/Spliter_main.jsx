import React from 'react'
import { Spliter } from '../../Components/Spliter/Spliterform/Spliter';
import { SummaryDashboard } from './Summary/Summary';
import Resplitbtn from "../../Components/Spliter/Common/Resplit"
import { useSelector } from 'react-redux'
import { selectAllSplits } from '../../store/SpliterSlice';

export const Spliter_main = () => {
   const Splits = useSelector(selectAllSplits)
   
   return (
       
       <div className='ExpenseCalculator-main h-full overflow-auto scrollbar-hide pt-24 md:pt-6 pb-10 px-4 md:px-8 lg:px-6'>
           
          
           <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Spliter</h1>
           
           {Splits.length === 0 && (
               <p className="text-text-secondary text-sm sm:text-base max-w-lg">
                   Add people, split expenses by equal or custom shares, and see who owes whom — all calculated temporarily.
               </p>
           )}
           
           {Splits.length > 0 && (
               <div className="Summary-heading flex justify-between items-center mt-6 mb-4">
                   
                   <p className="text-xl sm:text-2xl font-medium">Quick Split Summary</p>
                   <div className="Resplitbtn-container">
                       <Resplitbtn id={Splits[0].id} />
                   </div>
               </div>
           )}
           
           <div className="w-full">
             {Splits.length > 0 ? <SummaryDashboard /> : <Spliter /> }
           </div>
       </div>
   )
}