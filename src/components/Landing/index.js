import React from 'react';
import './Landing.css'

import * as firebase from 'firebase';
import 'firebase/firestore';
import Business from './Business/Business';

export default class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      searchString: '',
      locFilter: null
  };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange = e => {
    this.setState({ searchString: e.target.value.trim().toLowerCase() });
  }
  changedLoc = ev => {
    this.setState({ locFilter: ev.target.value })
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

  render(){
    var { isLoaded, data, locFilter, searchString } = this.state;
    let text = data;
    if (searchString) {
      text = text.filter(info => info.name.toLowerCase().match(searchString));
    }
    return  (
      <div className="bg">
        <h1>WALK LESS SHOP MORE!!!</h1>
        <div className="SearchBar-fields">
              <input type="text" placeholder="Product name" onChange={this.handleChange} />
              <input type="text" placeholder="Location?" onChange={this.changedLoc}/>
            </div>
            <div className="BusinessList">
          {
            text.filter(info => locFilter ? info.address.toLowerCase().includes(locFilter) : true).map(info => {
              return <Business business={info} />
            })
          }
        </div>
      </div>
    )
  }
}
