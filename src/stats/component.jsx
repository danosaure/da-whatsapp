import {
    Col
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = (props) => {
    if (props.isLoading) {
        return null;
    } else if (props.count) {
        const firstDateGroup = props.tokens[0];
        const firstDate = firstDateGroup.date;
        const firstDateUserGroup = firstDateGroup.logs[0];
        const firstTime = firstDateUserGroup.tokens[0].time;

        const lastDateGroup = props.tokens[props.tokens.length - 1];
        const lastDate = lastDateGroup.date;
        const lastDateUserGroup = lastDateGroup.logs[lastDateGroup.logs.length - 1];
        const lastTime = lastDateUserGroup.tokens[lastDateUserGroup.tokens.length - 1].time;

        return (
            <>
                <Col xs={4}>
                    Total messages:<br />{props.count}
                </Col>
                <Col xs={4}>
                    First message:<br />{firstDate}{' '}{firstTime}
                </Col>
                <Col xs={4}>
                    Last message:<br />{lastDate}{' '}{lastTime}
                </Col>
            </>
        );
    } else {
        return null;
    }
};

Component.displayName = NAME;

Component.propsType = {
    count: PropTypes.number,
    tokens: PropTypes.array
};

export default errorBoundary(Component);
