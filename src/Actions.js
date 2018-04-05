import * as Redux from 'redux';
import IContinent from './Interfaces';


export const enum TyriaMapActions {
    FETCH_CONTINENTS = 'FETCH_CONTINENTS',
    CONTINENTS_RECEIVED = ''
}

export interface IContinentsLoadedAction extends Redux.Action{
    continents: IContinent[];
}

export function fetchContinents(continents) : Redux.AnyAction {
    return {
        type: TyriaMapActions.FETCH_CONTINENTS,
        continents,
    };
}