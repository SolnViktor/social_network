import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    changeCurrentPage,
    follow,
    setTotalUsersCount,
    setUsers, toggleIsFetching,
    unfollow,
} from "../../redux/users-reducer";
import axios from "axios";
import Users from './Users';

import Preloader from "../Common/Preloader/Preloader";

class UsersContainer extends React.Component<any> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.changeCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, {unfollow, follow, setUsers, changeCurrentPage,setTotalUsersCount,toggleIsFetching })(UsersContainer);