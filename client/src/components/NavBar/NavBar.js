import SearchBar from '../SearchBar';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
//import logo from '../../assets/logo.png';
import styles from './NavBar.module.css';

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
        <div className={styles.navContainer}
        >
          <div style={{
                  margin: 'auto'
          }}>
            <Link style={{textDecoration: 'blink'}}
                  to="/home">
              <div>
                {/*<img 
                style={{
                  height: '70px',
                  width: '70px',
                  marginTop: '10px',
                  objetFit: 'cover'
                }}
                src={logo} 
                alt="logo-main"
              />*/}
                <h2 style={{color: 'white'}}> Videogames - App</h2>
              </div>
              {/*<div><h3>Videogames <br/> App</h3></div>*/}
            </Link>    
          </div>
          <div style={{
                  margin: 'auto'
          }}>
              <SearchBar />
          </div>

            <div style={{
                  margin: 'auto'
            }}>
            
            <button className={styles.createButton}
                    onClick={handleCreate}
            > {nameButton}</button>
            </div> 

        </div>
        <Outlet />
    </div>
  )
}
