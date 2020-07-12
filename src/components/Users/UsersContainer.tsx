import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {
    changeCurrentPage, getUsers,
    follow, unFollow, ChangeCurrentPageType
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {getCurrentPage,getFollowingProgress, getIsFetching,
    getPageSize,getTotalUserCount,getUsersSelector} from "../../redux/users-selectors";
import {UsersType} from '../../types/types';

type MapStateType = {
    users: UsersType[]
    pageSize: number
    totalUserCount: number
    currentPage: number
    followingInProgress: number[]
    isFetching: boolean
    portionPages:number
}
type MapDispatch = {
    unFollow: (userID: number) => void
    follow: (userID: number) => void
    changeCurrentPage: (currentPage: number) => ChangeCurrentPageType
    getUsers: (page: number, pageSize: number) => void
}
type PropsType = MapDispatch & MapStateType // Может быть еще OwnProps(пропсы сверху) и StateProps(state самой компоненты)

class UsersContainer extends React.Component<PropsType> {

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




export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStateType, MapDispatch, {}, RootState>(mapStateToProps,{unFollow, follow,changeCurrentPage,getUsers})
)
(UsersContainer);