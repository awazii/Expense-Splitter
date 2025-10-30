import React from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { HiMiniUserGroup } from "react-icons/hi2";
import GroupCard from './GroupCard';
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
export const Grouplist = () => {
const groups = [
  {
    variant: "mountain",
    Img: mountain,
    name: "Trip to Murree",
    members: "44",
    expenses: "4500",
    status: {
      text: "Active",
      textColor: "#16A34A",
      bgColor: "#2FA85A"
    }
  },
  {
    variant: "beach",
    Img: beach,
    name: "Trip to Sea View",
    members: "28",
    expenses: "3200",
    status: {
      text: "Terminated",
      textColor: "#DC2626",
      bgColor: "#FF4C4C"
    }
  },
  {
    variant: "restaurant",
    Img: Restaurant,
    name: "Dinner at Skyline Grills",
    members: "12",
    expenses: "8700",
    status: {
      text: "Finished",
      textColor: "#475569",
      bgColor: "#94A3B8"
    }
  },
  {
    variant: "other",
    Img: Other,
    name: "Weekend Hangout",
    members: "36",
    expenses: "2900",
    status: {
      text: "Active",
      textColor: "#16A34A",
      bgColor: "#2FA85A"
    }
  },
  {
    variant: "concert",
    Img: concert,
    name: "Live Concert Night",
    members: "51",
    expenses: "10200",
    status: {
      text: "Terminated",
      textColor: "#DC2626",
      bgColor: "#FF4C4C"
    }
  }
];
  return (
    <div className='Groups'>
      <div className="search flex gap-4 w-full py-2  items-center">
        <Input variant={"Group"} />
        <Button />
      </div>
      <div className="friendslist-container min-h-60 border-b-light p-2 ">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Groups<span> <HiMiniUserGroup /></span></h2>
        <div className="Grouppslist grid grid-cols-4 gap-x-3 gap-y-2 mb-5">
          {groups.map((group, index) => {
            return (
              <GroupCard key={index} group={group} />)
          })}
        </div>
      </div>
    </div>
  )
}
