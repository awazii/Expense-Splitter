import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button type="submit" className='shadow-lg'>
        <span className="span-mother">
          <span>A</span>
          <span>D</span>
          <span>D</span>
        </span>
        <span className="span-mother2">
          <span>S</span>
          <span>p</span>
          <span>l</span>
          <span>i</span>
          <span>t</span>
          <span>M</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-weight: bold;
    color: white;
    border-radius: .9rem;
    cursor: pointer;
    width: 120.02px;
    height: 45.66px;
    border: none;
    background-color: #ff6b35;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
     gap:1px;
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.3em);
  }

  button .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  button .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
     gap:1px;
  }

  button .span-mother2 span {
    transform: translateY(-1.3em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span {
    transition: 0.2s;
  }

  button .span-mother2 span:nth-child(2) {
    transition: 0.25s;
  }

  button .span-mother2 span:nth-child(3) {
    transition: 0.3s;
  }

  button .span-mother2 span:nth-child(4) {
    transition: 0.3.5s;
  }

  button .span-mother2 span:nth-child(5) {
    transition: 0.4s;
  }

  button .span-mother2 span:nth-child(6) {
      transition: 0.45s;
    }
    button .span-mother2 span:nth-child(7) {
      transition: 0.5s;
    }
     button .span-mother2 span:nth-child(8) {
      transition: 0.55s;
    }

    button .span-mother2 span:nth-child(9) {
      transition: 0.6s;
    }
   `;

export default Button;

