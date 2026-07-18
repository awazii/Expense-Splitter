import React, { useState } from 'react';
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Sector, ResponsiveContainer } from "recharts";
import { ExpenseAnalystics } from "../../store/ExpenseSlice";
import { useSelector } from 'react-redux';
import { RiPieChart2Line } from "react-icons/ri";
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { pageContainerVariants, cardVariants } from "../../utils/animation";

export const CategoryColors = {
  "Food & Snacks": { name: "Food & Snacks", fill: "#e53935" },
  "Drinks & Beverages": { name: "Drinks & Beverages", fill: "#38A7FF" },
  "Vapes & Smoking": { name: "Vapes & Smoking", fill: "#4caf50" },
  "Transport": { name: "Transport", fill: "#F7C72F" },
  "Hotel & Stay": { name: "Hotel & Stay", fill: "#f68340" },
  "Movie & Events": { name: "Movie & Events", fill: "#ff69b4" },
  "Others": { name: "Others", fill: "#A845DD" }
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
        filter="url(#glow)"
      />
    </g>
  );
};

export const Analystic = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const CategoryData = useSelector(ExpenseAnalystics);

  return (
    <div className='center-flex flex-col 2xl:flex-row   h-full w-full gap-4 lg:gap-6 p-2 sm:p-4'>
      {CategoryData.length > 0 ? (
        <>
          <div className="chart-wrapper w-full max-w-[280px] lg:max-w-none lg:w-[40%] aspect-square shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <Pie
                  data={CategoryData}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="92%"
                  cornerRadius={8}
                  paddingAngle={2}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "10px 14px",
                    backgroundColor: "#fff",
                  }}
                  formatter={(value, name) => {
                    const formattedValue = Number(value).toLocaleString();
                    return [`Amount: Rs.${formattedValue}`, name];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <motion.div
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            className="des flex-1 w-full min-w-0"
          >
            <h2 className='text-lg sm:text-xl lg:text-2xl font-semibold mb-2'>Expenses Breakdown</h2>
            <p className='text-text-secondary text-xs sm:text-sm mb-4 w-full lg:w-70'>
              How each category adds up
            </p>
            {CategoryData.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="category-item flex items-center mb-3 min-w-0"
              >
                <div
                  className="color-box w-4 h-4 sm:w-5 sm:h-5 rounded-md mr-3 sm:mr-4 shadow-md shrink-0"
                  style={{ backgroundColor: category.fill }}
                ></div>
                <div className="category-info min-w-0">
                  <p className='font-semibold text-sm sm:text-base truncate'>{category.name}</p>
                  <p className='text-xs sm:text-sm text-text-secondary truncate'>
                    {category.count} expenses - Rs.{Number(category.amount).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <UniversalEmptyState
            title="No expenses to visualize"
            description="Not enough data for a breakdown. Start adding expenses to see your spending across categories."
            textsize=""
          >
            <div className="p-10 shadow-md border-l rounded-full">
              <RiPieChart2Line className="size-12 text-primary" />
            </div>
          </UniversalEmptyState>
        </motion.div>
      )}
    </div>
  );
};