import React from "react";
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/authentication/SignUpForm";
import SignInForm from "./pages/authentication/SignInForm";
import SignOutPage from "./pages/authentication/SignOutPage";
import HomePage from "./pages/home_page/HomePage";
import AccountList from "./pages/home_page/AccountList";
import PilotPostList from "./pages/pilotpost/PilotPostList";
import PilotPostCreateForm from "./pages/pilotpost/PilotPostCreateForm";
import PilotPostDetail from "./pages/pilotpost/PilotPostDetail";
import PilotPostEditForm from "./pages/pilotpost/PilotPostEditForm";

function App() {

  return (
    <div>

      <div className={styles.MainViewPosition}>
        <div className={styles.MainViewContainer}>
          <Switch>
            <Route exact path="/signin" render={() => <SignInForm /> } />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/signout" render={() => <SignOutPage />} />
            <Route exact path="/accountlist" render={() => <AccountList />} />

            <Route exact path="/pilot_post/list" render={() => <PilotPostList />} />
            <Route exact path="/pilot_post/create" render={() => <PilotPostCreateForm />} />
            <Route exact path="/pilot_post/detail/:id" render={() => <PilotPostDetail />} />
            <Route exact path="/pilot_post/edit/:id" render={() => <PilotPostEditForm />} />

            <Route exact path="/" render={() => <HomePage />} />
            <Route path="/" render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
        </div>

      <div className={styles.NavBarPosition}>
        <div className={styles.NavBarContainer}>
          <NavBar/>
        </div>
      </div>

    </div>
  )
};

export default App;
