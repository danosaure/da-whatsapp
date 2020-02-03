import {
    Alert,
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
import Stats from './../stats';
import UserSelector from './../user-selector';

import { NAME } from './constants';

const Component = (props) => {
    // console.log("props=", props);

    let bottomContent;

    if (props.isLoading) {
        bottomContent = <Alert bsStyle="warning">Loading content</Alert>;
    }

    return (
        <Grid>
            <Row>
                <Col xs={12}>
                    <PageHeader>WhatsApp Chat Export Reader</PageHeader>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <FileSelector onChange={props.fileSelected} users={props.users} isLoading={props.isLoading} />
                </Col>
                <Col xs={6}>
                    <UserSelector onChange={props.userSelected} users={props.users} user={props.user} isLoading={props.isLoading} userSelecting={props.userSelecting} />
                </Col>
            </Row>
            <Row>
                <Stats tokens={props.tokens} count={props.count} isLoading={props.isLoading} />
            </Row>
            <Row>
                <Col xs={12}>
                    <ChatLog user={props.user} tokens={props.tokens} users={props.users} isLoading={props.isLoading} userSelecting={props.userSelecting} />
                </Col>
            </Row>
        </Grid>
    );
};

Component.displayName = NAME;

Component.propTypes = {
    fileSelected: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    userSelecting: PropTypes.bool.isRequired,
};

export default errorBoundary(Component);
