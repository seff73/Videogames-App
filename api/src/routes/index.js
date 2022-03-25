const { Router } = require('express');
const axios = require('axios');
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiGames = async () => {
    const pages = [
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    ];

    const getPages = await Promise.all(pages);
    const pagesResult = getPages.map(page => page.data.results);
    const apiGames = pagesResult.flat().map(game => {
        return {
            id: game.id,
            name: game.name,
            rating: game.rating,
            background_image: game.background_image,
            platforms: game.platforms.map(ele => ele.platform.name),
            genres: game.genres.map(ele => ele.name)
        }
    });
    return apiGames;
};

const getDbGames = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }

        }
    });    
    
};

const getAllGames = async () => {
    const apiAllGames = await getApiGames();
    const dbAllGames = await getDbGames(); 

    const allGames = dbAllGames.concat(apiAllGames);
    
    return allGames;
};

const arrPlatforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo"
];

router.get('/videogames', async (req, res) => {
    let { name } = req.query;
    const totalGames = await getAllGames();
    

    /*const totalPlatforms = totalGames.map(game => game.platforms).flat();
    myPlatforms = new Set(totalPlatforms);
    platResult = [...myPlatforms]

    console.log(platResult.length);*/

    if(name) {
        nameToRe = new RegExp(`\\b${name}\\b`, 'i') // ---> /{name}/i 
        let resultsName = totalGames.filter(game => game.name.match(nameToRe));
        if ( resultsName.length ) {
        res.status(200).send(resultsName) }
        else {
        const getGamesQuery = await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`);
        //console.log(getGamesQuery.data.results)
        if(getGamesQuery.data.results){
        const gamesResults = getGamesQuery.data.results.map(game => {

            return {
                id: game.id,
                name: game.name,
                rating: game.rating,
                background_image: game.background_image,
                platforms: game.platforms && game.platforms.map(ele => ele.platform.name),
                genres: game.genres && game.genres.map(ele => ele.name)
            }
        });
        gamesResults.length ?
        res.status(200).send(gamesResults) :   
        res.status(404).send('Sorry, cant find that');
        }
    }   
    } else {
        res.status(200).send(totalGames);

    }

});

router.get('/genres', async (req, res) => {
    const getApiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    getApiGenres.data.results.map(genre => {
        Genre.findOrCreate({
            where: { name: genre.name }

        });
    })
    const allGenres = await Genre.findAll()
    //console.log(allGenres)
    res.status(200).send(allGenres)
});

router.get('/videogames/:id', async (req, res) => {
    const { id } = req.params;
    const dbGames = await getDbGames();
    if(id) {
        game = dbGames.filter(game => game.id === id);
        if(game.length) {
        res.status(200).send(game[0])
    }

    /*else if(id.toString().includes('-')) {
            game = dbGames.filter(game => game.id === id);
            if(game.length) {
            res.status(200).send(game[1])
            //console.log(game)
            }
    }*/
    else if(id){
            const getDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const { name, description_raw, released, background_image, rating, platforms, genres } = getDetail.data
            const gamesDetail = {
                                     id,
                                     name,
                                     description: description_raw,
                                     released,
                                     background_image,
                                     rating,
                                     platforms: platforms.map(ele => ele.platform.name),
                                     genres: genres.map(ele => ele.name)
            };
            gamesDetail?
            res.status(200).send(gamesDetail) :
            res.status(404).send('Not found videogame')
    }



    }

});

router.get('/platforms', (req, res) => {
    res.status(200).send(arrPlatforms);

});

router.post('/videogames', async (req, res) => {
    const { name, description, released, rating, genres, platforms, createdInDb } = req.body;
    //validation game
    const totalGames = await getAllGames();
    const duplicateGame = totalGames.filter(game => game.name.toLowerCase() === name.toLowerCase())
    
    if(duplicateGame.length) {
        res.status(200).send('Sorry, this game already exist')
    }

    else {
        const gameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        createdInDb 
        });

        const genreDb = await Genre.findAll({ where: {name: genres} });
        gameCreated.addGenre(genreDb)

        res.status(200).send('Videogame created successfully')
    }

});

router.delete('/videogames/:id', async (req, res) => {
    const { id } = req.params;

    if(id) {
        const deleted = await Videogame.destroy({
            where: {id: id}
        })
    };
    res.status(200).send('Videogame deleted successfully')
});

router.put('/videogames/:id', async (req, res) => {
    const { id } = req.params
    const { name, description, released, rating, genres, platforms, createdInDb } = req.body; 
    const dbGames = await getDbGames();;
    if(dbGames) {
        let dbGame = dbGames.filter(game => game.id === id);
        dbGame[0].set({
                    name,
                    description,
                    released,
                    rating,
                    platforms,
                    createdInDb
        });
        await dbGame[0].save();
        await dbGame[0].setGenres([]);
        const genreDb = await Genre.findAll({ where: {name: genres} });
        dbGame[0].setGenres(genreDb)
        await dbGame[0].save();

        res.status(200).send('Videogame updated successfully')
        
    }
})



/*router.get('/platforms', async (req, res) => {
    const getApiPlatforms = await axios(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    const apiPlatforms = getApiPlatforms.data.results.map(platform => platform.name)
    res.status(200).send(apiPlatforms);
}); */



module.exports = router;
