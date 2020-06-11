import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from './components/Settings/Settings';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {RootState} from "./redux/redux-store";
import Preloader from './components/Common/Preloader/Preloader';
import Nav from './components/Nav/Nav';
import {withSuspense} from "./components/Common/withSuspense/WithSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <div className="container">
                    <div className="container__inner">
                        <HeaderContainer/>
                        <div className="main__block">
                            <div className="nav">
                                <Nav/>
                            </div>

                            <div className="content">
                                <Route path='/profile/:userId?'
                                       render={withSuspense (ProfileContainer) } />

                                <Route path='/dialogs'
                                       render={withSuspense (DialogsContainer) } />


                                <Route path='/users'
                                       render={() => <UsersContainer/>}/>
                                <Route path='/news'
                                       render={() => <News/>}/>
                                <Route path='/music'
                                       render={() => <Music/>}/>
                                <Route path='/settings'
                                       render={() => <Settings/>}/>
                                <Route path='/login'
                                       render={() => <Login/>}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<any>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

let MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <React.StrictMode>
                    <AppContainer/>
                </React.StrictMode>
            </Provider>
        </ BrowserRouter>
    )
}
export default MainApp;









