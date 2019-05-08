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
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';
              

class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 3,

        // purchasable: false,     
        purchasing: false, //the following are UI based states, and not super important to manage through redux
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    onPurchase = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    purchaseContinueHandler = () => {

        // const queryParams = [];
        // for (let i in this.props.ingreds) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, elem) => {
                return sum + elem;
            })
        
        return sum > 0;
    }

    //the following functions were used prior to incorporating redux. They are now stored in the reducer.js file

    // onAddIngred = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients,

    //     }
    //     updatedIngredients[type] = newCount;

    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + INGREDIENT_PRICES[type];
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchasable(updatedIngredients);
    // }

    // onRemoveIngred = (type) => {
    //     const oldCount = this.state.ingredients[type];
        
    //     if(oldCount > 0) {
    //         const newCount = oldCount - 1;

    //         const updatedIngredients = {
    //             ...this.state.ingredients,

    //         }
    //         updatedIngredients[type] = newCount;

    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - INGREDIENT_PRICES[type];

    //         this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //         this.updatePurchasable(updatedIngredients);
    //     }
    // }

    render () {

        const disabledInfo = {
            ...this.props.ingreds
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingreds) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingreds} />
                    <BuildControls 
                        onAddIngred={this.props.onIngredientAdded}
                        onRemoveIngred={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ingreds)}
                        onPurchase={this.onPurchase} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingreds}
                clickContinue={this.purchaseContinueHandler}
                clickCancel={this.onPurchase}
                price={this.props.price}  />;
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
        ingreds: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));