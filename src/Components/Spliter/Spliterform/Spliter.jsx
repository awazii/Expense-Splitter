import React, { useState, useEffect } from 'react'
import { FaCalculator } from "react-icons/fa";
import Next from '../../Expenses/Common/Next';
import Prev from '../../Expenses/Common/Prev';
import { Stepone } from './Steponec';
import { Steptwo } from './Steptwoc';
import { Stepthree } from './Stepthreec';
import { useForm, FormProvider, } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { handleNext } from '../../Expenses/Addexpense/AddExpense';
import { addSplit } from '../../../store/SpliterSlice';
import { aggregatesettlements } from '../../../store/ExpenseSlice';
import { motion, AnimatePresence } from 'framer-motion';
export const Spliter = () => {
    const [step, setstep] = useState(1);
    const dispatch = useDispatch()
    const Stepsfunc = (stepnumber) => {
        if (stepnumber >= 1 && stepnumber <= 3) {
            setstep(stepnumber);
        }
    }
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            expenseName: "",
            tempname: "",
            totalAmount: "",
            splitMethod: "Equally",
            temporary: [],
            splitMembers: [],
            MasterMembers: [],
            Share: {
                "Equally": {},
                "Unequally": {},
                "By Percentage": {}
            }
        }
    })
    const { trigger, handleSubmit, register, getValues, setValue, setError, clearErrors, reset, formState: { isSubmitting } } = methods;
    const onSubmit = async (data) => {
        if (data.splitMethod === "By Percentage") {
            const totalPercent = Object.values(data.Share["By Percentage"] || {})
                .reduce((sum, val) => sum + Number(val || 0), 0);

            if (totalPercent < 100) {
                setError("Sharecollected", { message: "Total percentage must equal exactly 100%" });
                return;
            }
        }
        if (data.splitMethod === "Unequally") {
            const totalAmount = Object.values(data.Share["Unequally"] || {})
                .reduce((sum, val) => sum + Number(val || 0), 0);

            if (totalAmount < data.totalAmount) {
                setError("Sharecollected", { message: "Assigned amounts must equal the total expense" });
                return;
            }
        }
        const finalmembers = data.MasterMembers.map(member => {
            const share = data.Share[data.splitMethod][member.id] || 0;
            if (data.splitMethod === "By Percentage") {
                return {
                    ...member,
                    share: Math.round((share / 100) * data.totalAmount)
                }
            }
            return {
                ...member,
                share: share
            }
        }
        )
        await new Promise(resolve => setTimeout(resolve, 2000));
        dispatch(addSplit(
            data.expenseName,
            data.totalAmount,
            data.splitMethod,
            finalmembers,
            data.Category,
            aggregatesettlements(finalmembers),
            data.temporary
        ))
        reset();
        setstep(1);
    }
    return (
        <FormProvider {...methods}>
            <motion.form
                layout
                onSubmit={handleSubmit(onSubmit)} className="
w-full
sm:w-[95%]
md:w-[90%]
lg:w-[85%]
xl:max-w-4xl
2xl:max-w-5xl
min-h-[700px]
bg-white
shadow-md
rounded-none
sm:rounded-2xl
mx-auto
mt-0
sm:mt-6
px-4
sm:px-6
md:px-8
py-5
relative
overflow-auto
">
                <div className="header center-flex flex-col gap-2 mb-6">
                    <div className="logo rounded-full size-14 sm:size-16 lg:size-18 center-flex" style={{
                        background: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)"
                    }}>
                        <FaCalculator className="size-6 sm:size-7 lg:size-8 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">Quick Split</h2>
                    <p className="text-text-secondary text-xs sm:text-sm text-center">Split Bills instantly without a group</p>
                </div>
                <div className="current-step min-h-[450px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Stepone />
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Steptwo />
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Stepthree />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="progress center-flex flex-col absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200 z-90">
                    <h3 className="text-xs sm:text-sm text-text-secondary">Step {step} of 3</h3>
                    <div className="progress-bar h-2 sm:h-3 bg-highlight rounded-full mt-2 w-32 sm:w-44 md:w-60 shadow border-l">
                        <div className={`progress-fill h-full bg-primary ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"} rounded-full transition-all duration-300`}></div>
                    </div>
                </div>
                {
                    step !== 3 && (<button type='button' className="next absolute bottom-4 right-4 sm:right-6 z-90" onClick={() => handleNext(step, setstep, methods)}>
                        <Next />
                    </button>)
                }
                {
                    step !== 1 && (<button type='button' className="prev absolute bottom-4 left-4 sm:left-6 z-90" onClick={() => {
                        if (!isSubmitting) {
                            setstep(step - 1)
                        }
                    }}>
                        <Prev />
                    </button>)
                }
            </motion.form>
        </FormProvider>
    )
}
