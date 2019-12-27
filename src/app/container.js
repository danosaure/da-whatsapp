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

    const count = useSelector(selectors.count);
    const isLoading = useSelector(selectors.isLoading);
    const tokens = useSelector(selectors.tokens);
    const user = useSelector(selectors.user);
    const users = useSelector(selectors.users);
    const userSelecting = useSelector(selectors.userSelecting);

    return {
        count,
        fileSelected: (file) => orchestrators.fileSelected(dispatch, file),
        isLoading,
        tokens,
        user,
        userSelected: (user) => orchestrators.userSelected(dispatch, user),
        userSelecting,
        users
    };
};

const propsType = {};

const defaultProps = {};

export default boundComponent(Component, getComponentProps, propsType, defaultProps);
