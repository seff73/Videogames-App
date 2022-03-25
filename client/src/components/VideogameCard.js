import { Link } from 'react-router-dom'


export default function VideogameCard({ name, img, genres, id }) {

  
  return (
    <div>
        <Link 
              style={{
                    textDecoration: 'none'

              }}
              to={`/videogames/${id}`}

              
        >
              
        <h4>{name}</h4>
        
        <img style={{
                width: '180px',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '10px'         
            }}
            src={img} 
            alt='img-game'/>
        </Link>
        <p>Genres:{<br/>}{genres}</p>
    </div>
  )
}
