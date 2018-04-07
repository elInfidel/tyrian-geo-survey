import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { TyriaContinentData, TyriaMapData } from '../../../../Interfaces';
import * as L from 'leaflet';

import './styles.css';

interface TyriaMapProps {
    continents: TyriaContinentData[];
    maps: TyriaMapData[];
}

interface TyriaMapState {
    map: L.Map | undefined;
}

export default class TyrianLeafletMap extends React.PureComponent<TyriaMapProps, TyriaMapState> {

    constructor(props: TyriaMapProps) {
        super(props);
        this.state = {
            map: undefined
        };
    }

    componentDidUpdate(prevProps: TyriaMapProps, prevState: TyriaMapState) {
        if (!prevState.map && this.state.map) {
            this.initMap();
        }
    }

    render() {
        return (
            <Map
                id="tyria-map"
                zoom={13}
                minZoom={this.props.continents[0].min_zoom}
                maxZoom={this.props.continents[0].min_zoom}
                reuseTiles={true}
                crs={L.CRS.Simple}
                ref={(ref) => {
                    if (ref && !this.state.map) {
                        this.setState({ map: ref.leafletElement });
                    }
                }}
            >
                <TileLayer
                    url={'https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg'}
                    continuousWorld={true}
                    subdomains={'1234'}
                />
            </Map>
        );
    }

    private initMap() {
        if (this.state.map) {

            // Otherwise we build a map based on the given continents ID.
            const dimWidth = this.props.continents[0].continent_dims[0];
            const dimHeight = this.props.continents[0].continent_dims[1];

            const minBounds = this.unproject([0, 0]);
            const maxBounds = this.unproject([dimWidth, dimHeight]);
            const boundMax = L.latLngBounds(minBounds, maxBounds);

            this.state.map.setMaxBounds(boundMax);
            this.state.map.fitWorld();

        } else {
            throw new Error('Map reference was not set');
        }
    }

    private unproject(coord: L.PointExpression): L.LatLng {
        const map = this.state.map;

        if (!map) {
            throw new Error('Attempted to unproject onto the map before it was initialized! This is a bug.');
        }

        return map.unproject(coord, map.getMaxZoom());
    }
}