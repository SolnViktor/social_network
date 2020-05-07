import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { Route, BrowserRouter } from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from './components/Settings/Settings';



function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="container">
                    <div className="container__inner">
                        <Header/>
                        <div className="main__block">
                            <div className="nav">
                                <Nav/>
                            </div>

                            <div className="content">
                                <Route path='/profile' component={Profile}/>
                                <Route path='/dialogs' component={Dialogs}/>
                                <Route path='/news' component={News}/>
                                <Route path='/music' component={Music}/>
                                <Route path='/settings' component={Settings}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
