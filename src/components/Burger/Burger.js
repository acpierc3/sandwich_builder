import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = ( props ) => {

    let transformedIngredients = Object.keys(props.ingredients)   //transforms state, which is an Object, into an array of the burger ingredients
        .map(ingred => {

            let ingredReturn = [];

            for (let i = 1; i <= props.ingredients[ingred]; i++) {  //loops to add the correct number of ingredients to a 2nd dimensional array
                ingredReturn.push(<BurgerIngredient key={ingred + i} type={ingred} />)
            }
            return ingredReturn;
        })
        .reduce((arr, elem) => {                        //this bit of code "flattens" the 2D array into a 1D array
            return arr.concat(elem)
        }, []);                                         //initial value is an empty array for the null case

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Add some ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;