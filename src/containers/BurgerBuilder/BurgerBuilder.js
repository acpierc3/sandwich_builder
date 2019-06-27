import React, { useState, useEffect } from 'react';
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
              

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        if (!props.ingreds) {
            props.onInitIngredients();
        }
        // eslint-disable-next-line
    }, [])

    const onPurchase = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const onPurchaseCancel = () => {
        setPurchasing(false);
    }


    const purchaseContinueHandler = () => {

        //moved to onInitPurchas
        
        // const queryParams = [];
        // for (let i in this.props.ingreds) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const updatePurchasable = (ingredients) => {
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

    const disabledInfo = {
        ...props.ingreds
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (props.ingreds) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingreds} />
                <BuildControls 
                    onAddIngred={props.onIngredientAdded}
                    onRemoveIngred={props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    totalPrice={props.price}
                    purchasable={updatePurchasable(props.ingreds)}
                    onPurchase={onPurchase}
                    isAuthenticated={props.isAuthenticated} />
            </Aux>
        );

        orderSummary = <OrderSummary 
            ingredients={props.ingreds}
            clickContinue={purchaseContinueHandler}
            clickCancel={onPurchaseCancel}
            price={props.price}  />;
    } else {
        orderSummary = <Spinner />;
    }


    return (
        <Aux>
            <Modal show={purchasing}>
                {orderSummary}
            </Modal>
            <Backdrop show={purchasing} cancel={onPurchaseCancel} />
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (authRedirectPath) => dispatch(burgerBuilderActions.setAuthRedirectPath(authRedirectPath))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));