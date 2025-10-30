import React from 'react';
import styled from 'styled-components';

const Input = ({variant}) => {
  return (
    <StyledWrapper>
      <div className="form__group field ">
        <input type="input" className="form__field" placeholder={variant} required />
        <label htmlFor="name" className="form__label">{variant}</label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form__group {
    position: relative;
    padding: 20px 0 0;
    width: 100%;
    width: 280px;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #c4cad1;
    outline: 0;
    font-size: 17px;
    color: black;
    padding: 3px 0;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #484848;
    pointer-events: none;
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 2px;
    border-image: linear-gradient(
    to right,
    #e65a20,   
    #ff6b35,   
    #ff814f
  ) 1;
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #ff6b35;
    font-weight: 700;
  }

  /* reset input */
  .form__field:required, .form__field:invalid {
    box-shadow: none;
  }`;

export default Input;
