import React from 'react'
import './popular.styles.scss'
import SearchComponents from './../../components/search-components/search-components.component';
import {firestore} from "../../firebase/firebase.utils"
import PageButton from './../../components/pagebutton/pagebutton.component'
class PopularPage extends React.Component {
    constructor({itinerary}) {
        super({itinerary});
        this.state = {
            itineraries: [itinerary],
            totalpages: [],
            page: 1
            
        }
        console.log(itinerary)

    }
    async componentDidMount() {
        const itinerariesRef = await firestore.collection('itinerary').orderBy('communityaverage', 'desc').get();
        let LengthItineraries = []
        let itinerarySet = []
        itinerariesRef.forEach(doc => {
            LengthItineraries.push(doc.id)
          });
        for (let m = 0; m < LengthItineraries.length; m++) {
            let data = await (await firestore.collection('itinerary').doc(LengthItineraries[m]).get()).data()
            itinerarySet.push(data)
        
        }
        await this.setState({itineraries: itinerarySet})
        
        let totalpagelist = []
        for (let p = 1; p <= Math.ceil((itinerarySet.length) / 4); p++) {
            totalpagelist.push(p)
        }
        await this.setState({totalpages: totalpagelist})

        

    }

    handleClick = async event => {
        const {value} = event.target;
        await this.setState({page : value})
    }

    
//<ItineraryDisplay/>
    render () {
        
        return(
            <div className = 'popular-page'>
                <div className = 'search-title'>POPULAR ITINERARIES</div>
                
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
        
        )



    }
 

}

export default PopularPage
