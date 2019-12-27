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
    if (props.users && props.users.length && !props.isLoading) {
        const selectUserPrompt = props.user || props.userSelecting
            ? null
            : <Alert bsStyle="info">Select main user</Alert>
        ;

        const options = [
            <option key={-1} value="">-----</option>
        ].concat(props.users.map((user, index) => <option key={index} value={user}>{user}</option>));

        return (
            <Panel className="da-whatsapp-user-selector">
                <Panel.Heading>Main user</Panel.Heading>
                <Panel.Body>
                    {selectUserPrompt}
                    <FormControl componentClass="select" value={props.user || ''} onChange={(e) => props.onChange(e.target.value)}>
                        {options}
                    </FormControl>
                </Panel.Body>
            </Panel>
        );
    } else {
        return null;
    }
};

Component.displayName = NAME;

Component.propsType = {
    onChange: PropTypes.func.isRequired
};

export default errorBoundary(Component);
