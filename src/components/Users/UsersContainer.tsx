import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {changeCurrentPage,getUsers,
    follow, unFollow} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {getCurrentPage,getFollowingProgress, getIsFetching,
    getPageSize,getTotalUserCount,getUsersSelector} from "../../redux/users-selectors";



class UsersContainer extends React.Component<any> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
               {this.props.isFetching? <Preloader /> : null }
            <Users totalUserCount={this.props.totalUserCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   unFollow={this.props.unFollow}
                   follow={this.props.follow}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   portionPages={this.props.portionPages}
            />
        </>
    }
}


let mapStateToProps = (state: RootState) => {

    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        followingInProgress: getFollowingProgress(state),
        isFetching: getIsFetching(state),
        portionPages: state.usersPage.portionPages
    }
}



export default compose<any>(
    connect(mapStateToProps,{unFollow, follow,changeCurrentPage,getUsers})
)
(UsersContainer);