import {
    errorBoundary
} from '@quoin/react-utils';

import { NAME } from './constants';

const Component = (props) => {
    return (
        <div className="da-whatsapp-app">Hello World</div>
    );
};

Component.displayName = NAME;

export default errorBoundary(Component);
