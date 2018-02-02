import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import $ from 'jquery';
import { IApplicationState, IContinent } from '../Interfaces';

interface ITyriaMapProps {
    continents: IContinent[];
    activeContinentID?: number;
}

interface ITyriaMapState {
    mapAPI: any;
}

export default class TyriaMap extends React.Component<ITyriaMapProps, ITyriaMapState> {

    componentDidMount() {
        () => this.downloadWorldData();
        this.setState({mapAPI: this.refs.leafletMap})
    }

    render() {

        // If we don't have an active continent ID yet, return empty.
        if(this.props.activeContinentID === undefined) {
            return (
                <div></div>
            );
        }

        // Otherwise we build a map based on the given continents ID.
        const dimWidth = this.props.continents[this.props.activeContinentID].continent_dims[0];
        const dimHeight = this.props.continents[this.props.activeContinentID].continent_dims[1];

        const boundMin = L.latLngBounds(this.unproject([0, 0]));
        const boundMax = this.unproject([dimWidth, dimHeight]);

        this.state.mapAPI.setMaxBounds(boundMin, boundMax);

        const element = (
        <Map 
            id='tyria-map' 
            zoom={13} 
            minZoom= {0} 
            maxZoom={7} 
            reuseTiles={true} 
            crs={L.CRS.Simple}>
            <TileLayer
                url={"https://tiles{s}.guildwars2.com/" + this.props.activeContinentID + "/1/{z}/{x}/{y}.jpg"}
                continuousWorld={true}
                subdomains={'1234'}
            />
        </Map>);

        this.state.mapAPI.fitWorld();

        return (element);
    }

    // Downloads informations about the continents and maps in the game world.
    // Stores them in variables for access elsewhere.
    downloadWorldData() {
        // Load continents JSON async.
        $.getJSON("https://api.guildwars2.com/v2/continents", function(data) {
            
        });

        // Load map data async
        $.getJSON("https://api.guildwars2.com/v1/maps", function(data) {
            const internalMapData = {};

            for (var map in data.maps) {
                // We need to check if we're dealing with a map or some other undefined junk within the maps object
                if (!data.maps.hasOwnProperty(map)) continue;

                // 
                const m = data.maps[map];
                if (internalMapData[m.continent_id] == undefined) {
                    internalMapData[m.continent_id] = []
                }

                internalMapData[m.continent_id].push(m)
            }

            this.setState({mapData: internalMapData});

        });
    }

    unproject(coord) {
        const map = this.state.mapAPI;
        return map.unproject(coord, map.getMaxZoom());
    }
}

function mapStateToProps (state: IApplicationState): ITyriaMapProps {
    return {
        continents: [],
    };
}