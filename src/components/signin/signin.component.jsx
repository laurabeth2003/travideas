import React from 'react';
import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'
import {auth} from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'email':'',
            'password':'',
            'username':'',
        }
    }
    
    handleSubmit = async event => {
        event.preventDefault();

        const {email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            
            this.setState({email: '', password: ''})
        } catch(error) {
            
        }
        

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
                    
                </form>
            </div>
            
        )
    }
}


export default SignIn