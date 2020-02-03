import {
    Alert,
    FormControl,
    Panel
} from 'react-bootstrap';

import {
    errorBoundary,
    PropTypes
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = (props) => {
    const selectFilePrompt = (props.users && props.users.length) || props.isLoading
        ? null
        : <Alert>Select a file</Alert>
    ;

    return (
        <Panel className="da-whatsapp-file-selector">
            <Panel.Heading>WhatsApp chat log file</Panel.Heading>
            <Panel.Body>
                {selectFilePrompt}
                <FormControl type="file" accept=".txt,.zip" onChange={(e) => props.onChange(e.target.files[0])} />
            </Panel.Body>
        </Panel>
    );
};

Component.displayName = NAME;

Component.propsType = {
    onChange: PropTypes.func.isRequired
};

export default errorBoundary(Component);
