import React from "react";
import '../Home/DashElements/AddProduct.css'
import * as firebase from "firebase";
import { storage } from '../Firebase/firebase'


export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      image2: "",
      image3: "",
      url: "",
      url2: "",
      url3: "",
      name: "",
      price: "",
      shopName: "",
      contactNo: "",
      address: "",
      city: "",
      State: "",
      zipCode: "",
      details: "",
      progress: 0,
      progress2: 0,
      progress3: 0,
      status: ""

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.handleChange2 = this.handleChange2.bind(this);
    this.handleUpload2 = this.handleUpload2.bind(this);

    this.handleChange3 = this.handleChange3.bind(this);
    this.handleUpload3 = this.handleUpload3.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    this.handleShopNameChange = this.handleShopNameChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState(() => ({ image }));
    }
  };
  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    this.setState({ progress: 0 });
    uploadTask.on(
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
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  handleChange2 = e => {
    if (e.target.files[0]) {
      const image2 = e.target.files[0]
      this.setState(() => ({ image2 }));
    }
  };
  handleUpload2 = () => {
    const { image2 } = this.state;
    const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress2 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress2 });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image2.name)
          .getDownloadURL()
          .then(url2 => {
            console.log(url2);
            this.setState({ url2 });
          });
      }
    );
  };

  handleChange3 = e => {
    if (e.target.files[0]) {
      const image3 = e.target.files[0]
      this.setState(() => ({ image3 }));
    }
  };
  handleUpload3 = () => {
    const { image3 } = this.state;
    const uploadTask = storage.ref(`images/${image3.name}`).put(image3);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progrss function ....
        const progress3 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress3 });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image3.name)
          .getDownloadURL()
          .then(url3 => {
            console.log(url3);
            this.setState({ url3 });
          });
      }
    );
  };
  addData = e => {
    e.preventDefault();
    const db = firebase.firestore();
    let a = this.state.name
    db.collection("Products").doc(a).set({
      image: this.state.url,
      image2: this.state.url2,
      image3: this.state.url3,
      name: this.state.name,
      address: this.state.address,
      contactNo: this.state.contactNo,
      city: this.state.city,
      State: this.state.State,
      price: this.state.price,
      shopName: this.state.shopName,
      zipCode: this.state.zipCode,
      details: this.state.details
    })
    this.setState({
      status: "submitted"
    })
  };

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }
  handlePriceChange(event) {
    this.setState({
      price: event.target.value
    })
  }
  handleContactChange(event) {
    this.setState({
      contactNo: event.target.value
    })
  }
  handleAddressChange(event) {
    this.setState({
      address: event.target.value
    });
  }
  handleCityChange(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleStateChange(event) {
    this.setState({
      State: event.target.value
    });
  }
  handleZipcodeChange(event) {
    this.setState({
      zipCode: event.target.value
    });
  }
  handleShopNameChange(event) {
    this.setState({
      shopName: event.target.value
    });
  }
  handleDetailChange(event) {
    this.setState({
      details: event.target.value
    })
  }

  render() {
    if (this.state.status === "submitted")
      return <h3>Data Submitted</h3>
    else
      return (
        <div className="main">
          <div className='inputSection'>

            <input
              onChange={this.handleNameChange}
              placeholder="Product Name" disabled
            />
            <br />
            <input onChange={this.handlePriceChange} placeholder="Set price" />
            <br />
            <input
              onChange={this.handleShopNameChange}
              placeholder="Shop Name"
            /><br />
            <input onChange={this.handleContactChange} placeholder="contactNo:" />
            <br />
            <input onChange={this.handleAddressChange} placeholder="Address:" />
            <br />
            <input onChange={this.handleCityChange} placeholder="City:" />
            <br />
            <input onChange={this.handleStateChange} placeholder="State:" />
            <br />
            <input onChange={this.handleZipcodeChange} placeholder="zipCode:" />
            <br />
            <textarea onChange={this.handleDetailChange} placeholder="Enter Product details:"></textarea>
            <br />


            <br />
            <button type="submit" onClick={this.addData}>
              Submit
          </button>

          </div>
          <div>
            <div className='imageSection'>
              <progress value={this.state.progress} max="100" />
              <br />
              <input type="file" onChange={this.handleChange} />
              <button onClick={this.handleUpload}>Upload</button>
              <br />
              <img src={this.state.url || 'https://dummyimage.com/289x289/545720/000000.gif&text=Insert+1:1+image'}
                alt="Uploaded images"
                height="299.88 px;"
                width="299.88 px;" />
            </div>
            <div className='imageSection'>
              <progress value={this.state.progress} max="100" />
              <br />
              <input type="file" onChange={this.handleChange2} />
              <button onClick={this.handleUpload2}>Upload</button>
              <br />
              <img src={this.state.url2 || 'https://dummyimage.com/289x289/545720/000000.gif&text=Insert+1:1+image'}
                alt="Uploaded images"
                height="299.88 px;"
                width="299.88 px;" />
            </div>
            <div className='imageSection'>
              <progress value={this.state.progress} max="100" />
              <br />
              <input type="file" onChange={this.handleChange3} />
              <button onClick={this.handleUpload3}>Upload</button>
              <br />
              <img src={this.state.url3 || 'https://dummyimage.com/289x289/545720/000000.gif&text=Insert+1:1+image'}
                alt="Uploaded images"
                height="299.88 px;"
                width="299.88 px;" />
            </div>

          </div>


        </div>
      );
  }
}