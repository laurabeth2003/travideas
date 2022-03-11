import React from 'react';
import './App.css';
import LearnMore from './pages/learnmore/learnmore.component'
import { Switch, Route} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component"
import ProfilePage from './pages/profile/profile.component';
import CreatePage from './pages/create/create.component'
import SignInandSignUp from './pages/signin/signinandsignup.component'
import {auth, createUserProfileDocument, firestore} from './firebase/firebase.utils'
import SearchPage from './pages/search/search-page';
import DisplayPage from './pages/display/display.component';
import PopularPage from './pages/popular/popular.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentuser: null,
      allitineraries: [],
      totalpages: 0, 
    }
  }

  unsubscribeFromAuth = null;

  async componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
          this.setState({
            currentUser: {
              id: snapShot.id, 
              ...snapShot.data()
            }
          })
        })
      }
    this.setState({currentuser: userAuth})
  
    });

    const allitinerarieslist = []
    const alltheitineraries = await firestore.collection('itinerary').get()
    
    if (alltheitineraries.empty) {
      await this.setState({allitineraries: []})
    }  
    
    alltheitineraries.forEach(doc => {
      allitinerarieslist.push(doc.id)
    });

    
    const itinerariesSet = []
    

    for (let m = 0; m < allitinerarieslist.length; m++) {
      let data = await (await firestore.collection('itinerary').doc(allitinerarieslist[m]).get()).data()
      itinerariesSet.push(data)
  
    }
    
    await this.setState({allitineraries: itinerariesSet})
    console.log(this.state.allitineraries)
    
  }




  render() {
    const alltheitineraries = this.state.allitineraries
     
    console.log(alltheitineraries)
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        { 
          alltheitineraries.map(itinerary => 
            <Route exact path={'/' + itinerary['id']} component={() => <DisplayPage key= {itinerary['id']} currentitinerary= {itinerary} currentuser = {this.state.currentuser} />}/>)
        }
        <Route exact path='/learn-more' component={LearnMore} />
        <Route exact path='/popular' component={() => <PopularPage itinerary={0} />}/>
        <Route exact path='/search' component={() => <SearchPage itinerary={0} />}/>
        <Route exact path='/signin' component={() => <SignInandSignUp currentUser={this.state.currentuser} />}/>
        <Route exact path='/profile' component={() => <ProfilePage currentUser={this.state.currentuser} />}/>
        <Route exact path='/profile/create' component={() => <CreatePage currentUser={this.state.currentuser} />}/>
      </Switch>
      
    </div>
  )
  }
}

export default App;