import {
    boundComponent
} from '@quoin/react-utils';

import Component from './component';
import { orchestrators } from './flux';

const getComponentProps = (props) => {
    return {
    };
};

export default boundComponent(Component, getComponentProps);
