import React from 'react';
import { withRouter } from 'react-router-dom';
import CreateForm from '../../components/create/create-form.component'

import './create.styles.scss'
const CreatePage = ({history, match, currentUser}) => (
    <div>{currentUser ?
        (<div className = 'create-page'>
            <div className = 'create-container'>
                <CreateForm createid = {currentUser.uid}/>
            </div>
        </div> 
    )
    : history.push(`${'/signin'}`)

    }
    </div>
)

export default withRouter(CreatePage);