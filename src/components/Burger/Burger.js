import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = ( props ) => {
    
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingred => {

            let ingredReturn = [];

            for (let i = 1; i <= props.ingredients[ingred]; i++) {
                ingredReturn.push(<BurgerIngredient key={ingred + i} type={ingred} />)
            }
            return ingredReturn;
        })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

// <div className={classes.Burger}>
//             <BurgerIngredient type="bread-top" />
//             <BurgerIngredient type="cheese" />
//             <BurgerIngredient type="meat" />
//             <BurgerIngredient type="bread-bottom" />
// </div>

export default burger;