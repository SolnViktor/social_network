import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from './components/Settings/Settings';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavContainer from "./components/Nav/NavContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';




function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="container__inner">
                    <HeaderContainer/>
                    <div className="main__block">
                        <div className="nav">
                            <NavContainer />
                        </div>

                        <div className="content">
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer /> }/>

                            <Route path='/dialogs'
                                   render={() => <DialogsContainer /> } />

                            <Route path='/users'
                                   render={() => <UsersContainer />  } />
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
