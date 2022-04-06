import { useSelector } from "react-redux";
import VideogameCard from "../components/VideogameCard/VideogameCard";
import img from "../assets/defaultGameImg.png";



export default function SearchGames() {
const gamesResult = useSelector(state => state.searchGames);




  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
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
