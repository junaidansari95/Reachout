import React from 'react';
import './Comment.css';

export default class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    render(){
        return(
           
                <label className="lbl"> {this.props.comments.name}: {this.props.comments.text} </label>

            
        )
    }
}