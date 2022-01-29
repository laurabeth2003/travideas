import React from 'react'
import './search-page.styles.scss'
import Search from './../../components/search/search.component'

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            length: '',
            city: '',
            country: ''
        }

    }


    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }
//<ItineraryDisplay/>
    render () {

        return(
        <div className = 'search-page'>
            <div className = 'search-title'>SEARCH FOR ITINERARIES</div>
            <div className = 'search-box'>
                <Search 
                value={this.state.city}
                inputName = 'search-city-input' 
                labelName = 'search-city-label'
                groupName = 'search-group-city'
                name='city'
                type = 'text'
                handleChange={this.handleChange}
                label = 'CITY:'/>

                <Search  
                inputName = 'search-country-input'
                labelName = 'search-country-label'
                groupName = 'search-group-country'
                value={this.state.country} 
                name='country'
                type = 'text'
                handleChange={this.handleChange}
                label = 'COUNTRY:'/>

                <Search 
                value= {this.state.length} 
                inputName = 'search-length-input'
                labelName = 'search-length-label'
                groupName = 'search-group-length'
                name='length' 
                type = 'text'
                handleChange={this.handleChange}
                label = 'LENGTH:'/>
                
            </div>

            

        </div>
        )



    }
 

}

export default SearchPage
