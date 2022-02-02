//
//
// App Component
//
//
//
import React from 'react';
//
//
// 
import Login from './containers/login';
import Page from './containers/page';
//
//
//
export default class App extends React.Component {
    //
    //
    //
    constructor(props){
        //
        //
        // 
        super(props);
        //
        //
        // 
        this.state = {};
    }
    //
    //
    //
    componentDidMount(){
        //
        //
        //
        this.props.checkAuth();
    }
    //
    //
    //
    render(){
        //
        //
        //
        if(this.props.isAuthorized === true){
            //
            //
            //
            return (
                <div className="app-container">
                    <Page />
                </div>
            );            
        }
        else{
            //
            //
            //
            return (
                <div className="app-container">
                    <Login />
                </div>
            );
        }
    }
}