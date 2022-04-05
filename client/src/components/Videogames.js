import VideogameCard from './VideogameCard/VideogameCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../redux/actions';
import img from "../assets/defaultGameImg.png";


export default function Videogames({pagina}) {
   const dispatch = useDispatch();
   const allGames = useSelector(state => state.videogames);

   const [currentPage, setCurrentPage] = useState(0);


   useEffect(()=> {
    
    if(!allGames) {dispatch(getGames());}
     
    if(pagina === 0) {
     setCurrentPage(0);
    }
         
   },[dispatch, allGames, pagina]);




//console.log('pagina:'+pagina)

let page = 1
const handlePage = (e) => {
  if(pagina) {
    setCurrentPage(e.target.value);
  }
  else {
    page = 1;
    setCurrentPage(e.target.value);
  }

  

}

/*const handleGenres = (game) => {
  
  if(game.createdInDb) {
    return game.genres.join(' - ')//return game.genres.map(genre=>genre.name).join(' - ')
  }
  else {
    return game.genres.join(' - ')
  }
}*/
//console.log('current:'+currentPage);




  return (
    <div>
      

      <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.8fr 1.8fr 2fr',
              marginTop: '20px'
           }}
           key='videogames1'
      > 
        {allGames? allGames[currentPage]?.map(game =>
            <VideogameCard 
                key={game.name}
                name={game.name}
                img={game.background_image || img }
                genres={game.genres?.join(' - ')}//handleGenres(game)}
                rating={game.rating}
                
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
