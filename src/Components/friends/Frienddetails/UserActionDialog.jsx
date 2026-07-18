import React, { useState } from 'react';
import { selectFriendById, deleteFriend, updateFriend } from '../../../store/FriendsSlice';
import {
    useSelector, useDispatch
} from 'react-redux';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaBan } from "react-icons/fa";
import { TbUserCheck } from "react-icons/tb";
import { pageContainerVariants, cardVariants, headerVariants } from "../../../utils/animation";
import { motion } from "framer-motion";
import { addActivity } from "../../../store/ActivitySlice"
const ConfirmAction = ({ friend, isnew, isbanned, Closemodel, setIsConfirmed }) => {
    const dispatch = useDispatch();
    const paragraphs = {
        remove:
            "Removing this user will delete them from your list. Since they are not part of any group, no balances or shared expenses will be affected.",
        ban:
            "Banning this user prevents them from being added to any new groups. If they are already in a group, they cannot be included in new expenses, but they can still settle existing net balances. While banned, their profile cannot be updated.",
        unban:
            "Unbanning this user restores their access. They can now be added to groups, included in new expenses again, and their profile can be updated."
    };
    function handleAction() {
        if (isnew) {
            dispatch(addActivity({
                title: `Removed : ${friend.Name}`,
                 selfTitle: false,
                description: {
                    title: "Friendship Ended",
                    desIcon: "remove",
                    details: null
                },
                icon: null,
                visibility: {
                    global: true,
                    friend: false,
                    group: false
                },
                groupid: null,
                friends: [friend.id],
                friendImages: {       
                    [friend.id]: friend.Image
                },
                category: "friend",
            }));
            dispatch(deleteFriend(friend.id));
        }
        else {
            dispatch(updateFriend({ id: friend.id, changes: { isBanned: !isbanned } }));
            dispatch(addActivity({
                title: `${isbanned ? "Unbanned" : "Banned"} : ${friend.Name}`,
                selfTitle: false,
                description: {
                    title: isbanned ? "User Unbanned" : "User Banned",
                    desIcon: isbanned ? "unban" : "ban",
                    details: null
                },
                icon: null,
                visibility: {
                    global: true,
                    friend: true,
                    group: true
                },
                groupid: null,
                groupinfo: null,
                friends: [friend.id],
                friendImages: {
                    [friend.id]: friend.Image
                },
                category: "friend",
            }));
        }
        setIsConfirmed(true);
    }
    return (
        <div className="w-full h-full center-flex items-start flex-col gap-3 p-3 pt-0">
            <h2 className="text-lg sm:text-xl font-semibold text-center">
                {`${isnew ? "Remove" : isbanned ? "Unban" : "Ban"} ${friend.Name}`}
            </h2>
            <div className="text-text-secondary w-full">
                <p className="text-text-secondary text-sm sm:text-base break-words">
                    {`Are you sure you want to ${isnew
                        ? "remove "
                        : isbanned
                            ? "unban "
                            : "ban "}`}
                    <span className="text-black font-semibold">{`${friend.Name}?`}</span>
                </p>

                <p className="text-xs sm:text-sm text-text-secondary mt-2">
                    {paragraphs[isnew ? "remove" : isbanned ? "unban" : "ban"]}
                </p>
            </div>
            <div className="w-full flex  justify-end gap-2 sm:gap-3 mt-4">
                <button
                    className="px-4 py-2 rounded-lg border border-l hover:bg-gray-100 hover:border-primary shadow transition-colors cursor-pointer text-sm sm:text-base order-2 sm:order-1"
                    onClick={() => {
                        Closemodel()
                    }}
                >
                    Cancel
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-white ${isbanned ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} transition-colors cursor-pointer center-flex gap-2 text-sm sm:text-base order-1 sm:order-2`}
                    onClick={() => {
                        handleAction()
                    }}
                >
                    {isnew ? <IoPersonRemoveSharp className=' size-4' /> : isbanned ? <TbUserCheck className=' size-4 ' /> : <FaBan className=' size-4' />}
                    {isnew ? "Remove" : isbanned ? "Unban" : "Ban"}
                </button>
            </div>
        </div>
    );
};

const ActionResult = ({ friend, User, Closemodel }) => {
    const resultTexts = {
        remove: ` has been successfully removed from your friends list.`,
        ban: ` has been banned. They can no longer join new groups or be added to new expenses, and their profile cannot be updated.`,
        unban: ` has been unbanned. They can now join groups, participate in new expenses again, and their profile can be updated.`
    };
    const IconComponent = User.isnew ? IoPersonRemoveSharp : friend.isBanned ? FaBan : TbUserCheck;
    return (
        <motion.div variants={headerVariants} className="w-full h-full center-flex flex-col gap-4 p-3 sm:p-4">
            <div className="p-6 sm:p-8 shadow-md rounded-full bg-white">
                <IconComponent className={`size-6 sm:size-8 ${(friend?.isBanned || User.isnew) ? "text-red-500" : "text-green-500"}`} />
            </div>
            <div className={`center-flex flex-col gap-2 w-full`}>
                <h3 className='text-lg sm:text-xl font-semibold text-center'>User {friend?.isBanned ? "Banned" : User.isnew ? "Removed" : "Unbanned"}</h3>
                <p className='text-xs sm:text-sm text-center w-full max-w-90 text-text-secondary'> <span className="font-semibold text-black">{User.name}</span> {resultTexts[User.isnew ? "remove" : friend?.isBanned ? "ban" : "unban"]}</p>
            </div>
            < button onClick={() => Closemodel()} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-orange-600 transition-colors cursor-pointer text-sm sm:text-base">Go Back to Profile</button>
        </motion.div>
    );
};

export const UserActionDialog = ({ friendId, isnew, isbanned, Closemodel }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const friend = useSelector((state) => selectFriendById(state, friendId));
    const [User, setUser] = useState({
        name: friend ? friend.Name : "",
        isnew
    });
    return (
        <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" className="w-full sm:w-[90vw] md:w-120 max-w-[90vw] h-fit">
            {isConfirmed ? <ActionResult
                User={User} Closemodel={Closemodel} friend={friend} /> : <ConfirmAction friend={friend} isnew={isnew} isbanned={isbanned} setIsConfirmed={setIsConfirmed} Closemodel={Closemodel} />}
        </motion.div>
    );
};