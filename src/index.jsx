import { Map } from 'immutable';

import {
    createStore,
    Provider,
    render
} from '@quoin/react-utils';

import App from './app';
import { INIT_TYPE } from './constants';
import reducers from './reducers';

const store = createStore(reducers, Map(), [], process.env.NODE_ENV === 'development', INIT_TYPE);

const placeholder = document.querySelector('#react-app-placeholder');
if (placeholder) {
    const ReactApp = <Provider store={store} id="da-whatsapp"><App /></Provider>;
    render(ReactApp, placeholder);
}
