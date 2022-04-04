import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGames, postGame } from "../redux/actions";


export default function PostCreated() {
    

    const createResult = useSelector(state => state.createdRes);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(getGames())
        return postGame(0);   
    }, [dispatch]);

  return (
    <div>
      <h1>{createResult}</h1>
      <button onClick={()=> navigateTo('/home')}>Home</button>
    </div>
  )
}
