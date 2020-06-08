import React from 'react';
import Header from "./Header";
import { connect } from 'react-redux';
import {RootState} from "../../redux/redux-store";
import {auth, logout} from "../../redux/auth-reducer";
import Preloader from "../Common/Preloader/Preloader";



class HeaderContainer extends React.Component<any, any> {

    componentDidMount() {this.props.auth()}


    render() {

        return <>
        {this.props.isFetching? <Preloader /> : null }
        <Header {...this.props}/>
        </>
    }
}

const mapStateToProps = (state: RootState) => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        }
}

export default connect (mapStateToProps, {auth, logout}) (HeaderContainer);