import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    })

    it('should render <build controls/> when receiving ingredients', () => {
        wrapper.setProps({ingreds: {lettuce: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

    it('should render <modal /> and <backdrop /> when state is purchasing', () => {
        wrapper.setProps({ingreds: {lettuce: 0}});
        wrapper.setState({purchasing: true});
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Backdrop)).toHaveLength(1);
        expect(wrapper.find(OrderSummary)).toHaveLength(1);
        expect(wrapper.find(Spinner)).toHaveLength(0);
    })

    it('should NOT render <OrderSummary ingredients not loaded. should render 2 Spinners, one for burger builder, one for order summary', () => {
        wrapper.setState({purchasing: true});
        expect(wrapper.find(OrderSummary)).toHaveLength(0);
        expect(wrapper.find(Spinner)).toHaveLength(2);
    })
})

//