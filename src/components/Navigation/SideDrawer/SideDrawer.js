import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';
import classes from './SideDrawer.module.css';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    let styles = {
        logo: {
            marginBottom: "42px",
        }
    }
    //..
    return (
        <Auxiliary>
            <BackDrop show = {props.open} clicked = {props.closed}/>
            <div className = {attachedClasses.join(' ')}>
                <Logo height = "11%" marginBottom = {styles.logo.marginBottom} />
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;