import {RootState} from "./redux-store";
import {createSelector} from "reselect";

export const getUsersFromState = (state: RootState) => {
 return state.usersPage.users;
}

export const getUsersSelector = createSelector(getUsersFromState, (users) => {
 return users.filter ( (u:any) => true)
})

export const getPageSize = (state: RootState) => {
 return state.usersPage.pageSize;
}
export const getTotalUserCount = (state: RootState) => {
 return state.usersPage.totalUserCount;
}
export const getCurrentPage = (state: RootState) => {
 return state.usersPage.currentPage;
}
export const getFollowingProgress = (state: RootState) => {
 return state.usersPage.followingInProgress;
}
export const getIsFetching = (state: RootState) => {
 return state.usersPage.isFetching;
}
