import {
    Alert
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import DateGroup from './../date-group';

import { NAME } from './constants';

const Component = (props) => {
    if (props.tokens && props.tokens.length) {
        return props.tokens.map((dateGroup, index) => <DateGroup key={index} dateGroup={dateGroup} user={props.user} />);
    } else {
        return <Alert bsStyle="warning">No chat logs</Alert>;
    }
};

Component.propTypes = {
    tokens: PropTypes.array,
    user: PropTypes.string
};

Component.displayName = NAME;

export default errorBoundary(Component);
