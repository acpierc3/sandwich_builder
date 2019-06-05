import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES =  {    //typically you name global constants in all caps
    lettuce: 0.4,
    cheese: 0.2,
    meat: 2,
    bacon: 1
}   

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }

};

export default reducer;