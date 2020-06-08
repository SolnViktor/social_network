import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    changeCurrentPage,
    getUsers,
    follow, unFollow,
} from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";



class UsersContainer extends React.Component<any> {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {

        this.props.getUsers(pageNumber, this.props.pageSize);

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
        isFetching: state.usersPage.isFetching
    }
}



export default compose<any>(
    connect(mapStateToProps,{unFollow, follow,changeCurrentPage,getUsers})
)
(UsersContainer);