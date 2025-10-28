import React from 'react';
import styled from 'styled-components';
import { GoSearch } from "react-icons/go";
const Button = () => {
    return (
        <StyledWrapper>
            <button>
                <div className="svg-wrapper">
                    <GoSearch size={16} />
                </div>
                <span>Search</span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 14px;
    background: #ff6b35;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
    cursor: pointer;
    border: none;
    border-radius: 15px;
    font-weight: 1000;
  }

  button span {
    display: block;
    margin-left: 0.44em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
  
    transition: transform 0.3s ease-in-out;
  }

  button:hover {
    background: #1e1e1e ;
  }

  button:hover .svg-wrapper {
    transform: scale(1.25);
    transition: 0.2s linear;
  }

  button:hover svg {
    transform: translateX(1.6em) scale(1.1);
    fill: #fff;
  }

  button:hover span {
    opacity: 0;
    transition: 0.2s linear;
  }

  button:active {
    transform: scale(0.95);
     transition: 0.2s linear;
  }`;

export default Button;
