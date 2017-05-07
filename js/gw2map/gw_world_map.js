////////////////////
// Tyrian Geographical Survey
//
// @Author = Liam
////////////////////

// Leaflet library map object
var map;
// List of available continents
var continentList;
// A dictionary storing continents and the maps they contain
// Key = Continent ID
// Value = List of map objects for that continent
var mapData;
var mapIds

initializeMap();
downloadWorldData();

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

// Downloads informations about the continents and maps in the game world.
// Stores them in variables for access elsewhere.
function downloadWorldData()
{
	// Load continent JSON async.
	jQuery.getJSON("https://api.guildwars2.com/v2/continents?ids=all", function(data)
	{
			// Load first available continent
	    continentList = data;
			renderContinent(continentList[0]);
	});

	// Load map data async
	jQuery.getJSON("https://api.guildwars2.com/v1/maps", function(data)
	{
			mapData = new Object();

			for (var object in data.maps)
			{
				// We need to check if we're dealing with a map or some other undefined junk within the maps object
				// Typical javascript rubbish.
    		if (!data.maps.hasOwnProperty(object)) continue;
    		var m =  data.maps[object];

				if(mapData[m.continent_id] == undefined)
					mapData[m.continent_id] = []

				mapData[m.continent_id].push(m)
			}

			populateContinent(continentList[0]);
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

// Populates a continents contained regions
function populateContinent(continent)
{
	mapData[continent.id].forEach(function(m)
	{
		// We don't want to display instances on the continent map.
		if(m.type == "Public")
		{
			topLeft = m.continent_rect[0];
			bottomRight = m.continent_rect[1];
			bounds = L.latLngBounds(unproject(topLeft), unproject(bottomRight));

			// Create rectangles to surround each map.
			// Events for handling interaction with those rectangles.
			layer = L.rectangle(bounds, {color: "#ffb847", weight: 0.5, opacity: 1.0, fill: false}).addTo(map);

			layer.on('mouseover', function(ev)
			{

			});

			layer.on('mouseout', function(ev)
			{

			});

			layer.on('click', function(ev)
			{
				map.fitBounds(layer.getBounds());
				cosnole.log("Clicked!");
			});
		}
	});
}

// Unprojects the supplied coordinates onto the map
function unproject(coord)
{
    return map.unproject(coord, map.getMaxZoom());
}
