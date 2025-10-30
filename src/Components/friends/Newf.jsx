import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import Newbtn from "./Newbtn"
import Checkbox from "./Check"
import Input from "./addfinput"
import ImageBox from "./Imagebox"
export const Newfriend = () => {
  return (
      <div className='container card-b rounded-2xl mx-auto h-fit w-100 my-20 p-3'>
        <div className="title center-flex flex-col gap-0">
        <h2 className='text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Friend<span><FaUserPlus /></span></h2>
        <h4 className='text-text-secondary mr-2'>Share costs. Stay synced.</h4>
      </div>
      <form action="" className='Friend-form  m-6 space-y-3 flex flex-col items-center '>
                 <Input variant={"Name"}/>
                 <Input variant={"Bio"}/>
                 <ImageBox/>
                 <div className='flex gap-2 mt-3'>
                 <Checkbox/>
                     <h3 className='text-sm'>Do you want to pin this person?</h3>
                 </div>
                 <Newbtn/>
      </form>
      </div>    
  )
}
