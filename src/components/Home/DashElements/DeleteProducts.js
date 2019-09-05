import React from 'react'
import './AddProduct.css'
import * as firebase from 'firebase';
import 'firebase/firestore';
export default class DeleteProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.deleteProduct=this.deleteProduct.bind(this);
    }
    deleteProduct(event) {
        var a=this.state.name;
        const db = firebase.firestore();
        let collectionRef = db.collection("Products").doc(a);

collectionRef.get()
.then(
    collectionRef.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    })
  
)
        this.setState({
            status: "deleted"
        })
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }
    render() {
        if (this.state.status === "deleted")
            return <h3>Product deleted.</h3>

        else
            return (
                <div className="inputSection dlp">
                    <h3>Enter the product name you want to delete.</h3><br />
                    <input onChange={this.handleNameChange} placeholder="product name:" /><br />
                    <button onClick={this.deleteProduct}>Delete</button>
                </div>
            )
    }
}