import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AssignTest from './components/AssignTest';
import CreateTest from './components/CreateTest';
import StudentDashboard from './components/StudentDashboard';
import TakeTest from './components/TakeTest';
import ViewResults from './components/ViewResults';
import CreateStudent from './components/CreateStudent';
import FetchStudent from './components/FetchStudent';
import ViewTest from './components/ViewTest';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

// PrivateRoute component to handle role-based access
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                user && roles.includes(user.role) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

// AppRoutes component defining all routes
const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Switch>
            {/* Public route accessible without any authentication */}
            <Route path="/login" exact component={Login} />
            <Route path="/create-student" exact component={CreateStudent} />

            {/* Redirect to appropriate dashboard based on user role */}
            <Route path="/" exact render={() => (
                <Redirect to={user ? (user.role === 'admin' ? '/admin' : '/student') : '/login'} />
            )} />
            
            {/* Private routes requiring authentication and role-based access */}
            <PrivateRoute path="/admin" roles={['admin']} component={AdminDashboard} />
            <PrivateRoute path="/create-test" roles={['admin']} component={CreateTest} />
            <PrivateRoute path="/assign-test" roles={['admin']} component={AssignTest} />
            <PrivateRoute path="/view-test" roles={['admin', 'student']} component={ViewTest} />
            <PrivateRoute path="/view-results" roles={['admin', 'student']} component={ViewResults} />
           

            <PrivateRoute path="/fetch-students" roles={['admin']} component={FetchStudent} />
            <PrivateRoute path="/student" roles={['student']} component={StudentDashboard} />
            <PrivateRoute path="/take-test" roles={['student']} component={TakeTest} />
        </Switch>
    );
};

// Main App component with routing
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
