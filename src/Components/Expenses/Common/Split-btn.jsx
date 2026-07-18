import React from 'react';
import styled from 'styled-components';
import Loader from '../../Common/loader';
const Button = ({ Splitopt , isSubmitting }) => {
  const mother2 = Splitopt.split('');
  return (
    <StyledWrapper>
      <button type="submit" className='shadow-lg'>
        <div className={`loadercontainer absolute inset-0 flex items-center justify-center ${isSubmitting ? 'cursor-not-allowed bg-[#cc552a] rounded-[.9rem] ' : 'cursor-pointer'}`}>
          {isSubmitting && <Loader />}
        </div>
        {
          !isSubmitting && <>
           <span className="span-mother">
          <span>S</span>
          <span>P</span>
          <span>L</span>
          <span>I</span>
          <span>T</span>
        </span>
        <span className="span-mother2">
          {mother2.map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </span>
          </>
        }  
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
    width: clamp(100px, 30vw, 140.02px);
    height: clamp(36px, 10vw, 45.66px);
    border: none;
    background-color: #ff6b35;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
    gap: 1px;
    font-size: clamp(0.8rem, 3vw, 1rem);
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.3em);
  }
  button .span-mother span:nth-child(1) { transition: 0.2s; }
  button .span-mother span:nth-child(2) { transition: 0.3s; }
  button .span-mother span:nth-child(3) { transition: 0.4s; }
  button .span-mother span:nth-child(4) { transition: 0.5s; }
  button .span-mother span:nth-child(5) { transition: 0.6s; }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
    gap: 1px;
    font-size: clamp(0.6rem, 2.4vw, 0.85rem);
    max-width: 90%;
  }

  button .span-mother2 span {
    transform: translateY(-1.3em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }
  button .span-mother2 span:nth-child(1) { transition: 0.2s; }
  button .span-mother2 span:nth-child(2) { transition: 0.25s; }
  button .span-mother2 span:nth-child(3) { transition: 0.3s; }
  button .span-mother2 span:nth-child(4) { transition: 0.35s; }
  button .span-mother2 span:nth-child(5) { transition: 0.4s; }
  button .span-mother2 span:nth-child(6) { transition: 0.45s; }
  button .span-mother2 span:nth-child(7) { transition: 0.5s; }
  button .span-mother2 span:nth-child(8) { transition: 0.55s; }
  button .span-mother2 span:nth-child(9) { transition: 0.6s; }
  button .span-mother2 span:nth-child(10) { transition: 0.65s; }
  button .span-mother2 span:nth-child(11) { transition: 0.7s; }
  button .span-mother2 span:nth-child(12) { transition: 0.75s; }
  button .span-mother2 span:nth-child(13) { transition: 0.8s; }
`;

export default Button;