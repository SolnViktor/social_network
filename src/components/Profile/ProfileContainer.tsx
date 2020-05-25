import React from 'react';
import axios from 'axios'
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {RootState} from "../../redux/redux-store";
import Profile from "./Profile";
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = 1111;


        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>

        )
    }
}

let mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
});

let WidthUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile}) (WidthUrlDataContainerComponent);