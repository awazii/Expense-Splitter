import React, { useState, useEffect } from 'react'
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { selectAllFriends } from '../../../store/FriendsSlice'
import { useSelector } from 'react-redux'
import { TbMoodHappy } from "react-icons/tb";
import Selectall from '../../Common/Selectall'
import { useDispatch } from 'react-redux'
import { updateGroup } from '../../../store/GroupSlice'
import Gcheckbox from '../Common/gcheck'
import { RenderSelectfriends } from '../AddGroup/Newg'
import { IoPersonAdd } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { headerVariants, pageContainerVariants } from "../../../utils/animation";
import { addActivity } from "../../../store/ActivitySlice"

const ActionResult = ({ Selected, Closemodel }) => {
    return (
        <motion.div variants={headerVariants} className="w-full h-full flex items-center justify-center flex-col gap-4 p-4 sm:p-6">
            <div className="p-6 sm:p-7 shadow-md rounded-full bg-white flex items-center justify-center">
                <FaUserPlus className="size-8 sm:size-9 text-orange-500" />
            </div>
            <div className="flex items-center justify-center flex-col gap-2 w-full">
                <h3 className="text-lg sm:text-xl font-semibold text-center">
                    Member{Selected.length !== 1 ? "s" : ""} Added!
                </h3>
                <p className="text-xs sm:text-sm text-center w-full max-w-sm text-text-secondary leading-relaxed">
                    <span className="font-semibold text-black">{Selected.length}</span> Member{Selected.length !== 1 ? "s" : ""}
                    {Selected.length === 1 ? " has" : " have"} been successfully added to the group
                    and can now be included in shared expenses.
                </p>
            </div>
            <button 
                onClick={() => Closemodel()} 
                className="w-full sm:w-auto px-8 py-2.5 mt-2 rounded-lg bg-black text-white hover:bg-orange-600 shadow-md transition-colors cursor-pointer text-sm sm:text-base font-medium"
            > 
                Done
            </button>
        </motion.div>
    );
}

export const Addmember = ({ CurrentGroup, Closemodel }) => {
    const AllFriends = useSelector(selectAllFriends);
    const AvailableFriends = AllFriends.filter(friend => !CurrentGroup.Members.includes(friend.id))
    const [selectedfriends, setSelectedfriends] = useState([]);
    const dispatch = useDispatch()
    const [isSubmitted, setisSubmitted] = useState(false)
    
    const handleAddMembers = () => {
        dispatch(updateGroup({ id: CurrentGroup.id, changes: { Members: [...CurrentGroup.Members, ...selectedfriends] } }))
        dispatch(addActivity({
            title:`${selectedfriends.length} Members Added`,
            selfTitle: true,
            description: null,
            icon: "memberJoined",
            visibility: {
                global: true,
                friend: true,
                group: true
            },
            friends: selectedfriends,
            friendImages: null,
            groupid: CurrentGroup.id,
            groupinfo: {
                name: CurrentGroup.Name,
                Category: CurrentGroup.Category
            },
            category: "group",
        }))
        setisSubmitted(true)
    };
    
    useEffect(() => {
        console.log("Addmember component rendered", AvailableFriends);
    }, [AvailableFriends])
    
    return (
        <motion.div 
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible" 
            className='w-full max-w-md sm:max-w-xl mx-auto h-fit'
        >
            {isSubmitted ? (
                <ActionResult Selected={selectedfriends} Closemodel={Closemodel} />
            ) : AvailableFriends.length > 0 ? (
                <div className='select-friends-container w-full bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center shadow-sm'>
                    {!isSubmitted && (
                        <>
                            <div className='select-friend-option w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2'>
                                <h4 className='text-base sm:text-lg font-semibold text-center sm:text-left'>
                                    Bring more friends on board
                                </h4>
                                <div className='flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto'>
                                    <div className='w-full sm:w-auto py-2 px-4 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'>
                                        <Selectall setSelected={setSelectedfriends} members={AvailableFriends} Selected={selectedfriends}>
                                            <h5 className='text-xs sm:text-[13px] font-medium text-gray-600'>Select all</h5>
                                        </Selectall>
                                    </div>
                                </div>
                            </div>
                        
                            <div className='select-friends mx-auto mt-2 w-full'>
                                <RenderSelectfriends 
                                    Friends={AvailableFriends} 
                                    setSelectedfriends={setSelectedfriends} 
                                    Selectedfriends={selectedfriends} 
                                    styles="w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 " 
                                />
                            </div>

                            <button
                                disabled={selectedfriends.length === 0}
                                type='submit'
                                className={`w-full sm:w-40 mt-6 px-4 py-3 sm:py-3.5 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 gap-2 transition-all flex items-center justify-center
                                ${selectedfriends.length === 0 ? 'opacity-50 cursor-not-allowed shadow-none' : 'cursor-pointer active:scale-95'}`}
                                onClick={handleAddMembers}
                            >
                                Add
                                <IoPersonAdd className='size-4 sm:size-5' />
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <UniversalEmptyState
                    title="Everyone's Here!"
                    description="You’ve already added all your available friends to this group. To add more people, Add them to your friends list first."
                    textsize="text-sm"
                >
                    <div className="p-6 sm:p-8 shadow-md bg-gray-50 rounded-full flex items-center justify-center">
                        <TbMoodHappy className="size-10 sm:size-12 text-primary" />
                    </div>
                </UniversalEmptyState>
            )}
        </motion.div>
    )
}