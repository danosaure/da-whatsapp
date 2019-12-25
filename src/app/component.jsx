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

import FileSelector from './../file-selector';

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
                <Col xs={4}>
                    <FileSelector onChange={props.fileSelected} />
                </Col>
                <Col xs={8}>
                    Chat will go here
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
