import * as Redux from 'redux';
import IContinent from './Interfaces';


export const enum TyriaMapActions {
    CONTINENTS_LOADED = 'CONTINENTS_LOADED',
}

export interface IContinentsLoadedAction extends Redux.Action{
    continents: IContinent[];
}

export function continentsLoaded(continents) : IContinentsLoadedAction {
    return {
        type: TyriaMapActions.CONTINENTS_LOADED,
        continents,
    };
}