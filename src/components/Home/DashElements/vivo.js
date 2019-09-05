import React, { useState } from 'react'
import { FilePond, File, registerPlugin } from 'react-filepond'
import  ' bulma / css / bulma.css '
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import * as firebase from "firebase";
require('firebase/auth')

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default class Vivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: [],
            url: [],
            name: "",
            price: "",
            sellerName: "",
            contact: "",
            address: "",
            city: "",
            zipCode: "",
            State: "",
            progress: 0
        };

        this.onImageSelect = this.onImageSelect.bind(this);
        this.filehandle = this.filehandle.bind(this);
        this.handleCoChange = this.handleCoChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSnmChange = this.handleSnmChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    }
    handleCoChange(event) {
        this.setState({
            contact: event.target.value
        })
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }
    handlePriceChange(event) {
        this.setState({
            price: event.target.value
        })
    }
    handleSnmChange(event) {
        this.setState({
            sellerName: event.target.value
        })
    }
    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        })
    }
    handleStateChange(event) {
        this.setState({
            State: event.target.value
        })
    }
    handleCityChange(event) {
        this.setState({
            city: event.target.value
        })
    }
    handleZipcodeChange(event) {
        this.setState({
            zipCode: event.target.value
        })
    }
   

    filehandle = () => {
       

        const storageRef = firebase.storage().ref();
             this.state.files.forEach((file) => {
                 storageRef
                     .child(`images/${file.name}`)
                     .putFile(file).then((snapshot) => {
                     })
                 
             })
             
 storageRef.on(
       "state_changed",
       snapshot => {
         // progrss function ....
         const progress = Math.round(
           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
         this.setState({ progress });
       },
       error => {
         // error function ....
         console.log(error);
       },
       () => {
             // fetching images' url from firebase
            var urlarr=[]
             this.state.files.forEach((file) => {
 
                 firebase.storage
                     .ref("images")
                     .child(file.name)
                     .getDownloadURL()
                     .then(url => {
                         console.log(url)
                         urlarr.push(url)
                     })
 
             })
             this.setState({ url: urlarr })
        }
     )
 
 }

   
    submitData = e => {
        e.preventDefault();
        const us=firebase.auth().currentUser;
        const db = firebase.firestore();
         let a=this.state.name
        db.collection("us.email").doc(a).set({
                file: this.state.url,
                name: this.state.name,
                price: this.state.price,
                sellerName: this.state.sellerName,
                contact: this.state.contact,
                address: this.state.address,
                city: this.state.city,
                zipCode: this.state.zipCode,
                State: this.state.State
            });
        this.setState({
                file: [],
                url: [],
                name: "",
                price: "",
                sellerName: "",
                contact: "",
                address: "",
                city: "",
                zipCode: "",
                State: ""
        });
        }


    render() {
        const [files, setFiles] = useState([]);
        return (
            <div className="App">
                <h4>Note: Please! only upload images having same height and width.<br />Select all the images of a product you want to upload within a single time.</h4>
                <FilePond
                    file={files}
                    allowMultiple={true}
                    onupdatefiles={setFiles}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
                <div className='inputSection'>

                    <input onChange={this.handleNameChange} placeholder="Product name:" required />
                    <br />
                    <input onChange={this.handlePriceChange} placeholder="Product price:" required />
                    <br />
                    <input onChange={this.handleCoChange} placeholder="Seller Name:" required />
                    <br />
                    <input onChange={this.handleCityChange} placeholder="Contact no:" required />
                    <input onChange={this.handleStateChange} placeholder="Address:" required />
                    <br />
                    <br />
                    <input onChange={this.handleAddressChange} placeholder="City:" required />
                    <br />
                    <input onChange={this.handleStateChange} placeholder="PinCode:" required />
                    <br />
                    <input onChange={this.handleStateChange} placeholder="State:" required />
                    <br />
                </div>
                <button type="submit" onClick={this.submitData}>Submit</button>
            </div>
        )
    }
}