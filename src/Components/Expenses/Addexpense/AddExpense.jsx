import React, { useState } from 'react'
import Next from '../Common/Next';
import Prev from '../Common/Prev';
import { Stepone } from './Stepone';
import { Steptwo } from './Steptwo';
import { Stepthree } from './Stepthree';
import { GiExpense } from "react-icons/gi";
import { useForm, FormProvider, } from 'react-hook-form';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Basemodel } from '../../basemodel';
import { useDispatch } from 'react-redux';
import { aggregatesettlements, addExpense } from '../../../store/ExpenseSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { addActivity, selectActivityById } from "../../../store/ActivitySlice"
import { useSelector } from 'react-redux';
import { selectGroupById } from '../../../store/GroupSlice';
export const handleNext = async (step, setstep, methods) => {
    let isStepValid = false;
    const { trigger, getValues, setValue, setError, clearErrors } = methods;
    if (step == 1) {
        isStepValid = await trigger(["expenseName", "totalAmount", 'splitMembers', 'Category'])
        if (isStepValid) {
            const selectedFriends = getValues("splitMembers") || [];
            const existingMasterData = getValues("MasterMembers") || [];
            const MasterData = selectedFriends.map(friendId => {
                const existingfriend = existingMasterData.find(f => f.id === friendId);
                if (existingfriend) {
                    return existingfriend;
                }
                else {
                    return {
                        id: friendId,
                        spent: "",
                        share: ""
                    }
                }
            })
            setValue("MasterMembers", MasterData);
        }
    }
    else if (step == 2) {
        const totalAmount = Number(getValues("totalAmount"));
        const Collected = getValues("MasterMembers").reduce((sum, member) => sum + Number(member.spent || 0), 0);
        const difference = Math.abs(totalAmount - Collected);
        if ((Collected !== totalAmount) && (Collected <= totalAmount)) {
            setError("stepTwoTotal", {
                type: "manual",
                message: `Off by Rs. ${difference}. Total must be Rs. ${totalAmount}.`
            });
            isStepValid = false;
        }
        else if (Collected > totalAmount) {
            setError("stepTwoTotal", {
                type: "manual",
                message: `Amount collected cannot exceed total amount. Reduce by Rs. ${difference}.`
            });
            isStepValid = false;
        }
        else {
            const shareobject = getValues("Share")
            const memberids = getValues("splitMembers")
            const baseshare = Math.floor(totalAmount / memberids.length);
            let reminder = totalAmount % memberids.length;
            memberids.forEach((id, index) => {
                let finalshare = baseshare
                if (reminder > 0) {
                    finalshare += 1;
                    reminder -= 1;
                }
                shareobject["Equally"][id] = finalshare;
                shareobject["Unequally"][id] = shareobject["Unequally"][id] || "";
                shareobject["By Percentage"][id] = shareobject["By Percentage"][id] || "";
            })
            setValue("Share", shareobject);
            clearErrors("stepTwoTotal");
            isStepValid = true;
        }
    }
    if (isStepValid) {
        setstep(step + 1);
    }
}
export const Addexpense = () => {
    const [step, setstep] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Groupid } = useParams();
    const group = useSelector(state=>selectGroupById(state,Groupid))
    const [popup, setpopup] = useState(false)
    const Openmodel = () => {
        setpopup(true)
    }
    const Closemodel = () => [
        setpopup(false)
    ]
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            expenseName: "",
            totalAmount: "",
            Category: "",
            splitMethod: "Equally",
            splitMembers: [],
            MasterMembers: [],
            Share: {
                "Equally": {},
                "Unequally": {},
                "By Percentage": {}
            }
        }
    })
    const { handleSubmit, getValues, setValue, setError, clearErrors, reset, formState: { isSubmitting } } = methods;
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
            return data.splitMethod === "By Percentage"
                ? { ...member, share: Math.round((share / 100) * data.totalAmount) }
                : { ...member, share };
        }
        )
        dispatch(addExpense(
            Groupid,
            data.expenseName,
            data.totalAmount,
            data.splitMethod,
            finalmembers,
            data.Category,
            aggregatesettlements(finalmembers)
        ))
        dispatch(addActivity({
            title: `New Expense: Rs. ${Number(data.totalAmount).toLocaleString()}`,
            selfTitle: false,
            description: null,
            icon: "expense",
            visibility: {
                global: true,
                friend: false,
                group: true
            },
            friends:null,
            friendImages: null,
            groupid: Groupid,
            groupinfo: {
                name: group.Name,
                Category: group.Category
            },
            category: "group",
        }));
        await new Promise(resolve => setTimeout(resolve, 2000));
        Openmodel();
        reset();
        setstep(1);
    };
    return (
        <FormProvider {...methods}>
            <Basemodel isOpen={popup}
                Closemodel={Closemodel}
                title="Expense Logged!"
            >
                <div className="success-message w-[92%] sm:w-96 md:w-120 h-auto min-h-[280px] sm:h-80 card-b rounded-2xl mx-auto py-4 pb-2 px-4 sm:px-6 relative center-flex flex-col ">
                    <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] mx-auto">
                        <DotLottieReact
                            src="https://lottie.host/b7574485-9fdd-4f3c-bf61-6745a5a799b4/2TRkq89Pt5.lottie"
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <p className='text-text-secondary font-bold text-base sm:text-lg text-center'>
                        Expense added successfully!
                    </p>
                    <button className="text-primary font-semibold mt-2 cursor-pointer underline text-sm sm:text-base" onClick={() => {
                        navigate(`/Groups/${Groupid}/Expenses`);
                    }}>
                        See All Expenses
                    </button>
                </div>
            </Basemodel>
            <motion.form layout onSubmit={handleSubmit(onSubmit)} className="
                    Add-expense-form
                    w-full sm:w-[80%] md:w-[85%] lg:w-[80%] xl:max-w-4xl 2xl:max-w-5xl
                    lg:min-h-[650px] h-[73vh] 
                    bg-white shadow-md rounded-none sm:rounded-2xl
                    mx-auto mt-0 sm:mt-6 lg:mt-10 px-2
                     sm:px-6 md:px-8 py-2
                    flex flex-col 
                    relative
                ">
                <div className="title center-flex flex-col gap-0 shrink-0 ">
                    <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Expense<span><GiExpense /></span></h2>
                    <h4 className="text-text-secondary text-xs sm:text-sm mr-2 text-center">Smart Splits, Stress-Free Settlements</h4>
                </div>
           <div className="flex-1 overflow-y-auto ">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full"
                        >
                            {step === 1 && <Stepone />}
                            {step === 2 && <Steptwo />}
                            {step === 3 && <Stepthree />}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="progress center-flex flex-col absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200 z-9">
                    <h3 className='text-xs sm:text-sm text-text-secondary'>Step {step} of 3</h3>
                    <div className="progress-bar h-2 sm:h-3 bg-highlight rounded-full mt-2 w-32 sm:w-44 md:w-60 shadow border-l">
                        <div className={`progress-fill h-full bg-primary ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"} rounded-full trans`}></div>
                    </div>
                </div>
                {
                    step !== 3 && (<button type="button" className="next absolute bottom-4 right-4 sm:right-6 z-90" onClick={() => handleNext(step, setstep, methods)}>
                        <Next />
                    </button>)
                }
                {
                    step !== 1 && (<button type="button" className="prev absolute bottom-4 left-4 sm:left-6 z-90" onClick={() => {
                        if (!isSubmitting) {
                            setstep(step - 1)
                        }
                    }

                    }>
                        <Prev />
                    </button>)
                }
            </motion.form>
        </FormProvider>
    )
}