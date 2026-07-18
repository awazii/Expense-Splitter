import { createSlice, nanoid, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { addFriend } from "./FriendsSlice";
import { addGroup } from "./GroupSlice";
import dayjs from "dayjs";
import { selectIsNewUser } from "./UserSlice";
const ActivityAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        const aDateTime = dayjs(`${a.Date} ${a.Time}`, "YYYY-MM-DD HH:mm:ss");
        const bDateTime = dayjs(`${b.Date} ${b.Time}`, "YYYY-MM-DD HH:mm:ss");
        return bDateTime.valueOf() - aDateTime.valueOf();
    }
})
const initialState = ActivityAdapter.getInitialState();
const ActivitySlice = createSlice({
    name: "Activity",
    initialState,
    reducers: {
        addActivity: {
            reducer: ActivityAdapter.addOne,
            prepare: (activity) => {
                return {
                    payload: {
                        id: nanoid(),
                        ...activity,
                        Date: dayjs().format("YYYY-MM-DD"),
                        Time: dayjs().format("HH:mm:ss")
                    }
                }
            }
        },
    },
    extraReducers: (builder) => {
            builder.addCase(addGroup, (state, action) => {
                const group = action.payload;
                console.log(group)
                const newActivity = {
                    id: nanoid(),
                    title: `You created New group`,
                    selfTitle: true,
                    description: null,
                    icon: "groupAdd",
                    visibility: {
                        global: true,
                        friend: true,
                        group: false
                    },
                    groupid: group.id,
                    groupinfo: {
                        name: group.Name,
                        Category: group.Category
                    },
                    friends: group.Members,
                    friendImages: null,
                    category: "group",
                    Date: dayjs().format("YYYY-MM-DD"),
                    Time: dayjs().format("HH:mm:ss")
                };
                ActivityAdapter.addOne(state, newActivity);
            }
            )
    }
})
export const { addActivity } = ActivitySlice.actions;
export const { selectAll: selectAllActivities, selectById: selectActivityById } = ActivityAdapter.getSelectors(state => state.Activity);
export const FriendActivities = createSelector(
    [selectAllActivities, (state, friendId) => friendId],
    (activities, friendId) => activities.filter(activity => activity.friends?.includes(friendId)).slice(0, 10)
)
export const GroupActivities = createSelector(
    [selectAllActivities, (state, group) => group],
    (activities, group) => {
                   const joinedindex = activities.findIndex(
            activity => activity.groupid === group?.id && activity.title ==="You created New group"
        );
        const frozenindex = activities.findIndex(
            activity => activity.groupid === group?.id && activity.title ==="Group Frozen"
        );
        if (joinedindex !== -1) {
            return activities.slice(frozenindex !== -1 ? frozenindex : 0,joinedindex).filter(activity => {
                if (activity.groupid === group.id) {
                    return true
                }
                else if (activity.category === "friend") {
                    return group.Members.some(member => activity.friends.includes(member))
                }
            }).slice(0, 10)
        }
        return []
    }
)
export default ActivitySlice.reducer;