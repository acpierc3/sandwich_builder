import React, { Component } from 'react';

import Aux from '../../hoc/Ox/Ox';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from'../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES =  {    //typically you name global constants in all caps
    lettuce: 0.4,
    cheese: 0.2,
    meat: 2,
    bacon: 1
}                 

class BurgerBuilder extends Component {

    state = {
        // ingredients: {
        //     lettuce: 0,
        //     meat: 0,
        //     bacon: 0,
        //     cheese: 0
        // },
        ingredients: null,
            
        totalPrice: 3,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://react-mysandwich.firebaseio.com/ingredients.json')
            .then( res => {
                this.setState({ingredients: res.data});
            });
    }

    onPurchase = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!')

        this.setState({loading: true});
        
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,                //in a real setup you would calculate price server-side so as to avoid users manipulating the price
            customer: {
                name: 'NEW DONGER',
                address: {
                    street: '21 New Street',
                    zipCode: '69696',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)            //this is the url that is appended to base url in axios-orders.js Will be different for other projects
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            })

    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, elem) => {
                return sum + elem;
            })
        
        this.setState({purchasable: sum > 0})
    }

    onAddIngred = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,

        }
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchasable(updatedIngredients);
    }

    onRemoveIngred = (type) => {
        const oldCount = this.state.ingredients[type];
        
        if(oldCount > 0) {
            const newCount = oldCount - 1;

            const updatedIngredients = {
                ...this.state.ingredients,

            }
            updatedIngredients[type] = newCount;

            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - INGREDIENT_PRICES[type];

            this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
            this.updatePurchasable(updatedIngredients);
        }
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        onAddIngred={this.onAddIngred}
                        onRemoveIngred={this.onRemoveIngred}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        onPurchase={this.onPurchase} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                clickContinue={this.purchaseContinueHandler}
                clickCancel={this.onPurchase}
                price={this.state.totalPrice}  />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Backdrop show={this.state.purchasing} cancel={this.onPurchase} />
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);