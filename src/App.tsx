import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from './components/Settings/Settings';
import {addPost, StateType} from "./redux/state";


type AppPropsType = {
    state: StateType
    addPost: () => void
    updateNewPost: (newText: string) => void
}

function App(props: AppPropsType) {
    return (
        <div className="App">
            <div className="container">
                <div className="container__inner">
                    <Header/>
                    <div className="main__block">
                        <div className="nav">
                            <Nav dataState={props.state.sidebar}/>
                        </div>

                        <div className="content">
                            <Route path='/profile'
                                   render={() => <Profile
                                       dataState={props.state.profilePage}
                                       addPost={addPost}
                                       updateNewPost={props.updateNewPost}
                                   />}/>

                            <Route path='/dialogs'
                                   render={() => <Dialogs
                                       dataState={props.state.messagesPage}/>}/>

                            <Route path='/news'
                                   render={() => <News/>}/>
                            <Route path='/music'
                                   render={() => <Music/>}/>
                            <Route path='/settings'
                                   render={() => <Settings/>}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
