import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component"
import ProfilePage from './pages/profile/profile.component';
import SignInandSignUp from './pages/signin/signinandsignup.component'
import {auth} from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentuser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {this.setState({currentuser: user })})
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {this.setState({currentuser: user })})
  }


  render() {
  return (
    <div>
      <Header/>
      {this.state.currentuser ? 
        <Redirect to="/profile" /> : <Redirect to="/signin"/>}
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/signin' component={SignInandSignUp}/>
        <Route exact path='/profile' component={() => <ProfilePage currentUser={this.state.currentuser} />}/>
      </Switch>
      
    </div>
  )
  }
}

export default App;