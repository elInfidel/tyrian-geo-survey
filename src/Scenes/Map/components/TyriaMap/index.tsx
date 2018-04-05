import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { TyriaContinentData, TyriaMapData } from '../../../../Interfaces';
import * as L from 'leaflet';

interface TyriaMapProps {
    continents: TyriaContinentData[];
    maps: TyriaMapData[];
}

export default class TyrianLeafletMap extends React.Component<TyriaMapProps> {

    // Trying to figure out how to type the ref assignment to this value
    // Nothing seems to fit and I can't cast. Will ignore an any declaration for now
    // to work around
    // TODO: Fix this!
    // tslint:disable-next-line
    private mapAPI: any;

    render() {
        // Otherwise we build a map based on the given continents ID.
        const dimWidth = this.props.continents[0].continent_dims[0];
        const dimHeight = this.props.continents[0].continent_dims[1];

        const minBounds = this.unproject([0, 0]);
        const maxBounds = this.unproject([dimWidth, dimHeight]);
        const boundMax = L.latLngBounds(minBounds, maxBounds);
        this.mapAPI.setMaxBounds(boundMax);
        
        return (
            <Map 
                id="tyria-map"
                zoom={13} 
                minZoom={0}
                maxZoom={7} 
                reuseTiles={true} 
                crs={L.CRS.Simple}
            >
                <TileLayer
                    url={'https://tiles{s}.guildwars2.com/0/1/{z}/{x}/{y}.jpg'}
                    continuousWorld={true}
                    subdomains={'1234'}
                />
            </Map>
        );
    }

    private unproject(coord: L.PointExpression): L.LatLng {
        const map = this.mapAPI;

        if (!map) {
            throw new Error('Attempted to unproject onto the map before it was initialized! This is a bug.');
        }

        return map.unproject(coord, map.getMaxZoom());
    }
}