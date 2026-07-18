import React, { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi2";
import { selectAllGroups, selectGroupById } from "../store/GroupSlice";
import { categories } from "../pages/Expenses/Expenses";
import { useSelector } from "react-redux";

export const FilterHeader = ({ Sorts, Filters, queryOptions, setqueryOptions, type, defaultSort }) => {
    const [activeFilter, setactiveFilter] = useState(queryOptions.Filter.type);
    const [activeSort, setactiveSort] = useState(queryOptions.Sort.type);
    const [isOpen, setIsOpen] = useState(false);
    const Allgroups = useSelector(selectAllGroups)
    const [isInteracted, setisInteracted] = useState(false)
    const [status, setStatus] = useState("");
    const [selectedOption, setSelectedOption] = useState({ Name: "Choose option" });
    const [options, setoptions] = useState([])

    useEffect(() => {
        if (activeFilter === "By Group") {
            setoptions(Allgroups)
            let currentgroup = Allgroups.find(g => g.id === queryOptions.Filter.details?.value)
            if (queryOptions.Filter.details?.label === "Group") {
                setSelectedOption(currentgroup)
            } else {
                setSelectedOption({ Name: "Choose option" })
            }
        } else {
            let options = Object.keys(categories).map((Category, index) => {
                return {
                    id: index,
                    Name: Category
                }
            })
            setoptions(options)
            if (queryOptions.Filter.details?.label === "Category") {
                setSelectedOption({
                    id: 1,
                    Name: queryOptions.Filter.details?.value
                })
            } else {
                setSelectedOption({ Name: "Choose option" })
            }
        }
    }, [activeFilter, Allgroups, queryOptions.Filter.details])

    useEffect(() => {
        if (status !== "") {
            const timer = setTimeout(() => {
                setStatus("");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        
        <div className="w-full sm:w-[430px] rounded-2xl md:rounded-[32px] max-h-fit bg-surface p-4 sm:p-6 pb-4 shadow-xl border border-[#ececec]">
            <div>
                <p className="mb-2 text-sm text-text-secondary">
                    How should we organize your list?
                </p>
            </div>

            <div className="Sort border-b-light border-t mb-3">
                <p className="my-1 text-sm text-text-secondary">
                    Sort Options
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                    {Sorts.map((Sort) => {
                        const isActive = activeSort === Sort.label;
                        return (
                            <button
                                key={Sort.label}
                                onClick={() => {
                                    if (!isInteracted) setisInteracted(true)
                                    setactiveSort(Sort.label)
                                }}
                                className={`flex items-center justify-between rounded-2xl border bg-white px-3 py-3 shadow-md text-sm font-medium transition-all cursor-pointer ${isActive
                                    ? "border-[#ff7a3d] text-[#ff7a3d]"
                                    : "border-[#ebebeb] text-[#555] hover:border-[#ff7a3d]"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {Sort.icon}
                                    <span className="truncate">{Sort.label}</span>
                                </div>
                                {isActive && <IoCheckmark size={16} className="shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="filters border-b-light border-t">
                <p className="my-1 text-sm text-text-secondary">
                    Filter Options
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
                    {Filters.map((filter) => {
                        const isActive = activeFilter === filter.label;
                        return (
                            <button
                                key={filter.label}
                                onClick={() => {
                                    if (isActive) {
                                        setactiveFilter("")
                                        return
                                    }
                                    if (!isInteracted) setisInteracted(true)
                                    setactiveFilter(filter.label)
                                }}
                                className={`flex items-center justify-between rounded-2xl border bg-white px-3 py-3 shadow-md text-sm font-medium transition-all ${isActive
                                    ? "border-[#ff7a3d] text-[#ff7a3d]"
                                    : "border-[#ebebeb] text-[#555] hover:border-[#ff7a3d] cursor-pointer"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {filter.icon}
                                    <span className="truncate">{filter.label}</span>
                                </div>
                                {isActive && <IoCheckmark size={16} className="shrink-0" />}
                            </button>
                        );
                    })}
                </div>

                {(type === "expense" && activeFilter) && (
                    <div className="mt-4 pb-2">
                        <label className="mb-2 block text-sm text-text-secondary">
                            Selected Filter Option
                        </label>
                        <div className="relative w-full">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex w-full items-center justify-between rounded-2xl border border-[#ebebeb] bg-white px-4 py-3 text-sm text-[#555] shadow-md transition-all hover:border-[#ff7a3d] cursor-pointer"
                            >
                                <span className="truncate pr-2">{selectedOption?.Name}</span>
                                <HiChevronDown
                                    size={18}
                                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            
                            {isOpen && (
                              
                                <div className="absolute left-0 z-50 w-full max-h-48 overflow-y-auto rounded-2xl border border-[#ebebeb] bg-white p-2 shadow-xl mt-1">
                                    {options.map((option, index) => {
                                        const isSelected = selectedOption?.Name === option.Name
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    if (!isInteracted) setisInteracted(true)
                                                    setSelectedOption(option);
                                                    setIsOpen(false);
                                                }}
                                                className={`mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition-all cursor-pointer ${isSelected
                                                    ? "bg-[#fff2eb] text-[#ff7a3d]"
                                                    : "text-[#555] hover:bg-[#f8f8f8]"
                                                }`}
                                            >
                                                <span className="truncate pr-2">{option.Name}</span>
                                                {isSelected && <IoCheckmark size={16} className="shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>


            <div className="flex gap-3 mt-5 w-full">
                <button
                    disabled={queryOptions.Filter.type === "" && queryOptions.Sort.type === defaultSort}
                    className={`flex-1 border-transparent border py-3 text-sm font-semibold shadow bg-white trans rounded-xl ${queryOptions.Filter.type === "" && queryOptions.Sort.type === defaultSort ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:border-primary"}`} 
                    onClick={() => {
                        setStatus("reset");
                        setqueryOptions(prev => ({
                            ...prev,
                            Filter: {
                                active: false,
                                type: "",
                                details: type === "expense" ? { label: "", value: "" } : null
                            },
                            Sort: { type: defaultSort }
                        }))
                        setactiveFilter("")
                        setactiveSort(defaultSort)
                    }}>
                    Reset
                </button>
                <button
                    disabled={!isInteracted || (activeFilter !== "" && (selectedOption?.Name === "Choose option" && type === "expense"))}
                    className={`flex-1 rounded-xl bg-[#ff7a3d] py-3 text-sm font-semibold text-white shadow-md transition ${!isInteracted || (activeFilter !== "" && (selectedOption?.Name === "Choose option" && type === "expense")) ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:opacity-90"}`} 
                    onClick={() => {
                        setStatus("updated");
                        setqueryOptions(prev => ({
                            ...prev, 
                            Sort: { type: activeSort },
                            Filter: {
                                active: activeFilter !== '',
                                type: activeFilter,
                                details: type === "expense" ? {
                                    label: activeFilter === 'By Group' ? 'Group' : "Category",
                                    value: activeFilter === 'By Group' ? selectedOption.id : selectedOption.Name,
                                } : null
                            }
                        }))
                    }}>
                    Apply
                </button>
            </div>
            
            {status !== "" && (
                <p className={`${status === "updated" ? "text-emerald-600" : "text-orange-500"} mt-3 text-center font-medium`}>
                    Filter {status === "updated" ? "Updated" : "Reset"}
                </p>
            )}
        </div>
    );
};