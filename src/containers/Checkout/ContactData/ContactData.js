import React, { Component } from "react";
import axios from '../../../axios-orders';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../../store/actions/index';

class Contactdata extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            coutry: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'cheapest'
                        }
                    ]
                },
                value: 'fastest',
                validation: {
                },
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
    }

    validityCheckHandler = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (const formElementIdentifier in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
                const element = this.state.orderForm[formElementIdentifier];
                formData[formElementIdentifier] = element.value;
            }
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderdata: formData
            
        }
        this.props.onOrderBurger(order);
        
        
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validityCheckHandler(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (const inputIdentifiers in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(inputIdentifiers)) {
                formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid; 
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        
    }

    render () {
        const formElementsArray = [];
        for (const key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                const element = this.state.orderForm[key];
                formElementsArray.push({
                    id:key,
                    config: element
                });
                
            }
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                        key = {formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        changed = {(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        />
                    ))
                }
                <Button btnType="Success" clicked = {this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className = {styles.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
}

const matchDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withErrorhandler(Contactdata, axios));