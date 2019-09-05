import React from 'react';
import './Prodetails.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Comment from './Comment/Comment'
import Modal from "react-responsive-modal";

export default class Prodetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data: {},
            image:"",
            hm:this.props.location.state.id,
            open: false,
        }
        this.onImageChange=this.onImageChange.bind(this);
        this.onImageChange2=this.onImageChange2.bind(this);
        this.onImageChange3=this.onImageChange3.bind(this);

    }
    componentDidMount(){
        this.fetchData()
        
    }
    fetchData() {
        const db = firebase.firestore();
        const docRef = db.collection('Products').doc(this.state.hm);

    docRef.get().then((doc) => {
        if (doc.exists) {
            let data = doc.data();
            this.setState({ data: data });
            this.setState({
                image: this.state.data.image
            })
            console.log("Document data:", data);
        } else {
            // doc.data() will be undefined in this case
            this.setState({ data: null });
            console.log("No such document!");
        }
    }).catch(function (error) {
        this.setState({ data: null });
        console.log("Error getting document:", error);
    });
      }
    onImageChange(event){
        this.setState({
            image: this.state.data.image
        })
    }
    onImageChange2(event){
        this.setState({
            image: this.state.data.image2
        })
    }
    onImageChange3(event){
        this.setState({
            image: this.state.data.image3
        })
    }
    onOpenModal = () => {
        this.setState({ open: true });
      }
    
      onCloseModal = () => {
        this.setState({ open: false });
      }
    render() {
        const { open } = this.state;
        return (
            <div className="pop" >
                <div className="banya">
                    <img className="pim" src={this.state.image} alt="attire" width=" 350px;" height="500px;" />
                   <div className="sim"> <img  className="im" src={this.state.data.image} onClick={this.onImageChange} alt="attire" width=" 40px;" height="60px;" />
                    <img className="im" src={this.state.data.image2} onClick={this.onImageChange2} alt="attire" width=" 40px;" height="60px;" />
                    <img className="im" src={this.state.data.image3} onClick={this.onImageChange3}alt="attire" width=" 40px;" height="60px;" />
                    </div>
                </div>
                <div className="danya">
                    <h3>{this.props.location.state.id}</h3>
                    <p>Price: {this.state.data.price}</p>
                    <p>Seller: {this.state.data.shopName}</p>
                    <p>Contact number: {this.state.data.contactNo}</p>
                    <p>Location: {this.state.data.address}</p>
                    <p>City: {this.state.data.city}</p>
                    <p>zipCode: {this.state.data.zipCode}</p>
                    <p>State: {this.state.data.State}</p>
                    <p>{this.state.data.details}</p>
                    <button onClick={this.onOpenModal} >Reviews</button>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <Comment comDocId={this.state.data.name}/>
                    </Modal>    
                </div>
                

            </div>
        )
    }
}