import React from 'react'
import { MdSort } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { SortIcons, FilterIcons } from '../utils/SortFiltersvgs';
import { selectGroupById } from '../store/GroupSlice';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { pageContainerVariants, cardContentVariants } from './../utils/animation'

export const FilterSortPanel = ({ queryOptions, type }) => {
  const group = useSelector(state => selectGroupById(state, queryOptions.Filter.details?.value))
  
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      
      className='Active-filter-sort mb-3 flex flex-col lg:flex-row flex-wrap w-full gap-3'
    >
     
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
       
        className='Active-filters shadow w-full sm:w-auto h-auto min-h-[3.75rem] bg-white flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 sm:px-5 rounded-lg'
      >
        <motion.div
          variants={cardContentVariants}
          className='w-fit flex items-center gap-1'
        >
          <MdSort className="size-6 text-primary font-semibold" />
          <h3 className='font-semibold'>Sort:</h3>
        </motion.div>
        
        <motion.div
          variants={cardContentVariants}
          className='flex-1 flex items-center gap-2 w-full sm:w-auto'
        >
        
          <h3 className='sm:border-l border-gray-200 sm:pl-3 p-1 text-sm flex items-center gap-1 w-full sm:w-auto'>
            <span className='font-semibold'>Sort By: </span> 
            {SortIcons[queryOptions.Sort.type]} {queryOptions.Sort.type}
          </h3>
        </motion.div>
      </motion.div>

      
      <motion.div 
      
        className='Active-filters shadow w-full lg:w-auto h-auto min-h-[3.75rem] bg-white flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 sm:px-5 rounded-lg'
      >
        <motion.div
          variants={cardContentVariants}
          className='w-fit flex items-center gap-1'
        >
          <CiFilter className="size-6 text-primary font-semibold" />
          <h3 className='font-semibold'>Filters:</h3>
        </motion.div>
        
        <motion.div
          variants={cardContentVariants}
          className='flex-1 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1 sm:gap-0 w-full sm:w-auto'
        >
          <h3 className='sm:border-l border-gray-200 sm:pl-3 sm:pr-3 p-1 text-sm flex items-center gap-1 w-full sm:w-auto'>
            <span className='font-semibold'>Status:</span> 
            <span className={`flex items-center justify-center size-4 rounded-full ${queryOptions.Filter.active ? "bg-green-500" : "bg-red-500"}`}>
              {queryOptions.Filter.active ?
                <IoMdCheckmarkCircle className='text-white size-full' /> :
                <IoMdCloseCircle className='text-white size-full' />
              }
            </span> 
            {queryOptions.Filter.active ? "Active" : "InActive"}
          </h3>

          {queryOptions.Filter.active && (
            <>
              <h3 className='sm:border-l border-gray-200 sm:pl-3 sm:pr-3 p-1 text-sm flex items-center gap-1 w-full sm:w-auto'>
                <span className='font-semibold'>Filter Type: </span>
                {FilterIcons[queryOptions.Filter.type]}{queryOptions.Filter.type}
              </h3>

              {type === "expense" && (
                <h3 className='sm:border-l border-gray-200 sm:pl-3 p-1 text-sm flex items-center gap-1 w-full sm:w-auto'>
                  <span className='font-semibold'>{queryOptions.Filter.details.label}:</span> 
                  {group ? group.Name : queryOptions.Filter.details.value}
                </h3>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}