import React from 'react'
import './search-page.styles.scss'
import Search from './../../components/search/search.component'
import SearchComponents from './../../components/search-components/search-components.component';
import {firestore} from "../../firebase/firebase.utils"
import PageButton from './../../components/pagebutton/pagebutton.component'
class SearchPage extends React.Component {
    constructor({itinerary}) {
        super({itinerary});
        this.state = {
            length: '',
            city: '',
            country: '',
            itineraries: [itinerary],
            totalpages: [],
            page: 1
            
        }
        console.log(itinerary)

    }
    async componentDidMount() {
        const itinerariesRef = await firestore.collection('itinerary');
        let LengthItineraries
        let greaterNumber = 10
        let lessNumber = 10
        
        const {city, country, length} = this.state
        if (length === '1' || length === '2' || length === '3' ) {
            greaterNumber = 1
            lessNumber = 4
        }
        else if (length === '4' || length === '5' || length === '6') {
            greaterNumber = 4
            lessNumber = 6
        }

        else if (length === '7' || length === '8' || length === '9') {
            greaterNumber = 7
            lessNumber = 9
        }

        else if (length === '0') {
            greaterNumber = 0
            lessNumber = 0
        }
        const cityMatchList = []
        const countryMatchList = []
        const lengthMatchList = []
        const CityItineraries = await itinerariesRef.where('citylower', '>=', city.toLowerCase()).where('citylower', '<=', city.toLowerCase()+ '\uf8ff').get()
        const CountryItineraries = await itinerariesRef.where('countrylower', '>=', country.toLowerCase()).where('countrylower', '<=', country.toLowerCase()+ '\uf8ff').get()
        if (greaterNumber !== 10) {
            LengthItineraries = await itinerariesRef.where('lengthNum', '>=', greaterNumber).where('lengthNum', '<=', lessNumber).get()
        }
        else {
            LengthItineraries = await itinerariesRef.where('lengthNum', '>=', greaterNumber).get()
            
        }

        if (CityItineraries.empty) {
            await this.setState({itineraries: []})
          }  
          
          CityItineraries.forEach(doc => {
            cityMatchList.push(doc.id)
          });

        if (CountryItineraries.empty) {
            await this.setState({itineraries: []})
          }  
          
          CountryItineraries.forEach(doc => {
            countryMatchList.push(doc.id)
          });

        if (LengthItineraries.empty) {
            await this.setState({itineraries: []})
          }  
          
          LengthItineraries.forEach(doc => {
            lengthMatchList.push(doc.id)
          });

          const samePlace = []
          
          
          // Loop through the second array
        for (let j = 0; j <= cityMatchList.length; j++) {
           
          // Check elements from second array exist
          // in the created object or not
            if(cityMatchList.includes(countryMatchList[j])) {
                samePlace.push(countryMatchList[j])
              
            }
        }

        let sameID = []
        
        if (length === '') {
            sameID = samePlace
            
        }
        else {
            for (let k = 0; k < lengthMatchList.length; k++) {
                if (samePlace.includes(lengthMatchList[k])) {
                    sameID.push(lengthMatchList[k])
                }

            }
        }
        
        if (sameID.length === 0) {
            return
        
        }
        let itinerarySet = []

        for (let m = 0; m < sameID.length; m++) {
            let data = await (await firestore.collection('itinerary').doc(sameID[m]).get()).data()
            itinerarySet.push(data)
        
        }
        await this.setState({itineraries: itinerarySet})
        if (itinerarySet.length !== 0) {
            let totalpagelist = []
            for (let p = 1; p <= Math.ceil((itinerarySet.length) / 4); p++) {
                totalpagelist.push(p)
            }
            await this.setState({totalpages: totalpagelist})

        }
        else {
            await this.setState({totalpages: [1]})
        }
        

    }

    handleClick = async event => {
        const {value} = event.target;
        await this.setState({page : value})
    }

    handleChange = async event => {
        const {value, name} = event.target;
        await this.setState({[name]: value})
        const itinerariesRef = firestore.collection('itinerary');
        let LengthItineraries
        let greaterNumber = 10
        let lessNumber = 10
        
        const {city, country, length} = this.state
        if (length === '1' || length === '2' || length === '3' ) {
            greaterNumber = 1
            lessNumber = 4
        }
        else if (length === '4' || length === '5' || length === '6') {
            greaterNumber = 4
            lessNumber = 6
        }

        else if (length === '7' || length === '8' || length === '9') {
            greaterNumber = 7
            lessNumber = 9
        }

        else if (length === '0') {
            greaterNumber = 0
            lessNumber = 0
        }
        const cityMatchList = []
        const countryMatchList = []
        const lengthMatchList = []
        const CityItineraries = await itinerariesRef.where('citylower', '>=', city.toLowerCase()).where('citylower', '<=', city.toLowerCase()+ '\uf8ff').get()
        const CountryItineraries = await itinerariesRef.where('countrylower', '>=', country.toLowerCase()).where('countrylower', '<=', country.toLowerCase()+ '\uf8ff').get()
        if (greaterNumber !== 10) {
            LengthItineraries = await itinerariesRef.where('lengthNum', '>=', greaterNumber).where('lengthNum', '<=', lessNumber).get()
        }
        else {
            LengthItineraries = await itinerariesRef.where('lengthNum', '>=', greaterNumber).get()
            
        }
        if (CityItineraries.empty) {
            await this.setState({itineraries: []})
          }   
          CityItineraries.forEach(doc => {
            cityMatchList.push(doc.id)
          });

        if (CountryItineraries.empty) {
            await this.setState({itineraries: []})
          }  
          CountryItineraries.forEach(doc => {
            countryMatchList.push(doc.id)
          });

        if (LengthItineraries.empty) {
            await this.setState({itineraries: []})
          }  
          LengthItineraries.forEach(doc => {
            lengthMatchList.push(doc.id)
          });

        const samePlace = [] 
          // Loop through the second array
        for (let j = 0; j <= cityMatchList.length; j++) {
          // Check elements from second array exist
          // in the created object or not
            if(countryMatchList.includes(cityMatchList[j])) {
                samePlace.push(cityMatchList[j])
            }
        }

        let sameID = []
        
        if (length === '') {
            sameID = samePlace
            
        }
        else {
            for (let k = 0; k < lengthMatchList.length; k++) {
                if (samePlace.includes(lengthMatchList[k])) {
                    sameID.push(lengthMatchList[k])
                }

            }
        }
        
        if (sameID.length === 0) {
            await this.setState({itineraries: []})
        
        }
        let itinerarySet = []

        for (let m = 0; m < sameID.length; m++) {
            let data = await (await firestore.collection('itinerary').doc(sameID[m]).get()).data()
            itinerarySet.push(data)
        
        }
        await this.setState({itineraries: itinerarySet})
        if (itinerarySet.length !== 0) {
            let totalpagelist = []
            for (let p = 1; p <= Math.ceil((itinerarySet.length) / 4); p++) {
                totalpagelist.push(p)
            }
            await this.setState({totalpages: totalpagelist})

        }
        else {
            await this.setState({totalpages: [1]})
        }
        
    
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

                    <div className = 'search-container'>
                        <SearchComponents itineraries={this.state.itineraries} page={this.state.page} />
                        
                    </div>

                    <div className = 'page-container'>
                    {
                        this.state.totalpages.map(page => 
                            <PageButton 
                                value = {this.state.page}
                                handleClick = {this.handleClick}
                                currentpage = {page}
                            
                            />
                            )
                    }
                    </div> 
                    
                </div>

                

            </div>
        
        )



    }
 

}

export default SearchPage
