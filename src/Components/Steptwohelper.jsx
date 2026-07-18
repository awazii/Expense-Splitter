import React from 'react';
import { FaRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useFormContext } from 'react-hook-form';

export const Steptwohelper = ({ Friends, paymentdata }) => {
  const { register, getValues, watch, formState: { errors } } = useFormContext();
  
  const livemembers = watch("MasterMembers");
  const Total = Number(getValues("totalAmount"));

  return (
    <div className="w-full h-full flex flex-col gap-6 p-2 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentdata.map((item, index) => (
          <div key={index} className="border-l bg-white rounded-lg shadow-sm p-4 flex flex-col justify-center relative min-h-[5rem]">
            <div className={`absolute top-2 right-2 rounded-full p-1 ${item.label === "Amount Collected" ? "bg-green-500" : ""}`}>
              {item.logo}
            </div>
            <h4 className="text-xs font-bold ">{item.label}</h4>
            <p className="text-xl font-base mt-1">Rs.{item.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className='flex justify-between items-center mb-4'>
          <h4 className="text-base font-semibold">How much each person paid?</h4>
          {errors.stepTwoTotal && <p className='text-red-500 text-sm'>{errors.stepTwoTotal.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1 sm:mb-2 mb-10">
          {Friends.map((friend, index) => (
            <div key={index} className="bg-background rounded-xl p-4 flex gap-4 items-center shadow relative hover:shadow-md transition-shadow">
              
              <div className="friend-info flex items-center gap-3 flex-1 min-w-0">
                <div className="size-12 sm:size-14 shrink-0">
                  {friend.type === "temporary" ? (
                    <div className="size-full bg-neutral-200 rounded-full flex items-center justify-center">
                      <IoPerson className='size-6 text-neutral-500' />
                    </div>
                  ) : (
                    <img src={friend.Image} className='size-full object-cover rounded-full' alt="friend" />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className='text-sm font-semibold truncate'>{friend.Name}</h2>
                  <p className='text-xs text-gray-400 truncate'>{friend.type === "temporary" ? "Temporary" : friend.Bio}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-white border-b-light shadow rounded-lg px-3 py-2">
                <FaRupeeSign className='text-green-500 shrink-0' />
                <input 
                  {...register(`MasterMembers.${index}.spent`, {
                    required: "Required",
                    validate: value => {
                      const otherPeoplePaid = livemembers.reduce((sum, member, i) => {
                        if (i === index) return sum;
                        return sum + Number(member.spent || 0);
                      }, 0);
                      return value <= (Total - otherPeoplePaid) || "Exceeds total";
                    }
                  })} 
                  type="number" 
                  placeholder='0' 
                  className='w-16 text-right bg-transparent focus:outline-none text-sm font-semibold'
                  onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} 
                />
              </div>

              {errors.MasterMembers?.[index]?.spent && (
                <p className='text-red-500 text-[10px] absolute bottom-2 right-4'>
                  {errors.MasterMembers[index].spent.message}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}