import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {   //can use this instead of componentdidupdate because we will only be seeing this page when orders is clicked, there will be no updating
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     })

        this.props.onFetchOrders();
    }

    render () {

        let orders = (
            this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ))
        )

        if (this.props.loading) {
            orders = <Spinner />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));