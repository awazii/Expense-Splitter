import React, { useState } from 'react';
import styled from 'styled-components';
import Delbtn from "../Delete"
import Editbtn from "../Edit"
import Pinbtn from "../Pin"
import { RiFlipHorizontalLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { RiFlipHorizontalFill } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdOutlineMoneyOff } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
const Card = ({ img, name, bio }) => {
    const [show, setshow] = useState({front:false, back:false})
    const [flip, setflip] = useState(false)
    const [pin, setpin] = useState(false)
    return (
        <StyledWrapper>
            <div className="card ">
                <div className={`content shadow-lg ${flip ? "rotate-y-180" : "rotate-y-0"}`}>
                    <div className="front bg-[#dddddd]">
                        <div className="front-content center-flex flex-col gap-3 bg-surface">
                            <div className="profile size-30 rounded-full ">
                                <img className='rounded-full h-full w-full object-cover' src={img} alt="" />
                            </div>
                            <div className="info  h-10 center-flex flex-col">
                                <h3 className="name text-text-primary font-bold">{name}</h3>
                                <h4 className="bio text-text-secondary text-sm">{bio}</h4>
                            </div>
                            <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans" onClick={() => {
                                setflip(!flip)
                            }}>
                                <RiFlipHorizontalLine className='size-5' />
                            </button>
                            <button className='absolute top-0 left-0 m-2 p-1 text-black cursor-pointer hover:bg-neutral-200 rounded-md' onClick={() => {
                                setshow({...show,front:!show.front})
                            }}><BsThreeDots className='size-5' />
                            </button>
                            <div
                                className={`actions rounded-2xl absolute p-2 left-0 top-9 flex gap-2 m-2 mt-0 
  backdrop-blur-lg bg-white/10  flex-col card-b
  transition-[opacity,transform] duration-300 
  ${show.front ? 'opacity-100 scale-y-100 ' : 'opacity-0 scale-y-0 '}
  `}
                            >
                                <Delbtn name={name} />
                                <Editbtn />
                                <Pinbtn pin={pin} setpin={setpin} name={name} />
                            </div>
                        </div>
                    </div>
                    <div className="back">
                        <div className="back-content flex flex-col items-center">
                            <div className='grid  h-50 w-full p-2 grid-rows-3 grid-cols-2 gap-1'>
                                <div className=' row-span-2 place-items-center self-center'>
                                    <div className='bg-[#e0eff5] size-15 rounded-full center-flex '><HiMiniUserGroup className='size-6 text-[#4fb1eb]' /></div>
                                    <h4 className='text-sm mt-2 font-bold'>Crews</h4>
                                    <h4 className='text-sm'>5 Groups</h4>
                                </div>
                                <div className='row-span-2 place-items-center self-center border-l-1 border-b-light'>
                                    <div className='bg-[#ffece9] size-15 rounded-full center-flex '><MdOutlineMoneyOff className='size-6 text-[#d92d20]' /></div>
                                    <h4 className='text-sm mt-2 font-bold'>Money Owe's</h4>
                                    <h4 className='text-sm'>5000 Pkr</h4>

                                </div>
                                <div className=' col-span-2 p-2 border-t-1 border-b-light'>
                                    <h4 className='text-text-primary font-bold'>Recent Activity</h4>
                                    <h5 className='text-text-secondary text-sm'>{name} Paid 300pkr for Food</h5>

                                </div>
                            </div>
                            <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans" onClick={() => {
                                setflip(!flip)
                            }}>
                                < RiFlipHorizontalFill className='size-5' />
                            </button>
                             <button className='absolute top-0 left-0 m-1 p-1 text-black cursor-pointer hover:bg-neutral-200 rounded-md' onClick={() => {
                                setshow({...show,back:!show.back})
                            }}><BsThreeDots className='size-5'/>
                            </button>
                              <div
                                className={`actions rounded-2xl absolute p-2 left-0 top-7 flex gap-1 m-2 mt-0 
  backdrop-blur-lg bg-background  flex-col card-b
  transition-[opacity,transform] duration-300 items-center
    ${show.back ? 'opacity-100 scale-y-100 ' : 'opacity-0 scale-y-0 '}  '}
  `}
                            >
                               <h3 className='text-sm font-semibold'>View Details</h3>
                               <button className='border p-1 rounded-2xl border-neutral-400  text-text-muted hover:scale-105 trans hover:text-primary cursor-pointer'>
                               <FaChevronDown  />
                               </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 250px;
    height: 254px;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    border-radius: 10px;
  }

  .front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
  }

  .front {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .front::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #ff6b35, #ff6b35, #ff6b35, #ff6b35, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .front-content {
    position: absolute;
    width: 98%;
    height: 98%;
    border-radius: 5px;
    color: black;
  }

//   .content {
//     transform: rotateY(180deg);
//   }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    0% {
      transform: rotateZ(360deg);
    }
  }

  .back {
    transform: rotateY(180deg);
    color: black;
    background-color:#f5f5f5;
    border: 1px solid #c4cad1;
  }
    .back-content{
    border-radius: 5px;
    }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(0px);
    }
  }`;

export default Card;
