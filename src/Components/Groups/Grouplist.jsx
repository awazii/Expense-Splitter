import React, { useRef } from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { HiMiniUserGroup } from "react-icons/hi2";
import GroupCard from './GroupCard';
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import saad from "../../assets/saad.jpg"
import zuzu from "../../assets/zuzu.png"
import awazii from "../../assets/awazii.jpg"
import daud from "../../assets/daud.jpg"
import arshman from "../../assets/arshman.jpg"
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
export const Grouplist = () => {
  const Groupsrefs = useRef({})
  function Setref(el, i) {
    Groupsrefs.current[i] = el
  }
  const hightlightGroup = (id) => {
    const el = Groupsrefs.current[id]
    console.log(el)
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow")
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  }
  const groups = [
    {
      id: "grp-001",
      variant: "mountain",
      Img: mountain,
      name: "Trip to Murree",
      members: "44",
      expenses: "4500",
      status: {
        text: "Active",
        textColor: "#16A34A",
        bgColor: "#2FA85A"
      },
      top_spender: {
        name: "Awazii",
        img: awazii
      },
      recent_activity: "Bought snacks and water bottles",
      date: "2025-10-12T14:30:00Z",
      recent_expense: {
        amount: "750",
        expense: "Snacks & Water"
      }
    },
    {
      id: "grp-002",
      variant: "beach",
      Img: beach,
      name: "Trip to Sea View",
      members: "28",
      expenses: "3200",
      status: {
        text: "Terminated",
        textColor: "#DC2626",
        bgColor: "#FF4C4C"
      },
      top_spender: {
        name: "Daud Khalid",
        img: daud
      },
      recent_activity: "Paid for beach umbrellas",
      date: "2025-09-28T11:00:00Z",
      recent_expense: {
        amount: "500",
        expense: "Beach Umbrellas"
      }
    },
    {
      id: "grp-003",
      variant: "restaurant",
      Img: Restaurant,
      name: "Dinner at Skyline Grills",
      members: "12",
      expenses: "8700",
      status: {
        text: "Finished",
        textColor: "#475569",
        bgColor: "#94A3B8"
      },
      top_spender: {
        name: "Arshman Zafar",
        img: arshman
      },
      recent_activity: "Covered dessert and drinks",
      date: "2025-10-05T20:15:00Z",
      recent_expense: {
        amount: "1200",
        expense: "Dessert & Drinks"
      }
    },
    {
      id: "grp-004",
      variant: "other",
      Img: Other,
      name: "Weekend Hangout",
      members: "36",
      expenses: "2900",
      status: {
        text: "Active",
        textColor: "#16A34A",
        bgColor: "#2FA85A"
      },
      top_spender: {
        name: "Zuzu",
        img: zuzu
      },
      recent_activity: "Booked bowling alley",
      date: "2025-10-18T17:45:00Z",
      recent_expense: {
        amount: "950",
        expense: "Bowling Alley Booking"
      }
    },
    {
      id: "grp-005",
      variant: "concert",
      Img: concert,
      name: "Live Concert Night",
      members: "51",
      expenses: "10200",
      status: {
        text: "Terminated",
        textColor: "#DC2626",
        bgColor: "#FF4C4C"
      },
      top_spender: {
        name: "Saad Khalid",
        img: saad
      },
      recent_activity: "Paid for VIP passes",
      date: "2025-09-22T19:00:00Z",
      recent_expense: {
        amount: "1800",
        expense: "VIP Passes"
      }
    }
  ];

  return (
    <div className='Groups'>
      <div className="search flex gap-4 w-full py-2  items-center">
        <Input variant={"Group"} />
        <Button />
      </div>
      <div className="pinned-groups-container mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Pinned <span> <TbPinnedFilled className='rotate-45' /></span></h2>
        <div className="pinned-groups grid grid-cols-5 gap-3 border-b border-b-light pb-5">
          {groups.map((group, index) => {
            return (
              <div key={index} className='pinned-friend card-b  px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                <div className="about flex items-center gap-3">
                  <div className="profile border size-19 rounded-full border-b-light"><img className='Img-c' src={group.Img} alt="" /></div>
                  <div className="info w-45">
                    <h3 className="name text-text-primary text-md font-semibold line-clamp-1 w-full">{group.name}</h3>
                    <p className='text-text-secondary text-sm'><span className='font-semibold'>{group.members} </span> Members</p>
                    <p className='text-text-secondary text-sm'> <span className='font-semibold'>{Number(group.expenses).toLocaleString()}
                      </span> Total Expense</p>
                  </div>
                  <div className='absolute right-0 top-0'>
                    <button className=' unpin-btn m-1 cursor-pointer  text-lg text-primary font-bold'>
                      <TbPinnedOff />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {group.name}</span>
                  </div>
                </div>

                <button className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary' onClick={() => {
                  hightlightGroup(group.id)
                }}><FaChevronDown /></button>
              </div>
            )
          })}
        </div>
      </div>
      <div className="friendslist-container min-h-60 border-b-light p-2 ">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Groups<span> <HiMiniUserGroup /></span></h2>
        <div className="Grouppslist grid grid-cols-4 gap-x-3 gap-y-2 mb-5">
          {groups.map((group, index) => {
            return (
              <div key={group.id} ref={(el) => { Setref(el, group.id) }}>
                <GroupCard  group={group}  />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
