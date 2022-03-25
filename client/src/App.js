import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home'
import Create from './pages/Create';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import SearchGames from './pages/SearchGames';
import PostCreated from './pages/PostCreated';
import PostDeleted from './pages/PostDeleted';
import EditGame from './pages/EditGame';

function App() {
  return (
    <Router>
      <div className="App">        
        <Routes>

            <Route path='/' element={<Landing />} />
            <Route path='/' element={<NavBar />}>
                <Route path='/home' element={<Home />} />
                <Route path='/search' element={<SearchGames/>} />
                <Route path='/videogames/:id' element={<Detail />} />
                <Route path='/videogames/create' element={<Create />} />
                <Route path='/videogames/postcreated' element={<PostCreated />} />
                <Route path='/videogames/postdeleted' element={<PostDeleted />} />
                <Route path='/videogames/edit/:id' element={<EditGame />} />
            </Route>
            <Route path='*' element={<NotFound />} />
            
        </Routes>     
      </div>
    </Router>
  );
}

export default App;
