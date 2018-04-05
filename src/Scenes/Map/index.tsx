import * as React from 'react';
import { TyriaContinentData, TyriaMapData } from '../../Interfaces';
import TyrianLeafletMap from './components/TyriaMap';

interface MapProviderState {
    continents?: TyriaContinentData[];
    maps?: TyriaMapData[];
}

export default class MapProvider extends React.Component<{}, MapProviderState> {

    componentWillMount() {
        this.downloadWorldData();
        this.setState({
            continents: undefined,
            maps: undefined,
        });
    }

    render() {
        if (this.state.maps && this.state.continents) {
            return <TyrianLeafletMap continents={this.state.continents} maps={this.state.maps}/>;
        }
        return <div />;
    }

    // Downloads informations about the continents and maps in the game world.
    // Stores them in variables for access elsewhere.
    private async downloadWorldData() {

        // Load continents JSON async.
        const continentData = await this.fetchAsset<TyriaContinentData[]>(
            'https://api.guildwars2.com/v2/continents?ids=all'
        );
        this.setState({continents: continentData});

        const mapData = await this.fetchAsset<{ maps: TyriaMapData[] }>(
            'https://api.guildwars2.com/v1/maps'
        );
        this.setState({ maps: mapData.maps });
    }

    private async fetchAsset<T>(url: string): Promise<T> {
        const response = await fetch(url);
        return response.json() as Promise<T>;
    }
}