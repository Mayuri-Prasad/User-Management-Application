import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './UserForm'; // Ensure UserForm is imported
import UserModal from './UserModal'; // Import the UserModal

class UserList extends Component {
    state = {
        users: [],
        error: null,
        isModalOpen: false, // State to manage modal visibility
        selectedUser: null, // State to manage the user being edited
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            this.setState({ users: response.data });
        } catch (error) {
            this.setState({ error: 'Failed to fetch users' });
        }
    };

    handleEdit = (user) => {
        this.setState({ selectedUser: user, isModalOpen: true }); // Set selected user and show modal
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            this.setState(prevState => ({
                users: prevState.users.filter(user => user.id !== id)
            }));
        } catch (error) {
            this.setState({ error: 'Failed to delete user' });
        }
    };

    handleUserAdd = (user) => {
        this.setState(prevState => ({
            users: [...prevState.users, user],
            isModalOpen: false // Hide modal after adding user
        }));
    };

    handleUserUpdate = (updatedUser) => {
        this.setState(prevState => ({
            users: prevState.users.map(user => (user.id === updatedUser.id ? updatedUser : user)),
            isModalOpen: false, // Hide modal after updating user
            selectedUser: null // Reset selected user
        }));
    };

    toggleModalVisibility = () => {
        this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen, selectedUser: null })); // Reset selected user when toggling
    };

    render() {
        const { users, error, isModalOpen, selectedUser } = this.state;

        return (
            <div>
                <h2>User List</h2>
                <button onClick={this.toggleModalVisibility}>Add User</button>
                <UserModal isOpen={isModalOpen} onClose={this.toggleModalVisibility}>
                    <UserForm 
                        onUserAdd={this.handleUserAdd} 
                        onUserUpdate={this.handleUserUpdate} 
                        user={selectedUser} // Pass selected user for editing
                    />
                </UserModal>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <div>
                                <button onClick={() => this.handleEdit(user)}>Edit</button>
                                <button onClick={() => this.handleDelete(user.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserList;
