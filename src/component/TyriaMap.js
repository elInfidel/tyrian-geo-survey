import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import $ from 'jquery';

export default class TyriaMap extends React.Component {

    componentDidMount() {
        () => this.downloadWorldData();
    }

    render() {

        //let dimWidth = this.state.continentList[0].continent_dims[0];
        //let dimHeight = this.state.continentList[0].continent_dims[1];

        //let boundMin = L.latLngBounds(this.unproject([0, 0]));
        //let boundMax = this.unproject([dimWidth, dimHeight]);

        const element = (
        <Map 
            id='tyria-map' 
            zoom={13} 
            minZoom= {0} 
            maxZoom={7} 
            reuseTiles={true} 
            crs={L.CRS.Simple}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url={"https://tiles{s}.guildwars2.com/" + 0 + "/1/{z}/{x}/{y}.jpg"}
                continuousWorld={true}
                subdomains={'1234'} // current tile service subdomains
            />
        </Map>);

        //this.map.fitWorld();

        return (element);
    }

    // Downloads informations about the continents and maps in the game world.
    // Stores them in variables for access elsewhere.
    downloadWorldData() {
        // Load continents JSON async.
        $.getJSON("https://api.guildwars2.com/v2/continents?ids=all", function(data) {
            this.setState({continentList: data})
        });

        // Load map data async
        $.getJSON("https://api.guildwars2.com/v1/maps", function(data) {
            let internalMapData = new Object();

            for (var object in data.maps) {
                // We need to check if we're dealing with a map or some other undefined junk within the maps object
                // Typical javascript rubbish.
                if (!data.maps.hasOwnProperty(object)) continue;
                var m = data.maps[object];

                if (internalMapData[m.continent_id] == undefined)
                internalMapData[m.continent_id] = []

                internalMapData[m.continent_id].push(m)
            }

            this.setState({mapData: internalMapData});

        });
    }

    unproject(coord) {
        return this.map.unproject(coord, this.map.getMaxZoom());
    }
}