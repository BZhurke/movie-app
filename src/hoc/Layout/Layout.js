import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDraweToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer};
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    drawerToggleClicked={this.sideDraweToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
} 

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
} 

export default connect(mapStateToProps)(Layout);