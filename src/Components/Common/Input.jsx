import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdClear } from "react-icons/md";

const Input = React.memo(({ variant, queryOptions, setqueryOptions }) => {
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {  
        setqueryOptions(prev => ({
          ...prev,
          Search: {
            value: searchInput.trim()===""? '': searchInput,
          }
        }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, setqueryOptions]);

  return (
    <StyledWrapper className="w-full">
      <div className="form border-b-1 border-b-light w-full">
        <input 
          className="input pr-8" 
          placeholder={`Search ${variant} `} 
          required 
          type="text" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
        <span className="input-border" />
        
        {searchInput.trim() !== '' && (
          <button 
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-2' 
            title='Clear' 
            onClick={() => setSearchInput('')}
          >
            <MdClear className='size-5 text-text-secondary hover:text-primary transition-colors' />
          </button>
        )}
      </div>
    </StyledWrapper>
  );
})

const StyledWrapper = styled.div`
  width: 100%; 
  
  .form {
   --border-height: 1px;
   --border-before-color: #c4cad1;
   --border-after-color: #ff6b35; 
   --input-hovered-color: #4985e01f;
   position: relative;
   width: 100%; 
   max-width: 500px; 
  }
  
  .input {
   color:  #484848;
   font-size: 0.9rem;
   background-color: transparent;
   width: 100%; 
   box-sizing: border-box;
   padding-inline: 0.5em;
   padding-block: 0.4em;
  }
  
  input::placeholder {
   color:  #6B7280;
  }
  
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
  }
`;

export default Input;