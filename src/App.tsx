import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import {Route} from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from './components/Settings/Settings';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavContainer from "./components/Nav/NavContainer";
import UsersContainer from "./components/Users/UsersContainer";




function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="container__inner">
                    <Header/>
                    <div className="main__block">
                        <div className="nav">
                            <NavContainer />
                        </div>

                        <div className="content">
                            <Route path='/profile'
                                   render={() => <Profile /> }/>

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
