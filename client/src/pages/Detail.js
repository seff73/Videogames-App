import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteGame, getDetail } from '../redux/actions';
import img from '../assets/defaultGameImg.png';
import star1 from "../assets/star1.jpg";
import star2 from "../assets/star2.jpg";
import star3 from "../assets/star3.jpg";
import star4 from "../assets/star4.jpg";
import star5 from "../assets/star5.jpg";



export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gameDetail = useSelector(state => state.videogame);
  const navigateTo = useNavigate();
  const [ stars, setStars ] = useState(null);
  
  

  useEffect(() => {
    dispatch(getDetail(id));
    
  

    return function(){
      dispatch(getDetail(0));
    }
    
    
  }, [dispatch, id, stars]);

  
  
  
  


  const handleGenres = () => {
    
    if(gameDetail.createdInDb) {
      return gameDetail.genres.map(genre=>genre.name).join(' - ')
    }
    else {
      return gameDetail.genres.join(' - ')
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    alert('This game will be deleted');
    dispatch(deleteGame(id));
    navigateTo('/videogames/postdeleted');
    
  }


  const handleEdit = (e) => {
    e.preventDefault();
    navigateTo(`/videogames/edit/${id}`)
  }

  return (
    <div>
      {gameDetail? 
      <div> 
        <h1>
          {gameDetail.name}
        </h1>

        <img style={{
                width: '600px',
                height: '400px',
                borderRadius: '1.5em',
                objectFit: 'fill'        
            }}
            src={gameDetail.background_image || img } 
            alt='img-game'
        />

        <p><b>Released:</b> {gameDetail.released}</p>
        <p><b>Description:</b> {gameDetail.description}</p>
      
        <p><b>Rating: </b>{gameDetail.rating}</p>
        
        <p><b>Platforms: </b>{gameDetail.platforms?.join(' - ')}</p>
        <p><b>Genres: </b>{handleGenres()}</p>
        <br/>
        
        {gameDetail.createdInDb?
        <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>

        </div>
        
        :false}
        <br/>
        

    </div>
    :false/*'Loading'*/}
    </div>
    
  )
}
