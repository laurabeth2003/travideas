

import React from 'react';
import './profile.styles.scss'
import Accordion from '../../components/profilepage/accordion.component'
import { auth } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
const ProfilePage = ({history, match, currentUser}) => (
    <div>{currentUser ?
    (<div className='profilepage'>
        <div className='profile-background' style = {{
             backgroundImage: `url(${'https://images.unsplash.com/photo-1502239608882-93b729c6af43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'})`
        }}>
            <div className = 'wrapper'>
                <button className='sign-out' onClick={() => auth.signOut().then(history.push(`${'/signin'}`))}>SIGN OUT</button>
                <Accordion classname1 = 'accordion-favorites' classname2 ='favorites' classname3 = 'favorite-child' title = "FAVORITES" children = "hi"/>
                <Accordion classname1 = 'accordion-created' classname2 ='created-itineraries' classname3 = 'create-child' title = "CREATED ITINERARIES" children= "ollo"/>
                <button className='new-itinerary' onClick={() => history.push(`${match.url}${'/create'}`)}>ADD NEW ITINERARY</button>
            </div>  
      
        </div>
        
    </div>)
    : history.push(`${'/signin'}`)
    }
    </div>
)


export default withRouter(ProfilePage);
