import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument } from "../../firebase/firebase.utils"
import { firestore } from '../../firebase/firebase.utils';

import "./signup.styles.scss";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            username: '',
            email:'',
            password:'',
            confirmPassword: ''

        }

    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const { displayName, username, email, password, confirmPassword} = this.state;

        const snapshot = await firestore.collection("users").where("username", "==", username).get();
        console.log(snapshot.empty)
        if (!snapshot.empty) {
            alert('username already taken');
            return
        }
        
        if(password !== confirmPassword) {
            alert("passwords don't match");
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            createUserProfileDocument(user, {displayName, username, password})
            
            this.setState({
                displayName: '',
                username: '',
                email:'',
                password:'',
                confirmPassword: ''
            })

        } catch(error) {console.log(error)}

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render (){
        return (
            <div className='sign-up'>
                <div className = 'title'>I do not have an account</div>
                <span className = 'subtitle'>Create an account</span> 

                <form className = 'sign-up-form' onSubmit={this.handleSubmit}> 
                    <FormInput
                        name = 'displayName'
                        type = 'text'
                        handleChange={this.handleChange}
                        value = {this.state.displayName}
                        label = 'full name'
                        required />    
                        
                    <FormInput name="username" 
                        type="text" 
                        handleChange={this.handleChange}
                        value={this.state.username} 
                        label = 'username'
                        required/>


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

                    <FormInput name="confirmPassword" 
                        type="password" 
                        handleChange ={this.handleChange}
                        value ={this.state.confirmPassword} 
                        label='confirm password'
                        required/>
                    
                
                    <CustomButton type='submit'>Sign Up</CustomButton>
                    
                </form>
            </div>
        )


    }




}

export default SignUp