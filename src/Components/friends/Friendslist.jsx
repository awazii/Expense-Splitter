import React ,{useRef} from 'react'
import Input from './Input'
import Button from './searchbtn'
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import saad from "../../assets/saad.jpg"
import habib from "../../assets/habib.png"
import zuzu from "../../assets/zuzu.png"
import awazii from "../../assets/awazii.jpg"
import daud from "../../assets/daud.jpg"
import arshman from "../../assets/arshman.jpg"
import sheda from "../../assets/sheda.jpg"
import { FaChevronDown } from "react-icons/fa";
import FriendCard from "./FriendCard"
import { FaUserFriends } from "react-icons/fa";
export const Friendslist = () => {
  const Friendsrefs = useRef({})
  function Setref(el,i) {
    Friendsrefs.current[i]=el
  } 
  const hightlightFriend=(id)=>{
    const el =Friendsrefs.current[id]
    if (!el) return;
    el.scrollIntoView({behavior:"smooth",block:"center"});
    el.classList.add("highlight-glow")
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  }
  const Friends = [
    {
      id:"001",
      name: 'Awazii',
      bio: 'Web developer',
      profilePic: awazii
    },
    {
       id:"002",
      name: 'Arshman',
      bio: 'Gooner',
      profilePic: arshman
    },
    {
       id:"003",
      name: 'Daud Khalid',
      bio: 'Advocate',
      profilePic: daud
    },
    {
      id:"004",
      name: 'Sheda',
      bio: `Mama's Boy`,
      profilePic: sheda
    },
    {
       id:"005",
      name: "Saad Khalid",
      bio : "Gym Freak",
      profilePic:saad
    },
    {
       id:"006",
      name:"Habib",
      bio : "Nerd",
      profilePic:habib
    }
    ,
    {
       id:"007",
      name:"Zuzu",
      bio : "Savage's Mod",
      profilePic:zuzu
    }
  ]
  return (
    <div className='Friends'>
      <div className="search flex gap-4 w-full py-2  items-center">
        <Input />
        <Button />
      </div>
      <div className="pinned mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Pinned <span> <TbPinnedFilled className='rotate-45' /></span></h2>
        <div className="pinned-friends grid grid-cols-6 gap-3 border-b border-b-light pb-5">
          {
            Friends.map((friend, index) => {
              return (
                <div key={index} className='pinned-friend card-b w-60 px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                  <div className="about flex center-flex gap-3">
                    <div className="profile border size-16 rounded-full border-b-light"><img className='rounded-full object-cover w-full h-full' src={friend.profilePic} alt="" /></div>
                    <div className="info">
                      <h3 className="name text-text-primary text-lg">{friend.name}</h3>
                      <h4 className="bio text-text-secondary text-sm">{friend.bio}</h4>
                    </div>
                    <div className='absolute right-0 top-0'>
                      <button className=' unpin-btn m-1 cursor-pointer  text-lg text-primary font-bold'>
                        <TbPinnedOff />
                      </button>
                      <span className='unpin transition duration-500 ease-in-out'>Unpin {friend.name}</span>
                    </div>
                  </div>

                  <button className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary' onClick={()=>{
                    hightlightFriend(friend.id)
                  }}><FaChevronDown /></button>
                </div>
              )
            })
          }

        </div>
      </div>
        <div className="friendslist-container    min-h-60 border-b-light p-2 ">
           <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Friends<span> <FaUserFriends  /></span></h2>
          <div className="friendslist grid grid-cols-6 gap-x-3 gap-y-2 mb-5">
            {
              Friends.map((friend,index)=>{
                return(
                  <div key={friend.id} ref={(el)=>{Setref(el,friend.id)}}><FriendCard  img={friend.profilePic}  name={friend.name} bio={friend.bio}/></div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}
