import React, { Component } from "react";
import "./App.css";
import Header from "./componenets/header/header";
import Login from "./componenets/login/login";
import { Provider } from "react-redux";
import Home from "./componenets/home/home";
import { Router, Route } from "react-router-dom";
import store from "./store/store";
import Signup from "./componenets/signup/signup";
import Profile from "./componenets/profile/profile";
import history from "./history";
import Dashboard from "./componenets/dashboard/dashbaord";
import Postadd from "./componenets/postadd/postadd";
import Showadds from "./componenets/showadds/showadds";
import { LocalizeProvider, withLocalize } from "react-localize-redux";
import globalTransaltions from "./translations/global.json";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <LocalizeProvider
          initialize={{
            languages: [
              { name: "English", code: "en" },
              { name: "African", code: "af" }
            ],
            translation: globalTransaltions,
            options: {
              defaultLanguage: "en",
              renderToStaticMarkup: false
            }
          }}
        >
          <Router history={history}>
            <div>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/postadd" component={Postadd} />
              <Route path="/showadds" component={Showadds} />
              <Route path="/profile" component={Profile} />
            </div>
          </Router>
        </LocalizeProvider>
      </Provider>
    );
  }
}

export default withLocalize(App);
