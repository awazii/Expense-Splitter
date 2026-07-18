import React, { useState } from 'react'
import { updateGroup, selectGroupById } from '../../../store/GroupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { TbIdBadge, TbEdit } from "react-icons/tb";
import Loader from '../../Common/loader';
import { Groupcategories } from '../../../pages/Group/Grouplist'
import { IoCheckmark } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi2";
import { addActivity } from "../../../store/ActivitySlice"

export const Updateg = ({ groupId }) => {
    const CurrentGroup = useSelector((state) => selectGroupById(state, groupId));
    const [showSuccess, setshowSuccess] = React.useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const GroupnamePattern = /^[A-Za-z][A-Za-z0-9\s,._-]*$/;
    const [selectedOption, setSelectedOption] = useState(CurrentGroup?.Category);
    
    const { register, handleSubmit, reset, trigger, getValues, control, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues: {
            Name: CurrentGroup.Name || "",
        }
    });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await dispatch(updateGroup({ id: groupId, changes: { Name: data.Name, Category: selectedOption } }));
            dispatch(addActivity({
                title: "Group Info Updated",
                selfTitle: false,
                description: null,
                icon: "groupUpdate",
                visibility: {
                    global: true,
                    friend: false,
                    group: true
                },
                friends: null,
                friendImages: null,
                groupid: groupId,
                groupinfo: {
                    name: data.Name,
                    Category: selectedOption
                },
                category: "group",
            }));
            setshowSuccess(true);
            setTimeout(() => {
                setshowSuccess(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to update group:", error);
        }
    };

    function CategoryExtractor(categoryId) {
        const category = Groupcategories.find(category => category.id === categoryId);
        return category
    }

    return (     
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm sm:max-w-md mx-auto h-fit bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 flex items-center flex-col relative'>
            
            <div className="size-24 sm:size-32 rounded-full cursor-pointer mb-6 shrink-0 shadow-sm overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
                <img src={CategoryExtractor(selectedOption).Img} className="size-full object-cover" alt="Preview" />
            </div>
            
            <div className="w-full space-y-5">
                <Controller
                    name="Name"
                    control={control}
                    rules={{
                        required: "Name is required",
                        maxLength: { value: 15, message: "Max 15 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" },
                        pattern: {
                            value: GroupnamePattern,
                            message: "Must start with a letter, followed by letters, numbers, or underscores"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div className="w-full">
                            <div className="flex items-center gap-3 w-full p-3 sm:p-4 border border-gray-200 rounded-2xl focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all bg-gray-50">
                                <TbIdBadge className="size-5 sm:size-6 text-gray-400 shrink-0" />
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Display Name"
                                    className="w-full outline-none bg-transparent font-medium text-sm sm:text-base text-gray-800 placeholder-gray-400"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        trigger("Name");
                                        if (!hasInteracted) setHasInteracted(true);
                                    }}
                                />
                            </div>
                            {fieldState.error && (
                                <p className="text-red-500 text-xs sm:text-sm mt-1.5 ml-2">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />

                <div className="w-full relative">
                    <label className="mb-1.5 block text-xs sm:text-sm font-medium text-gray-500 ml-1">
                        Selected Category Option
                    </label>
                    <div className="relative w-full">
                        <button
                            type='button'
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 sm:py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            <span className="truncate">{CategoryExtractor(selectedOption).variant}</span>

                            <HiChevronDown
                                size={18}
                                className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                
                        {isOpen && (
                            <div className="absolute left-0 z-50 w-full max-h-56 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl mt-2 custom-scrollbar">
                                {Groupcategories.map((option) => {
                                    const isSelected = selectedOption === option.id;

                                    return (
                                        <button
                                            type='button'
                                            key={option.id} 
                                            onClick={() => {
                                                if (selectedOption !== option.id) {
                                                    setSelectedOption(option.id);
                                                    if (!hasInteracted) setHasInteracted(true);
                                                }
                                                setIsOpen(false);
                                            }}
                                            className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all cursor-pointer ${
                                                isSelected
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                        >
                                            <span className="truncate">{option.variant}</span>

                                            {isSelected && (
                                                <IoCheckmark size={18} className="shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                disabled={!hasInteracted || isSubmitting}
                type='submit'
                className={`w-full sm:w-3/4 mt-8 px-4 py-3.5 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all 
                ${(isSubmitting || !hasInteracted) ? 'opacity-50 cursor-not-allowed shadow-none' : 'cursor-pointer active:scale-95'}`}
            >
                {isSubmitting ? <Loader /> : (
                    <>Update <TbEdit className='size-5' /></>
                )}
            </button>
            {isSubmitting && <p className="text-sm font-medium text-gray-500 mt-3">Updating...</p>}
            {showSuccess && <p className="text-sm font-medium text-green-600 mt-3">Updated successfully!</p>}
        </form>
    )
}