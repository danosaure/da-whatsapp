import { fromJS, toJS } from 'immutable';

import {
    actionCreator,
    batch,
    concatenateReducers,
    getSubstate,
    getSubstateAttribute,
    namespacedActions,
    setSubstate,
    setSubstateAttribute
} from '@quoin/react-utils';

import { INIT_TYPE } from './../constants';

import { ATTRIBUTES } from './constants';
import namespace from './namespace';
import tokenizeChat from './tokenize-chat';

const actions = namespacedActions(namespace, [
    'SET_CONTENT',
    'SET_USER',
    'SET_USERS'
]);

const actionCreators = Object.freeze({
    setContent: (tokens) => actionCreator(actions.SET_CONTENT, { tokens }),
    setUser: (name) => actionCreator(actions.SET_USER, { name }),
    setUsers: (users) => actionCreator(actions.SET_USERS, { users }),
});

export const orchestrators = Object.freeze({
    fileSelected: (dispatch, file) => {
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const content = fileReader.result;
            const tokens = tokenizeChat(content);

            const users = tokens.reduce(
                (users, token) => {
                    if (users.indexOf(token.user) === -1) {
                        return users.concat(token.user).sort();
                    } else {
                        return users;
                    }
                },
                []
            );

            batch(() => {
                dispatch(actionCreators.setContent(tokens));
                dispatch(actionCreators.setUser(null));
                dispatch(actionCreators.setUsers(users));
            });
        };
        fileReader.readAsText(file);
    }
});

export const reducers = concatenateReducers([{
    actions: [ INIT_TYPE ],
    reducer: (state, action) => setSubstate(state, namespace, fromJS({}))
}, {
    actions: [ actions.SET_CONTENT ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.TOKENS, fromJS(action.payload.tokens))
}, {
    actions: [ actions.SET_USER ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.USER, action.payload.name)
}, {
    actions: [ actions.SET_USERS ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.USERS, action.payload.users)
}]);

export const selectors = Object.freeze({
    tokens: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.TOKENS, fromJS([])).toJS(),
    user: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.USER, null).toJS(),
    users: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.USERS, fromJS([])).toJS()
});
