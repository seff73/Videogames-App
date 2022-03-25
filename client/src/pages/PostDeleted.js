import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PostDeleted() {
    const deleted = useSelector(state => state.deletedRes);
    const navigateTo = useNavigate();


    

  return (
    <div>
      <h1>{deleted}</h1>
      <button onClick={()=> navigateTo('/home')}>Home</button>
    </div>
  )
  
}
