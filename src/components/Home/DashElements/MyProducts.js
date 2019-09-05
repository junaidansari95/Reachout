import React from 'react'
import firebase from 'firebase'
require('firebase/auth')

export default class MyProducts extends React.Component{
    render(){
        const us=firebase.auth().currentUser;
        return(
            <div className="main">
                <h4>{us.email}</h4>
            </div>
        )
    }
}