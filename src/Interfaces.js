
export interface IContinent {
    id: number;
    name: string;
    continent_dims: number[][];
    min_zoom: number;
    max_zoom: number;
    floors: number[];
}

export interface IFloor {

}

export interface IMap {
    id: number;
    name: string;
    min_level: number;
    max_level: number;
    default_floor: number;
    floors: IFloor[];
    region_id: number;
    region_name?: string;
    continent_id: number;
    continent_name: string;
    map_rect: number[][];
    continent_rect: number[][];
}

export interface IApplicationState {
    continents: IContinent[];
};

