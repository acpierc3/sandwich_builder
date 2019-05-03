import * as actionTypes from './actions';

const initialState = {
    people: [
        {
            id: 1,
            name: "adam",
            age: 2
        }
    ]
};



// personAddedHandler = () => {
//     const newPerson = {
//         id: Math.random(), // not really unique but good enough here!
//         name: 'Max',
//         age: Math.floor( Math.random() * 40 )
//     }
//     this.setState( ( prevState ) => {
//         return { persons: prevState.persons.concat(newPerson)}
//     } );
// }

// personDeletedHandler = (personId) => {
//     this.setState( ( prevState ) => {
//         return { persons: prevState.persons.filter(person => person.id !== personId)}
//     } );
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            let newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                people: [
                    ...state.people,
                    newPerson
                ],
            };
        case actionTypes.REMOVE_PERSON:
            return {
                ...state,
                people: [
                    state.people.filter(person => person.id !== action.id)
                ]
            };

        default:
            return state;
    }

};

export default reducer;