import {
    FormControl,
    Panel
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = (props) => {
    return (
        <Panel>
            <Panel.Heading>WhatsApp chat log file</Panel.Heading>
            <Panel.Body>
                <FormControl type="file" accept=".txt" onChange={(e) => props.onChange(e.target.files[0])} />
            </Panel.Body>
        </Panel>
    );
};

Component.displayName = NAME;

Component.propsType = {
    onChange: PropTypes.func.isRequired
};

export default errorBoundary(Component);
