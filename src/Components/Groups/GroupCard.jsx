import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFlipHorizontalLine } from "react-icons/ri";
import { RiFlipHorizontalFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Detailbtn from "./detailbtn"
const Card = ({ group }) => {
  const [flip, setflip] = useState(false)
  return (
    <StyledWrapper>
      <div className="card ">
        <div className={`content shadow-lg ${flip ? "rotate-y-180" : "rotate-y-0"}`}>
          <div className="front bg-[#dddddd]">
            <div className="front-content bg-surface">
              <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans absolute bottom-2 -translate-x-1/2 left-1/2 
                            " onClick={() => {
                  setflip(!flip)
                }}>
                <RiFlipHorizontalLine className='size-5' />
              </button>
              <div className="status p-1 pb-0 flex items-center justify-center gap-2">
                <h4 className="text-sm font-semibold">Status</h4>
                <div
                  className="flex items-center gap-1 text-sm"
                  style={{ color: group.status.textColor }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: group.status.bgColor }}
                  ></div>
                  <span>{group.status.text}</span>
                </div>
              </div>
              <div className="g-content gap-1 h-43 my-1  mx-2  grid grid-cols-5 grid-row-2">
                <div className='g-info flex flex-col items-center col-span-2 p-1 gap-1 h-48'>
                  <div className="g-img  size-25 rounded-full ">
                    <img src={group.Img} className='Img-c' alt="" />
                  </div>
                  <h2 className='text-sm font-semibold line-clamp-2 w-[85%] text-center '>{group.name}</h2>
                  <Detailbtn />
                </div>
                <div className=' col-span-3 flex flex-col gap-2'>
                  <div className='members border h-20 border-b-light rounded-xl flex gap-2 items-center pr-2'>
                    <div className='members-info w-35 h-full center-flex flex-col '>
                      <h2 className='text-md font-semibold p-2 pb-0'>Total Members</h2>
                      <h1 className='text-2xl text-text-secondary'>{group.members}</h1>
                    </div>
                    <div className='member-logo size-15 rounded-full bg-[#e0eff5] center-flex'>
                                <FaUser className='size-5 text-[#4fb1eb]' />
                    </div>
                  </div>
                  <div className='expenses border h-20 border-b-light rounded-xl flex gap-2 items-center pr-2'>
                    <div className='members-info w-35 h-full center-flex flex-col '>
                      <h2 className='text-md font-semibold p-2 pb-0'>Total Expenses</h2>
                      <h1 className='text-2xl text-text-secondary'>{Number(group.expenses).toLocaleString()}</h1>
                    </div>
                    <div className='member-logo size-15 rounded-full bg-[#dbf3e6] center-flex'>
                       <FaRupeeSign className='size-5 text-[#4acb6f]'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <div className="back-content">
              <button className="flip border rounded-md border-b-light size-8 center-flex cursor-pointer hover:text-primary hover:scale-105 trans absolute bottom-2 -translate-x-1/2 left-1/2 " onClick={() => {
                setflip(!flip)
              }}>
                < RiFlipHorizontalFill className='size-5' />
              </button>
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
    width: 378px;
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
    width: 190px;
    height: 190%;
    background: linear-gradient(90deg, transparent, #ff6b35, #ff6b35, #ff6b35, #ff6b35, transparent);
    animation: rotation_481 5000ms infinite linear;
  }

  .front-content {
    position: absolute;
    width: 98%;
    height: 97%;
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
