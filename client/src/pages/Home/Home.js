import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByCreator, getByGenres, getByRating, getBySort, getGenres, getPlatforms } from '../../redux/actions';
import Videogames from '../../components/Videogames';


export default function Home() {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres);
  const allGames = useSelector(state => state.videogames);
  const [ stateBy, setStateBy ] = useState({sort: 'Featured', genres: 'All', rating: 'All', creator: 'All'});
  const [ pagina, setPagina ] = useState(1);


  useEffect(()=> {
      if(!allGenres) dispatch(getGenres());
      if(!allGames) dispatch(getPlatforms());
      

  },[dispatch, pagina,]);

  
  const handleByGenres = (e) => {
    dispatch(getByGenres(e.target.value));
    dispatch(getBySort(stateBy.sort));
    dispatch(getByRating(stateBy.rating));
    dispatch(getByCreator(stateBy.creator));
    setPagina(0);
    

    
    setStateBy({
      ...stateBy,
      genres: e.target.value,
    });
    
  };

  const handleOrder = (e) => {     
    dispatch(getByGenres(stateBy.genres));
    dispatch(getBySort(e.target.value));
    dispatch(getByRating(stateBy.rating));
    dispatch(getByCreator(stateBy.creator));

    
    setStateBy({
      ...stateBy,
      sort: e.target.value,
    });

  
  
  };

  const handleByRating = (e) => {
    dispatch(getByGenres(stateBy.genres));
    dispatch(getBySort(stateBy.sort));
    dispatch(getByRating(e.target.value));
    dispatch(getByCreator(stateBy.creator));

    
    setStateBy({
      ...stateBy,
      rating: e.target.value,
    });



  };

  const handleByCreator = (e) =>{
    dispatch(getByGenres(stateBy.genres));
    dispatch(getBySort(stateBy.sort));
    dispatch(getByRating(stateBy.rating));
    dispatch(getByCreator(e.target.value));

    setStateBy({
      ...stateBy,
      creator: e.target.value
    });
  };

  return (
    <div style={{ //backgroundImage: `url(${background})`,
     // background: '#f5f5f5',
    backgroundSize: 'cover',
    //backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',}}
    >
     

        <label key='sortBy'>Sort by: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleOrder}
                key='selectSortBy'
        >
          <option value='Featured' key='Feat'>Featured</option>
          <option value='A-Z' key='sAZ'>A-Z</option>
          <option value='Z-A' key='sZA'>Z-A</option>
        </select>
        
        <label key='genres'>Genres: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByGenres}
                key='selectGenres'
        >
          <option key='gAll'>All</option>
          {allGenres? allGenres.map(genre =>
            <option value={genre} key={genre}>{genre}</option>
          ): false}          
        </select>

        <label key='createdBy'>Created by: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByCreator}
                key='selectCreatedBy'
        >
          <option value='All' key='cAll'>All</option>
          <option value='API' key='cApi'>API</option>
          <option value='USERS' key='cUsers'>Users</option>
          
        </select>
        
        <label key='rating'>Rating: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByRating}
                key='selectRating'
        >
          <option value='All' key='RAll'>All</option>
          <option value={5} key='R5'>5 Stars</option>
          <option value={4} key='R4'>4 Stars</option>
          <option value={3} key='R3'>3 Stars</option>
          <option value={2} key='R2'>2 Stars</option>
          <option value={1} key='R1'>1 Star</option>
        </select>
        
        <Videogames pagina={pagina} key='videogamesContent'/>
    </div>
  )
}
