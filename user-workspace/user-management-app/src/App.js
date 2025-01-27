import React from 'react';
import './App.css'; // Importing the CSS file
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <div className="App">
                <h1>User Management</h1>
                <UserForm />
                <UserList />
            </div>
        </ErrorBoundary>
    );
}

export default App;
