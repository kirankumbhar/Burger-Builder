import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGRIEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredints = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredints,
                totalPrice: state.totalPrice + INGRIEDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGRIEDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedSt)

        case actionTypes.SET_INGREDIENT:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4
            });

        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state, {error: true});

        default:
            return state;
    }
};

export default reducer;