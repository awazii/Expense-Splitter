import React, { useEffect, useState } from 'react'
import CalculatorInput from '../Common/addcalinput';
import Expensecheck from '../../Groups/Common/gcheck';
import Selectall from '../../Common/Selectall';
import Categories from "../Common/expensecategories"
import { useParams } from 'react-router-dom';
import { selectGroupById } from '../../../store/GroupSlice';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { useSelector } from 'react-redux';
import { useFormContext, Controller } from 'react-hook-form';
import { FaBan } from "react-icons/fa";
export const Stepone = () => {
    const { Groupid } = useParams();
    const currentGroup = useSelector(state => selectGroupById(state, Groupid))
    const allFriends = useSelector(selectAllFriends)
    const Groupmembers = allFriends.filter(friend => currentGroup.Members.includes(friend.id))
    const { control, register, setValue, trigger, getValues ,formState: { errors } } = useFormContext();
   const ExpenseNamePattern = /^[A-Za-z][A-Za-z0-9\s,._&'-]*$/;
    const CurrentExpensemembers = getValues("splitMembers");
    const [SelectedFriends, setSelectedFriends] = useState(CurrentExpensemembers);
    useEffect(() => {
        register("splitMembers", {
            validate: (value) => value.length > 0 || "Please select at least one friend"
        });
    }, [register])

    useEffect(() => {
        setValue("splitMembers", SelectedFriends, { shouldValidate: true });
    }, [SelectedFriends,setValue])
    return (
        <>
            <div className="calculator-inputs flex flex-col md:flex-row gap-4 mt-4 w-full flex-wrap p-2 sm:p-4">
                <Controller
                    control={control}
                    name="expenseName"
                    rules={{
                        required: "Expense Name is required",
                        pattern: { value: ExpenseNamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
                        maxLength: { value: 25, message: "Max 25 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <CalculatorInput variant="Expense Name" width="w-full lg:w-[600px]" type="text"
                                value={field.value}
                                onChange={(e) => {
                                    if (e.target.value.length <= 26) {
                                        field.onChange(e);
                                        trigger("expenseName");
                                    }
                                }}
                                fieldState={fieldState}
                            />

                        </>
                    )} />
                <Controller
                    control={control}
                    name="totalAmount"
                    rules={{
                        required: "Total Amount is required",
                        min: { value: 10, message: "Minimum Amount required is Rs. 10" },
                        max: { value: 1000000, message: "Max 10 lac allowed" },
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <CalculatorInput variant="Total Amount" width="w-full lg:w-[280px]" type="number"
                                value={field.value}
                                onChange={(e) => {

                                    field.onChange(e);
                                    trigger("totalAmount");

                                }}
                                fieldState={fieldState}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}

                            />
                        </>
                    )} />

            </div>
            <div className="Select-categories mt-6 space-y-3">
                <h4 className='text-sm sm:text-md font-semibold my-3'>Choose Category</h4>
                <Controller
                    name="Category"
                    control={control}
                    rules={{ required: "Please select a category" }}
                    render={({ field, fieldState }) => (
                        <>
                            <Categories
                                start={0}
                                end={4}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    trigger("Category");
                                }}
                            />
                            <Categories
                                start={4}
                                end={7}
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e);
                                    trigger("Category");
                                }}
                            />
                            {fieldState.error && (
                                <p className="text-red-600 text-xs sm:text-sm mt-1">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            <div className='select-friends-container w-full my-5'>
                <div className='select-friends-container w-full '>
                    <div className='select-friend-option flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                        <h4 className='text-sm sm:text-md font-semibold my-2 '>Select who shares this cost        </h4>
                           {errors.splitMembers && <p className='text-red-500 text-xs sm:text-sm  mt-2'>{errors.splitMembers.message}</p>}
                        <div className='flex flex-wrap items-center gap-2'>
                            <div className=' w-auto py-2 px-3 bg-neutral-100  rounded-lg  '>
                                <Selectall Selected={SelectedFriends}
                                    setSelected={setSelectedFriends} members={Groupmembers}>
                                    <h5 className='text-[12px] sm:text-[13px] text-text-secondary whitespace-nowrap'>Select all</h5>
                                </Selectall>
                            </div>
                        </div>
                    </div>
                    <div className='select-friends mx-auto mt-3'>  
                   <div className="friend-lists max-h-80 overflow-auto  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3  border-b-light px-1 sm:px-2 border-l p-2 ">
                        {Groupmembers.map((friend, index) => {
                            return (<label key={index} className={`select-friend rounded-lg shadow-md bg-neutral-100 flex flex-col items-center justify-center gap-1 p-2 sm:p-3 relative trans min-h-[130px] sm:min-h-[150px] ${friend?.isBanned ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                <div className={`logo size-12 sm:size-16 rounded-full relative ${friend?.isBanned ? "border-red-500" : "border-primary"} border center-flex`}>
                                    <img src={friend.Image} className='Img-c w-full h-full object-cover rounded-full' alt="friend-img" />
                                    {friend?.isBanned && (
                                        <div className="absolute top-9/12 left-1 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg">
                                            <FaBan className="size-2" />
                                        </div>
                                    )}
                                </div>
                                <div className="friend-info center-flex flex-col text-center min-w-0">
                                    <h2 className='text-xs sm:text-sm truncate max-w-full'>{friend.Name}</h2>
                                    <p className={`text-[11px] sm:text-[12px] truncate max-w-full ${friend?.isBanned ? "text-red-600 font-semibold" : "text-text-secondary"}`}>
                                        {friend?.isBanned ? "(Banned) " : friend.Bio || "temporary"}
                                    </p>
                                </div>
                                <div className='absolute top-2 right-1'>
                                    <Expensecheck id={friend.id} setSelected={setSelectedFriends} Selected={SelectedFriends}  />
                                </div>
                            </label>
                            )
                        })}
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}