import React, { useState } from 'react';
import styled from 'styled-components';
import { TiTick } from "react-icons/ti";
const Radio = ({ splits, memberscount ,value, onChange }) => {

  return (
    <StyledWrapper>
     <div className="radio-container flex flex-col justify-evenly gap-2 sm:gap-3 h-auto">
        {splits.map((split, index) => (
          <React.Fragment key={index}>
            <input key={index} value={split.label} checked={value === split.label} id={split.label} name="radio" type="radio" className="peer" onChange={onChange} disabled={(memberscount === 1 && index !== 0)} />
            <label htmlFor={split.label} className={`flex-1 flex flex-col justify-center p-3 sm:p-4 rounded-lg mx-1 sm:mx-2 border-l shadow-md transition-all relative ${memberscount === 1 && index !== 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
              <div className="split-info min-w-0">
                <h3 className="font-bold text-sm sm:text-base truncate">{split.label}</h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500">{split.description}</p>
              </div>
              <div className="about card-b rounded-lg h-fit mt-2 p-2">
                <p className='text-text-secondary text-xs sm:text-sm'>{split.example}</p>
              </div>
              {value === split.label && (<div className="tick absolute top-2 right-2 bg-primary rounded-full p-1 ">
                <TiTick className='text-white size-3' />
              </div>)}
            </label>
          </React.Fragment>
        ))}
        <div className="glider-container">
          <div className="glider" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-container {
    --main-color: #FF5722; 
    --main-color-opacity: rgba(255, 87, 34, 0.1);
    --total-radio: 3;
    position: relative;
  }

  .radio-container input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .radio-container .glider-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    pointer-events: none; 
  }

  .radio-container .glider-container .glider {
    position: relative;
    height: calc(100% / var(--total-radio));
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      var(--main-color) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: transform 0.3s ease-in-out; 
  }

  .radio-container .glider-container .glider::before {
    content: "";
    position: absolute;
    height: 60%; /* Reduced height for a cleaner look */
    width: 4px;
    top: 50%;
    left: -2px;
    transform: translateY(-50%);
    background: var(--main-color);
    box-shadow: 0 0 10px var(--main-color);
    border-radius: 10px;
  }

  .radio-container .glider-container .glider::after {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%; 
    background: linear-gradient(
      90deg,
      var(--main-color-opacity) 0%,
      rgba(255,255,255,0) 100%
    );
    z-index: -1; 
    border-radius: 8px;
  }

  .radio-container label {
    position: relative;
    transition: all 0.3s ease-in-out;
    z-index: 1; 
    background: white; 
  }
  
  .radio-container input:checked + label {
    border: 1px solid var(--main-color);
  }

  .radio-container input:checked + label h3 {
    color: var(--main-color);
  }

  .radio-container input:nth-of-type(1):checked ~ .glider-container .glider {
    transform: translateY(0);
  }

  .radio-container input:nth-of-type(2):checked ~ .glider-container .glider {
    transform: translateY(100%);
  }

  .radio-container input:nth-of-type(3):checked ~ .glider-container .glider {
    transform: translateY(200%);
  }
`;

export default Radio;