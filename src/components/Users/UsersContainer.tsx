import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    changeCurrentPage,
    follow, followIsFetching,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../Common/Preloader/Preloader";
import {userAPI} from "../../api/api";


class UsersContainer extends React.Component<any> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.changeCurrentPage(pageNumber)
        userAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
               {this.props.isFetching? <Preloader /> : null }
            <Users totalUserCount={this.props.totalUserCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   unFollow={this.props.unfollow}
                   follow={this.props.follow}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   followIsFetching={this.props.followIsFetching}
            />
        </>
    }
}

let mapStateToProps = (state: RootState) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps, {unfollow, follow, setUsers, changeCurrentPage,setTotalUsersCount,toggleIsFetching, followIsFetching })(UsersContainer);