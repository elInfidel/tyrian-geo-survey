import { ApplicationState } from './Interfaces';
import * as Redux from 'redux';

const initialState: ApplicationState = {
    continents: [],
};

export function applicationReducers(state: ApplicationState = initialState, action: Redux.AnyAction): ApplicationState {
    return state;
}