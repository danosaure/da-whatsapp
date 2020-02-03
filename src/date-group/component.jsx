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
    const userGroups = props.dateGroup.logs.map((userGroup, index) => <UserGroup key={index} userGroup={userGroup} user={props.user} users={props.users} />);

    const previousLink = props.previous
        ? <a href={`#date-group-${props.previous.date}`}>&#8593;</a>
        : null
    ;

    const nextLink = props.next
        ? <a href={`#date-group-${props.next.date}`}>&#8595;</a>
        : null
    ;

    const previousFromLast = props.isLast && previousLink
        ? <div className="date"><a href={`#date-group-${props.dateGroup.date}`}>&#8593;</a></div>
        : null
    ;

    return (
        <div className="da-whatsapp-date-group">
            <div id={`date-group-${props.dateGroup.date}`} className="date">
                {previousLink}
                {' '}
                {props.dateGroup.date}
                {' '}
                {nextLink}
            </div>
            {userGroups}
            {previousFromLast}
        </div>
    );
};

Component.propTypes = {
    dateGroup: PropTypes.object,
    user: PropTypes.string,
    users: PropTypes.array
};

Component.displayName = NAME;

export default errorBoundary(Component);
