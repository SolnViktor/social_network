import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";
import {RootState} from "../../redux/redux-store";


function mapStateToProps (state: RootState) {
    return {
        sidebar: state.sidebar
    }
}

function mapDispatchToProps () {
    return {
    }
}

const NavContainer = connect (mapStateToProps, mapDispatchToProps) (Nav);

export default NavContainer;