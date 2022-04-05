import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import star1 from "../../assets/star1.jpg";
import star2 from "../../assets/star2.jpg";
import star3 from "../../assets/star3.jpg";
import star4 from "../../assets/star4.jpg";
import star5 from "../../assets/star5.jpg";
import styles from './VideogameCard.module.css';


export default function VideogameCard({ name, img, genres, id, rating }) {
  const [ stars, setStars ] = useState(null)
  
  
  useEffect(() => {
    if (rating >= 1 && rating < 2) {
      setStars(star1);
    }
    else if(rating >=2 && rating <3) {
      setStars(star2)
    }
    else if(rating >=3 && rating <4){
      setStars(star3)
    }
    else if(rating >=4 && rating <5){
      setStars(star4)
    }
    else if(rating >= 5) {
      setStars(star5)
    };
  }, [stars, rating]);
  
  
  return (
    <div className={styles.gameCardContent}>
        <Link 
              style={{
                    textDecoration: 'none'

              }}
              to={`/videogames/${id}`}

              
        >
              
        
        
        <img  className={styles.gameImg} 
              
              src={img} 
              alt='img-game'/>
        <h4 className={styles.h1Title}>{name}</h4>
        
        {rating >=1?
        <img style={{width: '100px', height: 'auto'}} src={stars} alt="rating-img"/>
        :false}
        <p className={styles.genres}>Genres:{<br/>}{genres}</p>
        </Link>
    </div>
  )
}
