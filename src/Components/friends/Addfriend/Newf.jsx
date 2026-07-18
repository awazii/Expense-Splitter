import React, { useEffect, useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
import Newbtn from "../Common/Newfbtn";
import Checkbox from "../../Common/Check";
import Input from "../Common/addfinput";
import ImageBox from "../Common/Imagebox";
import { useForm, Controller } from 'react-hook-form';
import { uploadToCloudinary } from '../../../utils/Uploadimg';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, selectAllFriends } from '../../../store/FriendsSlice';
import { addActivity } from '../../../store/ActivitySlice';
export const Newfriend = () => {
  const friends = useSelector(selectAllFriends);
  const dispatch = useDispatch();
  const [issubmitted, setissubmitted] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      Name: "",
      Bio: "",
      Image: null,
      isPinned: false
    }
  });

  const usernamePattern = /^[A-Za-z][0-9A-Za-z_\s]*$/;
  const bioPattern = /^[A-Za-z][A-Za-z\s.,'-]*$/;
  async function uploadImage(image) {
    const imageUrl = await uploadToCloudinary(image);
    return imageUrl
  }
  const Onsubmit = async (data) => {
    const imageUrl = await uploadImage(data.Image)
    setissubmitted(true)
    dispatch(addFriend(
      data.Name,
      data.Bio,
      imageUrl,
      data.isPinned
    ));
    setTimeout(() => {
      setissubmitted(false);
    }, 2000);
    dispatch(addActivity({
       title: `New friend: ${data.Name}`,
                      selfTitle: false,
                      description: {
                          title: "Friendship Started",
                          desIcon: "add",
                          details: null
                      },
                      icon: null,
                      visibility: {
                          global: true,
                          friend: false,
                          group: false
                      },
                      groupid: null,
                      groupinfo: null,
                      friends: ["newfriend"],
                      friendImages: {
                          newfriend: imageUrl
                      },
                      category: "friend",
    }))
    reset();
  };
  return (
    <div className='container bg-white shadow-lg rounded-2xl mx-auto h-fit w-[92%] sm:w-100 my-8 sm:my-20 p-3'>
      <div className="title center-flex flex-col gap-0">
        <h2 className='text-xl sm:text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>
          Add New Friend <span><FaUserPlus /></span>
        </h2>
        <h4 className='text-text-secondary text-sm sm:text-base mr-2 text-center'>Share costs. Stay synced.</h4>
      </div>

      <form onSubmit={handleSubmit(Onsubmit)} className='Friend-form m-3 sm:m-6 space-y-3 flex flex-col items-center w-full'>
        <Controller
          name="Name"
          control={control}
          rules={{
            required: "Friend's name is required",
            maxLength: { value: 15, message: "Max 15 characters allowed" },
            minLength: { value: 3, message: "At least 3 characters" },
            pattern: {
              value: usernamePattern,
              message: "Invalid format"
            },
            validate: (value) => {
              const existingNames = friends.map(f => f.Name);
              return existingNames.includes(value)
                ? "This name already exists"
                : true;
            }
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Friends Name"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 16) {
                    field.onChange(e);
                    trigger("Name");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-xs sm:text-sm w-full'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <Controller
          name="Bio"
          control={control}
          rules={{
            required: "Bio is required",
            minLength: { value: 4, message: "Min 4 chars" },
            maxLength: { value: 20, message: "Max 20 chars" },
            pattern: { value: bioPattern, message: "Invalid characters" }
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Friend's Bio"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 21) {
                    field.onChange(e);
                    trigger("Bio");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-xs sm:text-sm w-full'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <Controller
          name="Image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field, fieldState }) => (
            <>
              <ImageBox
                onChange={(file) => field.onChange(file)}
                value={field.value}
              />
              {fieldState.error && <p className='text-red-600 text-xs sm:text-sm w-full'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <Controller
          name="isPinned"
          control={control}
          render={({ field }) => (
            <Checkbox
              value={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              <h3 className='text-xs sm:text-sm'>Do you want to pin this person?</h3>
            </Checkbox>
          )}
        />
        <Newbtn isSubmitting={isSubmitting} />
        {isSubmitting && <p className="text-gray-500 text-sm mt-2">Adding friend...</p>}
        {issubmitted && <p className='text-green-500 text-sm'>Friend Added Successfully!</p>}
      </form>
    </div>
  );
};