import React, { useState, useEffect, useMemo } from 'react'
import Gcheckbox from "../Common/gcheck"
import Selectall from "../../Common/Selectall"
import Checkbox from "../../Common/Check"
import Input from "../Common/addginput"
import Newbtn from "../Common/Newgbtn"
import Categories from "../Common/categories"
import Choosef from "../../Common/choosef"
import { HiMiniUserGroup } from "react-icons/hi2";
import { useSelector } from 'react-redux'
import { selectAllFriends, selectPinnedFriends } from '../../../store/FriendsSlice'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addGroup, selectAllGroups, deleteGroup } from '../../../store/GroupSlice'
import { FaBan } from "react-icons/fa"
export const RenderSelectfriends = React.memo(({ Friends, setSelectedfriends, Selectedfriends, styles }) => {
  return (<div className={`friend-lists ${styles} h-60 overflow-auto  grid gap-2 sm:gap-3  border-b-light px-2 border p-2 rounded-lg`}>
    {Friends.map((friend, index) => {
      return (
        <label key={index} className={`select-friend rounded-lg shadow-md h-auto min-h-[110px] sm:h-30 bg-neutral-100 flex flex-col items-center justify-center gap-1 pt-1 pb-2 relative trans min-w-0 ${friend.isBanned ? 'cursor-not-allowed opacity-50 ' : 'cursor-pointer'}`}>
          <div className={`friend-img-container size-12 sm:size-16 relative rounded-full center-flex shrink-0 ${friend.isBanned ? "border-red-500" : "border-primary"} border-2`}>
            <img src={friend.Image} className='Img-c w-full h-full object-cover rounded-full' alt="friend-img" />
            {friend.isBanned && <div className='absolute p-1 rounded-full center-flex bg-red-500/90 left-1 top-9/12'><FaBan className='text-white size-3' /></div>}
          </div>
          <div className="friend-info center-flex flex-col min-w-0 px-1 text-center">
            <h2 className='text-xs sm:text-sm truncate w-full'>{friend.Name}</h2>
            <p className={`text-[10px] sm:text-[12px] truncate w-full ${friend.isBanned ? 'text-red-500 font-semibold' : 'text-text-secondary'}`}>
              {friend.isBanned ? '(Banned)' : friend.Bio}
            </p>
          </div>
          <div className='absolute top-2 right-1'>
            <Gcheckbox setSelected={setSelectedfriends} Selected={Selectedfriends} id={friend.id} />
          </div>
        </label>
      )
    })}
  </div>)
})
export const Newg = React.memo(() => {
  const AllFriends = useSelector(selectAllFriends);
  const PinnedFriends = useSelector(selectPinnedFriends);
  const AllGroups = useSelector(selectAllGroups);
  const [isPinselected, setisPinselected] = useState(false)
  const [Selectedfriends, setSelectedfriends] = useState([])
  const [issubmitted, setissubmitted] = useState(false);
  const dispatch = useDispatch();
  const { control, register, setValue, handleSubmit, reset, trigger, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      Name: "",
      Members: [],
      Category: "",
      isPinned: false
    },
  })
  const GroupnamePattern = /^[A-Za-z][A-Za-z0-9\s,._-]*$/;
  const Friends = useMemo(() => {
    return isPinselected ? PinnedFriends : AllFriends;
  }, [isPinselected, AllFriends, PinnedFriends]);
  const onsubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(addGroup(
      data.Name,
      data.Category,
      data.Members,
      data.isPinned
    ));
    setissubmitted(true);
    setSelectedfriends([]);
    reset();
    await new Promise(resolve => setTimeout(resolve, 2000));
    setissubmitted(false);
  }
  useEffect(() => {
    register("Members", { validate: (valueArray) => valueArray.length >= 2 || "Please select at least 2 friends!" });
  }, [register])
  useEffect(() => {
    setValue("Members", Selectedfriends, { shouldValidate: true });
  }, [Selectedfriends, setValue])
  return (
    <div className='container bg-white shadow-lg rounded-2xl mx-auto h-fit w-[94%] sm:w-[90%] lg:w-180  my-4 sm:my-6 p-3 relative l center-flex flex-col gap-0  '>
      <div className="title center-flex flex-col gap-0">
        <h2 className='text-xl sm:text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Group<span><HiMiniUserGroup /></span></h2>
        <h4 className='text-text-secondary text-sm sm:text-base mr-2 text-center'>Start with intention. End with legacy.</h4>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className='Friend-form  m-2 sm:m-3 space-y-3 flex flex-col w-full'>
        <Controller
          name="Name"
          control={control}
          rules={{
            required: "Group's name is required",
            maxLength: { value: 25, message: "Max 25 characters allowed" },
            minLength: { value: 5, message: "At least 5 characters" },
            pattern: {
              value: GroupnamePattern,
              message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ,"
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Group's Name"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 26) {
                    field.onChange(e);
                    trigger("Name");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-xs sm:text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <div className='categories'>
          <h4 className='text-sm sm:text-md font-semibold my-3'>Where are you headed?</h4>
          <Controller
            name="Category"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field, fieldState }) => (
              <>
                <Categories
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                {fieldState.error && <p className='text-red-600 text-xs sm:text-sm mt-1'>{fieldState.error.message}</p>}
              </>
            )} />
        </div>
        <div className='select-friends-container w-full '>
          <div className='select-friend-option flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
            <h4 className='text-sm sm:text-md font-semibold my-2 '>Who's coming with you?
            </h4>
            <div className='flex flex-wrap items-center gap-2'>
              <div className=' w-auto py-2 px-3 bg-neutral-100 rounded-lg  '>
                <Selectall setSelected={setSelectedfriends} members={Friends} Selected={Selectedfriends}>
                  <h5 className='text-[12px] sm:text-[13px] text-text-secondary whitespace-nowrap'>Select all</h5>
                </Selectall>
              </div>
              <Choosef setisPinselected={setisPinselected} />
            </div>
          </div>
          <div className='select-friends   mx-auto mt-3  '>
            <RenderSelectfriends Friends={Friends} setSelectedfriends={setSelectedfriends} Selectedfriends={Selectedfriends} styles="w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
          </div>
          {errors.Members && <p className='text-red-500 text-xs sm:text-sm text-center mt-2'>{errors.Members.message}</p>}
        </div>
        <div className='pin-check flex gap-2 mt-2'>
          <Controller
            name="isPinned"
            control={control}
            render={({ field }) => (
              <Checkbox
                value={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                <h3 className='text-xs sm:text-sm'>Do you want to pin this Group?</h3>
              </Checkbox>
            )}
          />
        </div>
        <div className='center-flex'>
          <Newbtn isSubmitting={isSubmitting} />
        </div>
        {issubmitted && <p className='text-green-500 text-xs sm:text-sm mt-1 text-center '>Group added successfully!</p>}
      </form>
    </div>
  )
})