import {
    Alert
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import UserChat from './../user-chat';

import { NAME } from './constants';

const Component = (props) => {
    const userTokens = props.userGroup.tokens.map((token, index) => <UserChat key={index} token={token} user={props.user} users={props.users} />);

    return (
        <div className="da-whatsapp-user-group">
            {userTokens}
        </div>
    );
};

Component.propTypes = {
    userGroup: PropTypes.object,
    user: PropTypes.string,
    users: PropTypes.array
};

Component.displayName = NAME;

export default errorBoundary(Component);
