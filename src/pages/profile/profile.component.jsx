import {firestore, fire} from "../../firebase/firebase.utils"
import '../../firebase/firebase.utils'
import React from 'react';
import './profile.styles.scss'
import Accordion from '../../components/profilepage/accordion.component'
import { auth } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
    constructor({history, match, currentUser}) {
        super({history, match, currentUser})
        this.state = {
            history: history,
            match: match,
            currentUser: currentUser,
            favoriteItineraries: ['NONE'],
            createdItineraries: ['NONE'],

        }
    }
    async componentDidMount() {
        const userRef = firestore.collection('users').doc(this.state.currentUser.uid);
        let favorites = await (await userRef.get()).data()['favorites']
        let favoriteSet = []
        for (let m = 0; m < favorites.length; m++) {
            let data = await (await firestore.collection('itinerary').doc(favorites[m]).get()).data()
            favoriteSet.push(data)
        
        }

        if (favoriteSet.length !== 0) {
            this.setState({favoriteItineraries: favoriteSet})
        }
        let createdId = []
        const userItineraries = await firestore.collection('itinerary').where('creatorid', '==', this.state.currentUser.uid).get()
        if (userItineraries.empty) {
            return
          }   
        userItineraries.forEach(doc => {
            createdId.push(doc.id)
        });

        let createdSet = []
        for (let m = 0; m < createdId.length; m++) {
            let data = await (await firestore.collection('itinerary').doc(createdId[m]).get()).data()
            createdSet.push(data)
        
        }

        this.setState({createdItineraries: createdSet})

        


        
    }

    render() {
       return(
        <div>{this.state.currentUser ?
        (<div className='profilepage'>
            <div className='profile-background' style = {{
                 backgroundImage: `url(${'https://images.unsplash.com/photo-1475257026007-0753d5429e10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'})`
            }}>
                <div className = 'wrapper'>
                    <button className='sign-out' onClick={() => auth.signOut().then(this.state.history.push(`${'/signin'}`))}>SIGN OUT</button>
                    <Accordion classname1 = 'accordion-favorites' classname2 ='favorites' classname3 = 'favorite-child' title = "FAVORITES" children={this.state.favoriteItineraries} />
                    <Accordion classname1 = 'accordion-created' classname2 ='created-itineraries' classname3 = 'create-child' title = "CREATED ITINERARIES" children={this.state.createdItineraries}/>
                    <button className='new-itinerary' onClick={() => this.state.history.push(`${this.state.match.url}${'/create'}`)}>ADD NEW ITINERARY</button>
                </div>  
          
            </div>
            
        </div>)
        : this.state.history.push(`${'/signin'}`)
        }
        </div>
       )

    }
} 


export default withRouter(ProfilePage);
