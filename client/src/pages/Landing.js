import React from 'react'
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
        <h1>
            Soy Landing Page!
        </h1>
        <Link to='/home'>
            <button>Home</button>
        </Link>
    </div>
  )
}
