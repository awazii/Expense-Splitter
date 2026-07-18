import React from 'react';
import styled from 'styled-components';

const Input = ({ variant, width, type , value, onChange ,fieldState ,onKeyDown }) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input required type={type} name="text" autoComplete="off" className={`input ${width}`}  value={value} onChange={onChange} onKeyDown={onKeyDown} />
        <label className="user-label">{variant}</label>
          {fieldState?.error && <p className='text-red-600 text-sm mt-2'>{fieldState.error.message}</p>}  
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input-group {
   position: relative;
  }

  .input {
   border: solid 1.5px #c4cad1;
   border-radius: 1rem;
   background: none;
   padding:.9rem;
   font-size: 1rem;
   color: black;
   transition: border 150ms cubic-bezier(0.4,0,0.2,1);
  }
   
  .user-label {
   position: absolute;
   left: 15px;
   color: #484848;
   pointer-events: none;
   transform: translateY(1rem);
   transition: 150ms cubic-bezier(0.4,0,0.2,1);
  }

  .input:focus, input:valid {
   outline: none;
   border: 1.5px solid #ff6b35;
  }

  .input:focus ~ label, input:valid ~ label {
   transform: translateY(-50%) scale(0.8);
   background-color: white;
   padding: 0 .2em;
   color:#ff6b35;
  }`;

export default Input;
