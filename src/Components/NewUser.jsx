import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCamera, HiArrowRight, HiCheck } from "react-icons/hi2";
import { FaHandshake } from "react-icons/fa6";
import { RiLineChartLine } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa";
import { RiHandCoinLine } from "react-icons/ri";
import { useForm, Controller } from 'react-hook-form';
import { uploadToCloudinary } from '../utils/Uploadimg';
import { useDispatch } from 'react-redux';
import { useWatch } from 'react-hook-form';
import Loader from './Common/loader';
import { addFriend } from '../store/FriendsSlice';
import { useNavigate } from 'react-router-dom';
import { setNewUser } from '../store/UserSlice';

export const SplitlyOnboarding = ({ onFinish }) => {
    const [step, setStep] = useState(0);
    const [CurrentImage, setCurrentImage] = useState("")
    const dispatch = useDispatch()
    const [Finalform, setFinalform] = useState({})
    const navigate = useNavigate()

    const {
        handleSubmit,
        reset,
        trigger,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            Name: "",
            Bio: "",
            Image: null,
            isPinned: false
        }
    });

    const fileInputRef = useRef(null);
    const usernamePattern = /^[A-Za-z][0-9A-Za-z_\s]*$/;
    const bioPattern = /^[A-Za-z][A-Za-z\s.,'-]*$/;
    const CurrentForm = useWatch({ control });

    const Onsubmit = async (data) => {
        try {
            const imageUrl = await uploadToCloudinary(data.Image);
            if (imageUrl) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setFinalform(prev => ({
                    ...prev,
                    Name: data.Name,
                    Bio: data.Bio,
                    Image: imageUrl,
                    isPinned: false
                }))
                reset();
                nextStep()
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentImage(URL.createObjectURL(file));
            field.onChange(file)
        }
    };

    const GetStarted = () => {
        dispatch(setNewUser(false));
        dispatch(addFriend(
            Finalform.Name,
            Finalform.Bio,
            Finalform.Image,
            Finalform.isPinned
        ))
        navigate('/')
    }

    const nextStep = () => setStep((s) => s + 1);

    const steps = [
        {
            id: 'profile',
            indicator: 'bg-[#FFB399]',
            hover: 'hover:bg-[#ff9c7a]'
        },
        {
            title: "Connect with Friends",
            desc: "Everything in Splitly starts with your circle. Add friends individually or create groups for hostel expenses and trips.",
            icon: FaHandshake,
            gradient: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white",
            indicator: 'bg-blue-500',
            hover: 'hover:bg-blue-600'
        },
        {
            title: "Track Live Expenses",
            desc: "No more manual math. Every expense you add updates everyone's balance instantly with live graphs and history.",
            icon: RiLineChartLine,
            gradient: "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white",
            indicator: 'bg-green-500',
            hover: 'hover:bg-green-600'
        },
        {
            title: "Settle Debts Instantly",
            desc: "Pay back your friends with one click. Every settlement instantly updates your local balance with that friend and your global net total.",
            icon: RiHandCoinLine,
            gradient: "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white",
            indicator: 'bg-red-500',
            hover: 'hover:bg-red-600'
        },
        {
            title: "Quick Temporary Splits",
            desc: "Use the 'Spliter' for one-time calculations that don't need a group. Perfect for quick cafe visits or one-off bills.",
            icon: FaCalculator,
            gradient: "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white",
            indicator: 'bg-purple-500',
            hover: 'hover:bg-purple-600'
        },
    ];

    const Geticon = (obj) => {
        const Icon = obj.icon
        return <Icon className="size-10 text-white shrink-0" />
    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface sm:p-4 font-sans">
            <motion.div
                layout

                className="relative w-full h-full sm:h-auto sm:max-h-[95vh] max-w-md overflow-y-auto bg-white rounded-none sm:rounded-[2.5rem] shadow-2xl shadow-gray-300 flex flex-col"
            >

                <div className="p-6 sm:p-8 md:p-10 flex flex-col flex-1 justify-center min-h-full">
                    <AnimatePresence mode="wait">
                        {step === 0 ? (
                            <motion.form
                                onSubmit={handleSubmit(Onsubmit)}
                                key="profile-setup"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col items-center w-full"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Who are you?</h2>
                                <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 text-center">Set up your profile to start splitting.</p>

                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="relative group cursor-pointer mb-4 shrink-0"
                                >
                                    <div className="size-28 sm:size-32 rounded-full bg-neutral-50 border-2 border-dashed border-neutral-300 group flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                                        {CurrentImage ? (
                                            <img src={CurrentImage} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <HiCamera className="text-3xl sm:text-4xl text-neutral-300 group-hover:text-primary" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-1 right-1 p-1.5 sm:p-2 bg-primary rounded-full text-white shadow-lg">
                                        <HiCheck className="size-4" />
                                    </div>
                                    <Controller
                                        name="Image"
                                        control={control}
                                        rules={{ required: "Image is required" }}
                                        render={({ field, fieldState }) => (
                                            <input
                                                type="file"
                                                hidden
                                                ref={fileInputRef}
                                                accept="image/*"
                                                onChange={(file) => {
                                                    handleImageChange(file, field)
                                                    trigger("Image");
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                {errors.Image && <p className='text-red-600 text-xs sm:text-sm mb-2'>{errors.Image.message}</p>}

                                <div className="w-full space-y-3 sm:space-y-4">
                                    <Controller
                                        name="Name"
                                        control={control}
                                        rules={{
                                            required: "Name is required",
                                            maxLength: { value: 15, message: "Max 15 characters allowed" },
                                            minLength: { value: 3, message: "At least 3 characters" },
                                            pattern: {
                                                value: usernamePattern,
                                                message: "Must start with a letter, followed by letters, numbers, or underscores"
                                            }
                                        }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    placeholder="Display Name"
                                                    className="w-full p-3 sm:p-4 text-sm sm:text-base border-l rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        trigger("Name");
                                                    }}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-600 text-xs sm:text-sm pl-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />

                                    <Controller
                                        name="Bio"
                                        control={control}
                                        rules={{
                                            required: "Bio is required",
                                            maxLength: { value: 20, message: "Max 25 characters allowed" },
                                            minLength: { value: 5, message: "At least 5 characters" },
                                            pattern: {
                                                value: bioPattern,
                                                message: "Invalid characters"
                                            }
                                        }}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    placeholder="Bio (What's your vibe?)"
                                                    className="w-full p-3 sm:p-4 text-sm sm:text-base border-l rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all font-medium bg-gray-50/50"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        trigger("Bio");
                                                    }}
                                                />
                                                {fieldState.error && (
                                                    <p className="text-red-600 text-xs sm:text-sm pl-1">{fieldState.error.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>

                                <button
                                    disabled={!CurrentForm.Name || isSubmitting}
                                    type='submit'
                                    className={`w-full mt-6 sm:mt-8 p-3 sm:p-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-100 flex items-center justify-center gap-2 disabled:opacity-50 transition-all ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {isSubmitting && <Loader />}
                                    {!isSubmitting && <>Next <HiArrowRight /></>}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center flex flex-col items-center justify-center w-full"
                            >
                                <div className={`size-20 sm:size-24 rounded-3xl flex ${steps[step]?.gradient} items-center justify-center text-4xl sm:text-5xl mx-auto mb-6 sm:mb-8 shadow-inner shrink-0`} >
                                    {Geticon(steps[step])}
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{steps[step].title}</h2>
                                <p className="text-sm sm:text-base text-text-secondary leading-relaxed px-1 sm:px-2 mb-8 sm:mb-10">
                                    {steps[step].desc}
                                </p>

                                <button
                                    onClick={() => {
                                        step === steps.length - 1 ? GetStarted() : nextStep()
                                    }}
                                    className={`w-full p-3 sm:p-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2 ${steps[step].hover} transition-all cursor-pointer ${steps[step].indicator} shadow-md`}
                                >
                                    {step === steps.length - 1 ? "Get Started" : "Continue"} <HiArrowRight className="shrink-0" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div className="flex justify-center gap-2 mt-auto pt-8">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? `w-8 sm:w-10 ${steps[step].indicator}` : 'w-2 bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};