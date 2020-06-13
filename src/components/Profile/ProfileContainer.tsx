import React from 'react';
import {connect} from "react-redux";
import {getStatus, getUser, loadPhoto, saveProfile, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {RootState} from "../../redux/redux-store";
import Profile from "./Profile";
import { withRouter} from 'react-router-dom';
import Preloader from "../Common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component<any, any> {

    componentDidMount() {
        this.refreshProfile ();
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)    // что-бы не зацикливалось: componentDidMount -> id -> componentDidUpdate
        this.refreshProfile ();
    }

    refreshProfile () {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authId;
            // if(!userId) {
            //     this.props.history.push("/login");  // Альтернатива редиректа, но при этом данный компонент не демонтируется! Вариант не айс
            // }
        }
        this.props.getUser (userId);
        this.props.getStatus(userId);
    }

    render() {

        return (
            <>
                {this.props.isFetching? <Preloader/> : ''}
                <Profile
                    saveProfile={this.props.saveProfile}
                    savePhoto={this.props.savePhoto}
                    isOwner={!this.props.match.params.userId}
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                />
                </>

        )
    }
}

let mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status,
    authId: state.auth.id
});


export default compose<any>(
    connect(mapStateToProps, {setUserProfile, getUser, getStatus, updateStatus, loadPhoto, saveProfile}),
    withAuthRedirect,
    withRouter)
(ProfileContainer);


// let AuthRedirectComponent:any = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent:any = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {setUserProfile, getUser}) (WithUrlDataContainerComponent);