import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component"
import ProfilePage from './pages/profile/profile.component';
import CreatePage from './pages/create/create.component'
import SignInandSignUp from './pages/signin/signinandsignup.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import SearchPage from './pages/search/search-page';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentuser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth)
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
    
  }




  render() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/search' component={SearchPage}/>
        <Route exact path='/signin' component={() => <SignInandSignUp currentUser={this.state.currentuser} />}/>
        <Route exact path='/profile' component={() => <ProfilePage currentUser={this.state.currentuser} />}/>
        <Route exact path='/profile/create' component={() => <CreatePage currentUser={this.state.currentuser} />}/>
      </Switch>
      
    </div>
  )
  }
}

export default App;