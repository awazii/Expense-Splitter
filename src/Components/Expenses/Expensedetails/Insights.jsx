import React from 'react'
import { motion } from "framer-motion";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { IoPerson } from 'react-icons/io5';
import { Memberdetails } from '../../../utils/Memberdetails';
import { selectAllSplits } from '../../../store/SpliterSlice';
import { useSelector } from 'react-redux';
import { pageContainerVariants, cardContentVariants } from "../../../utils/animation";
import { FaBan } from "react-icons/fa"

export const Insights = ({ data }) => {
    const sortedmembers = data && [...data].sort((a, b) => {
        const balanceA = a.spent - a.share;
        const balanceB = b.spent - b.share;
        return balanceB - balanceA;
    });
    
    const HighesContributor = sortedmembers && sortedmembers[0];
    const rawDebtor = sortedmembers && sortedmembers[data.length - 1];
    const isActuallyDebtor = rawDebtor && (rawDebtor.spent - rawDebtor.share < 0);
    const HighestDebtor = isActuallyDebtor ? rawDebtor : null;

    const allSplits = useSelector(selectAllSplits);
    const Splits = allSplits ? allSplits[0] : null;

    function GetTemp(id) {
        return Splits?.temporary.find(t => t.id === id);
    }

    const insights = [
        {
            label: "Highest Debtor",
            svg: <GiReceiveMoney className="text-white size-6 lg:size-8 xl:size-8" />,
            color: "#dc2626",
            about: Memberdetails(HighestDebtor?.id) || GetTemp(HighestDebtor?.id),
            totalamount: Math.abs(HighestDebtor?.spent - HighestDebtor?.share),
            isBanned: HighestDebtor ? Memberdetails(HighestDebtor.id)?.isBanned : false
        },
        {
            label: "Highest Contributor",
            svg: <FaCoins className="text-white size-6 lg:size-6 xl:size-8" />,
            totalamount: HighesContributor?.spent,
            color: "#16A34A",
            about: Memberdetails(HighesContributor?.id) || GetTemp(HighesContributor?.id),
            isBanned: HighesContributor ? Memberdetails(HighesContributor.id)?.isBanned : false
        }
    ];

    return (
        <motion.div
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            className='bg-white shadow-md w-full h-full rounded-lg flex flex-col md:flex-row items-center p-3 lg:p-2 '
        >
            {insights.map((insight, index) => (
                <motion.div
                    key={index}
                    variants={cardContentVariants}
                    className={`flex-1 flex items-center justify-start md:justify-center gap-4 w-full p-2  lg:gap-2
                               ${index === 1 ? "border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 lg:pl-2" : "pb-4 md:pb-0"}`}
                >
                    <div className="logo size-12 md:size-14 lg:size-16 shrink-0 rounded-full flex items-center justify-center shadow-sm"style={{ background: insight.color }}>
                        {insight.svg}
                    </div>
                    
                    <div className="info min-w-0 flex flex-col justify-center">
                        <div className="label font-semibold text-sm line-clamp-2">{insight.label}</div>
                        {insight.about && (
                            <div className="about flex items-center gap-2 mt-1">
                                <div className={`logo size-8 relative rounded-full flex items-center justify-center ${insight.isBanned ? "border-red-500" : "border-primary"} border-2 shrink-0`}>
                                    {insight.about.type !== "temporary" ? (
                                        <>
                                            <img src={insight.about.Image} className='rounded-full h-full w-full object-cover' alt="profile" />
                                            {insight.isBanned && (
                                                <div className="absolute -bottom-0.5 -right-0.5 bg-red-500 rounded-full p-0.5 text-white shadow-sm">
                                                    <FaBan className="size-1.5" />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="size-full bg-neutral-300 rounded-full flex items-center justify-center ">
                                            <IoPerson className='size-4 text-neutral-500' />
                                        </div>
                                    )}
                                </div>
                                <p className="name text-sm font-medium text-gray-800 truncate">{insight.about.Name}</p>
                            </div>
                        )}
                        <div className="amount font-bold text-lg md:text-xl mt-0.5" style={{ color: insight.color }}>
                            {insight.totalamount ? `Rs.${Number(insight.totalamount).toLocaleString()}` : "No data"}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};