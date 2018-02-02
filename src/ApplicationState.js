import * as Redux from 'redux';
import thunk from 'redux-thunk';
import { IApplicationState } from './Interfaces';
import * as Reducers from './Reducers';

let store: Redux.Store<IApplicationState>;

store = Redux.createStore(
    Reducers.application,
    Redux.applyMiddleware(thunk),
);