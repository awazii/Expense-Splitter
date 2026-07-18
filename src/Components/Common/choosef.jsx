import React from 'react';
import styled from 'styled-components';

const Radio = ({ setisPinselected }) => {
  const options = [
    { value: "All" },
    { value: "Pinned" },
  ];
  return (
    <StyledWrapper>
      <div className="radio-inputs bg-neutral-100">
       { options.map((option, index) => (
          <label key={index} className="radio1">
            <input type="radio" name="radio1" defaultChecked={option.value === "All"}  onChange={() => setisPinselected(option.value === "Pinned")} />
            <span className="name">{option.value}</span>
          </label>
        )) }
      </div>
   </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    gap: clamp(3px, 1vw, 5px);
    border-radius: 0.5rem;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.20rem;
    width: 100%;
    max-width: 170px;
    min-width: 140px;
    font-size: clamp(11px, 2.2vw, 14px);
    margin: 4px 3px;
  }

  .radio-inputs .radio1 {
    flex: 1 1 0;
    min-width: 0;
    text-align: center;
  }

  .radio-inputs .radio1 input {
    display: none;
  }

  .radio-inputs .radio1 .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.25rem clamp(2px, 1vw, 6px);
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .radio-inputs .radio1 input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }

  /* Hover effect */
  .radio-inputs .radio1:hover .name {
    background-color: rgba(255, 255, 255, 0.5);
  }

  /* Animation */
  .radio-inputs .radio1 input:checked + .name {
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: select 0.3s ease;
  }

  @keyframes select {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Radio;