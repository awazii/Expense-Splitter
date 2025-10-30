import React from 'react';
import styled from 'styled-components';
import { MdOutlineGroupAdd } from "react-icons/md";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="button__icon-wrapper">
          <MdOutlineGroupAdd className="icon icon--main" />
          <MdOutlineGroupAdd className="icon icon--copy" />
        </span>
        New Group
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #ff6b35;
    color: #fff;
    border: none;
    border-radius: .75rem;
    font-weight: 600;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    position: relative;
    width: 25px;
    height: 25px;
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    color: #ff6b35;
    flex-shrink: 0;
  }

  .icon {
    position: absolute;
    transition: transform 0.3s ease-in-out;
  }

  .icon--main {
    transform: translate(0, 0);
  }

  .icon--copy {
    transform: translate(-150%, 150%);
  }

  .button:hover {
    background-color: #000;
  }

  .button:hover .button__icon-wrapper {
    color: #000;
  }

  .button:hover .icon--main {
    transform: translate(150%, -150%);
  }

  .button:hover .icon--copy {
    transform: translate(0, 0);
    transition-delay: 0.1s;
  }
`;

export default Button;