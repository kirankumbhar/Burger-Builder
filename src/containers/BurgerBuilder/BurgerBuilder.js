import React, {Component } from 'react';
import { connect} from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
    //    axios.get('https://burger-app-587d0.firebaseio.com/ingredients.json')
    //    .then(response => {
    //        this.setState({ingredients: response.data});
    //    }).catch(error => {
    //        this.setState({error: error});
    //    }); 
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(iKey => {
            return ingredients[iKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        let burger = this.state.error ? <p>ingredients Can't be loaded!</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (<Auxiliary><Burger ingredients={this.props.ings}/>
                        <BuildControls
                            ingredientAdded={this.props.onIngredientsAdded}
                            ingredientRemoved = {this.props.onIngredientsRemoved}
                            disabled = {disabledInfo}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            price = {this.props.price}
                            ordered = {this.purchaseHandler}
                        />
                    </Auxiliary>);
            orderSummary = <OrderSummary 
                ingredients = {this.props.ings}
                price = {this.props.price}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler} 
            />
            
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return(
            <Auxiliary>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientsRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));