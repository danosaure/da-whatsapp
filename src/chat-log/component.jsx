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
    if (props.isLoading) {
        return <Alert bsStyle="info">Loading chat log</Alert>;
    } else if (props.userSelecting) {
        return <Alert bsStyle="info">New user selecting, resorting...</Alert>;
    } else if (props.tokens && props.tokens.length) {
        return props.tokens.map((dateGroup, index, array) => {
            const previous = index ? array[index - 1] : null;
            const next = (index < array.length - 1) ? array[index + 1] : null;
            const isLast = index === array.length - 1;
            return (
                <DateGroup
                    key={index}
                    dateGroup={dateGroup}
                    user={props.user}
                    users={props.users}
                    previous={previous}
                    next={next}
                    isLast={isLast}
                />
            );
        });
    } else {
        return <Alert bsStyle="warning">No chat logs</Alert>;
    }
};

Component.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    tokens: PropTypes.array,
    user: PropTypes.string,
    userSelecting: PropTypes.bool.isRequired,
    users: PropTypes.array,
};

Component.displayName = NAME;

export default errorBoundary(Component);
