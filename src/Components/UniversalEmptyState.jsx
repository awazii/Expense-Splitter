import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UniversalEmptyState = ({ title, description, textsize, children, button }) => {
    const Navigate = useNavigate()
    
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center space-y-4 sm:space-y-5">
            
           
            {children}
            
           
            <div className="flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md w-full"> 
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    {title}
                </h3>
                
                {description && (
                    <p className={`${textsize || "text-sm sm:text-base"} text-gray-500 mt-1 sm:mt-2`}>
                        {description}
                    </p>
                )}
                
                {button?.type && (
                    <button 
                        onClick={() => Navigate(button.Link)} 
                        className="mt-5 sm:mt-6 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-orange-600 shadow-md transition-all cursor-pointer font-medium text-sm sm:text-base"
                    >
                        Go Back to {button.type}
                    </button>
                )}
            </div>
        </div>
    );
};