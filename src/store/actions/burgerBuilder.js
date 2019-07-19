import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ings) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ings
    }
}

export const fetchIngredientsFailed= () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-app-587d0.firebaseio.com/ingredients.json')
       .then(response => {
            dispatch(setIngredients(response.data));
       }).catch(error => {
            dispatch(fetchIngredientsFailed());
       });
    }
}