import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <div className={styles.mainContent}>
        <h2 className={styles.mainTitle}>
            Find all about your videogames here!
        </h2>
        <Link to='/home'>
            <button className={styles.mainButton}>Start</button>
        </Link>
    </div>
  )
}
