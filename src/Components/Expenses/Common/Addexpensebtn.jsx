import React from 'react';
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa";
import { useNavigate ,useParams } from 'react-router-dom';
const Button = () => {
  const navigate= useNavigate()
  const { Groupid } = useParams();
  return (
    <StyledWrapper>
      <button className="cssbuttons-io-button bg-primary" onClick={()=>{
        navigate(`/Groups/${Groupid}/AddExpense`)
      }}>
        Add Expense
        <div className="icon">
         < FaPlus  className=' size-4 text-primary' />
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: clamp(13px, 3vw, 17px);
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #cc5329;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
    cursor: pointer;
    white-space: nowrap;
    max-width: 100%;
  }

  .cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    right: 0.3em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
;
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }`;

export default Button;