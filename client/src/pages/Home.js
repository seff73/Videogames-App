import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByCreator, getByGenres, getByRating, getBySort, getGenres, getPlatforms } from '../redux/actions';
import Videogames from '../components/Videogames';

export default function Home() {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres);
  const allGames = useSelector(state => state.videogames);
  const [ stateBy, setStateBy ] = useState({sort: 'Featured', genres: 'All', rating: 'All', creator: 'All'});
  const [ pagina, setPagina ] = useState(1);


  useEffect(()=> {
      if(!allGenres) dispatch(getGenres());
      if(!allGames) dispatch(getPlatforms());
  },[dispatch, pagina]);

  
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
    <div>
     

        <label>Sort by: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleOrder}
        >
          <option value='Featured'>Featured</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>
        
        <label>Genres: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByGenres}
        >
          <option>All</option>
          {allGenres? allGenres.map(genre =>
            <option value={genre.name}>{genre.name}</option>
          ): false}          
        </select>

        <label>Created by: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByCreator}
        >
          <option value='All'>All</option>
          <option value='API'>API</option>
          <option value='USERS'>Users</option>
          
        </select>
        
        <label>Rating: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}
                onChange={handleByRating}
        >
          <option value='All'>All</option>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
        
        <Videogames pagina={pagina}/>
    </div>
  )
}
