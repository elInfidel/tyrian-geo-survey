
export interface TyriaContinentData {
    id: number;
    name: string;
    continent_dims: number[];
    min_zoom: number;
    max_zoom: number;
    floors: number[];
}

export interface TyriaFloorData {

}

export interface TyriaMapData {
    id: number;
    name: string;
    min_level: number;
    max_level: number;
    default_floor: number;
    floors: TyriaFloorData[];
    region_id: number;
    region_name?: string;
    continent_id: number;
    continent_name: string;
    map_rect: number[];
    continent_rect: number[];
}

export interface ApplicationState {
    continents: TyriaContinentData[];
}