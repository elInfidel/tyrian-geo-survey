////////////////////
// Tyrian Geographical Survey
//
// @Author = Liam
////////////////////

// Leaflet library map object
var map;
// List of available continents
var continentList;
// Map data for the currently viewed continent
var mapData;

initializeMap();

// Load continent JSON async.
jQuery.getJSON("https://api.guildwars2.com/v2/continents?ids=all", function(data) {

		// Load first available continent
    continentList = data;
		renderContinent(continentList[0]);
		function populateContinent(continentList[0])
});

// Initialize Leaflet API and create a map based on the div id 'map'
function initializeMap()
{
	map = L.map("map", {
		minZoom: 2,
		maxZoom: 7,
		reuseTiles: true,
    crs: L.CRS.Simple
	});
}

// Displays a given continent with leaflet
function renderContinent(continent)
{

	// set leaflet map scroll bounds
	var dimWidth = continent.continent_dims[0];
	var dimHeight = continent.continent_dims[1];
	map.setMaxBounds(L.latLngBounds(unproject([0, 0]), unproject([dimWidth, dimHeight])));

	// Load tiles
	L.tileLayer("https://tiles{s}.guildwars2.com/" + continent.id + "/1/{z}/{x}/{y}.jpg",
	{
		continuousWorld: true,
		subdomains: '1234' // current tile service subdomains
	}).addTo(map);

	map.fitWorld();
}

function populateContinent(continent)
{

}

// Unprojects the supplied coordinates onto the map
function unproject(coord)
{
    return map.unproject(coord, map.getMaxZoom());
}
