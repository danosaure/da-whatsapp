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
import countTokens from './count-tokens';
import namespace from './namespace';
import tokenizeChat from './tokenize-chat';
import usersFromTokens from './users-from-tokens';

const actions = namespacedActions(namespace, [
    'LOADING',
    'SET_CONTENT',
    'SET_COUNT',
    'SET_USER',
    'SET_USERS',
    'USER_SELECTING',
]);

const actionCreators = Object.freeze({
    loading: (isLoading) => actionCreator(actions.LOADING, { isLoading }),
    setContent: (tokens) => actionCreator(actions.SET_CONTENT, { tokens }),
    setCount: (count) => actionCreator(actions.SET_COUNT, { count }),
    setUser: (name) => actionCreator(actions.SET_USER, { name }),
    setUsers: (users) => actionCreator(actions.SET_USERS, { users }),
    userSelecting: (userSelecting) => actionCreator(actions.USER_SELECTING, { userSelecting }),
});

export const orchestrators = Object.freeze({
    fileSelected: (dispatch, file) => {
        dispatch(actionCreators.loading(true));
        try {
            if (file) {
                const filename = file.name;

                const fileReader = new FileReader();
                fileReader.onloadend = (e) => {
                    const content = fileReader.result;

                    const tokens = tokenizeChat(content);
                    const users = usersFromTokens(tokens);
                    const count = countTokens(tokens);

                    batch(() => {
                        dispatch(actionCreators.setContent(tokens));
                        dispatch(actionCreators.setUser(null));
                        dispatch(actionCreators.setUsers(users));
                        dispatch(actionCreators.setCount(count));
                    });
                };
                fileReader.readAsText(file);
            } else {
                batch(() => {
                    dispatch(actionCreators.setContent([]));
                    dispatch(actionCreators.setUser(null));
                    dispatch(actionCreators.setUsers(null));
                    dispatch(actionCreators.setCount(null));
                });
            }
        } finally {
            dispatch(actionCreators.loading(false));
        }
    },

    userSelected: (dispatch, user) => {
        dispatch(actionCreators.userSelecting(true));
        batch(() => {
            dispatch(actionCreators.setUser(user));
            dispatch(actionCreators.userSelecting(false));
        });
    }
});

export const reducers = concatenateReducers([{
    actions: [ INIT_TYPE ],
    reducer: (state, action) => setSubstate(state, namespace, fromJS({}))
}, {
    actions: [ actions.LOADING ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.LOADING, action.payload.isLoading)
}, {
    actions: [ actions.SET_CONTENT ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.TOKENS, fromJS(action.payload.tokens))
}, {
    actions: [ actions.SET_COUNT ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.COUNT, action.payload.count)
}, {
    actions: [ actions.SET_USER ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.USER, action.payload.name)
}, {
    actions: [ actions.SET_USERS ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.USERS, fromJS(action.payload.users))
}, {
    actions: [ actions.USER_SELECTING ],
    reducer: (state, action) => setSubstateAttribute(state, namespace, ATTRIBUTES.USER_SELECTING, action.payload.userSelecting)
}]);

export const selectors = Object.freeze({
    count: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.COUNT, 0),
    isLoading: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.LOADING, false),
    tokens: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.TOKENS, fromJS([])).toJS(),
    user: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.USER, null),
    users: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.USERS, fromJS([])).toJS(),
    userSelecting: (state) => getSubstateAttribute(state, namespace, ATTRIBUTES.USER_SELECTING, false),
});
