import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should render two <li> navigation items if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />)
        expect(wrapper.find('li')).toHaveLength(2);
    })
})

//