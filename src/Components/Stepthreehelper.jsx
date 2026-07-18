import React from 'react'
import Select_split from './Expenses/Common/Select-split';
import Split_btn from './Expenses/Common/Split-btn';
import { IoPerson } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../store/FriendsSlice';
import { useWatch } from 'react-hook-form';
export const Stepthreehelper = ({ Friends, Splits }) => {
    const { getValues, control, register, formState: { errors, isSubmitting }, setError,
        clearErrors } = useFormContext();
    const TotalAmount = getValues("totalAmount");
    const Share = useWatch({ name: "Share", control });
    let currentpercentage = Object.values(Share["By Percentage"] || {}).reduce((sum, value) => sum + Number(value || 0), 0);
    const Splitopt = useWatch({ name: "splitMethod", control });
    console.log(Splitopt,Share)
    let currentamount = Object.values(Share["Unequally"] || {}).reduce((sum, value) => sum + Number(value || 0), 0);
    return (
        <div className='h-fit mt-2 grid grid-cols-1 lg:grid-cols-6 rounded-lg gap-3 p-2'>
            <div className="friends-splits-container col-span-1 lg:col-span-4 flex flex-col gap-2">
                <div className="progress h-26 sm:h-30 rounded-lg shadow-md p-3 sm:p-4 border-l ">
                    <h3 className='font-semibold text-text-secondary text-sm sm:text-base'>Total Expense Amount</h3>
                    {Splitopt === "By Percentage" ? <>
                        <div className="amounts flex justify-between mt-2">
                            <div className="remaining font-bold text-sm sm:text-base">{(100 - currentpercentage) < 0 ? 0 : 100 - currentpercentage}%</div>
                            <div className="font-bold text-sm sm:text-base">Rs.{Number(TotalAmount).toLocaleString()}</div>
                        </div></> :
                        <div className="amounts flex justify-between mt-2">
                            <div className="remaining font-bold text-sm sm:text-base">Rs. {Splitopt !== "Equally" ? `${Number((TotalAmount - currentamount) < 0 ? 0 :TotalAmount - currentamount ).toLocaleString()}` : "0"}</div>
                            <div className="font-bold text-sm sm:text-base">Rs.{Number(TotalAmount).toLocaleString()}</div>
                        </div>}
                    <div className="progress-bar-container relative">
                        <div className="progress-bar w-full h-3 bg-neutral-200 shadow rounded-full mt-1 overflow-hidden">
                            <div className={`progress  bg-primary h-3 rounded-full`} style={
                                {
                                    width: Splitopt === "By Percentage" ? `${currentpercentage}%` : Splitopt === "Unequally" ? `${(currentamount / TotalAmount) * 100}%` : "100%"
                                }
                            }></div>
                        </div>
                        <div className="total absolute  right-0  mt-1 text-xs sm:text-sm">Total</div>
                        <div className="remaining absolute  left-0 mt-1 text-xs sm:text-sm">Remaining</div>
                    </div>
                </div>
                <div className={`friends-splits-list mt-2`}>
                    <p className='font-semibold mb-2 text-sm sm:text-base'>
                        {Splits.find(split => split.label === Splitopt)?.prompt}
                    </p>
                    {errors.Sharecollected && (
                        <p className="text-red-500 text-sm mb-2 text-end">{errors.Sharecollected?.message}</p>
                    )}
                    <div className="friends-splits-list grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 overflow-auto max-h-100 lg:h-85">
                        {Friends.map((friend, index) => {
                            return (
                                <div key={index} className='friend-split min-w-0 rounded-lg shadow-md  bg-neutral-100 flex flex-col items-center justify-center gap-2 pt-1 relative cursor-pointer trans h-auto min-h-[170px] sm:h-48 p-2 sm:p-0'>
                                    <div className="info center-flex flex-col">
                                        <div className="friend-img-container size-12 sm:size-16">
                                            {friend.type === "temporary" ? (
                                                <div className="friend-img-container size-12 sm:size-16 bg-neutral-300 rounded-full center-flex">
                                                    <IoPerson className='size-5 sm:size-7 text-neutral-500' />
                                                </div>
                                            ) : (
                                                <img src={friend.Image} className='Img-c' alt="friend-img" />
                                            )}
                                        </div>
                                        <div className="friend-info center-flex flex-col text-center min-w-0">
                                            <h2 className='text-xs sm:text-sm font-semibold truncate max-w-full'>{friend.Name}</h2>
                                            <p className='text-[11px] sm:text-[12px] text-text-secondary truncate max-w-full'>{
                                                friend.type === "temporary" ? "Temporary Friend" :
                                                    friend.Bio}</p>
                                            {(Splitopt === "By Percentage" && Share[Splitopt][friend.id] != "" && Share[Splitopt][friend.id] != null && Share[Splitopt][friend.id] <= 100 ) && <p className='text-xs sm:text-sm text-text-secondary'> {`${Share[Splitopt][friend.id]}% = ${Math.round(Number((Share[Splitopt][friend.id] / 100) * TotalAmount)).toLocaleString()}`} </p>}
                                            {errors.Share?.[Splitopt]?.[friend.id] && (
                                                <p className='text-red-500 text-xs mt-1 '>{errors.Share[Splitopt][friend.id].message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="payment-input flex center-flex gap-1 card-b bg-white border-none rounded-lg p-1 px-2 flex-row-reverse">
                                        {
                                            Splitopt === "Equally" ? <><FaRupeeSign className='text-green-500' />
                                                <p className='w-14 sm:w-18 text-left text-text-secondary' >
                                                    {Share[Splitopt][friend.id]}</p></> : <>
                                                {Splitopt !== "Unequally" ? <FaPercentage className='text-primary' /> : <FaRupeeSign className='text-green-500' />}
                                                <input
                                                    {...register(`Share.${Splitopt}.${friend.id}`,
                                                        {
                                                            required: "This field is required",
                                                        }
                                                    )} type="number" placeholder='0' value={Share[Splitopt][friend.id]} className='w-14 sm:w-18 text-left focus:outline-none' onKeyDown={(e) => {
                                                        if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }} /></>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="select-split-container col-span-1 lg:col-span-2 flex sm:gap-2 gap-3 mb-10 md:mb-2 flex-col">
                <div className="Split-btn flex-1 center-flex">
                    <Split_btn Splitopt={Splitopt} isSubmitting={isSubmitting} />
                </div>
                <div className="select-split">
                    <Controller
                        name="splitMethod"
                        control={control}
                        render={({ field }) => (
                            <Select_split splits={Splits}
                                memberscount={Friends.length}
                                value={field.value} onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}