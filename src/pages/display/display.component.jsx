import React from 'react';
import './display.styles.scss'
import { ReactComponent as Full} from '../../assets/fullstar.svg'
import { ReactComponent as Empty} from '../../assets/emptystar.svg'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {firestore, fire} from "../../firebase/firebase.utils"
import '../../firebase/firebase.utils'


toast.configure()
class DisplayPage extends React.Component {
    constructor({currentitinerary, currentuser}) {
        super({currentitinerary, currentuser});
        this.state = {
            currentitinerary: currentitinerary,
            currentuser: currentuser,
            userrating: 0,
            notfavorites: true,
            favoritebutton: 'FAVORITE'
        }
        
    }

    async componentDidMount() {
        const userRef = firestore.collection('users').doc(this.state.currentuser.uid);
        let favorites = await (await userRef.get()).data()['favorites']
        if (favorites.includes(this.state.currentitinerary['id'])) {
            this.setState({notfavorites: false})
            this.setState({favoritebutton: 'UNFAVORITE'})
        }

        return
    }
    
    handleRating= (value) => {
        this.setState({'userrating': value})   
    }

    ratingClick = async event => {
        const itineraryRef = firestore.collection('itinerary').doc(this.state.currentitinerary['id'])
        await itineraryRef.update({
            communitymembers: fire.firestore.FieldValue.increment(1),
            communityratingtotal: fire.firestore.FieldValue.increment(this.state.userrating)

        })
        const members = (await firestore.collection('itinerary').doc(this.state.currentitinerary['id']).get()).data()['communitymembers']
        const total = (await firestore.collection('itinerary').doc(this.state.currentitinerary['id']).get()).data()['communityratingtotal']
        
        await itineraryRef.update({
            communityaverage: total / members
        })
        this.setState({userrating: 0})

    }

    favoriteClick = async event => {
        const userRef = firestore.collection('users').doc(this.state.currentuser.uid);
        
        if (this.state.notfavorites) {
            
            await userRef.update({
                favorites:
                fire.firestore.FieldValue.arrayUnion(this.state.currentitinerary['id'])
            });
            
            toast('Added to favorites.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
                })

            
            this.setState({favoritebutton: "UNFAVORITE"})
        }
        else {
            await userRef.update({
                favorites:
                fire.firestore.FieldValue.arrayRemove(this.state.currentitinerary['id'])
            });
            
            toast('Deleted from favorites.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
                })

            
            this.setState({favoritebutton: "FAVORITE"})

        }
    }
    

    render () {
        
        const currentitinerary = this.state.currentitinerary;
        const currentuser = this.state.currentuser;
        return(
        <div className = 'display-page'>
            <div className = 'display-title-container'>
                <div className = 'display-title'>{currentitinerary['citylower'].toUpperCase() + ', ' + currentitinerary['countrylower'].toUpperCase()}</div>
            </div>

            <div className = 'display-length-container'> 
                <div className = 'display-length'>{currentitinerary['length'].toUpperCase()}</div> 
            </div> 

            <div className = 'display-ratings-container'>
                <div className = 'display-community-rating-container'>
                    <div className = 'display-community-rating-title'>COMMUNITY RATING:  </div>
                    <div className = 'display-community-rating'>{Number((currentitinerary['communityratingtotal'] / currentitinerary['communitymembers']).toFixed(2)) + ' OUT OF 5'}</div>
                </div>

                <div className = 'display-user-rating-container'>
                    <div className = 'display-user-rating-title'>USER RATING:  </div>
                    <div className = 'display-user-rating'>{currentitinerary['userrating']} OUT OF 5</div>
                </div>

                
            </div>

            <div className = 'display-description-container'> 
                <div className = 'display-description-title'>DESCRIPTION:</div>
                <div className = 'display-description'>{currentitinerary['description']}</div>
            </div>
            {currentuser ? 
            <div className = 'user-container'>
                    <div className = 'reader-rating-title'>YOUR RATING:</div>
                    <div className = 'reader-star-container'>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                
                
                            return (<label>
                                <input onClick={() => this.handleRating(ratingValue)} type='radio' value = {this.state.userrating} />
                                { ratingValue <= this.state.userrating ? <Full className = 'reader-star'/> :
                                    <Empty className = 'reader-star'/>}
                                
                                </label>);
                    })}
            
                    </div>
                    
                    <button className = 'reader-rate' onClick={this.ratingClick}>RATE</button>
                    
            </div> : null }
            {currentuser ? 
                <div className = 'favorite-container'>
                    <button className = 'favorite-button' onClick={this.favoriteClick}>{this.state.favoritebutton}</button>
                </div>
            : null}
                
            
            
        </div> )

    }
}

export default DisplayPage