import React from 'react';
import '../../Landing/Business/Business.css';
import * as ROUTES from '../../../constants/routes';
import {Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default  class Business extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
         toDashboard: false,
         }
         this.handleSubmit=this.handleSubmit.bind(this);
      }
      componentDidMount() {
        this.fetchData();
      }
      fetchData() {
        const db = firebase.firestore();
    
        var wholeData = []
        let a = "";
        db.collection('Products').orderBy('name', 'asc').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              // console.log(doc.id, '=>', doc.data());
              // console.log(doc.data().name + doc.data().age);
              console.log(doc.data());
              a = doc.id
              console.log(a);
    
              wholeData.push(doc.data())
    
            });
            console.log(wholeData)
            this.setState({ isLoaded: true, data: wholeData })
            console.log(this.state.data)
          })
          .catch(error => {
            console.log('Error!', error);
          })
      }


       handleSubmit(event){
        this.setState({
          toDashboard: true,
        })
      }

    render() {
      const a= this.state.data.name
      if (this.state.toDashboard === true) {
        return <Redirect to={{
          pathname: '/admin',
          state: { id: a }
        }} />
      }
        return (
            <div>
            <div className="card" onClick={this.handleSubmit}>
                <img src={this.state.data.image} alt="attire" width=" 290px;" height="310px;" />
                <p id="nm" className="title">{this.state.data.name}</p><br />
                <p id="pr" className="price">Rs. {this.state.data.price}</p><br />

            </div>
            
            </div>
            )
    }
}

