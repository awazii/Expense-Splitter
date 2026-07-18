import React from 'react';
import styled from 'styled-components';
import { IoMdPersonAdd } from "react-icons/io";
const Button = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        <span className="span"><IoMdPersonAdd className='size-5 text-white svg-icon' /></span>
        <span className="lable">Add</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    gap: 6px;
    height: 38px; /* mobile default */
    width: 85px;  /* mobile default */
    border: none;
    background: #ff6b35;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    transition: background 0.3s ease;
  }

  .lable {
    line-height: 20px;
    font-size: 13px; /* mobile default */
    color: #fff;
    margin-left: 12px;
    font-family: sans-serif;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .button .span {
    border-radius: 50%;
    background-color: #ff7c4e;
    padding: 7px;
    position: absolute;
    left: 0;
  }

  .button:hover {
    background: #ff7c4e;
  }

  .button:hover .svg-icon {
    animation: slope 0.8s linear infinite;
  }

  @keyframes slope {
    50% {
      transform: rotate(15deg);
    }
  }

  /* 📱 Responsive scaling */
  @media (min-width: 480px) {
    .button {
      height: 42px;
      width: 95px;
    }
    .lable {
      font-size: 15px;
      margin-left: 16px;
    }
    .button .span {
      padding: 8px;
    }
  }

  @media (min-width: 768px) {
    .button {
      height: 45px;
      width: 105px;
    }
    .lable {
      font-size: 17px;
      margin-left: 20px;
    }
    .button .span {
      padding: 10px;
    }
  }
`;

export default Button;