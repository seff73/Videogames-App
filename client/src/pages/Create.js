import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import img from "../assets/defaultGameImg.png";
import star1 from "../assets/star1.jpg";
import star2 from "../assets/star2.jpg";
import star3 from "../assets/star3.jpg";
import star4 from "../assets/star4.jpg";
import star5 from "../assets/star5.jpg";
import { getGenres, getPlatforms, postGame } from "../redux/actions";

export default function Create() {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres);
  const allPlatforms = useSelector(state => state.platforms);
  const navigateTo = useNavigate();
  const [ showGenres, setShowGenres ] = useState('none');
  const [ showPlatf, setShowPlatf ] = useState('none')
  const [ showImg, setShowImg ] = useState("")
  const [ data, setData ] = useState({
                              name: "",
                              description: "",
                              released: "",
                              rating: "",
                              background_image: "",
                              genres: [],
                              platforms: [],
                              createInDb: true
                            });
  const [btnShow, setBtnShow ] = useState({btnGenres: 'show', btnPlatf: 'show'});
  
  const [ imgFile, setImgFile ] = useState(img);

  const [ myPlatforms, setMyPlatforms ] = useState(allPlatforms);
  const [ myGenres, setMyGenres ] = useState(allGenres)//allGenres? allGenres.filter(genre => genre.name):false);
  const [ showCreate, setShowCreate ] = useState('true');
  const [stars, setStars ] = useState(null);

  

  

  
  const handleShow = (e) => {
    e.preventDefault();
    if(e.target.value === "genr") {
      showGenres === "none"?
      setShowGenres("block")
      : setShowGenres("none");
      
      btnShow.btnGenres === 'show'?
      setBtnShow({
        ...btnShow,
        btnGenres: 'hide'
      })
      : setBtnShow({
        ...btnShow,
        btnGenres: 'show'
      })
    if(!myGenres){
      setMyGenres(allGenres)
    }
    
    }
    else {
      showPlatf === "none"?
      setShowPlatf("block")
      : setShowPlatf("none")


      btnShow.btnPlatf === 'show'?
      setBtnShow({
        ...btnShow,
        btnPlatf: 'hide'
      })
      : setBtnShow({
        ...btnShow,
        btnPlatf: 'show'
      })
    if(!myPlatforms){
      setMyPlatforms(allPlatforms)
    }
    }
    
  };
  
  const handleOnChange = (e) => {
    !e.target.value.replace(" ", "") ?
    setData({
      ...data,
      [e.target.name]: ""
    }) :
    setData({
      ...data,
      [e.target.name]: e.target.value.replace('  ', "")
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if(data[e.target.name].includes(e.target.value)) {
      setData({
        ...data,
        [e.target.name]: data[e.target.name].filter(ele => ele !== e.target.value)
      });
      
      e.target.name === 'genres'?
      setMyGenres(
        allGenres.filter(genre =>
          myGenres.includes(genre) || genre === e.target.value )) :
      
      setMyPlatforms(
        allPlatforms.filter(platf => 
          myPlatforms.includes(platf) || platf === e.target.value))
      
     
     
    }
    else if(data[e.target.name].length <= 4) {
           
      setData({
        ...data,
        [e.target.name]: [...data[e.target.name], e.target.value]
      })
      
      e.target.name === 'genres'?
      setMyGenres(
        myGenres.filter(genre => genre !== e.target.value)) :
      
        setMyPlatforms(
        myPlatforms.filter(platf => platf !== e.target.value)
      )
      
    }
    
  };

  
  
  const handleImg = (e) => {
    console.log(e.target.value)
   setShowImg(e.target.value)
       
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const file = (formData.get('imagen'))
    if(file.name){
    setImgFile(URL.createObjectURL(file))
    };
    
    
  };

  const handleRemoveimg = (e) => {
    e.preventDefault();
    setImgFile(img);
    setShowImg("")
  }

  

  const handlePrueba = (e)=>{
    setData({
      name: "",
      description: "",
      released: "",
      rating: "",
      background_image: "",
      genres: [],
      platforms: [],
      createInDb: true
    })
    handleRemoveimg(e);
  };

  

  useEffect(()=>{
    if(!allGenres) {dispatch(getGenres());}    
    
    if(!allPlatforms) dispatch(getPlatforms());
    
    //setMyGenres(allGenres?.filter(genre => genre.name));
  
    if(data.name && data.description && data.genres.length && data.platforms.length) {
      setShowCreate('');
    }
    else{
    setShowCreate('true');
    };

    if(data.rating>0 && data.rating<2){
      setStars(star1);
    }
    else if(data.rating>=2 && data.rating<3){
        setStars(star2);
    }
    else if(data.rating>=3 && data.rating<4){
        setStars(star3);
    }
    else if(data.rating>=4 && data.rating<5){
        setStars(star4)
    }
    else if(data.rating>=5){
        setStars(star5)
    }

    
    

  },[data, stars, dispatch ]);

  

  /*const handleOnReleased = (e) =>{
    let today = new Date();
    console.log(today)
    console.log(e.target.value)
  }*/

  const handleRating = (e) => {
    if(e.target.value > 0 && e.target.value <= 5){
      if(e.target.value.length > 4) {
        setData({
          ...data,
          rating: parseFloat(e.target.value).toFixed(2)
        });
      }
      else{
        setData({
          ...data,
          rating: e.target.value
        });
      } 
    }
    else {
      setData({
        ...data,
        rating: "",
      })
    } 
    
  }

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(postGame(data))
    navigateTo('/videogames/postcreated')
    
  };

  


  return (
    <div>
    {allGenres? 
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      <div style={{marginLeft: 'auto'}}><h2>Create Game</h2>
        <form id='myform' onChange={handleSubmit}>
            <label>Name: </label><br/>
            <input type="text" name="name" maxLength="80" onChange={handleOnChange} value={data.name} />
            <br/><br/>
            
            <label>Description: </label><br/>
            <textarea name="description" maxLength="1000" onChange={handleOnChange} value={data.description} />
            <br/>     

            <label>Released: </label><br/>
            <input type="date" name="released" min="01-01-1970" onChange={handleOnChange} value={data.released} />
            <br/>

            <label>Ratin: </label><br/>
            <input type="number" 
                   step="0.01"  min="0" max="5" 
                   name="rating" placeholder="Max 5.00"
                   onChange={handleRating} value={data.rating}/>
            <br/>

            <label>Genres: </label>
            <button onClick={handleShow} value="genr">{btnShow.btnGenres}</button>
            <br/>
            <div>{data.genres?.map(genre => <button 
                          style={{
                              cursor: 'pointer',
                              border: 'none',
                              background: 'pink',
                              borderRadius: '2em',
                            
                     
                           }}
                           onClick={handleAdd}
                           name="genres"
                           value={genre}
                           key={genre}
                           
                           
                  >{genre}</button>)}</div>
            <div style={{
                      width: '300px',
                      margin: 'auto',
                      display: showGenres
                  }}
            >
                {myGenres?.map(genre => 
                        
                  <button style={{
                              cursor: 'pointer',
                              border: 'none',
                              background: 'lightblue',
                              borderRadius: '2em'
                          }}
                          onClick={handleAdd}
                          name="genres"
                          value={genre}
                          key={genre}
                          
              
                   
                  >{genre} 
                  </button>
                    
                    
                )}
            </div>
            <br/>

            <label>Platforms: </label>
            <button value="platf" onClick={handleShow}>{btnShow.btnPlatf}</button>
            <br/>
            {data.platforms?.map(platf => <button 
                          style={{
                              cursor: 'pointer',
                              border: 'none',
                              background: 'pink',
                              borderRadius: '2em',
          
                     
                           }}
                           onClick={handleAdd}
                           name="platforms"
                           value={platf}
                           key={platf}
                           
                           
                           
                  >{platf}</button>/*<div>{data.platforms.join(' - ')}*/)}
                
            
            
            <div style={{
                      width: '300px',
                      margin: 'auto',
                      display: showPlatf
                  }}
                  
            >
                {myPlatforms?.map(platf => 
                        
                  <button 
                          style={{
                              cursor: 'pointer',
                              border: 'none',
                              background: 'lightblue',
                              borderRadius: '2em'
                     
                           }}
                           onClick={handleAdd}
                           name="platforms"
                           value={platf}
                           key={platf}
                           
                           
                  >{platf}</button>
                  
                  
                    
                    
                )}
            </div>
            <br/>
                        
            <label>Image: </label>
            <br/>
            
            <div 
          ><input type="file" 
                   accept="image/*"
                   onChange={handleImg}
                   name="imagen"
                   value={showImg}
                   
                   
                  
            /></div>{imgFile !== img?<button onClick={handleRemoveimg}>Remove</button>:false}
            <br/>
            <br/>

            <button type="reset"  onClick={handlePrueba} value="reset"/*onClick={handleCancel}*/> Reset </button>
            <button type="submit" disabled={showCreate} onClick={handleCreate}> Create </button>
            <br/>
            <br/>
            

        </form>
      </div>

      <div>
          <h3>Preview</h3>
          <h4>{data.name}</h4>
        
        <img style={{
                width: '180px',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '10px'         
            }}
            src={imgFile} 
            alt='img-game'/>
        <br/>
        {data.rating >=1?
        <img src={stars} alt="rating-img"/>
        :false}

        {data.rating >= 0.01? 
        <p>Rating: {data.rating}</p>
        :false}
        

        {data.genres.length?
        <p>Genres:{<br/>}{data.genres.join(' - ')}</p>
        :false}
        
        {data.released?
        <p>Released: {data.released}</p>
        :false}

        {data.description?
        <div style={{width: '50%', margin: 'auto'}}>
            <p>Description: </p>
            <p>{data.description}</p>
        </div>
        :false}

        {data.platforms.length?
        <p>Platforms:{<br/>} {data.platforms.join(' - ')}</p>
        :false}
        <br/>
       

      </div>
        
    </div>
    :false}

    
  </div>  
  )
}
