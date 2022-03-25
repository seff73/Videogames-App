import VideogameCard from './VideogameCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from '../redux/actions';
import img from "../assets/defaultGameImg.png";

export default function Videogames() {
   const dispatch = useDispatch();
   const allGames = useSelector(state => state.videogames);

   useEffect(()=> {
      dispatch(getGames());
      
   },[dispatch]);




//console.log(allGames)

const [currentPage, setCurrentPage] = useState(0);
let page = 1
const handlePage = (e) => {
  setCurrentPage(e.target.value)
  

}

const handleGenres = (game) => {
  
  if(game.createdInDb) {
    return game.genres.map(genre=>genre.name).join(' - ')
  }
  else {
    return game.genres.join(' - ')
  }
}
//console.log(currentPage);



  return (
    <div>
      

      <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr'
      }}>
        {allGames? allGames[currentPage].map(game =>
            <VideogameCard 
                key={game.name}
                name={game.name}
                img={game.background_image || img }
                genres={handleGenres(game)}
                
                id={game.id}
                            
            /> 
        ):false /*'Loading...'*/}
        </div>

        {allGames? <div key='pagination-bar'
           style={{
             border: 'solid',
             width: '450px',
             height: '50px',
             borderColor: 'gainsboro',
             margin: 'auto',
             borderRadius: '8px', 
             marginTop: '10px',
             marginBottom: '20px'
           }}
           >{allGames? allGames.map(pag => 
      <button key={allGames.indexOf(pag)}
              style={{
                height: '100%',
                padding: '15px',
                cursor: 'pointer'
              }}
      
              onClick={handlePage}
              value={allGames.indexOf(pag)}>{page + allGames.indexOf(pag)}</button>
      ) :false}
      </div>: false}

    </div>
  )
}
