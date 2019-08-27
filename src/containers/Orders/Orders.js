import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    componentDidMount() {
        console.log(this.props.token)
        if (this.props.token) {
            this.props.onfetchOrders(this.props.token.idToken);
        }
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (<div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                ))}
            </div>)
        }
        return orders;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

const mapStateToProps = state => {
    console.log(state.order.orders);
    
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));