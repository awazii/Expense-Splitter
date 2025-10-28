import React ,{useState ,useEffect} from 'react';
import styled from 'styled-components';
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
const Checkbox = ({pin,setpin ,name}) => {
  return (
    <StyledWrapper>
      <label className="container actions-i hover:bg-primary relative">
        <input checked={pin} type="checkbox" onChange={()=>{
          setpin(!pin)
        }}/>
       { !pin ? <TbPinnedFilled className='text-white rotate-45 size-6'/>:<TbPinnedOff className='text-white size-6'/>}
       <span >{pin?"Unpin":"Pin"} {name}</span>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container input {
    display: none;
  }
  .container {
    width: 40px;
    height: 40px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    transition : all .3s ease;
    &:hover{
    background:#ff6b35}
  }
  
  .container:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.041);
  }
    .container:hover svg{
    transform: rotate(-15deg)
    }
 `;

export default Checkbox;
