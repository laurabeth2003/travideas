import React from 'react';
import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'email':'',
            'password':'',
            'username':'',
        }
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password: ''})

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <div className = 'title'>I already have an account</div>
                <span className = 'subtitle'>Sign in with your account email and password</span> 

                <form onSubmit={this.handleSubmit}> 
                    <FormInput name="email" 
                        type="email" 
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label = 'email'
                        required/>
            
                    <FormInput name="password" 
                        type="password" 
                        handleChange ={this.handleChange}
                        value ={this.state.password} 
                        label='password'
                        required/>
                    
                
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </form>
            </div>
            
        )
    }
}


export default SignIn