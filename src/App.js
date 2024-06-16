import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AssignTest from './components/AssignTest';
import CreateTest from './components/CreateTest';
import StudentDashboard from './components/StudentDashboard';
import TakeTest from './components/TakeTest';
import ViewResults from './components/ViewResults';
import CreateStudent from './components/CreateStudent';
import FetchStudent from './components/FetchStudent';
import ViewTest from './components/ViewTest';

const App = () => {
    return (
        <Router>
            <div className="container">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/student">Student</Link>
                </nav>
                <Switch>
                    <Route path="/" exact>
                        <h1>Welcome to Online Test Management System</h1>
                    </Route>
                    <Route path="/admin" component={AdminDashboard} />
                    <Route path="/create-test" component={CreateTest} />
                    <Route path="/create-student" component={CreateStudent} />
                    <Route path="/assign-test" component={AssignTest} />
                    <Route path="/view-test" component={ViewTest} />
                    <Route path="/view-results" component={ViewResults} />
                    <Route path="/fetch-students" component={FetchStudent} />
                    <Route path="/student" component={StudentDashboard} />
                    <Route path="/take-test" component={TakeTest} />
                </Switch>
            </div>
        </Router>
    );
};


export default App;
