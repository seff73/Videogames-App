import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchGame } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
const navigateTo = useNavigate();
const dispatch = useDispatch();
const [searchInput, setSearchInput] = useState('')

const handleOnchange = (e) => {
    setSearchInput(e.target.value);
}

const handleSearch = () => {
    if(searchInput) {
      dispatch(searchGame(0)); 
      dispatch(searchGame(searchInput));
      navigateTo(`/search?name=${searchInput}`);
      setSearchInput('');
    }
}

const handleOnKey = (e) => {
  if(e.key === 'Enter') {
    handleSearch();
  }
}

  return (
    <div>
        
        <input type='text'
               value={searchInput} 
               placeholder= ' Find your game...'
               style= {{
                 width: '600px',
                 height: '30px',
                 borderRadius: '8px'
               }}
               onChange={handleOnchange}
               onKeyDown={handleOnKey}
               
        />
        
            <button style={{
                  height: '35px',
                  borderRadius: '8px',
                  backgroundColor: '#fcbb6a',
                  cursor: 'pointer'
                }}
                onClick={handleSearch}
            >Search
            </button>
        
      
    </div>
  )
}
