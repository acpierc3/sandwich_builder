import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    onOrder = (event) => {
        event.preventDefault();         //prevents default of sending request and reloading page

        this.setState({loading: true});
        
        const order = {
            ingredients: this.props.ingreds,
            price: this.props.price,                //in a real setup you would calculate price server-side so as to avoid users manipulating the price
            customer: {
                name: 'NEW',
                address: {
                    street: '21 New Street',
                    zipCode: '12345',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)            //this is the url that is appended to base url in axios-orders.js Will be different for other projects
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }


    render () {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <Button type="Success" clicked={this.onOrder}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingreds: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData);