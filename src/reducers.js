import {
    concatenateReducers
} from '@quoin/react-utils';

import { reducers as appReducers } from './app';

export default concatenateReducers([
    appReducers
]);
