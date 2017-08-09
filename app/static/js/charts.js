queue()
    .defer(d3.json, "/api/trips/2017/01")
    .await(makeGraphs);

function makeGraphs(error, records) {

	var timeFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");

	records.forEach(function(d) {
		d["time"] = timeFormat.parse(d["time"]);
		d["time"].setMinutes(0);
		d["time"].setSeconds(0);
		d["longitude"] = +d["longitude"];
		d["latitude"] = +d["latitude"];
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(records);


	//Define Dimensions
	var hourDim = ndx.dimension(function(d) { return d["time"]; });
	//var genderDim = ndx.dimension(function(d) { return d["gender"]; });
	//var ageSegmentDim = ndx.dimension(function(d) { return d["age_segment"]; });
	//var phoneBrandDim = ndx.dimension(function(d) { return d["phone_brand_en"]; });
	//var locationdDim = ndx.dimension(function(d) { return d["location"]; });
	var allDim = ndx.dimension(function(d) {return d;});


	//Group Data
	var numRecordsByDate = hourDim.group(); //.reduceCount(function(d) { return d['id']; });
	//var genderGroup = genderDim.group();
	//var ageSegmentGroup = ageSegmentDim.group();
	//var phoneBrandGroup = phoneBrandDim.group();
	//var locationGroup = locationdDim.group();
	//var all = ndx.groupAll();


	//Define values (to be used in charts)
	var minDate = hourDim.bottom(1)[0]["time"];
	var maxDate = hourDim.top(1)[0]["time"];


    //Charts
   // var numberRecordsND = dc.numberDisplay("#number-records-nd");
	var timeChart = dc.barChart("#time-chart");
	//var genderChart = dc.rowChart("#gender-row-chart");
	//var ageSegmentChart = dc.rowChart("#age-segment-row-chart");
	//var phoneBrandChart = dc.rowChart("#phone-brand-row-chart");
	//var locationChart = dc.rowChart("#location-row-chart");



	//numberRecordsND
	//	.formatNumber(d3.format("d"))
	//	.valueAccessor(function(d){return d; })
	//	.group(all);


	timeChart
		.height(200)
		.margins({top: 10, right: 50, bottom: 20, left: 50})
		.dimension(hourDim)
		.group(numRecordsByDate)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.xUnits(d3.time.hours)
		.yAxis().ticks(4);

	/* locationChart
    	.width(200)
		.height(510)
        .dimension(locationdDim)
        .group(locationGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

	/*genderChart
        .width(300)
        .height(100)
        .dimension(genderDim)
        .group(genderGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

	ageSegmentChart
		.width(300)
		.height(150)
        .dimension(ageSegmentDim)
        .group(ageSegmentGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

	phoneBrandChart
		.width(300)
		.height(310)
        .dimension(phoneBrandDim)
        .group(phoneBrandGroup)
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);


*/
    var testData = {
  max: 8,
  data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1}]
};

var baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '...',
    maxZoom: 18
  }
);

var heatmapLayer = L.heatLayer(testData, {
    radius: 10,
    blur: 20,
    maxZoom: 1,
})

var map = new L.Map('heat-map', {
  center: new L.LatLng(25.6586, -80.3568),
  zoom: 4,
  layers: [baseLayer, heatmapLayer]
});


	//Update the heatmap if any dc chart get filtered
	/*dcCharts = [timeChart, genderChart, ageSegmentChart, phoneBrandChart, locationChart];

	_.each(dcCharts, function (dcChart) {
		dcChart.on("filtered", function (chart, filter) {
			map.eachLayer(function (layer) {
				map.removeLayer(layer)
			}); 
			drawMap();
		});
	});
	*/

	dc.renderAll();

};