import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Ox/Ox';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from'../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

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

        purchasable: false,     //the following are UI based states, and not super important to manage through redux
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount () {
    //     // axios.get('https://react-mysandwich.firebaseio.com/ingredients.json')
    //     //     .then( res => {
    //     //         this.setState({ingredients: res.data});
    //     //     })
    //     //     .catch(error => {this.setState({error: true})});
    // }

    onPurchase = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {

        const queryParams = [];
        for (let i in this.props.ingreds) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: './checkout',
            search: '?' + queryString
        });
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
            ...this.props.ingreds
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingreds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingreds} />
                    <BuildControls 
                        onAddIngred={this.props.onIngredientAdded}
                        onRemoveIngred={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        onPurchase={this.onPurchase} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingreds}
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

const mapStateToProps = state => {
    return {
        ingreds: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));