import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import { ReactComponent as Logo} from './logo.svg'
const Header = () => (
    <div className='header-container'>
    <div className='title'>
           <div className = 'title-container'>
           TRAVIDEAS</div>
    </div>
    <div className='header'>
        <Link to="/" className='logo-container'>
            <Logo className='logo' />
        </Link>
        
        <div className='options'>
            <Link to='/learn-more' className='option'>LEARN MORE</Link>
            <Link to='/search' className='option'>SEARCH</Link>
            <Link to='/popular' className='option'>MOST POPULAR</Link>
            <Link to='/signin' className='option'>PROFILE</Link>
        
        </div>
    </div>
    </div>

)

export default Header