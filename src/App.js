import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';

//lazy loading components (async loading), great for optimizing apps, probably not necessary for this app
// since the components are so small, but just good to test it out
//also could use react.lazy

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

//currently there is a bug with React where you get an error using hooks if function name isn't capitalized so I will leave this capitalized even though it is not convention for functional component
const App = props => {

  useEffect(() => {
    props.authCheckState();
  }, []);
  //this hook used to replace the componentDidMount() lifecycle method
  
    

  let routes = (
    <Switch>
      <Route path='/auth' render={(props) => <Auth {...props}/>} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  );
  
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props}/>} />
        <Route path='/orders' render={(props) => <Orders {...props}/>} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={(props) => <Auth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
      authCheckState: () => dispatch(actions.authCheckState()),
  };
}

//need to wrap App in withRouter if using connect in App.js to maintain router functionality
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


//routing using "exact" keyword prevents BurgerBuilder from being loaded all the time