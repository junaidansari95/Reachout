import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { withAuthorization, AuthUserContext } from '../Session';
import './style.css';
import MyProducts from './DashElements/MyProducts'
import DeleteProducts from './DashElements/DeleteProducts'
import AddProduct from './DashElements/AddProduct'
import UpdateProduct from './DashElements/UpdateProduct'
import ad from './addition.png'
import dl from './deletion.png'
const HomePage = () => (
  <AuthUserContext>
  {authUser =>
    (
      
      <div className="all">
      <Router>
        
          <div className="topnav">
                
                <Link id="an" to="/add"><img src={ad} /></Link>
                <Link id="an" to="/delete"><img src={dl} /></Link>
          
          
            <Route exact path="/" component={MyProducts}  />
            <Route path="/add" component={AddProduct} />
            <Route path="/delete" component={DeleteProducts} />
            <Route path="/update" component={UpdateProduct} />
         </div>
        
      </Router>
      </div>
    )
}
  </AuthUserContext>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
