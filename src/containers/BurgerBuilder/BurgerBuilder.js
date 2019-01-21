import React, { Component } from 'react';

import Aux from '../../hoc/Ox';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES =  {    //typically you name global constants in all caps
    lettuce: 0.4,
    cheese: 0.2,
    meat: 2,
    bacon: 1
}                 

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 2,
            meat: 0
        },
        totalPrice: 3
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
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        console.log(newPrice);
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

            console.log(newPrice);
        }
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    onAddIngred={this.onAddIngred}
                    onRemoveIngred={this.onRemoveIngred}
                    disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice} />
            </Aux>
        )
    }
}

export default BurgerBuilder;