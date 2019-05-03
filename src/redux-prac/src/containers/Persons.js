import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';




class Persons extends Component {



    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onPersonAdded} />
                {this.props.people.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onPersonRemoved(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        people: state.people,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onPersonAdded: (name, age) => dispatch({type: actionTypes.ADD_PERSON, name: name, age: age}),
        onPersonRemoved: (id) => dispatch({type: actionTypes.REMOVE_PERSON, id: id})
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Persons);