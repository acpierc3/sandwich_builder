import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            lettuce: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            //['lettuce', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutContinue={this.onCheckoutContinue} />
            </div>
        )
    }
}

export default Checkout;