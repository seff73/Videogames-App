import SearchBar from './SearchBar';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function NavBar() {
  const navigateTo = useNavigate();
  const location = useLocation();
  
  let nameButton = location.pathname !== '/videogames/create'? 
                   'Create Game'
                   : 'Go Home'

  const handleCreate = () => {
    location.pathname !== '/videogames/create'?
     navigateTo('/videogames/create')
     : navigateTo('/home');
       
  };

  return (
    <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#131921',
          marginBottom: '10px'
        }}>
          <div style={{
                  marginLeft: '20px'
          }}>
            <Link 
                  to="/home">
              <div><img 
                style={{
                  height: '70px',
                  width: '70px',
                  marginTop: '10px',
                  objetFit: 'cover'
                }}
                src={logo} 
                alt="logo-main"
              /></div>
              {/*<div><h3>Videogames <br/> App</h3></div>*/}
            </Link>    
          </div>
          <div style={{
                  marginTop: '39px'
          }}>
              <SearchBar />
          </div>

            <div style={{
                  marginTop: '39px',
                  marginRight: '50px'
            }}>
            
            <button style={{
                        height: '35px',
                        borderRadius: '8px',
                        backgroundColor: '#7209b7',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    onClick={handleCreate}
            > {nameButton}</button>
            </div> 

        </div>
        <Outlet />
    </div>
  )
}
