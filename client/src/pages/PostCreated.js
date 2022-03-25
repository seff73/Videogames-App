import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postGame } from "../redux/actions";


export default function PostCreated() {
    
    const [ created, setCreated ] = useState(null)
    const createResult = useSelector(state => state.createdRes);
    const navigateTo = useNavigate();


    useEffect(()=> {
        return postGame(0);
    })

  return (
    <div>
      <h1>{createResult}</h1>
      <button onClick={()=> navigateTo('/home')}>Home</button>
    </div>
  )
}
