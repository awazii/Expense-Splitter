import React from 'react'
import ReactDOM from 'react-dom';
import { MdClose } from "react-icons/md";

export const Basemodel = ({ isOpen, Closemodel, title, children }) => {
    if (!isOpen) return null;
    
    const modalContent = (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center md:p-4 cursor-pointer"
        >
            <div
                className="bg-white/90 backdrop-blur-md rounded-none md:rounded-2xl shadow-2xl w-full h-full md:w-auto md:h-auto md:max-h-[90vh] md:max-w-fit overflow-hidden relative animate-fade-in-up flex flex-col"
                onClick={(e) => e.stopPropagation()}
            > 
                <div className="flex justify-between items-center p-4 md:px-6 md:pt-6 border-b border-gray-200/50 pb-2 md:pb-2 shrink-0">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate pr-4">{title}</h2>
                    <button
                        onClick={Closemodel}
                        className="text-text-secondary hover:text-primary transition-colors cursor-pointer shrink-0 p-1"
                    >
                        <MdClose className='size-6 md:size-7' />
                    </button>
                </div>
                <div className="p-4 md:p-5 flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
    
    return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
    );
}