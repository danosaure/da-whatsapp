import {
    boundComponent,
    useDispatch,
    useSelector
} from '@quoin/react-utils';

import Component from './component';
import {
    orchestrators,
    selectors
} from './flux';

const getComponentProps = (props) => {
    const dispatch = useDispatch();

    const tokens = useSelector(selectors.tokens);

    return {
        fileSelected: (file) => orchestrators.fileSelected(dispatch, file),
        tokens
    };
};

const propsType = {};

const defaultProps = {};

export default boundComponent(Component, getComponentProps, propsType, defaultProps);
