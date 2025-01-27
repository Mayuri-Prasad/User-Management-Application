import React, { Component } from 'react';
import axios from 'axios';

class UserForm extends Component {
    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        isEditing: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user && this.props.user) {
            const { id, name, email, department } = this.props.user;
            const [firstName, lastName] = name.split(' ');
            this.setState({ id, firstName, lastName, email, department, isEditing: true });
            console.log('Editing user:', this.props.user); // Log the user being edited
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, firstName, lastName, email, department, isEditing } = this.state;

        const userData = { id, name: `${firstName} ${lastName}`, email, department };
        console.log('Submitting user data:', userData); // Log user data

        try {
            if (isEditing) {
                await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData);
                this.props.onUserUpdate(userData); // Notify UserList of the update
            } else {
                await axios.post('https://jsonplaceholder.typicode.com/users', userData);
                this.props.onUserAdd(userData); // Notify UserList of the new user
            }
            // Reset form
            this.setState({ id: '', firstName: '', lastName: '', email: '', department: '', isEditing: false });
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    handleCancel = () => {
        this.setState({ id: '', firstName: '', lastName: '', email: '', department: '', isEditing: false });
        this.props.onClose(); // Close the modal
    };

    render() {
        const { firstName, lastName, email, department } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>{this.state.isEditing ? 'Edit User' : 'Add User'}</h2>
                <input type="text" name="firstName" value={firstName} onChange={this.handleChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={lastName} onChange={this.handleChange} placeholder="Last Name" required />
                <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" required />
                <input type="text" name="department" value={department} onChange={this.handleChange} placeholder="Department" required />
                <button type="submit">{this.state.isEditing ? 'Update User' : 'Add User'}</button>
                <button type="button" onClick={this.handleCancel}>Cancel</button> {/* Cancel button */}
            </form>
        );
    }
}

export default UserForm;
