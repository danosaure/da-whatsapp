import {
    Alert
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import UserGroup from './../user-group';

import { NAME } from './constants';

const Component = (props) => {
    const userGroups = props.dateGroup.logs.map((userGroup, index) => <UserGroup key={index} userGroup={userGroup} user={props.user} />);

    return (
        <div className="da-whatsapp-date-group">
            <div className="date">{props.dateGroup.date}</div>
            {userGroups}
        </div>
    );
};

Component.propTypes = {
    dateGroup: PropTypes.object,
    user: PropTypes.string
};

Component.displayName = NAME;

export default errorBoundary(Component);
