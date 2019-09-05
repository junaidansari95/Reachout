import React from 'react';
import './Business.css';
import Modal from "react-responsive-modal";
import Prodetails from './Prodetails/Prodetails';
import * as ROUTES from '../../../constants/routes';
import {Redirect} from 'react-router-dom';
export default  class Business extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         
         toDashboard: false,
         }
         this.handleSubmit=this.handleSubmit.bind(this);
      }
     
       handleSubmit(event){
        this.setState({
          toDashboard: true,
        })
      }

    render() {
      const a= this.props.business.name
      if (this.state.toDashboard === true) {
        return <Redirect to={{
          pathname: '/prod',
          state: { id: a }
        }} />
      }
        return (
            <div>
            <div className="card" onClick={this.handleSubmit}>
                <img src={this.props.business.image} alt="attire" width=" 290px;" height="330px;" />
                <p id="nm" className="title">{this.props.business.name}</p><br />
                <p id="pr" className="price">Rs. {this.props.business.price}</p>
                <p id="ad" className="price">{this.props.business.address}</p><br />

            </div>
            
            </div>
            )
    }
}

