import {
    Col,
    Row
} from 'react-bootstrap';

import {
    classnames,
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';


import { NAME } from './constants';

const Component = (props) => {
    const classNames = classnames({
        'main-user': props.user === props.token.user,
        [`user-${props.users.indexOf(props.token.user)}`]: true
    });

    const chat = (props.user === props.token.user)
        ? (
            <Col xs={6} xsOffset={6} className={classNames}>
                <div>{props.token.time}: {props.token.message}</div>
            </Col>
        )

        : (
            <Col xs={6} className={classNames}>
                <div className="name">{props.token.user}</div>
                <div>{props.token.time}: {props.token.message}</div>
            </Col>
        )
    ;

    return (
        <Row className="da-whatsapp-user-chat">
            {chat}
        </Row>
    );
};

Component.propTypes = {
    token: PropTypes.object,
    user: PropTypes.string
};

Component.displayName = NAME;

export default errorBoundary(Component);
