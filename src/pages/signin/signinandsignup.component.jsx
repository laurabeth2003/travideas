import React from 'react';
import { withRouter } from 'react-router-dom';
import './signinandsignup.styles.scss'
import SignIn from '../../components/signin/signin.component'
import SignUp from "../../components/sign-up/signup.component"
const SignInandSignUp = ({history, match, currentUser}) => (
    <div>{(currentUser == null) ?
        (<div className = 'sign-in-sign-up'>
            <SignIn/>
            <SignUp/>
        </div>
    )
    : history.push(`${'/profile'}`)

    }
    </div>
)

export default withRouter(SignInandSignUp);