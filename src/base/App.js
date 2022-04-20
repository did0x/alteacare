import React, { lazy, Suspense } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { componentLoader } from '../helper';
import Loader from "../helper/component/Loader";


// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/actions/main";

// Pages
const Home = lazy(() => componentLoader(() => import("../pages/Home")));

export const App = (props) => {
  return (
    <Router>
        <div id='main'>
          <Suspense fallback>
          <Loader loader={props?.main?.loader} />
            <div className='main__container'>
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </div>
          </Suspense>
        </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  main: state.main,
});

const mapDispatchToProps = (dispatch) => ({
  actionsMain: bindActionCreators(mainActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
