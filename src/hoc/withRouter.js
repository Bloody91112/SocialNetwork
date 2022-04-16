import { useMatch } from "react-router-dom";
import React from "react";



export const withRouter = (Component) =>{
    let RouterComponent = (props) => {
            const match = useMatch('/profile/:userId/');
            return <Component {...props} match={match}/>;
    }
    return RouterComponent;
}