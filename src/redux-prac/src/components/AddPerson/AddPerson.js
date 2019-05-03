import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {

    state = {
        name: '',
        age: null
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onAgeChange = (event) => {
        this.setState({age: event.target.value});
    }

    render() {
        return (
            <div className="AddPerson">
                <input
                    type="text"
                    placeholder="Name"
                    onChange={this.onNameChange}
                    value={this.state.name}
                />
                <input
                    type="text"
                    placeholder="Age"
                    onChange={this.onAgeChange}
                    value={this.state.age}
                />

                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        );
    }
}
    

export default AddPerson;