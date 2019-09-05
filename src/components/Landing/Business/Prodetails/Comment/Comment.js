import React from "react";
import * as firebase from 'firebase';
import 'firebase/firestore';
import './Comment.css';
import CommentList from "./CommentList";


export default class Comments extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        name:"",
        text:"",
        status:"",
        dok: this.props.comDocId,
        allData: []
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleNameChange(event){
      this.setState({
          name: event.target.value
      })
    }
      handleTextChange(event){
        this.setState({
            text: event.target.value
        })
  }
  addData = e => {
    e.preventDefault();
    const db = firebase.firestore();
   
    db.collection('Products').doc(this.state.dok).collection('Comments').add({
      name: this.state.name,
      text: this.state.text
    });
    this.setState({
      name: "",
      text: "",
      status: "Comment Submitted"
    });
  };
  componentDidMount(){
    const db = firebase.firestore();
    
    var wholeData = []
    let a="";
    db.collection('Products').doc(this.state.dok).collection('Comments').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        // console.log(doc.data().name + doc.data().age);
        console.log(doc.data());
        a=doc.id
        console.log(a);
        
        wholeData.push(doc.data())
        
      });
      console.log(wholeData)
      this.setState({allData: wholeData})
      console.log(this.state.allData)
    })
    .catch(error => {
      console.log('Error!', error);
    })
  }

      render(){
        return(
            <div className="outer">
              <h3>Product Reviews</h3>
        <div className="comment-box">
          <input onChange={this.handleNameChange} placeholder="Name"  className="inpt" required/>
            <br />
            <input onChange={this.handleTextChange} placeholder="Comment" className="inpt2" required/>
            <br />
            <button className="btn" type="submit" onClick={this.addData}>
              Submit
            </button>
            <p className="status">{this.state.status}</p>
            
           </div>
           <div className="comment-box2">
                    {
                this.state.allData.map(comments => {
                    return <CommentList comments={comments} />
                })
                }
            
            </div>
           </div>
        )
      }

}