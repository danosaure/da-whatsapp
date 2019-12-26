import {
    Col,
    Grid,
    PageHeader,
    Row
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import ChatLog from './../chat-log';
import FileSelector from './../file-selector';
import UserSelector from './../user-selector';

import { NAME } from './constants';

const Component = (props) => {
    return (
        <Grid>
            <Row>
                <Col xs={12}>
                    <PageHeader>WhatsApp Chat Export Reader</PageHeader>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <FileSelector onChange={props.fileSelected} users={props.users} />
                </Col>
                <Col xs={6}>
                    <UserSelector onChange={props.userSelected} users={props.users} user={props.user} />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ChatLog user={props.user} tokens={props.tokens} />
                </Col>
            </Row>
        </Grid>
    );
};

Component.displayName = NAME;

Component.propTypes = {
    fileSelected: PropTypes.func.isRequired
};

export default errorBoundary(Component);
