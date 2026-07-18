import React, { useEffect, useMemo } from 'react'
import CalculatorInput from '../../Expenses/Common/addcalinput';
import Selectall from '../../Common/Selectall';
import SpliterCheck from '../../Groups/Common/gcheck'
import Choosef from "../../Common/choosef"
import { IoPerson } from "react-icons/io5";
import Temporaryinput from '../Common/Temporary';
import Addtemp from '../Common/Addtemp';
import { useSelector } from 'react-redux';
import { selectAllFriends, selectPinnedFriends } from '../../../store/FriendsSlice';
import { useFormContext, Controller } from 'react-hook-form';
import { useState } from 'react';
import { FaBan } from "react-icons/fa";

export const Stepone = ({ }) => {
    const { control, register, setValue, trigger, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext();
    const temporary = watch("temporary") || [];
    const AllFriends = useSelector(selectAllFriends)
    const PinnedFriends = useSelector(selectPinnedFriends);
    const CurrentExpensemembers = getValues("splitMembers");
    const [SelectedFriends, setSelectedFriends] = useState(CurrentExpensemembers)
    const [isPinselected, setisPinselected] = useState(false)
    const NamePattern = /^[A-Za-z][A-Za-z0-9\s,._&'-]*$/;
    const Friends = useMemo(() => {
        return isPinselected ? PinnedFriends : [...temporary, ...AllFriends];
    }, [isPinselected, temporary, AllFriends, PinnedFriends]);
    const addTemporaryFriend = () => {
        const name = watch("tempname")
        if (name === '') return
        const current = watch("temporary") || [];
        console.log(current)
        if (current.length >= 5) {
            setError("tempname", {
                type: "manual",
                message: "You can only add up to 5 temporary friends"
            });
            return;
        }
        const exists = current.some(
            friend => friend.Name.toLowerCase() === name.toLowerCase()
        );
        if (exists) return
        clearErrors("tempname");
        const id = `temp_${current.length + 1}`;
        const newFriend = { id, Name: name, type: "temporary" };
        setValue("temporary", [...current, newFriend]);
        setValue("tempname", '')
    };
    useEffect(() => {
        register("splitMembers", {
            validate: (value) => value.length > 0 || "Please select at least one friend"
        });
    }, [register])

    useEffect(() => {
        setValue("splitMembers", SelectedFriends, { shouldValidate: true });
    }, [SelectedFriends, setValue])

    return (
        <>
            <div className="calculator-inputs flex flex-col md:flex-row gap-4 mt-4 w-full h-full p-4 sm:p-2">
                <Controller
                    control={control}
                    name="expenseName"
                    rules={{
                        required: "Expense Name is required",
                        pattern: { value: NamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
                        maxLength: { value: 25, message: "Max 25 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <CalculatorInput variant="Expense Name" width="w-full lg:w-70" type="text"
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
                            <CalculatorInput variant="Total Amount" width="w-full lg:w-50" type="number"
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
            <div className="select-friend-option flex flex-col gap-3 mt-4">
                <div className='select-friends-container w-full'>
                    <div className='select-friend-option flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                        <h4 className='text-md font-semibold my-2'>Select who shares this cost
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="w-auto py-2 px-3 bg-neutral-100 rounded-lg">
                                <Selectall Selected={SelectedFriends}
                                    setSelected={setSelectedFriends} members={Friends}>
                                    <h5 className='text-[13px] text-text-secondary whitespace-nowrap'>Select all</h5>
                                </Selectall>
                            </div>
                            <Choosef setisPinselected={setisPinselected} />
                        </div>
                    </div>
                    <div className="adding-temporay-friends p-2 flex flex-col sm:flex-row gap-3">
                        <Controller
                            control={control}
                            name="tempname"
                            rules={{
                                pattern: { value: NamePattern, message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ," },
                                maxLength: { value: 25, message: "Max 25 characters allowed" },
                                minLength: { value: 3, message: "At least 3 characters" },
                                validate: (value) => {
                                    const current = watch("temporary") || [];
                                    const exists = current.some(
                                        friend => friend.Name.toLowerCase() === value.toLowerCase()
                                    );
                                    return !exists || "Duplicate names are not allowed";
                                }
                            }}

                            render={({ field, fieldState }) => (
                                <>
                                    <Temporaryinput
                                        value={field.value}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 26) {
                                                field.onChange(e);
                                                trigger("tempname");
                                            }
                                        }}
                                    />
                                </>
                            )} />
                        <Addtemp onClick={addTemporaryFriend} />
                    </div>
                    {errors.tempname && <p className='text-red-500 text-sm px-2'>{errors.tempname.message}</p>}
                    <div className='select-friends mx-auto mt-3 sm:mb-2 mb-10'>
                        <div className="
friend-lists
max-h-80
overflow-auto
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-2
lg:grid-cols-4
xl:grid-cols-5
gap-2
sm:gap-3
px-1
sm:px-2
">
                            {Friends.map((friend, index) => {
                                return (
                                    <label key={index} className={`select-friend rounded-lg shadow-md bg-neutral-100 flex flex-col items-center justify-center gap-2 p-2 sm:p-3 relative transition-all min-h-[130px] sm:min-h-[150px]
${friend?.isBanned ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                        <div className={`size-12 sm:size-16 rounded-full center-flex relative ${friend?.isBanned ? "border-red-500" : "border-primary"} border `}>
                                            {friend.type === "temporary" ? (
                                                <div className="friend-img-container size-12 sm:size-16 bg-neutral-300 rounded-full center-flex ">
                                                    <IoPerson className='size-5 sm:size-7 text-neutral-500' />
                                                </div>
                                            ) : (
                                                <>
                                                    <img src={friend.Image} className='Img-c' alt="friend-img" />
                                                    {friend?.isBanned && (
                                                        <div className="absolute top-8/10 left-1 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg">
                                                            <FaBan className="size-2" />
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="friend-info center-flex flex-col text-center">
                                            <h2 className='text-xs sm:text-sm truncate max-w-full'>{friend.Name}</h2>
                                            <p className={`text-[11px] sm:text-[12px] ${friend?.isBanned ? "text-red-600 font-semibold" : "text-text-secondary"}`}>{
                                                friend.type === "temporary" ? "Temporary Friend" :
                                                    friend.isBanned ? "(Banned)" : friend.Bio
                                            }</p>
                                        </div>
                                        <div className='absolute top-2 right-1'>
                                            <SpliterCheck id={friend.id} setSelected={setSelectedFriends} Selected={SelectedFriends} />
                                        </div>
                                    </label>
                                )
                            })}
                        </div>
                        {errors.splitMembers && <p className='text-red-500 text-sm mt-2'>{errors.splitMembers.message}</p>}
                    </div>
                </div>
            </div>

        </>
    )
}