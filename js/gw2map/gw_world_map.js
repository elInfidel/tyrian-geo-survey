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
var continentList;
// Map data for the currently viewed continent
var mapData;

initializeMap();

// Load continent JSON async.
jQuery.getJSON("https://api.guildwars2.com/v2/continents?ids=all", function(data) {

		// Load first available continent
    continentList = data;
		displayContinent(continentList[0]);
});

// Initialize Leaflet API and create a map based on the div id 'map'
function initializeMap()
{
	map = L.map("map", {
	    minZoom: 3,
	    maxZoom: 7,
	});
}

// Displays a given continent with leaflet
function displayContinent(continent)
{
	// set leaflet map scroll bounds
	setBounds(continent.continent_dims[0], continent.continent_dims[1]);

	// Load tiles
	L.tileLayer("https://tiles{s}.guildwars2.com/" + continent.id + "/1/{z}/{x}/{y}.jpg",
	{
		minZoom: continent.min_zoom,
		maxZoom: continent.max_zoom,
		continuousWorld: true,
		subdomains: '1234'
	}).addTo(map);

	map.fitWorld();
}

function setBounds(x, y)
{
	southWestBound = unproject([0, y]);
	northEastBound = unproject([x, 0]);

	map.setMaxBounds(new L.LatLngBounds(southWestBound, northEastBound));
}

// Unprojects the supplied coordinates onto the map
function unproject(coord)
{
    return map.unproject(coord, map.getMaxZoom());
}
