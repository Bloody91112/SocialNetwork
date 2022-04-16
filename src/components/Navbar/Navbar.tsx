/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import React from "react";
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';




const Navbar = () => {

    const testingMode = useSelector( (state:AppStateType) => state.app.testingMode)

    return (
        <nav className={testingMode ? classes.navbarDT + ' ' + classes.navbar : classes.navbar}>

            <div className={classes.item}>
                <NavLink to="/profile"
                    className={navData => (navData.isActive ? classes.active : classes.item)
                        + " " + (testingMode ? classes.buttonDT : '')}
                >
                    Profile
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/dialogs"
                    className={navData => (navData.isActive ? classes.active : classes.item)
                        + " " + (testingMode ? classes.buttonDT : '')}
                >
                    Messages
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/news" className={navData => (navData.isActive ? classes.active : classes.item)
                    + " " + (testingMode ? classes.buttonDT : '')}
                >
                    News
                </NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/settings" className={navData => (navData.isActive ? classes.active : classes.item)
                    + " " + (testingMode ? classes.buttonDT : '')}
                >
                    Settings
                </NavLink>
            </div>
            <div>
                <NavLink to='/users' className={navData => (navData.isActive ? classes.active : classes.item)
                    + " " + (testingMode ? classes.buttonDT : '')}
                >
                    Users
                </NavLink>
            </div>


        </nav>
    )
}

export default Navbar;