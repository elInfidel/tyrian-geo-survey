////////////////////
// Tyrian Geographical Survey
//
// Based on a rudimentary example by Cliff Spradlin
// http://jsfiddle.net/cliff/CRRGC/
////////////////////

var map;
var southWest, northEast;

var ContinentEnum =
{
	TYRIA: 1,
	MISTS: 2
};

initializeMap();
displayContinent(ContinentEnum.TYRIA);

// Initializes Leaflet API and creates a map based on the div id 'map'
function initializeMap()
{
	map = L.map("map", {
	    minZoom: 3,
	    maxZoom: 7,
	    crs: L.CRS.Simple
	}).setView([0, 0], 0);

	  southWest = unproject([0, 32768]);
		northEast = unproject([32768, 0]);

	  map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
}

// Displays a continent based on the arguement
// Should pass ContinentEnum type into this.
function displayContinent(continent)
{
	switch(continent)
	{
		case ContinentEnum.TYRIA:

		L.tileLayer("https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg",
		{
			minZoom: 3,
		  maxZoom: 7,
		  continuousWorld: true,
			subdomains: '1234'
		}).addTo(map);

		$.getJSON("https://api.guildwars2.com/v2/continents/" + continent, function (continent)
		{
		});
		break;

		case ContinentEnum.MISTS:
		//TODO
		break;

	}
}

// Unprojects the supplied coordinates onto the map
function unproject(coord)
{
    return map.unproject(coord, map.getMaxZoom());
}
