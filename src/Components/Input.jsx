import React from 'react';
import styled from 'styled-components';

const Input = ({variant}) => {
  return (
    <StyledWrapper>
      <div className="form ">
        <input className="input" placeholder={`Search ${variant} `} required type="text" />
        <span className="input-border" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
   --width-of-input: 500px;
   --border-height: 1px;
   --border-before-color: #c4cad1;
   --border-after-color: #ff6b35;
   --input-hovered-color: #4985e01f;
   position: relative;
   width: var(--width-of-input);
  }
  .input {
   color:  #484848;
   font-size: 0.9rem;
   background-color: transparent;
   width: 100%;
   box-sizing: border-box;
   padding-inline: 0.5em;
   padding-block: 0.4em;
   border: none;
   border-bottom: var(--border-height) solid var(--border-before-color);
  }
   input::placeholder {
   color:  #6B7280;}
  .input-border {
   position: absolute;
   background: var(--border-after-color);
   width: 0%;
   height: 2px;
   bottom: 0;
   left: 0;
   transition: 0.3s;
  }
  input:focus {
   outline: none;
  }
  input:focus ~ .input-border {
   width: 100%;
  }`;

export default Input;
