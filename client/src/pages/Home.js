import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms } from '../redux/actions';
import Videogames from '../components/Videogames';

export default function Home() {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres);
  const allGames = useSelector(state => state.videogames)

  useEffect(()=> {
      if(!allGenres) dispatch(getGenres());
      if(!allGames) dispatch(getPlatforms());
  },[dispatch]);

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
        >
          <option>Featured</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        
        <label>Genres: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}>
          <option>All</option>
          {allGenres? allGenres.map(genre =>
            <option>{genre.name}</option>
          ): false}          
        </select>

        <label>Created by: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}>
          <option>All</option>
          <option>Users</option>
        </select>
        
        <label>Rating: </label>
        <select style={{
                    border: 'none',
                    textAlign: 'center',
                    background: '#caf0f8',
                    borderRadius: '5px',
                    marginRight: '10px'
                }}>
          <option>All</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
        
        <Videogames />
    </div>
  )
}
