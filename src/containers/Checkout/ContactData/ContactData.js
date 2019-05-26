import React, { Component } from "react";
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
class Contactdata extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Root',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '421306',
                    coutry: 'Germany'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
        
    }

    render () {
        let form = (
            <form>
                <input className = {styles.Input} type="text" name="name" placeholder="Your name" />
                <input className = {styles.Input} type="email" name="email" placeholder="Your email" />
                <input className = {styles.Input} type="text" name="street" placeholder="Street" />
                <input className = {styles.Input} type="text" name="postal" placeholder="Your postal Code" />
                <Button btnType="Success" clicked = {this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
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

export default Contactdata;