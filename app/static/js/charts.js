function print_filter(filter){
		var f=eval(filter);
		if (typeof(f.length) != "undefined") {}else{}
		if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
		if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
		console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
	}

d3.json("/api/trips/total_count", function (data) {

    var parseDate = d3.time.format("%Y-%m-%d").parse;
    var newdata = data
	newdata.forEach(function(d) {
		d.trip_date = parseDate(d.trip_date);
		d.trip_count = d.trip_count * 10
	});

	var ndx = crossfilter(newdata);
    var dateDim = ndx.dimension(function(d) { return d.trip_date; });
    var countGroup = dateDim.group().reduceSum(function(d) {return d.trip_count;});

    var minDate = dateDim.bottom(1)[0].trip_date;
    var maxDate = dateDim.top(1)[0].trip_date;

    print_filter(countGroup);


    var timeChart = dc.barChart("#time-chart");

    timeChart
        .width(800)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(countGroup)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Date")
        .yAxis().ticks(4);

    dc.renderAll();
});
