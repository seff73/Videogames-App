import { useSelector } from "react-redux";
import VideogameCard from "../components/VideogameCard/VideogameCard";
import img from "../assets/defaultGameImg.png";



export default function SearchGames() {
const gamesResult = useSelector(state => state.searchGames);




  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr'
    }}>
        {gamesResult? gamesResult.map(game => 

            <VideogameCard 
                key={game.name}
                name={game.name}
                img={game.background_image || img }
                genres={game.genres.join(' - ')}
                rating={game.rating}
                id={game.id}
            />

        ): false}
    </div>
  )
}
