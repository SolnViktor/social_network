import React from 'react';
import Header from "./Header";
import { connect } from 'react-redux';
import {RootState} from "../../redux/redux-store";
import {authIsFetching, setAuthUserData} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";
import Preloader from "../Common/Preloader/Preloader";

class HeaderContainer extends React.Component<any, any> {

    componentDidMount() {

        this.props.authIsFetching(true)
        authAPI.authMe().then(response => {
            this.props.authIsFetching(false)
                if (response.resultCode === 0) {
                    let {id, email, login} = response.data;
                    this.props.setAuthUserData (id, email, login);
                }
            })
    }


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

export default connect (mapStateToProps, {setAuthUserData, authIsFetching}) (HeaderContainer);