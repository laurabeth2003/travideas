import React from 'react';
import { withRouter } from 'react-router-dom';
import "./create-form.styles.scss"
import { createItineraryDocument} from "../../firebase/firebase.utils"
import {firestore, storage} from "../../firebase/firebase.utils"
import CreateFormInput from '../create-form-input/create-form-input.component'
import CreateFormSelect from '../create-form-select/create-form-select.component'
import CreateFormTextArea from '../create-form-text/create-form-text-area.component';
import { ReactComponent as Full} from '../../assets/fullstar.svg'
import { ReactComponent as Empty} from '../../assets/emptystar.svg'
import ImageUpload from '../imageupload/imageupload.component'
class CreateForm extends React.Component {
    constructor({createid}) {
        super({createid});
        this.state = {
            city: '',
            country: '',
            length: '',
            description: '',
            coverphoto: [],
            userrating: '',
            coverurl: '',
            coverpath: {},
            creatorid: createid

        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        let lengthNum = 0
        const { city, country, length, description, coverphoto, coverpath, userrating, creatorid} = this.state;
        const citylower = city.toLowerCase()
        const countrylower = country.toLowerCase()
        if (length === '1-3 Days') {
            lengthNum = 3
        } 
        else if (length === '4-6 Days') {
            lengthNum = 6
        }

        else if (length === '7-9 Days') {
            lengthNum = 9
        }

        else {
            lengthNum = 10
        }
            
        const creatorobject = await (await firestore.collection('users').doc(creatorid).get()).data()
        const creatorusername = creatorobject['username']
        
        try {
            
            
            const uploadTask = storage.ref(`images/${coverphoto}`).put(coverpath)
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error)
                },
                () => {
                    storage.ref("images")
                    .child(coverphoto)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({'coverurl':url},
                        async () => { console.log(this.state.coverurl) 
                        
                        const {coverurl} = this.state
                        const doc = await createItineraryDocument({citylower, lengthNum, countrylower, length, description, coverphoto, userrating, creatorid, creatorusername, coverurl})
                        const data = {
                            id: doc.toString()
                        }
                        const update = await firestore.collection('itinerary').doc(doc.toString())
                        await update.update(data)
                        console.log(update)
                        this.setState({
                            city: '',
                            country: '',
                            length: '',
                            description: '',
                            coverphoto: '',
                            userrating: '',
                            coverpath: {},
                            
                        })
                    })
                        
                    })

                }
            )

        } catch(error) {console.log(error)}

        

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    handleClick= (value) => {
        this.setState({'userrating': value})   
    }

    handleFile = event => {
        
        const {name} = event.target.files[0]
        
        this.setState({'coverphoto': String(name) })
        this.setState({'coverpath': event.target.files[0]})

        
    }

    
    render() {
        console.log(this.state.description)
        return (
            
            <div className = 'create-form'>
                <div className = 'create-form-title'>NEW ITINERARY:</div>
                <div className = 'create-form-container'>
                    <form className = 'create-form-submit' onSubmit={this.handleSubmit}> 
                        <CreateFormInput
                            name = 'city'
                            type = 'text'
                            handleChange={this.handleChange}
                            value = {this.state.city}
                            label = 'CITY:'
                            required />  


                        <CreateFormInput name="country" 
                            type="text" 
                            handleChange={this.handleChange}
                            value={this.state.country} 
                            label = 'COUNTRY:'
                            required/>
                            
                        <CreateFormSelect label = 'LENGTH:' 
                            options = {['1-3 Days', '4-6 Days', '7-9 Days', '10+ Days']} 
                            name='length' 
                            value = {this.state.length} 
                            handleChange = {this.handleChange}/>
                        
                            
                        <ImageUpload name="coverphoto" 
                            type="file" 
                            handleChange={this.handleFile}
                            label = 'ITINERARY COVER PHOTO:'
                            required/>
                
                        <CreateFormTextArea name="description" 
                            type="text" 
                            handleChange ={this.handleChange}
                            value ={this.state.description} 
                            label='DESCRIPTION:'
                            required/>

                        <div className='create-group-star'>
                            <label className ='star-label'>USER RATING:</label>
                            <div className = 'star-container'>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                        
                        
                                    return (<label>
                                        <input onClick={() => this.handleClick(ratingValue)} type='radio' value = {this.state.userrating} />
                                        { ratingValue <= this.state.userrating ? <Full className = 'star'/> :
                                            <Empty className = 'star'/>}
                                        
                                        </label>);
                            })}
                    
                            </div>
                        </div>
                        
                    
                        <button className = 'submit-button' type='submit'>CREATE ITINERARY</button>
                        
                    </form>
                </div>
            </div>
             
        
        )
    }
}


export default withRouter(CreateForm)