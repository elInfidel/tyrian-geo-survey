////////////////////
// Tyrian Geographical Survey
//
// @Author = Liam
////////////////////

// Leaflet library map object
var map;
// Dimensions for current map. Used with leaflet for setting bounds.
var southWestBound, northEastBound;
// List of available continents
var continentData;
// Map data for the currently viewed continent
var mapData;

// Load continent JSON async.
jQuery.getJSON("https://api.guildwars2.com/v2/continents?ids=all", function(data) {

		// Load first available continent
    continentData = data;
		displayContinent(continentData[0].name);
});

initializeMap();

// Initializes Leaflet API and creates a map based on the div id 'map'
function initializeMap()
{
	map = L.map("map", {
	    minZoom: 3,
	    maxZoom: 7,
	    crs: L.CRS.Simple
	}).setView([0, 0], 0);

	setBounds(32768);
}

// Displays a continent based on the arguement
// Should pass ContinentEnum type into this.
function displayContinent(continent)
{
	
	// Old code
	/*switch(continent)
	{
		case ContinentEnum.TYRIA:

		L.tileLayer("https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg",
		{
			minZoom: 1,
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

	}*/
}

function setBounds(x, y)
{
	southWestBound = unproject([0, x]);
	northEastBound = unproject([y, 0]);

	map.setMaxBounds(new L.LatLngBounds(southWestBound, northEastBound));
}

// Unprojects the supplied coordinates onto the map
function unproject(coord)
{
    return map.unproject(coord, map.getMaxZoom());
}
