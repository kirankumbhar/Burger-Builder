import React, {Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7

}
class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(iKey => {
            return ingredients[iKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    addingredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
          ...this.state.ingredients  
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGRIEDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients  
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGRIEDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler =() => {
        this.setState({purchasing: false});
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        console.log(disabledInfo);
        
        return(
            <Auxiliary>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addingredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
} 

export default BurgerBuilder;